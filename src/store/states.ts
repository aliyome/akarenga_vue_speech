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
  isShowingEnglish: boolean;
}

export const dummyTranscript: Transcript = {
  no: 0,
  ja: '',
  en: '',
};

export const initialState: RootState = {
  transcripts: {},
  inputText: '',
  currentNo: 0,
  isLoading: false,
  isUsingMicrophone: false,
  textUnderRecognition: '',
  checkedWords: [],
  isShowingEnglish: false,
};
