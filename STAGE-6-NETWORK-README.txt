ARK II — STAGE 6: DIGITAL NETWORK

All Stage 5 production features remain included.

ADDED
- Custom canvas-based ARK II Digital Network
- Slow connected ivory nodes
- Selective glowing orange nodes
- Fine cursor interaction on desktop
- 34 nodes on desktop, 22 on tablet and 13 on mobile
- Smaller ambient network in the contact section
- No external particles package
- High-DPI canvas with device-pixel-ratio cap
- ResizeObserver for responsive resizing
- IntersectionObserver to pause off-screen animation
- Pauses when the browser tab is hidden
- Disabled for users requesting reduced motion

TEST
1. Stop the current server with Ctrl + C.
2. Replace the project files.
3. Run:
   npm install
   npm run dev
4. Move the cursor around the desktop hero.
5. Test at 390px and 430px mobile widths.
6. Confirm the headline remains easy to read.
7. Scroll to the contact section and check the subtle callback.

The animation is intentionally controlled rather than a generic
full-page particle effect. It is strongest around the hero orb and
quieter behind the main typography.


BLACK SCREEN FIX
- Fixed Loader callback so it passes true to setLoaderComplete.
- Previous version called the state setter with no value, leaving
  .site-content at opacity: 0.
- Loader duration increased from 1.75 seconds to 3 seconds.
- Metadata now fades in after the ARK II wordmark.
- Progress line duration increased to 2.15 seconds.
