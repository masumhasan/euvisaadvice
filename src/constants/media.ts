/**
 * Temporary sample video used by every video player until real HLS assets are wired in.
 * Replace this single constant (or swap it for per-lesson sources) to change all players at once.
 */
export const SAMPLE_VIDEO_SRC = "/assets/sample-video.mp4";

/** Playback speeds offered by the player menus. */
export const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;

/** Seconds skipped by the rewind / forward buttons. */
export const SEEK_STEP_SECONDS = 10;
