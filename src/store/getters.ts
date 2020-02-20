import { GetterTree } from 'vuex';
import { RootState } from './states';

export const getters: GetterTree<RootState, RootState> = {
  currentNo: state => state.currentNo,
  currentTranscript: state => state.transcripts[state.currentNo],
  inputText: state => state.inputText,
};
