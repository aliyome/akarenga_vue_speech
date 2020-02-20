import { Transcript, TranscriptMap } from '@/types';

export interface RootState {
  transcripts: TranscriptMap;
  currentNo: number;
  inputText: string;
  errorMessage?: string;
  isLoading: boolean;
}

export const dummyTranscript: Transcript = {
  no: 0,
  ja: '日本語の文章',
  en: 'Japanese sentences',
};

export const initialState: RootState = {
  transcripts: {
    '0': dummyTranscript,
  },
  inputText: 'Japanese sentence',
  currentNo: 0,
  isLoading: false,
};
