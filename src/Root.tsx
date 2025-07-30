import React from 'react';
import { Composition } from 'remotion';

// Import project compositions
import { SquishPromo } from '../projects/squish/SquishPromo';
import { SquishPromoV2 } from '../projects/squish/SquishPromoV2';
import { SquishPromoPolished } from '../projects/squish/SquishPromoPolished';
import { TestComposition } from '../projects/squish/TestComposition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SquishPromo"
        component={SquishPromo}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: 'Squish',
          subtitle: 'A minimalist productivity app',
        }}
      />
      <Composition
        id="SquishPromoV2"
        component={SquishPromoV2}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="SquishPromoPolished"
        component={SquishPromoPolished}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="TestComposition"
        component={TestComposition}
        durationInFrames={150} // 5 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};