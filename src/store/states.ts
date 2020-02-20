import { Transcript, TranscriptMap, Word } from '@/types';

export interface RootState {
  transcripts: TranscriptMap;
  currentNo: number;
  inputText: string;
  errorMessage?: string;
  isLoading: boolean;
  isUsingMicrophone: boolean;
  recognition?: SpeechRecognition;
  textUnderRecognition: string;
  checkedWords: Word[];
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
  isUsingMicrophone: false,
  textUnderRecognition: '',
  checkedWords: [],
};
