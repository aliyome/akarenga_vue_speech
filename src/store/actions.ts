import { ActionTree } from 'vuex';
import { RootState } from './states';
import axios from 'axios';
import { TranscriptMap } from '@/types';

export const actions: ActionTree<RootState, RootState> = {
  fetchMasterData: async ({ commit }) => {
    commit('setLoading', { isLoading: true });

    const res = await axios.get('/duo3.json');
    if (res.status != 200) {
      commit('setError', {
        errorMessage: 'マスターデータの取得に失敗しました',
      });
      return false;
    }

    const transcripts: TranscriptMap = {};
    for (const e of res.data) {
      transcripts[e.no] = e;
    }
    if (Object.keys(transcripts).length == 0) {
      commit('setError', {
        errorMessage: 'マスターデータが0件です',
      });
      return false;
    }

    commit('setTranscriptMaster', { transcripts });
    commit('setLoading', { isLoading: false });
    return true;
  },
};
