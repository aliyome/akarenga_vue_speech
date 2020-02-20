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
      <span style="color: red;">※ここに間違った部分を表示する</span>
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
    ]),
  },

  methods: {
    ...mapMutations(['goto']),
    ...mapActions(['fetchMasterData']),

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
  },

  watch: {
    no(nextNo: string) {
      this.goto({ no: Number(nextNo) });
    },
  },
});
</script>
