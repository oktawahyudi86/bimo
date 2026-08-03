---
name: Heritage Elite
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44464e'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777f'
  outline-variant: '#c5c6cf'
  surface-tint: '#4c5e86'
  primary: '#00081e'
  on-primary: '#ffffff'
  primary-container: '#0a1f44'
  on-primary-container: '#7687b2'
  inverse-primary: '#b4c6f4'
  secondary: '#3755c3'
  on-secondary: '#ffffff'
  secondary-container: '#708cfd'
  on-secondary-container: '#00217a'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cca730'
  on-tertiary-container: '#4f3e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b4c6f4'
  on-primary-fixed: '#041a3f'
  on-primary-fixed-variant: '#34466d'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c4ff'
  on-secondary-fixed: '#001453'
  on-secondary-fixed-variant: '#173bab'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  section-padding: 80px
---

## Brand & Style

The design system embodies a "Premium Cultural Professionalism." It balances the reliability of a high-end corporate transport service with the rich cultural heritage of Yogyakarta. The aesthetic is rooted in **Corporate Minimalism**, utilizing generous whitespace and a structured grid to signal trustworthiness, while integrating traditional motifs (Gatotkaca) as sophisticated, low-opacity watermarks to maintain brand identity without clutter.

The target audience consists of corporate entities, luxury tour groups, and institutional partners who prioritize safety, punctuality, and a high-standard travel experience. The emotional response should be one of "assured comfort" and "refined prestige."

**Visual Principles:**
- **Clarity over Clutter:** Information-dense content like price lists is broken down into digestible, clean modules.
- **Modern Heritage:** Use the Gatotkaca element as a high-end graphic asset—screened back, cropped, or used as a subtle texture rather than a focal logo alone.
- **Precision:** Perfect alignment and consistent spacing to reflect the operational excellence of the transport fleet.

## Colors

The palette is anchored in professional stability and premium accents.

- **Deep Navy (#0A1F44):** Used for primary headings, navigation backgrounds, and high-importance UI elements. It provides a sense of authority.
- **Royal Blue (#1E40AF):** The functional primary color for interactive elements like buttons and active states.
- **Gold/Amber (#D4AF37):** A "Star" accent derived from the heritage logo. Reserved for premium call-outs, ratings (stars), and subtle borders to denote "First Class" services.
- **Ice Blue (#E2E8F0):** A secondary neutral used for backgrounds of sections to distinguish content areas without introducing heavy color.
- **Backgrounds:** Primarily white (#FFFFFF) for a clean, editorial feel, with very light grey (#F1F5F9) used for container surfaces.

## Typography

The system uses a pairing of **Montserrat** for impact and **Inter** for utility.

- **Headlines:** Montserrat provides a geometric, confident look that feels modern and established. Bold weights should be used for section titles to create a clear hierarchy.
- **Body & Labels:** Inter is used for all functional text. Its high legibility is crucial for price lists, bus specifications, and contact details.
- **Letter Spacing:** Headlines use slight negative tracking (-0.02em) for a tighter, more professional appearance. Labels use expanded tracking (+0.05em) for better scannability in small sizes.

## Layout & Spacing

This design system uses a **Fluid Grid** with a maximum container width of 1200px for desktop.

- **Grid:** A 12-column layout for desktop, transitioning to 2 columns for tablet, and 1 column for mobile.
- **Rhythm:** An 8px base unit drives all spacing decisions. 
- **Sectioning:** Vertical rhythm is maintained by a consistent 80px padding between major content blocks (e.g., between "Our Fleet" and "Testimonials") to allow the design to "breathe."
- **Content Density:** High for data-heavy sections (Price Lists) but airy for marketing sections (About Us) to ensure a premium feel.

## Elevation & Depth

To maintain a professional and "flat-plus" look, depth is achieved through **Ambient Shadows** and **Tonal Layers**.

- **Surface Levels:** 
  - Level 0: Pure white or #F8FAFC (Base background).
  - Level 1: White cards with a subtle 1px border (#E2E8F0) and a soft, diffused shadow (0px 4px 20px rgba(0, 0, 0, 0.05)).
  - Level 2: Interactive elements on hover, using a slightly more pronounced shadow (0px 10px 30px rgba(10, 31, 68, 0.08)).
- **Overlays:** Navigation bars use a semi-transparent blur (Glassmorphism) when scrolling over content to maintain context without losing the clean aesthetic.

## Shapes

The shape language is "Approachable Corporate." 

- **Containers:** Cards, input fields, and fleet images use a standard 8px (0.5rem) corner radius. This is soft enough to feel modern but sharp enough to remain professional.
- **Buttons:** Primary buttons use a slightly more pronounced rounding (12px) to make them feel more tactile and "clickable."
- **Icons:** Use linear icons with rounded ends to match the UI's roundedness.

## Components

### Buttons
- **Primary:** Royal Blue background, white text, 12px rounded corners. Includes a slight Gold bottom-border on hover for a premium "star" touch.
- **Secondary:** Transparent background, Royal Blue border (2px), 12px rounded corners.

### Cards (Fleet & Price List)
- **Fleet Card:** High-quality image at the top with an 8px radius. Specifications (seats, features) listed below using Inter 14px with small, refined icons.
- **Testimonial Card:** Centered typography, star ratings in Gold (#D4AF37), and a subtle Gatotkaca watermark in the bottom corner at 5% opacity.

### Navigation Bar
- A clean, white surface with the logo on the left. Links in Deep Navy. The "Contact Us" link should be styled as a ghost button for visibility.

### Tables (Price List)
- Avoid heavy black borders. Use zebra-striping with Ice Blue (#F1F5F9) and thin horizontal dividers in #E2E8F0. Headers must be in Deep Navy with white text for high contrast.

### Heritage Elements
- The Gatotkaca figure is used as a background graphic for section transitions, screened at 3-5% opacity against the neutral background. It acts as a signature of quality and origin.