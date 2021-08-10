import { Container } from 'expo-stories/shared/components';
import * as React from 'react';

import { AudioPlayer } from './components/AudioPlayer';
import {
  LoopingControls,
  PlaybackRateControls,
  PlayButton,
  PlayPauseStopControls,
  SkipControls,
  VolumeControls,
} from './components/PlayerControls';

const remoteUrl = `https://p.scdn.co/mp3-preview/f7a8ab9c5768009b65a30e9162555e8f21046f46?cid=162b7dc01f3a4a2ca32ed3cec83d1e02`;
const localAudio = require('./assets/polonez.mp3');

export function AudioSources() {
  return (
    <>
      <Container labelTop="Remote Audio Source">
        <AudioPlayer
          source={{ uri: remoteUrl }}
          renderControls={props => <PlayButton {...props} />}
        />
      </Container>
      <Container labelTop="Local Audio Source">
        <AudioPlayer source={localAudio} renderControls={props => <PlayButton {...props} />} />
      </Container>
    </>
  );
}

AudioSources.storyConfig = {
  name: 'Remote and Local Audio Sources',
};

export function AudioPlayback() {
  return (
    <>
      <Container labelTop="Play Pause and Stop Audio">
        <AudioPlayer
          source={{ uri: remoteUrl }}
          renderControls={props => <PlayPauseStopControls {...props} />}
        />
      </Container>

      <Container labelTop="Skip Forwards and Backwards">
        <AudioPlayer
          source={{ uri: remoteUrl }}
          renderControls={props => <SkipControls {...props} />}
        />
      </Container>

      <Container labelTop="Set Playback Rates">
        <AudioPlayer
          source={{ uri: remoteUrl }}
          renderControls={props => <PlaybackRateControls {...props} />}
        />
      </Container>

      <Container labelTop="Set Volume">
        <AudioPlayer
          source={{ uri: remoteUrl }}
          renderControls={props => <VolumeControls {...props} />}
        />
      </Container>

      <Container labelTop="Set Looping">
        <AudioPlayer
          source={{ uri: remoteUrl }}
          renderControls={props => <LoopingControls {...props} />}
        />
      </Container>
    </>
  );
}

AudioPlayback.storyConfig = {
  name: 'Audio Playback Options',
};

export default {
  title: 'Audio',
};
