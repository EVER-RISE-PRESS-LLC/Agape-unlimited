# Animation review

Reviewed using `review-animations/SKILL.md` and its `STANDARDS.md`, after the implementation pass.

| Before | After | Why |
| --- | --- | --- |
| The mobile menu became `visibility: hidden` at the beginning of dismissal. | `app/globals.css:1212` delays the discrete visibility change until the 150ms transform/opacity exit completes; opening takes 220ms from the top-right trigger. | Keeps the closing path visible and spatially consistent without delaying pointer or keyboard availability. |
| The menu and anchor movement also ran for keyboard interactions. | `app/globals.css:1200` disables smooth scrolling while keyboard focus is visible, removes focused-control transforms, and makes the menu transition immediate when keyboard focus is within the header. | Keyboard actions must respond immediately; movement is reserved for pointer interactions. |

## Verdict

**Interruptibility & timing:** menu transforms and opacity use retargetable CSS transitions with the standard `cubic-bezier(0.23, 1, 0.32, 1)` curve. Press feedback uses a 160ms deliberate phase and a 100ms release. Menu opening is 220ms; dismissal is 150ms. No gesture input is blocked. The sole 650ms entrance is a one-time marketing sequence with 50ms stagger, justified by the rare/first-time exception rather than a repeated UI action.

**Origin, physicality & cohesion:** the menu opens from its trigger at `top right`, starting at `scale(.97)` and an 8px offset. It exits on the same path. There is no bounce, automatic looping, parallax, card-hover choreography, or motion on the native program expansion/filter interactions.

**Performance:** movement animates only transform and opacity. Visibility is a delayed discrete state change, not a per-frame layout animation. Static backdrop blur is not animated. No animation library or continuously running JavaScript is required.

**Accessibility:** hover movement is gated by fine pointer and hover capability. Reduced motion disables the introductory movement and menu transforms, retaining 100ms opacity feedback. Keyboard actions bypass motion. Reduced transparency uses an opaque header; increased contrast strengthens text and separators.

**Approve.** Both findings are corrected. No remaining feel-breaking motion regressions were found in source review. Browser verification covers reduced-motion styling and menu interaction. Physical-device and frame-by-frame high-refresh-rate review remain outside this desktop verification.
