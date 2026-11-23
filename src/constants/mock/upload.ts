import { IMAGES } from "@/constants/images";
import type { UploadCluster, UploadFilter, UploadStat } from "@/types/upload";

export const UPLOAD_STATS: UploadStat[] = [
  { label: "Total Master Footage", value: "18.4 Hours", detail: "34 Topics" },
  { label: "CDN Pipeline", value: "AWS S3 Frankfurt", detail: "1080p/720p/480p Adaptive HLS" },
  { label: "Storage & Bandwidth", value: "42.8 GB", detail: "/ 500 GB cap" },
];

export const STORAGE_USAGE_PERCENT = 8.6;

export const TARGET_MODULES = [
  "Module 00 - The Statutory Architecture",
  "Module 01 - Auslandsportal Digital Lodgement",
  "Module 02 - Appointment Securing & VFS Protocols",
  "Module 03 - Ironclad Dossier Assembly (§ 18a/b)",
  "Module 04 - Chancenkarte & Points Calculation",
];

export const UPLOAD_FILTERS: { id: UploadFilter; label: string }[] = [
  { id: "all", label: "All Topic Videos (12)" },
  { id: "transcoding", label: "Processing (2)" },
  { id: "ready", label: "Ready to Map (6)" },
  { id: "published", label: "Published in Lessons (4)" },
];

export const UPLOAD_CLUSTERS: UploadCluster[] = [
  {
    id: "fachkraefte",
    title: "Topic Cluster: § 18a/b Fachkräfte & Shortage Occupations",
    track: "Module 03 Ingestion Track",
    dotClass: "bg-primary",
    videos: [
      {
        id: "topic-01-3",
        status: "transcoding",
        title: "Topic 01.3 - Mangelberufe Salary Thresholds & Annex A Drafting.mp4",
        meta: "14m 20s • 4K Master Source • 1.2 GB • Ingested by Editorial Team 18m ago",
        statute: "§ 18g AufenthG",
        tags: ["Mangelberufe 2024", "ZAB Equivalence"],
        image: IMAGES.uploadProcessing,
        progress: 68,
        stageLabel: "1080p HLS Transcode",
        chunkLabel: "Chunk: 142/210 • Bitrate: 4.2 MB/s",
        eta: "ETA: 1m 40s",
        target: "Target: Mod 03 / Lesson 3.2",
        actions: ["Preview Source", "Edit Metadata", "Cancel"],
      },
      {
        id: "topic-01-1",
        status: "published",
        title: "Topic 01.1 - The Tripartite Institutional Architecture (Auswärtiges Amt vs LEA).mp4",
        duration: "08:14",
        badge: "HLS Ready",
        statusLabel: "Live in Lesson",
        meta: "1080p 60fps • 412 MB • Multi-Bitrate HLS",
        statute: "§ 71 AufenthG",
        tags: ["Jurisdiction", "Consular Discretion"],
        mappedTo: "Mapped to Module 00 • Lesson 0.1",
        footer: "Master CDN: CloudFront/S3 #DE-9821",
        image: IMAGES.uploadTripartite,
        actions: ["Re-transcode", "Edit Chapters", "View in Player"],
        hasMenu: true,
      },
    ],
  },
  {
    id: "auslandsportal",
    title: "Topic Cluster: Auslandsportal Digital Lodgement & VFS Logistics",
    track: "Module 01 Ingestion Track",
    dotClass: "bg-tertiary",
    videos: [
      {
        id: "topic-02-2",
        status: "ready",
        title: "Topic 02.2 - Bypassing VFS TLScontact Appointment Bottlenecks.mp4",
        duration: "16:45",
        badge: "Ready to Map",
        statusLabel: "Unassigned",
        meta: "1080p • 680 MB • Transcoded • 4 Chapters Identified",
        statute: "§ 81a AufenthG",
        tags: ["Fast-Track Procedural Rails", "Anti-Bot Defense"],
        footer: "Pending Lesson Assignment",
        footerWarning: true,
        image: IMAGES.uploadVfs,
        actions: ["Inspect Chapters"],
        primaryAction: "Assign to Lesson",
      },
    ],
  },
  {
    id: "chancenkarte",
    title: "Topic Cluster: Chancenkarte & Points-Based Calculation",
    track: "Module 04 Ingestion Track",
    dotClass: "bg-secondary",
    videos: [
      {
        id: "topic-03-1",
        status: "published",
        title: "Topic 03.1 - ZAB Anabin Accreditation & Statement of Comparability.mp4",
        duration: "22:10",
        badge: "Published",
        statusLabel: "Live in Lesson",
        meta: "1080p 60fps • 890 MB • HLS VOD • Fully Vetted by Advisory Team",
        statute: "§ 20a/b AufenthG",
        tags: ["ZAB KMK Bonn", "6 Points Scorecard"],
        mappedTo: "Mapped to Module 02 • Lesson 2.3",
        footer: "Master CDN: CloudFront/S3 #DE-4019",
        image: IMAGES.uploadZab,
        actions: ["View Analytics", "Edit Metadata", "Replace File"],
      },
    ],
  },
];

export const INSPECTOR = {
  focusTitle: "Topic 01.1 - The Tripartite Architecture",
  focusId: "ID: #VID-902",
  image: IMAGES.uploadInspector,
  currentTime: "02:45",
  totalTime: "08:14",
  audioTrack: "Audio Track: Studio XLR 48kHz",
  speechLevel: "Speech Level: -14 LUFS",
  displayTitle: "Topic 01.1 - The Tripartite Institutional Architecture",
  primaryStatute: "§ 71 Abs. 2 AufenthG",
  accessTiers: ["Full Dossier Client", "Self-Filer Pro", "Institutional B2B"],
  chapters: [
    { time: "00:00", title: "Introduction & Auswärtiges Amt Remit" },
    { time: "02:45", title: "Ausländerbehörde Sovereign Discretion" },
    { time: "05:18", title: "Bundesagentur für Arbeit (BA) Approval Rails" },
    { time: "07:10", title: "VFS / TLScontact Intake Legal Limitations" },
  ],
} as const;

/** Waveform bars: height class + the tone each bar takes once playback has passed it. */
export const WAVEFORM: { h: string; tone: string }[] = [
  { h: "h-2", tone: "bg-primary/40" },
  { h: "h-3", tone: "bg-primary/50" },
  { h: "h-4", tone: "bg-primary" },
  { h: "h-2", tone: "bg-primary/60" },
  { h: "h-3.5", tone: "bg-primary" },
  { h: "h-5", tone: "bg-primary" },
  { h: "h-3", tone: "bg-primary/70" },
  { h: "h-1.5", tone: "bg-primary/40" },
  { h: "h-4", tone: "bg-primary" },
  { h: "h-3", tone: "bg-primary/60" },
  { h: "h-4", tone: "bg-primary" },
  { h: "h-2", tone: "bg-primary/40" },
  { h: "h-3", tone: "bg-primary/50" },
  { h: "h-4", tone: "bg-primary" },
  { h: "h-2", tone: "bg-primary/60" },
  { h: "h-1.5", tone: "bg-primary/40" },
  { h: "h-3", tone: "bg-primary" },
  { h: "h-2", tone: "bg-primary/70" },
  { h: "h-4", tone: "bg-primary" },
  { h: "h-3", tone: "bg-primary/50" },
];
