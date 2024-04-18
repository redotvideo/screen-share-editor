"use client";
import Navbar from "@/components/navbar";
import { useEffect, useState, useMemo} from 'react';
import { MotionCanvasPlayerProps } from "@revideo/player";
import { ComponentProps } from "react";
import { globals } from "@/globals";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'revideo-player': MotionCanvasPlayerProps & ComponentProps<'div'>;
    }
  }
}  

export default function Edit() {
  const [voiceovers, setVoiceovers] = useState([
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
  ]);

  const [zoom, setZoom] = useState(
    {
      startTime: 12,
      xRatio: 0.195,
      yRatio: 0.12,
      zoomDuration: 1,
      stayDuration: 1,
      zoomDepth: 2
    }
  )

  const [box, setBox] = useState(
    {
      startTime: 11,
      duration: 3.5,
      xRatio: 0.195,
      yRatio: 0.12,
      width: 40,
      height: 40,
    }
  )

  // Other metadata remains unchanged
  type VoiceoverField = 'speed' | 'pauseAfterInSeconds';

  const handleVoiceoverChange = (index: number, field: VoiceoverField, value: number) => {
    const updatedVoiceovers = [...voiceovers];
    updatedVoiceovers[index][field] = value;
    setVoiceovers(updatedVoiceovers);
    console.log("updated voiceovers", updatedVoiceovers);
  };

  type ZoomField = 'startTime' | 'xRatio' | 'yRatio' | 'zoomDuration' | 'stayDuration' | 'zoomDepth';

  const handleZoomChange = (field: ZoomField, value: number) => {
    setZoom({
      ...zoom,
      [field]: value
    });
    console.log("updated zoom", zoom);
  };

  type BoxField = 'startTime' | 'duration' | 'xRatio' | 'yRatio' | 'width' | 'height';

  const handleBoxChange = (field: BoxField, value: number) => {
    setBox({
      ...box,
      [field]: value
    });
    console.log("updated box", box);
  };  

  useEffect(() => {
    import("@revideo/player");
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold leading-7 text-gray-900 mb-6">
          Edit your video
        </h2>
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 shadow-lg">
          <form className="space-y-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Audio Settings</h3>
            {voiceovers.map((voiceover, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium text-gray-700">
                    Audio File {index + 1} Playback Speed:
                  </label>
                  <div className="rounded-md shadow-sm">
                    <input
                      type="number"
                      step="0.1"
                      value={voiceover.speed}
                      onChange={(e) => handleVoiceoverChange(index, 'speed', parseFloat(e.target.value))}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Speed"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <label className="block text-sm font-medium text-gray-700">
                    Pause After (seconds):
                  </label>
                  <div className="rounded-md shadow-sm">
                    <input
                      type="number"
                      step="0.1"
                      value={voiceover.pauseAfterInSeconds}
                      onChange={(e) => handleVoiceoverChange(index, 'pauseAfterInSeconds', parseFloat(e.target.value))}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Pause After"
                    />
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  {/* Zoom Settings */}
  <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 shadow-lg">
    <form className="space-y-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Zoom Settings</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Start Time:
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={zoom.startTime}
                  onChange={(e) => handleZoomChange('startTime', parseFloat(e.target.value))}
                  className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Start Time"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  X Position:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={zoom.xRatio}
                  onChange={(e) => handleZoomChange('xRatio', parseFloat(e.target.value))}
                  className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="X Position"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Y Position:
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={zoom.yRatio}
                  onChange={(e) => handleZoomChange('yRatio', parseFloat(e.target.value))}
                  className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Y Position"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Zoom Duration:
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={zoom.zoomDuration}
                  onChange={(e) => handleZoomChange('zoomDuration', parseFloat(e.target.value))}
                  className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Zoom Duration"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Stay Duration:
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={zoom.stayDuration}
                  onChange={(e) => handleZoomChange('stayDuration', parseFloat(e.target.value))}
                  className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Stay Duration"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Zoom Depth:
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={zoom.zoomDepth}
                  onChange={(e) => handleZoomChange('zoomDepth', parseFloat(e.target.value))}
                  className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Zoom Depth"
                />
              </div>
            </div>
          </form>
        </div>


  {/* Box Settings */}
  <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 shadow-lg">
    <form className="space-y-4">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Box Settings</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Start Time:
              </label>
              <input
                type="number"
                step="0.1"
                value={box.startTime}
                onChange={(e) => handleBoxChange('startTime', parseFloat(e.target.value))}
                className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Start Time"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Duration:
              </label>
              <input
                type="number"
                step="0.1"
                value={box.duration}
                onChange={(e) => handleBoxChange('duration', parseFloat(e.target.value))}
                className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Duration"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                X Position:
              </label>
              <input
                type="number"
                step="0.01"
                value={box.xRatio}
                onChange={(e) => handleBoxChange('xRatio', parseFloat(e.target.value))}
                className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="X Position"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Y Position:
              </label>
              <input
                type="number"
                step="0.01"
                value={box.yRatio}
                onChange={(e) => handleBoxChange('yRatio', parseFloat(e.target.value))}
                className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Y Position"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Width:
              </label>
              <input
                type="number"
                step="1"
                value={box.width}
                onChange={(e) => handleBoxChange('width', parseFloat(e.target.value))}
                className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Width"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Height:
              </label>
              <input
                type="number"
                step="1"
                value={box.height}
                onChange={(e) => handleBoxChange('height', parseFloat(e.target.value))}
                className=" focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Height"
              />
            </div>
          </div>
    </form>
  </div>
</div>

        <div className="mt-6 mb-32">
          <revideo-player 
            src="/revideo-project.js" 
            variables={JSON.stringify({voiceovers: voiceovers, zooms: [zoom], boxes: [box]})}          
          />
        </div>
      </div>
    </>
  );
}