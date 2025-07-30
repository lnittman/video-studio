import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setPixelFormat('yuv444p');
Config.setCodec('h264');

// Configure for high quality output
Config.setCrf(18);
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(100);

// Enable GPU acceleration if available
Config.setChromiumOpenGlRenderer('angle');

// Output settings
Config.setOutputLocation('./out');

// Studio settings
Config.setStudioPort(3004);
Config.setPublicDir('./public');