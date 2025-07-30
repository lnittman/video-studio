# Squish Promo Video - VHS Retro Style

## Overview
A 15-second minimalist promo video for Squish with a retro 80's/90's VHS aesthetic. The video focuses on abstract visual metaphors rather than explicit features, using grid paper animations, blank space transitions, and subtle glitch effects.

## Visual Elements

### Core Components
- **Grid Paper Background**: Animated grid that subtly drifts with noise
- **Floating Dots**: Minimalist particles that move organically
- **Grid Pattern Fill**: Cells that fill in with a wave animation
- **Ink Bleeds**: Organic ink spreading effects at key moments
- **VHS Effects**: Scan lines, tracking errors, and color bleeding
- **Glitch Effects**: Subtle digital artifacts and data mosh
- **Minimalist Logo**: Abstract 3x3 grid that morphs and transforms

### Color Palette
- Paper: `#FAF8F3` (off-white)
- Grid: `#E5D4B8` (muted beige)
- Dark: `#2A2A2A` (soft black)
- VHS Green: `#00FF41`
- VHS Red: `#FF0080`
- VHS Blue: `#00D9FF`
- Pastel accents for subtle color bleeds

## Running the Project

### Preview in Remotion Studio
```bash
npm run dev
```
This will open Remotion Studio at http://localhost:3003 where you can:
- Preview the video in real-time
- Adjust parameters
- Scrub through the timeline
- Test different resolutions

### Render the Video

#### High Quality MP4 (recommended)
```bash
npx remotion render SquishPromo out/squish-promo.mp4
```

#### Lower file size (for web)
```bash
npx remotion render SquishPromo out/squish-promo-web.mp4 --crf=23
```

#### GIF version (larger file size)
```bash
npx remotion render SquishPromo out/squish-promo.gif --codec=gif
```

#### Custom resolution for social media
```bash
# Instagram Square (1080x1080)
npx remotion render SquishPromo out/squish-promo-instagram.mp4 --width=1080 --height=1080

# Twitter (1280x720)
npx remotion render SquishPromo out/squish-promo-twitter.mp4 --width=1280 --height=720

# TikTok/Shorts (1080x1920)
npx remotion render SquishPromo out/squish-promo-vertical.mp4 --width=1080 --height=1920
```

## Timeline Breakdown

- **0-30 frames**: Grid paper establishes, subtle VHS effects begin
- **30-60 frames**: Floating dots appear, creating organic movement
- **60-260 frames**: Grid pattern fills in with wave animation
- **90-390 frames**: Minimalist logo appears and morphs
- **120-180 frames**: First ink bleed
- **180-240 frames**: Second ink bleed
- **200-240 frames**: Data mosh transition effect
- **240-300 frames**: Blank space transition
- **420-450 frames**: Signal loss fade out

## Customization

### Adjust Duration
Edit `/src/Root.tsx`:
```typescript
durationInFrames={450} // Change this value (30fps)
```

### Modify Effects Intensity
In `/projects/squish/SquishPromo.tsx`:
- VHS tracking: Adjust noise multiplier in `tracking` calculation
- Glitch intensity: Change `intensity` prop on `<DigitalGlitch>`
- Grid opacity: Modify `opacity` prop on `<GridPaper>`

### Change Colors
Edit `/projects/squish/components/RetroColors.tsx` to modify the color palette.

## Tips
- The video is designed to loop well if needed
- Effects are subtle by design - increase intensity carefully
- Best viewed with sound off (pure visual experience)
- Render at 60fps for smoother VHS tracking effects

## Troubleshooting
- If you see build errors, run `npm install --legacy-peer-deps`
- For performance issues, reduce the grid cell count or particle effects
- Studio may lag with all effects enabled - render for true performance

The video captures the essence of productivity through minimalist visual metaphors, perfect for social media or landing pages.