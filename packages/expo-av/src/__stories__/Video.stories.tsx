import { Asset } from 'expo-asset';
import { Container } from 'expo-stories/shared/components';
import * as React from 'react';

import {
  LoopingControls,
  PlaybackRateControls,
  PlayButton,
  PlayPauseStopControls,
  SkipControls,
  VolumeControls,
} from './components/PlayerControls';
import { VideoPlayer } from './components/VideoPlayer';

const remoteUrl = `http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4`;
const localVideo = require('./assets/ace.mp4');

export function VideoSource() {
  return (
    <>
      <Container labelTop="Remote Video Source">
        <VideoPlayer
          source={{ uri: remoteUrl }}
          renderControls={props => <PlayButton {...props} />}
        />
      </Container>
      <Container labelTop="Local Video Source">
        <VideoPlayer source={localVideo} renderControls={props => <PlayButton {...props} />} />
      </Container>
    </>
  );
}

VideoSource.storyConfig = {
  name: 'Remote and Local Sources',
};

export function VideoPlayback() {
  const [source, setSource] = React.useState<Asset | null>(null);

  React.useEffect(() => {
    Asset.loadAsync(remoteUrl).then(asset => {
      const [video] = asset;
      setSource(video);
    });
  }, []);

  return (
    <>
      <Container labelTop="Play Pause and Stop Video">
        <VideoPlayer
          source={source}
          renderControls={props => <PlayPauseStopControls {...props} P />}
        />
      </Container>

      <Container labelTop="Skip Forwards and Backwards">
        <VideoPlayer source={source} renderControls={props => <SkipControls {...props} />} />
      </Container>

      <Container labelTop="Set Playback Rates">
        <VideoPlayer
          source={source}
          renderControls={props => <PlaybackRateControls {...props} />}
        />
      </Container>

      <Container labelTop="Set Volume">
        <VideoPlayer source={source} renderControls={props => <VolumeControls {...props} />} />
      </Container>

      <Container labelTop="Set Looping">
        <VideoPlayer source={source} renderControls={props => <LoopingControls {...props} />} />
      </Container>
    </>
  );
}

VideoPlayback.storyConfig = {
  name: 'Video Playback Options',
};

export default {
  title: 'Video',
};
