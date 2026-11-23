"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { TEXT_LESSON } from "@/constants/mock/textLesson";

type Audio = (typeof TEXT_LESSON)["audio"];

/** Pre-computed base speech waveform profile (48 points) */
const BASE_WAVEFORM = [
  0.25, 0.45, 0.65, 0.40, 0.80, 0.55, 0.90, 0.70, 0.45, 0.75, 0.35, 0.60,
  0.80, 0.50, 0.95, 0.30, 0.60, 0.75, 0.40, 0.85, 0.60, 0.30, 0.70, 0.50,
  0.90, 0.40, 0.75, 0.30, 0.65, 0.85, 0.50, 0.70, 0.35, 0.80, 0.60, 0.45,
  0.75, 0.55, 0.90, 0.40, 0.65, 0.80, 0.35, 0.50, 0.70, 0.40, 0.30, 0.20,
];

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function AudioPlayerCard({ audio }: { audio: Audio }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrubberRef = useRef<HTMLDivElement | null>(null);
  const waveformRef = useRef<HTMLDivElement | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(audio.speeds[0] ?? "1.0x");
  const [currentTime, setCurrentTime] = useState(0);
  // Default to known duration (82.4s for m0l1.mp3) so seek works instantly from 0s
  const [duration, setDuration] = useState(82.4);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverInfo, setHoverInfo] = useState<{ time: number; x: number; visible: boolean }>({
    time: 0,
    x: 0,
    visible: false,
  });

  // Dynamic visualizer bars state (normalized 0.1 to 1.0)
  const [barsHeight, setBarsHeight] = useState<number[]>(BASE_WAVEFORM);

  const audioSrc = audio.src ?? "/assets/m0l1.mp3";
  const fallbackSrc = audio.fallbackSrc ?? "/assets/m0l1.mp3.mpeg";

  const totalDuration = duration > 0 ? duration : 82.4;
  const progressRatio = Math.max(0, Math.min(1, currentTime / totalDuration));
  const progressPercent = progressRatio * 100;
  const currentBarIndex = Math.min(
    BASE_WAVEFORM.length - 1,
    Math.floor(progressRatio * BASE_WAVEFORM.length),
  );

  // Initialize Web Audio API on first user interaction
  const ensureAudioContext = () => {
    if (!audioRef.current || audioCtxRef.current) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.75;
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
    } catch {
      // Fallback procedural animation handles visualizer smoothly
    }
  };

  // Play / Pause toggle
  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    ensureAudioContext();
    if (audioCtxRef.current?.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (playing) {
      el.pause();
    } else {
      try {
        await el.play();
      } catch (err) {
        console.warn("Audio playback interrupted:", err);
      }
    }
  };

  // Immediate seek to absolute seconds
  const seekTo = (targetSeconds: number) => {
    const el = audioRef.current;
    const clamped = Math.max(0, Math.min(totalDuration, targetSeconds));
    setCurrentTime(clamped);
    if (el) {
      el.currentTime = clamped;
    }
  };

  // Seek relative jump (+/- seconds)
  const skipSeconds = (delta: number) => {
    seekTo(currentTime + delta);
  };

  // Speed selection
  const handleSpeedChange = (newSpeed: string) => {
    setSpeed(newSpeed);
    if (audioRef.current) {
      const rate = parseFloat(newSpeed.replace("x", ""));
      if (!isNaN(rate)) {
        audioRef.current.playbackRate = rate;
      }
    }
  };

  // Volume & Mute
  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    const nextMuted = !isMuted;
    el.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (newVol: number) => {
    const el = audioRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(1, newVol));
    el.volume = clamped;
    setVolume(clamped);
    if (clamped === 0) {
      el.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      el.muted = false;
      setIsMuted(false);
    }
  };

  // Calculate seek from element coordinates
  const handleSeekFromEvent = (clientX: number, targetElement: HTMLElement | null) => {
    if (!targetElement) return;
    const rect = targetElement.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    seekTo(ratio * totalDuration);
  };

  // Hover detection for timestamp preview
  const handleMouseMoveOverTrack = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const previewTime = ratio * totalDuration;
    const relativeX = e.clientX - rect.left;
    setHoverInfo({
      time: previewTime,
      x: relativeX,
      visible: true,
    });
  };

  const handleMouseLeaveTrack = () => {
    setHoverInfo((prev) => ({ ...prev, visible: false }));
  };

  // Global mousemove for dragging scrubber
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      handleSeekFromEvent(e.clientX, scrubberRef.current);
    };

    const onMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, totalDuration]);

  // Real-time Visualizer Animation Loop
  useEffect(() => {
    let animId: number;
    let tick = 0;

    const updateVisualizer = () => {
      tick += 0.08;

      if (playing) {
        if (analyserRef.current) {
          // Real Web Audio frequency data
          const freqData = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(freqData);

          const newBars = BASE_WAVEFORM.map((base, idx) => {
            const freqIdx = Math.floor((idx / BASE_WAVEFORM.length) * (freqData.length / 2));
            const freqVal = (freqData[freqIdx] ?? 0) / 255;
            // Blend base wave shape with real-time audio amplitude
            return Math.max(0.15, Math.min(1.0, base * 0.3 + freqVal * 0.9));
          });
          setBarsHeight(newBars);
        } else {
          // Lively speech equalizer synthesizer
          const newBars = BASE_WAVEFORM.map((base, idx) => {
            const voiceMod = Math.sin(tick * 3 + idx * 0.4) * 0.25 + Math.cos(tick * 5 + idx * 0.7) * 0.15;
            return Math.max(0.15, Math.min(1.0, base * (0.6 + voiceMod)));
          });
          setBarsHeight(newBars);
        }
      } else {
        // Return gracefully to base waveform when paused
        setBarsHeight(BASE_WAVEFORM);
      }

      animId = requestAnimationFrame(updateVisualizer);
    };

    animId = requestAnimationFrame(updateVisualizer);
    return () => cancelAnimationFrame(animId);
  }, [playing]);

  const volumeIcon =
    isMuted || volume === 0
      ? "volume_off"
      : volume < 0.5
        ? "volume_down"
        : "volume_up";

  const displayElapsed = formatTime(currentTime);
  const displayTotal = formatTime(totalDuration);
  const remainingTime = Math.max(0, totalDuration - currentTime);
  const displayRemaining = formatTime(remainingTime);

  return (
    <div
      ref={containerRef}
      className="p-space-lg rounded-2xl bg-surface-level-2 border border-gold-hairline/40 shadow-2xl flex flex-col gap-space-md relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Real HTML5 Audio Element */}
      <audio
        ref={audioRef}
        onCanPlay={() => {
          if (audioRef.current && isFinite(audioRef.current.duration) && audioRef.current.duration > 0) {
            setDuration(audioRef.current.duration);
          }
        }}
        onDurationChange={() => {
          if (audioRef.current && isFinite(audioRef.current.duration) && audioRef.current.duration > 0) {
            setDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => {
          setPlaying(false);
          setCurrentTime(0);
          if (audioRef.current) audioRef.current.currentTime = 0;
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && isFinite(audioRef.current.duration) && audioRef.current.duration > 0) {
            setDuration(audioRef.current.duration);
          }
        }}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onTimeUpdate={() => {
          if (audioRef.current && !isDragging) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        preload="metadata"
      >
        <source src={audioSrc} type="audio/mpeg" />
        <source src={fallbackSrc} type="audio/mpeg" />
      </audio>

      {/* Top Controls Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md relative z-10">
        {/* Left: Playback & Titles */}
        <div className="flex items-center gap-space-sm sm:gap-space-md min-w-0">
          {/* Main Play / Pause Button */}
          <button
            aria-label={playing ? "Pause audio lecture" : "Play audio lecture"}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-gold-hover transition-all transform hover:scale-105 active:scale-95 shadow-lg flex-shrink-0 cursor-pointer"
            onClick={togglePlay}
            title={playing ? "Pause" : "Play"}
            type="button"
          >
            <Icon className="text-[32px]" filled name={playing ? "pause" : "play_arrow"} />
          </button>

          {/* Quick Skip Buttons */}
          <div className="flex items-center gap-1">
            <button
              aria-label="Skip backward 10 seconds"
              className="p-1.5 sm:p-2 rounded-lg bg-surface-level-1 hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all cursor-pointer"
              onClick={() => skipSeconds(-10)}
              title="Rewind 10s"
              type="button"
            >
              <Icon className="text-[20px]" name="replay_10" />
            </button>
            <button
              aria-label="Skip forward 10 seconds"
              className="p-1.5 sm:p-2 rounded-lg bg-surface-level-1 hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-all cursor-pointer"
              onClick={() => skipSeconds(10)}
              title="Forward 10s"
              type="button"
            >
              <Icon className="text-[20px]" name="forward_10" />
            </button>
          </div>

          {/* Title and Time Indicator */}
          <div className="min-w-0 pl-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-title-card text-title-card text-text-primary font-bold truncate">
                {audio.title}
              </span>

              {/* Bold Live Status & Time Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-mono text-xs font-bold shadow-sm">
                <span className={cn("w-1.5 h-1.5 rounded-full bg-primary", playing && "animate-ping")} />
                <span>{displayElapsed}</span>
                <span className="text-primary/60">/</span>
                <span>{displayTotal}</span>
              </div>
            </div>
            <p className="font-body-muted text-body-muted text-text-secondary text-xs sm:text-sm truncate mt-0.5">
              {audio.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Inline Speed & Volume Controls (No clipping, completely inline!) */}
        <div className="flex items-center gap-2 self-start lg:self-auto flex-wrap">
          {/* Speed Selector */}
          <div className="inline-flex rounded-lg bg-surface-level-1 p-1 border border-border-neutral shadow-inner">
            {audio.speeds.map((option) => (
              <button
                key={option}
                className={cn(
                  "px-2.5 py-1 font-mono text-xs rounded transition-all cursor-pointer",
                  option === speed
                    ? "bg-primary text-on-primary font-bold shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface-level-2/50",
                )}
                onClick={() => handleSpeedChange(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>

          {/* Inline Volume Control (No popups that get clipped!) */}
          <div className="flex items-center gap-2 bg-surface-level-1 px-3 py-1.5 rounded-lg border border-border-neutral shadow-inner">
            <button
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="text-text-secondary hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
              onClick={toggleMute}
              title={isMuted ? "Unmute" : "Mute"}
              type="button"
            >
              <Icon className="text-[20px]" name={volumeIcon} />
            </button>
            <input
              aria-label="Volume slider"
              className="w-16 sm:w-20 h-1.5 accent-primary bg-surface-level-2 rounded-lg cursor-pointer"
              max="1"
              min="0"
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              step="0.05"
              type="range"
              value={isMuted ? 0 : volume}
            />
            <span className="font-mono text-[11px] text-text-primary font-medium w-8 text-right">
              {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer & Scrubber Area */}
      <div className="space-y-2 pt-2 relative z-10">
        {/* Hover Time Tooltip */}
        {hoverInfo.visible && (
          <div
            className="absolute -top-7 -translate-x-1/2 bg-surface-elevated border border-primary/40 px-2 py-0.5 rounded shadow-lg text-[11px] font-mono font-bold text-primary pointer-events-none z-30 flex items-center gap-1"
            style={{ left: `${hoverInfo.x}px` }}
          >
            <span>{formatTime(hoverInfo.time)}</span>
            <span className="text-[9px] text-text-muted uppercase">Seek</span>
          </div>
        )}

        {/* Live Audio Visualizer Bars (Click to Seek) */}
        <div
          ref={waveformRef}
          aria-label="Audio waveform visualizer. Click to jump to time."
          className="h-12 w-full flex items-end gap-1 px-1 py-1 bg-surface-level-1/60 rounded-xl border border-border-neutral/60 cursor-pointer group/wave relative overflow-hidden select-none"
          onClick={(e) => handleSeekFromEvent(e.clientX, waveformRef.current)}
          onMouseLeave={handleMouseLeaveTrack}
          onMouseMove={handleMouseMoveOverTrack}
          role="slider"
          tabIndex={0}
        >
          {barsHeight.map((val, idx) => {
            const isPlayed = idx <= currentBarIndex;
            const isCurrent = idx === currentBarIndex;
            return (
              <div
                key={idx}
                className="h-full flex items-end flex-1"
              >
                <div
                  className={cn(
                    "w-full rounded-t transition-all duration-75",
                    isPlayed
                      ? "bg-primary shadow-[0_0_8px_rgba(212,175,55,0.35)]"
                      : "bg-surface-container hover:bg-primary/50",
                    isCurrent && playing && "brightness-125 scale-y-110",
                  )}
                  style={{
                    height: `${Math.max(12, Math.round(val * 100))}%`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* High-Accuracy Scrubber Track with Thumb (Click & Drag Seek) */}
        <div
          ref={scrubberRef}
          aria-label="Audio timeline scrubber"
          aria-valuemax={Math.round(totalDuration)}
          aria-valuemin={0}
          aria-valuenow={Math.round(currentTime)}
          className="relative w-full h-3 flex items-center cursor-pointer group/scrub py-2 -my-1 select-none"
          onClick={(e) => handleSeekFromEvent(e.clientX, scrubberRef.current)}
          onMouseDown={(e) => {
            setIsDragging(true);
            handleSeekFromEvent(e.clientX, scrubberRef.current);
          }}
          onMouseLeave={handleMouseLeaveTrack}
          onMouseMove={handleMouseMoveOverTrack}
          role="slider"
          tabIndex={0}
        >
          {/* Base track */}
          <div className="w-full h-2 bg-surface-level-1 rounded-full overflow-hidden border border-border-neutral/40">
            {/* Progress filled bar */}
            <div
              className="h-full bg-primary rounded-full transition-[width] duration-75 shadow-[0_0_10px_rgba(212,175,55,0.4)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Interactive Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary text-on-primary rounded-full shadow-lg border-2 border-surface-base transform scale-90 group-hover/scrub:scale-125 transition-transform pointer-events-none"
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        {/* High-Contrast Bottom Time & Chapter Bar */}
        <div className="flex items-center justify-between pt-1 font-mono text-xs border-t border-border-neutral/40 select-none">
          {/* Elapsed Time Display */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-text-primary bg-surface-level-1 border border-border-neutral px-2 py-0.5 rounded text-xs">
              {displayElapsed}
            </span>
            <span className="text-text-muted text-[11px] hidden sm:inline">Elapsed</span>
          </div>

          {/* Chapter Name */}
          <div className="text-center truncate px-2 text-text-secondary text-xs">
            <span className="text-text-muted hidden md:inline">Chapter: </span>
            <span className="font-semibold text-text-primary">&ldquo;{audio.chapter}&rdquo;</span>
          </div>

          {/* Total Duration and Remaining */}
          <div className="flex items-center gap-1.5">
            <span className="text-text-muted text-[11px] hidden sm:inline">-{displayRemaining}</span>
            <span className="font-bold text-text-primary bg-surface-level-1 border border-border-neutral px-2 py-0.5 rounded text-xs">
              {displayTotal}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
