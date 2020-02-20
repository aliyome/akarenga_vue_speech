<template>
  <div class="home">
    <div>No. {{ currentTranscript.no }}</div>
    <div>日本語 {{ currentTranscript.ja }}</div>
    <div>英語 {{ currentTranscript.en }}</div>
    <textarea />
    <div>
      <span>{{ inputText }}</span>
    </div>
    <div>
      <span style="color: red;">※ここに間違った部分を表示する</span>
    </div>
    <button @click="goNext">次へ</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export interface HomeViewModel {
  currentTranscript: Transcript;
  inputText: string;
}

export interface Transcript {
  no: number;
  ja: string;
  en: string;
}

export default Vue.extend({
  name: 'Home',
  data(): HomeViewModel {
    return {
      currentTranscript: {
        no: 0,
        ja: '日本語の文章',
        en: 'Japanese sentences',
      },
      inputText: 'Japanese sentence',
    };
  },
  components: {},

  methods: {
    goNext() {
      console.log('次へ');
    },
  },
});
</script>
