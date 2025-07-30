# Video Studio

A programmatic video creation studio powered by Remotion. This repository contains all video projects created by the video-studio agent.

## Structure

```
video-studio/
├── src/                 # Core Remotion setup
├── projects/           # Individual video projects
│   └── squish/        # Squish promo video
├── public/            # Static assets
└── out/              # Rendered video outputs
```

## Getting Started

```bash
# Install dependencies
npm install

# Start Remotion Studio
npm run dev

# Render a video
npm run render SquishPromo out/squish-promo.mp4
```

## Projects

Each project in the `projects/` directory is a self-contained video composition with its own assets and components.

### Current Projects

- **Squish Promo**: Retro 80s/90s VHS-style promotional video

## Usage

The video-studio agent uses this repository to create programmatic videos using React components and Remotion's powerful animation primitives.