"use client";

import { useCallback, useEffect, useRef, useState, type RefObject, type SyntheticEvent } from "react";
export interface VideoController {
  /** Spread onto the <video> element. */
  videoProps: {
    onPlay: () => void;
    onPause: () => void;
    onEnded: () => void;
    onTimeUpdate: (event: SyntheticEvent<HTMLVideoElement>) => void;
    onProgress: (event: SyntheticEvent<HTMLVideoElement>) => void;
    onLoadedMetadata: (event: SyntheticEvent<HTMLVideoElement>) => void;
    onDurationChange: (event: SyntheticEvent<HTMLVideoElement>) => void;
    onVolumeChange: (event: SyntheticEvent<HTMLVideoElement>) => void;
    onRateChange: (event: SyntheticEvent<HTMLVideoElement>) => void;
  };
  playing: boolean;
  currentTime: number;
  duration: number;
  bufferedEnd: number;
  volume: number;
  muted: boolean;
  rate: number;
  toggle: () => void;
  seekBy: (seconds: number) => void;
  /** Seek to a 0..1 fraction of the duration. */
  seekToFraction: (fraction: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setRate: (rate: number) => void;
}

function bufferedEndOf(video: HTMLVideoElement): number {
  const { buffered } = video;
  return buffered.length > 0 ? buffered.end(buffered.length - 1) : 0;
}

/** Keeps React state in sync with a <video> element and exposes the usual transport actions. */
/** Attach ideoRef to the <video> element and spread ideo.videoProps onto it. */
export function useVideoController(): { videoRef: RefObject<HTMLVideoElement | null>; video: VideoController } {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);
  const [rate, setRateState] = useState(1);

  const syncAll = useCallback((video: HTMLVideoElement) => {
    setCurrentTime(video.currentTime);
    setDuration(Number.isFinite(video.duration) ? video.duration : 0);
    setBufferedEnd(bufferedEndOf(video));
    setVolumeState(video.volume);
    setMuted(video.muted);
    setRateState(video.playbackRate);
  }, []);

  // Metadata may already be loaded before hydration attaches the React listeners.
  useEffect(() => {
    const video = videoRef.current;
    if (video && video.readyState >= 1) syncAll(video);
  }, [syncAll]);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      // play() rejects when interrupted (e.g. unmount); that is not an error for the UI.
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, []);

  const seekBy = useCallback((seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    const limit = Number.isFinite(video.duration) ? video.duration : Number.MAX_SAFE_INTEGER;
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), limit);
  }, []);

  const seekToFraction = useCallback((fraction: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = Math.min(Math.max(fraction, 0), 1) * video.duration;
  }, []);

  const setVolume = useCallback((next: number) => {
    const video = videoRef.current;
    if (!video) return;
    const clamped = Math.min(Math.max(next, 0), 1);
    video.volume = clamped;
    video.muted = clamped === 0;
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted || video.volume === 0) {
      video.muted = false;
      if (video.volume === 0) video.volume = 0.6;
    } else {
      video.muted = true;
    }
  }, []);

  const setRate = useCallback((next: number) => {
    const video = videoRef.current;
    if (video) video.playbackRate = next;
  }, []);

  const videoProps: VideoController["videoProps"] = {
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
    onEnded: () => setPlaying(false),
    onTimeUpdate: (event) => setCurrentTime(event.currentTarget.currentTime),
    onProgress: (event) => setBufferedEnd(bufferedEndOf(event.currentTarget)),
    onLoadedMetadata: (event) => syncAll(event.currentTarget),
    onDurationChange: (event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0),
    onVolumeChange: (event) => {
      setVolumeState(event.currentTarget.volume);
      setMuted(event.currentTarget.muted);
    },
    onRateChange: (event) => setRateState(event.currentTarget.playbackRate),
  };

  const video: VideoController = {
    videoProps,
    playing,
    currentTime,
    duration,
    bufferedEnd,
    volume,
    muted,
    rate,
    toggle,
    seekBy,
    seekToFraction,
    setVolume,
    toggleMute,
    setRate,
  };

  return { videoRef, video };
}