import {renderVideo} from '@revideo/renderer';

const voiceovers = [
    {
      audioFile: "https://revideo-example-assets.s3.amazonaws.com/walkthrough_audio_0.mp3",
      speed: 1,
      pauseAfterInSeconds: 1
    },
    {
      audioFile: "https://revideo-example-assets.s3.amazonaws.com/walkthrough_audio_1.mp3",
      speed: 1,
      pauseAfterInSeconds: 1
    },
    {
      audioFile: "https://revideo-example-assets.s3.amazonaws.com/walkthrough_audio_2.mp3",
      speed: 1.1,
      pauseAfterInSeconds: 0
    }
  ];

const zooms = [
    {
        startTime: 12,
        xRatio: 0.195,
        yRatio: 0.12,
        zoomDuration: 1,
        stayDuration: 1,
        zoomDepth: 2
    }
];

const boxes = [
    {
      startTime: 11,
      duration: 3.5,
      xRatio: 0.195,
      yRatio: 0.12,
      width: 40,
      height: 40,
    }
];

renderVideo('./vite.config.ts', { voiceovers: voiceovers, zooms: zooms, boxes: boxes });
