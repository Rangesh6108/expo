import { Video, VideoProps, AVPlaybackStatus } from 'expo-av';
import { Playback } from 'expo-av/build/AV';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { ProgressScrubber } from './PlayerControls';

type VideoControlsProps = {
  player: Playback;
  status: Extract<AVPlaybackStatus, { isLoaded: true }>;
};

type VideoPlayerProps = VideoProps & {
  renderControls: (args: VideoControlsProps) => React.ReactElement<any>;
};

export function VideoPlayer({ renderControls, ...props }: VideoPlayerProps) {
  const [videoRef, setVideoRef] = React.useState<Video | null>(null);
  const [status, setStatus] = React.useState<AVPlaybackStatus | null>(null);

  const shouldRenderControls = videoRef != null && status != null && status.isLoaded;

  return (
    <>
      <Video
        onPlaybackStatusUpdate={setStatus}
        ref={ref => setVideoRef(ref)}
        style={styles.videoStyles}
        {...props}
      />
      {shouldRenderControls && <ProgressScrubber status={status} player={videoRef} />}
      {shouldRenderControls && renderControls({ player: videoRef, status })}
    </>
  );
}

const styles = StyleSheet.create({
  videoStyles: {
    aspectRatio: 16 / 9,
  },
});
