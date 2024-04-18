import {Audio, Video, Img, makeScene2D, View2D, Rect, Node, Shape, Circle} from '@revideo/2d';
import {all, createRef, waitFor, useScene, createSignal, Vector2, chain, Reference } from '@revideo/core';

interface Voiceover {
  audioFile: string;
  speed: number;
  pauseAfterInSeconds: number;
}

interface Zoom {
  startTime: number;
  xRatio: number;
  yRatio: number;
  zoomDuration: number;
  stayDuration: number;
  zoomDepth: number;
}

interface Box {
  startTime: number;
  duration: number;
  xRatio: number;
  yRatio: number;
  width: number;
  height: number;
}


export default makeScene2D(function* (view) {
  const videoFile = useScene().variables.get('videoFile', "https://revideo-example-assets.s3.amazonaws.com/YCDir.mp4")();
  let voiceovers : Voiceover[] = useScene().variables.get('voiceovers', [])();
  let zooms: Zoom[] = useScene().variables.get('zooms', [])();
  let boxes: Box[] = useScene().variables.get('boxes', [])();

  const videoRef = createRef<Video>();

  yield view.add(
      <Rect fill={"red"} size={"100%"}>
      <Video
        src={videoFile}
        play={true}
        width={"90%"}
        radius={30}
        ref={videoRef}
      />
      </Rect>
  );

  yield* all(
    playZooms(zooms, videoRef),
    playAudios(voiceovers, view),
    showBoxes(boxes, videoRef),
    waitFor(videoRef().getDuration())
  );

});

function* playAudios(voiceovers: Voiceover[], view: View2D){
  for(const voiceover of voiceovers){
    const audioRef = createRef<Audio>();
    yield view.add(<Audio play={true} src={voiceover.audioFile} playbackRate={voiceover.speed} ref={audioRef} />);
    yield* waitFor(audioRef().getDuration());
    yield* waitFor(voiceover.pauseAfterInSeconds);
  }

}

function* playZooms(zooms: Zoom[], videoRef: Reference<Video>){
  const zoomGenerators = zooms.map(zoomDetail => function* () {
    yield* zoom(
      videoRef,
      zoomDetail.startTime,
      videoRef().width() * zoomDetail.xRatio,
      videoRef().height() * zoomDetail.yRatio,
      zoomDetail.zoomDuration,
      zoomDetail.stayDuration,
      zoomDetail.zoomDepth
    );
  });

  const zoomThreads = zoomGenerators.map(zoomGenerator => zoomGenerator());

  yield* all(...zoomThreads);
}

function* showBoxes(boxes: Box[], videoRef: Reference<Video>){
  const boxGenerators = boxes.map(boxDetail => function* (){
    yield* box(
      videoRef,
      boxDetail.startTime,
      boxDetail.duration,
      videoRef().width() * boxDetail.xRatio,
      videoRef().height() * boxDetail.yRatio,
      boxDetail.width,
      boxDetail.height
    );
  })

  const boxThreads = boxGenerators.map(boxGenerator => boxGenerator());

  yield* all(...boxThreads);
}

function* box(videoRef: Reference<Video>, startTime: number, duration: number, x: number, y: number, width: number, height: number){
  const boxRef = createRef<Rect>();
  yield* waitFor(startTime);
  yield videoRef().add(<Rect fill={"#00000000"} stroke={"#ff0000"} lineWidth={5} position={[x,y]} width={width} height={height} ref={boxRef} />);
  yield* waitFor(duration);
  boxRef().remove();
}

function* zoom(videoRef: Reference<Video>, startTime: number, x: number, y: number, zoomDuration: number, stayDuration: number, depth: number){
  const gridSize = createSignal(1);
  const currentZoom = gridSize();
  const target = new Vector2(x, y);
  const currentPosition = videoRef().position();

  videoRef().position(() => 
    currentPosition
      .sub(target)
      .scale(gridSize() / currentZoom)
      .add(target)
  );

  yield* waitFor(startTime);
  yield* all(
    chain(gridSize(depth, zoomDuration), waitFor(stayDuration), gridSize(1, 1)),
    chain(videoRef().scale(depth, zoomDuration), waitFor(stayDuration), videoRef().scale(1, zoomDuration))
  );
}
