import { MutationTree } from 'vuex';
import { RootState } from './states';
import { TranscriptMap } from '@/types';

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
  },
};
