// NPS 그리드 사전 계산 스크립트
// Usage: deno run --allow-read scripts/precompute_nps_grid.js
//
// 참조 프로필: 2026년 기준, 가입 시작 연도 시점의 연봉이 Y값.
// 각 셀: (startSalary, years) → 세후 총수령액
// 임금곡선(연령대별 중위소득 증감률) + 단계 보험료율(9%→13%) 반영.

// ─────────────────────────────────────────
// 상수
// ─────────────────────────────────────────
const REF_YEAR = 2026; // 가입 시작 시점이 2026년이라고 가정
const REF_AGE_AT_2026 = 30; // 시작 시점의 나이 기준 (year mapping 용)
const YEARS_AXIS = [10, 15, 20, 25, 30, 35, 40];
const SALARY_AXIS_MAN = [3000, 4000, 5000, 6000, 7000, 8000]; // 만원

const NPS_DATA = {
  a_value: 3193511,
  proportional_constant: 1.29,
  max_monthly_income: 6370000,
  min_monthly_income: 400000,
  contribution_rates: {
    2025: 0.09, 2026: 0.095, 2027: 0.10, 2028: 0.105,
    2029: 0.11, 2030: 0.115, 2031: 0.12, 2032: 0.125, 2033: 0.13,
  },
};
const INFLATION_RATE = 0.025;
const NPS_TAX = { ANNUAL_EXEMPTION: 3500000, TAX_RATE: 0.05 };
const AGE_WAGE_GROWTH = {
  20: 0.054, 25: 0.045, 30: 0.035, 35: 0.037,
  40: 0.048, 45: 0.060, 50: 0.056, 55: 0.061,
};
const PENSION_START_AGE = 65;
const LIFESPAN = 90;

// ─────────────────────────────────────────
// 계산 함수
// ─────────────────────────────────────────
function getContributionRate(year) {
  if (year <= 2025) return 0.09;
  if (year >= 2033) return 0.13;
  return NPS_DATA.contribution_rates[year] ?? 0.09;
}
function getStandardMonthlyIncome(annualIncome) {
  const m = annualIncome / 12;
  return Math.max(NPS_DATA.min_monthly_income, Math.min(NPS_DATA.max_monthly_income, m));
}
function getAgeWageGrowthRate(age) {
  if (age < 20) return AGE_WAGE_GROWTH[20];
  if (age >= 60) return AGE_WAGE_GROWTH[55];
  const bracketStart = Math.floor(age / 5) * 5;
  return AGE_WAGE_GROWTH[bracketStart] ?? 0.04;
}

function calculateNPS(incomes) {
  if (!incomes || incomes.length === 0) return { monthlyBenefit: 0, selfContribution: 0 };
  const A = NPS_DATA.a_value;
  const P = NPS_DATA.proportional_constant;
  let totalStandardMonthly = 0;
  let selfContribution = 0;
  for (const item of incomes) {
    const sm = getStandardMonthlyIncome(item.income);
    totalStandardMonthly += sm;
    const rate = getContributionRate(item.year);
    selfContribution += (sm * 12 * rate) / 2;
  }
  const B = totalStandardMonthly / incomes.length;
  const contributionMonths = incomes.length * 12;
  const n = Math.max(0, contributionMonths - 240);
  const basicAnnual = P * (A + B) * (1 + (0.05 * n) / 12);
  const years = contributionMonths / 12;
  let paymentRate;
  if (years >= 20) paymentRate = 1.0;
  else if (years >= 10) paymentRate = 0.5 + (years - 10) * 0.05;
  else paymentRate = years * 0.05;
  return {
    monthlyBenefit: Math.round((basicAnnual * paymentRate) / 12),
    selfContribution: Math.round(selfContribution),
  };
}
function calculateNPSTotal(monthlyBenefit, inflationRate, lifespan, startAge) {
  let total = 0;
  for (let age = startAge; age <= lifespan; age++) {
    const t = age - startAge;
    const gross = monthlyBenefit * 12 * Math.pow(1 + inflationRate, t);
    const taxable = Math.max(0, gross - NPS_TAX.ANNUAL_EXEMPTION);
    total += gross - taxable * NPS_TAX.TAX_RATE;
  }
  return Math.round(total);
}

// ─────────────────────────────────────────
// 그리드 계산
// ─────────────────────────────────────────
function buildIncomes(startAge, endAge, startingSalaryWon) {
  const incomes = [];
  let income = startingSalaryWon;
  for (let age = startAge; age <= endAge; age++) {
    const year = REF_YEAR + (age - (60 - (endAge - startAge + 1)));
    // year 매핑: startAge는 REF_YEAR로 정렬
    incomes.push({
      age,
      year: REF_YEAR + (age - startAge),
      income: Math.round(income),
    });
    if (age < endAge) income *= 1 + getAgeWageGrowthRate(age + 1);
  }
  return incomes;
}

function avgSelfContribMan(incomes) {
  let total = 0;
  for (const item of incomes) {
    const sm = getStandardMonthlyIncome(item.income);
    const rate = getContributionRate(item.year);
    total += (sm * 12 * rate) / 2;
  }
  return total / incomes.length / 12 / 10000;
}

// z[salaryIdx][yearsIdx] = 세후 총수령액 (원)
const z = SALARY_AXIS_MAN.map((salaryMan) =>
  YEARS_AXIS.map((years) => {
    const incomes = buildIncomes(60 - years, 59, salaryMan * 10000);
    const nps = calculateNPS(incomes);
    return calculateNPSTotal(nps.monthlyBenefit, INFLATION_RATE, LIFESPAN, PENSION_START_AGE);
  })
);

// 각 salary에 대한 대표 월 본인부담 (30년 가입 기준 평균)
const repContribMan = SALARY_AXIS_MAN.map((salaryMan) => {
  const incomes = buildIncomes(60 - 30, 59, salaryMan * 10000);
  return Math.round(avgSelfContribMan(incomes));
});

// ─────────────────────────────────────────
// 출력
// ─────────────────────────────────────────
const out = {
  meta: {
    ref_year: REF_YEAR,
    pension_start_age: PENSION_START_AGE,
    lifespan: LIFESPAN,
    inflation_rate: INFLATION_RATE,
    note: "Y=가입 시작 시점 연봉. 표값은 임금곡선 + 단계 보험료율(9%→13%) 시뮬레이션.",
  },
  years: YEARS_AXIS,
  salaries: SALARY_AXIS_MAN,
  contribMonthly: repContribMan, // 30년 기준 대표 월 본인부담
  z,
};
console.log(JSON.stringify(out, null, 2));

// 가독 표 (stderr)
const fmt = (v) => (v / 1e8).toFixed(2);
console.error("\n[참고용 가독 표 — 단위: 억원]");
console.error(["연봉\\기간", ...YEARS_AXIS.map((y) => `${y}년`)].join("\t"));
SALARY_AXIS_MAN.forEach((s, is) => {
  const row = [`${s}만(월${repContribMan[is]}만)`, ...YEARS_AXIS.map((_, iy) => fmt(z[is][iy]))];
  console.error(row.join("\t"));
});
