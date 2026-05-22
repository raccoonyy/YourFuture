---
name: Modern Sovereign
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#37393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d1c5b4'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#9a8f80'
  outline-variant: '#4e4639'
  surface-tint: '#e9c176'
  primary: '#e9c176'
  on-primary: '#412d00'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#775a19'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#a7a5a5'
  on-tertiary-container: '#3b3b3b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
  canvas: '#141414'
  muted-gold: '#9D6B22'
  divider-subtle: '#333333'
  text-muted: '#888888'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  data-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.1'
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
spacing:
  unit: 4px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 80px
---

## Brand & Style

The design system embodies a **Trustworthy, Premium, and Editorial** personality. It is designed for high-end financial analysis where data density must be balanced with sophisticated aesthetics. The target audience expects precision, authority, and a sense of exclusive insight.

The visual style is a blend of **Minimalism** and **High-Contrast Typography**, drawing inspiration from modern broadsheet newspapers and luxury investment portfolios. The aesthetic avoids "app-like" playfulness in favor of a structured, information-heavy environment that feels like a physical financial report. Key traits include:
- **Atmospheric Dark Mode:** A deep, near-black canvas that provides a prestigious backdrop for gold accents.
- **Editorial Grids:** A heavy reliance on typographic alignment and thin dividers rather than cards or containers.
- **Data-Driven Elegance:** Using high-end serif typefaces to lend gravity to numerical insights.

## Colors

The palette is anchored by **Dark Charcoal** and **Muted Gold**, creating a high-contrast, premium environment. 

- **Primary (Muted Gold):** Reserved for primary calls to action, highlights, and critical data points. It signifies value and "wealth."
- **Secondary (Dark Charcoal):** The foundation of the UI, used for the main background and subtle surface layering.
- **Neutral:** A range of off-whites and grays used for text legibility, ensuring data is easy to parse against the dark background.
- **Functional Use:** Use the `canvas` color for the deep background and `divider-subtle` for the thin hairline rules that define the grid. Avoid using pure black (#000000) to maintain a soft, ink-like quality.

## Typography

This system uses a traditional "Editorial Contrast" pairing. **Libre Caslon Text** provides an authoritative, historical weight to headings, while **Hanken Grotesk** offers a sharp, modern clarity for data and UI controls.

- **Scale:** Maintain a conservative scale to preserve the "high-density" financial look. 
- **Hierarchy:** Use `label-caps` for field labels and small metadata. Use `data-lg` for large numeric outputs (e.g., pension amounts) to ensure the numbers feel precise and modern.
- **Styling:** Headings should never be excessively large; the prestige comes from whitespace and font choice, not scale.

## Layout & Spacing

The layout is built on a **typographic grid** rather than a card-based one. Structure is created through alignment and thin dividers.

- **Grid Model:** Use a 12-column fluid grid for desktop with wide gutters (32px).
- **Dividers:** Use 1px borders (#333333) to separate major sections horizontally and columns vertically. 
- **Whitespace:** Prioritize vertical "breathing room" between sections (80px+) to allow the eye to rest between complex data sets.
- **Responsive Behavior:** On mobile, columns stack vertically, and horizontal dividers become the primary method of separation. Margins reduce to 20px.

## Elevation & Depth

To maintain the editorial, "flat paper" feel, this design system **avoids drop shadows and depth effects.**

- **Tonal Layering:** Depth is communicated through color alone. Secondary surfaces use a slightly lighter charcoal (#2A2A2A) than the base canvas.
- **Flat UI:** Elements like buttons and inputs sit flush with the grid.
- **Overlays:** If a modal or dropdown is required, use a solid border (#C5A059) to define its edge rather than a shadow, keeping the look crisp and architectural.

## Shapes

The shape language is strictly **Sharp and Linear**.

- **Corners:** 0px radius for all elements, including buttons, inputs, and dividers. This reinforces the professional, "engineered" tone of the tool.
- **Slight Softening (Optional):** If requested for specific interactive elements, a maximum of 2px (`rounded-sm`) may be used to avoid a "harsh" digital feel, but sharp corners remain the primary standard.

## Components

### Buttons
- **Primary:** Solid Muted Gold (#C5A059) with Dark Charcoal text. Sharp edges. No shadow.
- **Secondary:** Transparent background with a 1px Gold border.
- **Typography:** Use `label-caps` for button text to maintain a structured look.

### Input Fields
- **Styling:** Bottom border only (1px, #C5A059 or #333333 depending on state). No background fill.
- **Labels:** Small, uppercase labels positioned above the input.
- **Active State:** Border transitions to a brighter gold when focused.

### Dividers
- **Horizontal:** 1px hairline rules used to separate sections.
- **Vertical:** Used sparingly to separate columns in data tables.

### Data Chips
- Small, sharp-edged boxes with a 1px border. Used for tags like "세후 기준" (After-tax).

### Cards (Implicit)
- Do not use boxed containers. Instead, group related information using a header and a horizontal divider at the top and bottom.