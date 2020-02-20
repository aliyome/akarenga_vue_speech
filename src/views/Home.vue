<template>
  <div class="home">
    <v-progress-linear indeterminate v-if="isLoading"></v-progress-linear>

    <div>No. {{ currentTranscript.no }}</div>
    <div>日本語 {{ currentTranscript.ja }}</div>
    <div>英語 {{ currentTranscript.en }}</div>
    <textarea />
    <div>
      <span>{{ inputText }}</span>
    </div>
    <div>
      <small>{{ textUnderRecognition }}</small>
    </div>
    <div>
      <span v-for="(word, index) in checkedWords" :key="index">
        <span v-if="word.correct" style="color: darkgray;">{{
          word.text
        }}</span>
        <span v-if="!word.correct" style="color: red;">{{ word.text }}</span>
        <span>{{ '\xa0' }}</span>
      </span>
    </div>
    <div>
      <v-btn text v-if="!isUsingMicrophone" @click="startRecognition">🎤</v-btn>
      <v-btn text v-if="isUsingMicrophone" @click="stopRecognition">❌</v-btn>
    </div>
    <div>
      <v-btn text color="primary" @click="gotoBack">前へ</v-btn>
      <v-spacer />
      <v-btn text color="primary" @click="gotoRandom">ランダム</v-btn>
      <v-spacer />
      <v-btn text color="primary" @click="gotoNext">次へ</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'Home',
  data() {
    return {};
  },
  props: {
    no: String, // from url parameter
  },
  computed: {
    ...mapGetters([
      'currentNo',
      'currentTranscript',
      'inputText',
      'isLoading',
      'numOfTranscripts',
      'isUsingMicrophone',
      'textUnderRecognition',
      'checkedWords',
    ]),
  },

  methods: {
    ...mapMutations(['goto']),
    ...mapActions(['fetchMasterData', 'startRecognition', 'stopRecognition']),

    gotoNext() {
      this.navigateTo(this.currentNo + 1);
    },
    gotoBack() {
      this.navigateTo(this.currentNo - 1);
    },
    gotoRandom() {
      const rand = Math.round(Math.random() * this.numOfTranscripts);
      this.navigateTo(rand);
    },

    navigateTo(no: number) {
      this.$router.push(no.toString());
    },
  },

  // life cycle hooks
  mounted() {
    this.fetchMasterData();
    this.goto({ no: Number(this.no) });
  },

  watch: {
    no(nextNo: string) {
      this.goto({ no: Number(nextNo) });
    },
  },
});
</script>
