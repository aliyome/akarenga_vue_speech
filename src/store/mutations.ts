import { MutationTree } from 'vuex';
import { RootState } from './states';
import { TranscriptMap, Word } from '@/types';

const clearDisplay = (state: RootState) => {
  state.errorMessage = '';
  state.inputText = '';
  state.checkedWords = [];
  state.textUnderRecognition = '';
};

export const mutations: MutationTree<RootState> = {
  setTranscriptMaster: (
    state,
    { transcripts }: { transcripts: TranscriptMap },
  ) => {
    state.transcripts = transcripts;
  },
  setError: (state, { errorMessage }: { errorMessage: string }) => {
    state.errorMessage = errorMessage;
  },
  setCurrentNo: (state, { no }: { no: number }) => {
    state.currentNo = no;
  },
  setLoading: (state, { isLoading }: { isLoading: boolean }) => {
    state.isLoading = isLoading;
  },
  goto: (state, { no }: { no: number }) => {
    state.currentNo = no;
    clearDisplay(state);
  },
  setIsUsingMicrophone: (
    state,
    {
      isUsing,
      recognition,
    }: { isUsing: boolean; recognition: SpeechRecognition },
  ) => {
    state.isUsingMicrophone = isUsing;
    state.recognition = recognition;
  },
  setTextUnderRecognition: (state, { text }: { text: string }) => {
    state.textUnderRecognition = text;
  },
  setInputText: (state, { text }: { text: string }) => {
    state.inputText = text;
  },
  setCheckedWords: (state, { words }: { words: Word[] }) => {
    state.checkedWords = words;
  },
  setIsShowingEnglish: (state, { checked }: { checked: boolean }) => {
    state.isShowingEnglish = checked;
  },
  setIsUsingJapaneseRecognition: (state, { use }: { use: boolean }) => {
    state.isUsingJapaneseRecognition = use;
  },
};
