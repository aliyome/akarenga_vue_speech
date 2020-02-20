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

  startRecognition: ({ commit }) => {
    // shim
    window.SpeechRecognition =
      // eslint-disable-next-line
      (window as any)['webkitSpeechRecognition'] || SpeechRecognition;

    // setting
    const recognition = new window.SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    // callback
    recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          commit('setInputText', { text: transcript });
        } else {
          commit('setTextUnderRecognition', { text: transcript });
        }
      }
    };

    recognition.onend = () => {
      commit('setIsUsingMicrophone', { isUsingMicrophone: false });
    };

    // start
    recognition.start();
    commit('setIsUsingMicrophone', { isUsing: true, recognition });
  },

  stopRecognition: ({ commit, state }) => {
    if (state.recognition) {
      state.recognition.stop();
    }
    commit('setIsUsingMicrophone', { isUsing: false, recognition: undefined });
  },
};
