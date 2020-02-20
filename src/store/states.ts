import { Transcript } from '@/types';

export interface RootState {
  transcripts: { [no: number]: Transcript };
  currentNo: number;
  inputText: string;
}

const dummyTranscript: Transcript = {
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
};
