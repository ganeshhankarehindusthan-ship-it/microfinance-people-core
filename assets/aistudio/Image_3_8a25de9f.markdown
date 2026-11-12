---
name: Microfinance People Core
colors:
  surface: '#f0fcf5'
  surface-dim: '#d0ddd6'
  surface-bright: '#f0fcf5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf7f0'
  surface-container: '#e4f1ea'
  surface-container-high: '#deebe4'
  surface-container-highest: '#d9e5df'
  on-surface: '#131e1a'
  on-surface-variant: '#3f4945'
  inverse-surface: '#28332e'
  inverse-on-surface: '#e7f4ed'
  outline: '#6f7975'
  outline-variant: '#bec9c4'
  surface-tint: '#206a59'
  primary: '#004538'
  on-primary: '#ffffff'
  primary-container: '#0e5e4e'
  on-primary-container: '#8ed5c0'
  inverse-primary: '#8ed4c0'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fdae3f'
  on-secondary-container: '#6d4400'
  tertiary: '#004624'
  on-tertiary: '#ffffff'
  tertiary-container: '#066034'
  on-tertiary-container: '#8ad8a0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a9f1db'
  primary-fixed-dim: '#8ed4c0'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#005142'
  secondary-fixed: '#ffddb7'
  secondary-fixed-dim: '#ffb95e'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#a4f4ba'
  tertiary-fixed-dim: '#89d7a0'
  on-tertiary-fixed: '#00210e'
  on-tertiary-fixed-variant: '#00522b'
  background: '#f0fcf5'
  on-background: '#131e1a'
  surface-variant: '#d9e5df'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-md-medium:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  body-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Public Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Public Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  tabular-lg:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  tabular-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  tabular-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-2xs: 0.25rem
  space-xs: 0.375rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
  space-2xl: 2rem
---

## Brand & Style

This design system serves an institutional Non-Banking Financial Company (NBFC) operating in rural, semi-urban, and urban Maharashtra. It bridges modern digital fintech operations with the warmth, stability, and dependability expected by branch operations managers, field credit officers, and central HR teams. 

### Brand Personality & Emotional Impact
- **Trustworthy & Prudent:** Evokes financial fidelity, precise statutory compliance (PF, ESIC, Gratuity, PT), and rock-solid reliability.
- **Rooted & Approachable:** Built with an organic, civic-conscious palette that respects regional administrative contexts without feeling antiquated or bureaucratic.
- **Crisp & Functional:** Eliminates unnecessary decorative flourishes in favor of dense data clarity, swift batch actions, and friction-free payroll auditing.

### Design Aesthetic
The system balances **Modern Corporate Precision** with a **Tactile Warmth**. It eschews harsh neon fintech tropes and high-tech crypto styles, anchoring instead in crisp editorial cards, quiet verdant neutrals, subtle structural borders, and purposeful tabular density. Complex field agent rosters, biometric attendance logs, and multi-tier incentive disbursements are elevated through clear hierarchical signaling and localized typographical legibility.

## Colors

The palette is engineered specifically for daytime desk-bound operations and field audits, leveraging an earthy botanical green foundation paired with a civic Indian marigold accent.

### Palette Architecture
- **Primary (`#0E5E4E`):** Deep Forest Green. Anchor for primary buttons, selected navigation items, key KPI figures, and active operational states. Paired with pure white (`#FFFFFF`) for text.
  - *Primary Soft (`#DCEBE5`):* Muted container tint for active table row selections, focused badge containers, and secondary action highlights.
- **Secondary / Accent (`#C9820F`):** Marigold Amber. Denotes verification states, urgent statutory updates, disbursement alerts, and attention indicators.
  - *Marigold Soft (`#F7E9CC`):* Supporting tint for pending verifications (Aadhaar/PAN checks) and warning alerts.
