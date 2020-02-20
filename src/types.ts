export interface Transcript {
  no: number;
  ja: string;
  en: string;
}

export type TranscriptMap = { [no: number]: Transcript };
