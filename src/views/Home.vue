<template>
  <div class="home">
    <v-progress-linear indeterminate v-if="isLoading"></v-progress-linear>
    <v-list>
      <v-list-item>
        <h3>No. {{ currentTranscript.no }}</h3>
      </v-list-item>

      <v-list-item>日本語：</v-list-item>
      <v-list-item>
        <h3>{{ currentTranscript.ja }}</h3>
      </v-list-item>

      <v-list-item>
        <v-checkbox v-model="isShowingEnglishModel" label="英文を表示する" />
      </v-list-item>

      <template v-if="isShowingEnglish">
        <v-list-item>英語：</v-list-item>
        <v-list-item>
          <h3>{{ currentTranscript.en }}</h3>
        </v-list-item>
      </template>

      <v-list-item>
        <v-list-item-content>
          <v-textarea
            auto-grow
            clearable
            label="回答入力欄"
            row-height="1rem"
            :value="inputText"
            :placeholder="textUnderRecognition"
          />
        </v-list-item-content>
        <v-list-item-icon style="align-self: center;">
          <v-btn text v-if="!isUsingMicrophone" @click="startRecognition"
            >🎤</v-btn
          >
          <v-btn text v-if="isUsingMicrophone" @click="stopRecognition"
            >❌</v-btn
          >
        </v-list-item-icon>
      </v-list-item>

      <v-list-item v-if="inputText.length > 0">正誤：</v-list-item>
      <v-list-item>
        <div style="word-break: break-all;">
          <span v-for="(word, index) in checkedWords" :key="index">
            <span v-if="word.correct" style="color: darkgray;">{{
              word.text
            }}</span>
            <span v-if="!word.correct" style="color: red;">{{
              word.text
            }}</span>
            <span>{{ '\xa0' }}</span>
          </span>
        </div>
      </v-list-item>
    </v-list>

    <v-container>
      <v-row>
        <v-col>
          <v-btn text color="primary" @click="gotoBack">前へ</v-btn>
        </v-col>

        <v-spacer />

        <v-col>
          <v-btn text color="primary" @click="gotoRandom">ランダム</v-btn>
        </v-col>

        <v-spacer />

        <v-col>
          <v-btn text color="primary" @click="gotoNext">次へ</v-btn>
        </v-col>
      </v-row>
    </v-container>
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
      'isShowingEnglish',
    ]),

    isShowingEnglishModel: {
      get() {
        return this.isShowingEnglish;
      },
      set(value) {
        this.setIsShowingEnglish({ checked: value });
      },
    },
  },

  methods: {
    ...mapMutations(['goto', 'setIsShowingEnglish']),
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