- **Tertiary / Success (`#2C7A4B`):** Forest Sage. Used for completed bank transfers, approved salary batches, and verified KYCs. Accompanied by background tint `#DDEFE3`.
- **Warning (`#9A6514` on `#F6EAD2`):** Flagged anomalies, grace-period leaves, and pending approvals.
- **Danger / Critical (`#A73C2A` on `#F5DFDA`):** Settlement failures, rejected documentation, biometric mismatches, and compliance flags.
- **Surfaces & Backgrounds:**
  - *Base Background (`#F4F6F2`):* Reduces glare during extended screen shifts.
  - *Surface Canvas (`#FFFFFF`):* Crisp card containment, high contrast tables, and forms.
  - *Surface-2 / Recessed (`#EBEFE8`):* Table headers, secondary toolbars, sidebars, and disabled controls.
- **Text & Borders:**
  - *Primary Ink (`#18231F`):* Deep pine black for razor-sharp typography.
  - *Muted Ink (`#5A6A62`):* Supporting metadata, subheadings, and secondary labels.
  - *Structural Borders (`#D9E0D6`):* Architectural hairline boundaries between functional zones.

## Typography

Typography prioritizes legibility across dense employee sheets, bilingual/multilingual names (English, Devanagari/Marathi/Hindi), and numerical accounting schedules.

### Typography Hierarchy & Rules
- **Headings (`Plus Jakarta Sans`):** Selected for structural geometry, modern openness, and balanced authority. Used strictly for page headers, modal titles, and card headers at weights 600 (SemiBold) and 700 (Bold).
- **Body & Controls (`Public Sans`):** Chosen for its institutional clarity, wide aperture, and neutral rhythm. It performs exceptionally well when rendering Latin scripts alongside regional Marathi transliterations. Default body copy operates at a compact `14px` base with a `20px` line-height for high scan-speed.
- **Numbers & Monetary Ledger Units:** All numerical representations (Rupee amounts `₹`, employee IDs, account numbers, IFSC codes, and percentage deductions) must strictly employ tabular lining figures (`font-variant-numeric: tabular-nums`) and be aligned right in financial matrices and tables.

## Layout & Spacing

The layout is built upon an 8-point harmonic rhythm adapted for high-density administrative software. 

### Grid & Canvas Structure
- **Desktop (1024px+):** Fixed-width fluid canvas (max 1440px wide) or edge-to-edge portal framework with a fixed 260px navigation drawer. Content zones utilize a 12-column grid with a `1.5rem` (24px) gutter and `2rem` (32px) margins.
- **Tablet / Split Screen (768px - 1023px):** 8-column layout with `1rem` (16px) gutters and `1.5rem` (24px) outer margin. Side navigation collapses to an icon bar.
- **Mobile Handheld (Under 768px):** 4-column fluid layout with `0.75rem` (12px) gutters and `1rem` (16px) margins for on-the-go branch roster lookups.

### Spatial Rhythm
- **Micro Spacing (`space-2xs` to `space-sm`):** Reserved for button internals, form field labels, inline status pill paddings, and avatar-to-text alignments.
- **Medium Spacing (`space-md` to `space-lg`):** Governs table cell padding, input-to-input vertical stacks, and stacked list items.
- **Macro Spacing (`space-xl` to `space-2xl`):** Applied to card interiors, section dividers, and modal dialogue padding.

## Elevation & Depth

To preserve trust and calm legibility, depth avoids floating, dramatic 3D layers or heavy skeuomorphism. It employs precise boundary containment and restrained ambient dispersion.

### Elevation Tiers
- **Tier 0 (Base Canvas):** `#F4F6F2`. The non-reflective structural background layer holding all views.
- **Tier 1 (Resting Cards & Tables):** Background `#FFFFFF` framed by a 1px solid `#D9E0D6` border, grounded by a subtle micro-shadow:
  - `box-shadow: 0 1px 2px rgba(20, 40, 30, 0.06)`
- **Tier 2 (Floating Trays, Modals & Dropdowns):** Background `#FFFFFF` with boundary `#D9E0D6` elevated through a soft ambient plume:
  - `box-shadow: 0 8px 24px rgba(20, 40, 30, 0.06), 0 2px 6px rgba(20, 40, 30, 0.04)`
- **Recessed / Sunken Controls:** Table headers, search filters, and summary statistic wells use `#EBEFE8` flat surfaces with no shadow, sitting flush with the boundary system.

