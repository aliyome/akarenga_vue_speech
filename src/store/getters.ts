import { GetterTree } from 'vuex';
import { RootState, dummyTranscript } from './states';

export const getters: GetterTree<RootState, RootState> = {
  currentNo: state => state.currentNo ?? 0,
  currentTranscript: state =>
    state.transcripts[state.currentNo] ?? dummyTranscript,
  numOfTranscripts: state => Object.keys(state.transcripts).length,
  inputText: state => state.inputText,
  isLoading: state => state.isLoading,
  isUsingMicrophone: state => state.isUsingMicrophone,
  textUnderRecognition: state => state.textUnderRecognition,
};
