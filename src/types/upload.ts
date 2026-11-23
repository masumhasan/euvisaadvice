export type UploadVideoStatus = "transcoding" | "ready" | "published";

export type UploadFilter = "all" | UploadVideoStatus;

interface UploadVideoBase {
  id: string;
  title: string;
  /** Statute chip (highlighted) followed by neutral topic tags. */
  statute: string;
  tags: string[];
  image: string;
  actions: string[];
}

export interface TranscodingVideo extends UploadVideoBase {
  status: "transcoding";
  meta: string;
  progress: number;
  stageLabel: string;
  chunkLabel: string;
  eta: string;
  target: string;
}

export interface ProcessedVideo extends UploadVideoBase {
  status: "ready" | "published";
  duration: string;
  badge: string;
  statusLabel: string;
  meta: string;
  /** Where the video is mapped in the curriculum, when it already is. */
  mappedTo?: string;
  /** Footer note: CDN id for live videos, a warning for unassigned ones. */
  footer: string;
  footerWarning?: boolean;
  primaryAction?: string;
  /** Shows the trailing "more options" icon button. */
  hasMenu?: boolean;
}

export type UploadVideo = TranscodingVideo | ProcessedVideo;

export interface UploadCluster {
  id: string;
  title: string;
  track: string;
  /** Tailwind background class for the cluster dot. */
  dotClass: string;
  videos: UploadVideo[];
}

export interface UploadStat {
  label: string;
  value: string;
  detail?: string;
}
