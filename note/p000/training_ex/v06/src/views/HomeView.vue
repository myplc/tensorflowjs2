<template>
  <div>
    <div id="display">
      <input
        ref="image"
        type="file"
        id="input"
        name="img"
        accept="image/*"
        multiple="multiple"
        @change="upIMG()"
        style="display: none"
      />
      <label for="input" id="img-box">+</label>
    </div>
    <img :src="imglink" alt="준비중..." ref="img" v-if="imglink" />
    <hr />
    <div id="result1">{{ result1 }}</div>
    <button v-if="imglink" @click="predict()">분석</button>
    <div id="result">{{ result }}</div>
  </div>
</template>
<script>
import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet'
export default {
  name: 'App',
  data() {
    return {
      imglink: '',
      result: '',
      result1: '파일을 업로드하여 이미지 분석을 시작하세요.',
      inData: ''
    }
  },
  methods: {
    upIMG: function () {
      const image = this.$refs.image.files[0] // 나중에 ref 한번 더 분석
      const reader = new FileReader()
      reader.readAsDataURL(image) // 변환
      reader.onload = (e) => {
        // base64 인코딩된 값
        console.log(e.target)
        this.result1 = e.target.result // base64 값
        this.imglink = e.target.result // 보이는 역할 꾸미는 용
      }
    },
    predict: function () {
      const img = this.$refs.img
      this.result = '이미지 분석중...'
      mobilenet.load().then((model) => {
        model.classify(img).then((rst) => {
          console.log(tf)
          this.result =
            '분석결과: ' +
            rst[0].className +
            '(' +
            (rst[0].probability * 100).toFixed(2) +
            '%)'
        })
      })
    }
  }
}
</script>
<style scoped>
#img-box {
  display: inline-block;
  width: 100px;
  height: 100%;
  border: 1px solid rgb(131, 136, 225);
  border-radius: 5px;
  background-color: lightblue;
  color: #fff;
  font-size: 3em;
  line-height: 100px;
  /* text-align: center; */
  /* padding: auto; */
  /* margin: 10px; */
}
img {
  border: 1px solid lightgoldenrodyellow;
  display: inline-block;
  width: 200px;
  height: 100%;
  border-radius: 5px;
}
</style>
