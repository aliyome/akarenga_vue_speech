import { ActionTree } from 'vuex';
import { RootState } from './states';
import axios from 'axios';
import { TranscriptMap, Word } from '@/types';

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

  startRecognition: ({ commit, getters, dispatch }) => {
    // setting
    const lang = getters['isUsingJapaneseRecognition'] ? 'ja-JP' : 'en-US';
    const recognition = new window.SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = true;

    // callback
    recognition.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          commit('setInputText', { text: transcript });
          dispatch('checkAnswer', { inputText: transcript });
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

  checkAnswer: ({ commit, getters }, { inputText }: { inputText: string }) => {
    // 小文字化と記号・空白の削除
    const normalize = (inputText: string) => {
      if (inputText === null) {
        return '';
      } else {
        return inputText
          .replace(/["?!.,']/g, '')
          .toLowerCase()
          .trim();
      }
    };

    // 入力文字列と正解の文字列を単語単位で比較
    const check = (inputs: string[], refs: string[]): Word[] => {
      const checkedWords: Word[] = [];
      for (let i = 0; i < refs.length; i++) {
        if (inputs.length < i || inputs[i] != refs[i]) {
          checkedWords.push({ correct: false, text: refs[i] });
        } else {
          checkedWords.push({ correct: true, text: refs[i] });
        }
      }
      return checkedWords;
    };

    // 入力文章を正規化
    const normalizedInput = normalize(inputText);
    // 正解文章を正規化
    const normalizedReference = normalize(getters['currentTranscript'].en);
    // 文章を単語列に変換
    const wordsInput = normalizedInput.split(' ');
    const wordsReference = normalizedReference.split(' ');

    // 答え合わせ後の単語列をコミット
    const checkedWords = check(wordsInput, wordsReference);
    if (checkedWords.length != 0) {
      commit('setCheckedWords', { words: checkedWords });
    }
  },
};
