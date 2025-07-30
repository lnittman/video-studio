import React from 'react';
import { Composition } from 'remotion';

// Import project compositions
import { SquishPromo } from '../projects/squish/SquishPromo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SquishPromo"
        component={SquishPromo}
        durationInFrames={600} // 20 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: 'Squish',
          subtitle: 'A minimalist productivity app',
        }}
      />
    </>
  );
};