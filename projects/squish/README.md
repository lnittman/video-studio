# Squish Promo Video

This project demonstrates the **component-first approach** to creating professional videos with Remotion.

## Key Principle: Use Real Components

Instead of recreating UI from scratch, this video imports and showcases actual Squish components:

- `GlassButton` - The actual glassmorphic button component
- `GlowEffect` - Real glow effects from the app
- `BorderGlowEffect` - Authentic border animations
- Plus the actual color system and design tokens

## Setup for Component Import

1. **Symlink the components** (recommended for development):
```bash
# From video-studio root
ln -s ~/Developer/apps/squish/squish-xyz/apps/app/src/components projects/squish/imported-components
```

2. **Or copy components** (for production):
```bash
# Copy needed components
cp -r ~/Developer/apps/squish/squish-xyz/apps/app/src/components/buttons projects/squish/components/
cp -r ~/Developer/apps/squish/squish-xyz/apps/app/src/components/effects projects/squish/components/
```

## Video Structure

The video showcases Squish through:
1. **Authentic UI animations** - Real components with their actual animations
2. **Brand consistency** - Using Squish's actual color palette and effects
3. **Minimal text** - Visual storytelling through component interactions
4. **VHS aesthetic** - Retro overlay effects on modern UI

## Rendering

```bash
# Preview
npm run dev

# Render full quality
npx remotion render SquishPromo out/squish-promo.mp4

# Social media formats
npx remotion render SquishPromo out/squish-promo-square.mp4 --width=1080 --height=1080
```