## Shapes

The geometric personality of this design system communicates institutional stability and operational modernism.

### Geometric Rules
- **Interactive Controls & Inputs:** Standardized at `8px` (`0.5rem`). This strikes an intentional midpoint between clinical square corners and consumer-playful rounded shapes.
- **Containers, Cards & Data Panes:** Radii range strictly between `12px` and `14px` (`0.75rem` to `0.875rem`).
- **Pills, Badges & Tags:** Fully pill-shaped (`9999px`) to immediately isolate discrete meta-states from square input fields.
- **Dividers & Outlines:** Always crisp 1px strokes; border curves strictly mirror the inner corner geometries of their host containers.

## Components

### 1. Buttons
- **Primary Button:** Background `#0E5E4E`, text `#FFFFFF`, radius `8px`, height `40px` (desktop), `44px` (touch/mobile). Hover state: `#0A493D`. Active: `#07382E`. Focus: 2px offset with ring `#0E5E4E`.
- **Secondary / Subtle Button:** Background `#DCEBE5`, text `#0E5E4E`, border `none`, radius `8px`. Hover: Background `#CDE3DB`.
- **Outline Button:** Background `transparent`, border `1px solid #D9E0D6`, text `#18231F`, radius `8px`. Hover: Background `#EBEFE8`.
- **Danger Action:** Background `#A73C2A`, text `#FFFFFF`. Used only for terminal actions (e.g., "Reject Payroll Batch", "Revoke Access").

### 2. Status Pills & Verification Badges
Compact, semi-bold (`label-sm`), high-contrast pill markers (`padding: 2px 10px`, border-radius `9999px`):
- **Completed / Disbursed / Active:** Text `#2C7A4B`, Background `#DDEFE3`.
- **Pending / Action Required / On-Hold:** Text `#9A6514`, Background `#F6EAD2`.
- **Failed / Flagged / Terminated:** Text `#A73C2A`, Background `#F5DFDA`.
- **Draft / In-Progress:** Text `#5A6A62`, Background `#EBEFE8`.

### 3. Form Inputs & Select Menus
- **Height & Padding:** `40px` total height, horizontal padding `12px`.
- **Style:** Background `#FFFFFF`, 1px solid border `#D9E0D6`, border-radius `8px`.
- **Typography:** `body-md` (`14px`), text color `#18231F`, placeholder `#5A6A62`.
- **Focus State:** 1px border `#0E5E4E` with an outer glow `0 0 0 3px rgba(14, 94, 78, 0.15)`.
- **Error State:** 1px border `#A73C2A` with an outer glow `0 0 0 3px rgba(167, 60, 42, 0.12)`.

### 4. Data Tables (HR Ledger & Branch Payroll)
- **Table Container:** Solid `#FFFFFF`, bordered by `#D9E0D6`, rounded `12px`, with micro-shadow.
- **Header Cells:** Background `#EBEFE8`, text `label-sm` (`11px`), color `#5A6A62`, uppercase, height `36px`, bottom border `1px solid #D9E0D6`.
- **Data Rows:** Height `48px`, border-bottom `1px solid #D9E0D6`. Hover background: `#F4F6F2`. Selected background: `#DCEBE5`.
- **Cell Alignment:** Left-align names and strings; center-align status badges; strictly right-align monetary deductions, CTC, and payout figures formatted with tabular numeric styling.

### 5. Cards & KPI Metrics
- **Metric Cards:** Border `1px solid #D9E0D6`, radius `12px`, padding `1.25rem`. 
- **KPI Typography:** Caption at top (`12px`, `#5A6A62`), numerical value formatted in tabular bold (`24px`, `#18231F`), trend indicator pill positioned at bottom right.

### 6. Checkboxes & Radio Controls
- **Size:** `18px × 18px`.
- **Checkboxes:** Radius `4px`, border `1.5px solid #D9E0D6`. Checked: Background `#0E5E4E` with white checkmark icon.
- **Radios:** Radius `50%`. Selected: `#0E5E4E` outer ring with a concentric `#FFFFFF` space and `#0E5E4E` center point.