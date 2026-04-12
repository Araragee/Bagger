```markdown
# Design System Specification: The Curated Archive

## 1. Overview & Creative North Star
**Creative North Star: The Digital Curator**
This design system is not a static container for products; it is an evolving editorial framework. It rejects the "template" aesthetic of traditional e-commerce in favor of a high-end, gallery-like experience. By utilizing intentional asymmetry, overlapping elements, and extreme typographic scales, the system mirrors the act of "thrifting"—the discovery of high-value gems within a layered, textured environment.

The system is engineered to pivot between three distinct visual modes—**Modern**, **Poppy**, and **Retro**—while maintaining a unified structural DNA. It achieves "premium" status through the restraint of whitespace and "accessibility" through intuitive, tactile hierarchy.

---

## 2. Color & Surface Architecture
The palette is rooted in sophisticated neutrals with high-chroma accents that shift based on the active "Mode."

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through **Background Color Shifts** or **Tonal Transitions**. 
- *Implementation:* Use `surface-container-low` for secondary sections sitting on a `surface` background. The transition should be felt, not seen as a stroke.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. 
- **Base Layer:** `surface` (#faf9f6)
- **Interactive Layers:** Use `surface-container-lowest` (#ffffff) to make cards "pop" against the background.
- **Utility Layers:** Use `surface-container-high` (#e9e8e5) for sidebars or persistent navigation to create a sense of structural permanence.

### The Glass & Gradient Rule
To achieve a signature "Director’s Cut" look:
- **Glassmorphism:** For floating headers or quick-view modals, use `surface` with 80% opacity and a `24px` backdrop-blur. 
- **Signature Gradients:** For Hero CTAs, use a subtle linear gradient from `primary` (#5d5c5b) to `primary-container` (#757474) at a 135-degree angle. This adds "visual soul" and prevents the UI from feeling flat.

---

## 3. Typography: The Editorial Voice
The typography system uses a tri-font approach to navigate the eclectic nature of high-end thrift.

- **Display (Epilogue):** Our "Hero" typeface. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for Modern mode, and loose, expressive spacing for Poppy mode.
- **Body (Manrope):** Our "Workhorse." `body-md` (0.875rem) provides high readability for product descriptions. In Modern mode, pair this with increased line-height (1.6) for an editorial feel.
- **Labels (Space Grotesk):** Our "Technical" accent. Used for price tags, SKU numbers, and filter chips. This font injects a sense of "archival documentation" into the shop.

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, not structural lines.

- **The Layering Principle:** Stack `surface-container` tiers. A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural lift.
- **Ambient Shadows:** When an element must float (e.g., a "Buy" button), use a shadow tinted with the `on-surface` color at 6% opacity with a 32px blur. Avoid pure black/grey shadows; they look "cheap."
- **The Ghost Border Fallback:** If accessibility requires a border, use `outline-variant` (#e4bebc) at **15% opacity**. It should appear as a faint suggestion of a boundary.

---

## 5. Components

### Buttons: The Tactile Interaction
- **Primary:** Solid `primary` (#5d5c5b) with `on-primary` text. In **Poppy Mode**, switch to `secondary` (#aa3000) for high energy. 
- **Secondary (Ghost):** No background, with a `Ghost Border`. On hover, transition to `surface-container-highest`.
- **Shape:** Follow the Roundedness Scale:
    - **Modern:** `none` (0px) or `sm` (0.125rem) for a sharp, architectural look.
    - **Poppy:** `full` (9999px) for a soft, pill-shaped aesthetic.
    - **Retro:** `md` (0.375rem) to mimic vintage labels.

### Cards & Lists: The Curated Grid
- **The Rule of Zero Dividers:** Forbid divider lines. Use vertical white space (`spacing-xl`) or a subtle shift from `surface` to `surface-container-lowest` to separate items.
- **Product Cards:** Use a "Full-Bleed" image style where the image sits on the `surface` and metadata sits in an asymmetrical `surface-container` overlay.

### Input Fields & Tooltips
- **Inputs:** Use `surface-container-low` with a bottom-only `outline` (#8f6f6e) at 40% opacity. This emphasizes the "editorial" rather than "functional" nature.
- **Tooltips:** Use `inverse-surface` with `inverse-on-surface` text. Apply `xl` (0.75rem) roundedness to make them feel like "tags" found on vintage clothing.

---

## 6. Mode-Specific Execution

| Feature | **Modern Mode** | **Poppy Mode** | **Retro Mode** |
| :--- | :--- | :--- | :--- |
| **Primary Color** | `primary` (#5d5c5b) | `secondary` (#aa3000) | `tertiary` (#655a4c) |
| **Typography** | Epilogue (Bold/Sharp) | Space Grotesk (Uppercase) | Epilogue (Light/Italic) |
| **Corner Radius** | `none` (0px) | `full` (9999px) | `md` (0.375rem) |
| **Texture** | Ultra-clean, high-gloss | 2D Flat, vibrant overlays | Grain/Noise 5% overlay |

---

## 7. Do's and Don'ts

### Do
- **Do** overlap images and text to create a "collage" feel in Poppy and Retro modes.
- **Do** use `display-lg` typography for single words or short phrases to act as graphic elements.
- **Do** use the `secondary` (#aa3000) sparingly in Modern mode as a "Sticker" or "Sale" alert.

### Don't
- **Don't** use 1px black borders. It breaks the premium "Digital Curator" illusion.
- **Don't** use standard shadows. If it doesn't look like ambient natural light, remove it.
- **Don't** center-align everything. Use the grid to create "weighted" asymmetry (e.g., a large image on the left, small text tucked in the bottom right).

---
*Note: This design system is a living document. Every interaction should feel like a discovery—deliberate, high-end, and expertly curated.*```