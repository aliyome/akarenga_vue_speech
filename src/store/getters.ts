import { GetterTree } from 'vuex';
import { RootState, dummyTranscript } from './states';

export const getters: GetterTree<RootState, RootState> = {
  currentNo: state => state.currentNo ?? 0,
  currentTranscript: state =>
    state.transcripts[state.currentNo] ?? dummyTranscript,
  inputText: state => state.inputText,
};
