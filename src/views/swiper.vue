<template>
  <div>
    <div class="examples">
      <div class="bannerTxt">
        {{bannerTxt}}
      </div>
      <div class="bannerBox">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in banner" :key="index">
              <img :src="item.picture_path" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="bannerIndex">
        <span>{{bannerIndex}}</span>/4
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  data() {
    return {
      bannerIndex: 0,
      bannerTxt: '手写的处方',
      banner: [
        {
          picture_txt: '手写的处方',
          picture_path: 'https://kmyhl.oss-cn-shenzhen.aliyuncs.com/e-medicine/NEXw6KmWH5.png',
        },
        {
          picture_txt: '机打的处方',
          picture_path: 'https://kmyhl.oss-cn-shenzhen.aliyuncs.com/e-medicine/ZdXbcS77SK.png',
        },
        {
          picture_txt: '机打的处方',
          picture_path: 'https://kmyhl.oss-cn-shenzhen.aliyuncs.com/e-medicine/BKfxNfcHpH.png',
        },
        {
          picture_txt: '机打的处方',
          picture_path: 'https://kmyhl.oss-cn-shenzhen.aliyuncs.com/e-medicine/d3TNrsh75a.png'
        }
      ]
    };
  },
  mounted() {
    let that = this;
    /* eslint-disable */
    let mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', //滑动方向，可设置水平(horizontal)或垂直(vertical)。
      loop: true, // 设置为true 则开启loop模式
      autoplay: 3000, // 自动切换时间
      slidesPerView: 'auto', // 设置slider容器能够同时显示的slides数量(carousel模式)。类型：number or auto
      centeredSlides: true, // 设定为true时，active slide会居中，而不是默认状态下的居左。
      spaceBetween: 10, // 在slide之间设置距离（单位px）。
      loopAdditionaSlider: 0, // loop模式下会在slides前后复制若干个slide,，前后复制的个数不会大于原总个数。
      on: {
        slideChangeTransitionEnd: function(){
          if(this.activeIndex === 8 || this.activeIndex === 4 ) {
            that.bannerIndex = 1;
            that.bannerTxt = '手写的处方';
          } else {
            that.bannerIndex = this.activeIndex-3;
            that.bannerTxt = '机打的处方';
          }
        },
      },
    });
  },
};
</script>

<style lang="less" scoped>
.examples{
  position: absolute;
  top: 44px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
  background-color: #f5f0f0;
  font-size: 14px;
  .tips{
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 46px;
    background-color: #b5654d;
    text-align: center;
    img{
      width: 12px;
      height: 14px;
      position: absolute;
      top: 7.5px;
      left: 12vw;
      color: #fff;
    }
    p{
      width: 240px;
      text-align: left;
      color: #fff;
      font-size: 12px;
      position: absolute;
      left: 18vw;
      top: 7px;
      line-height: 16px;
    }
  }
}
.bannerTxt{
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #666666;
  font-size: 15px;
}
.bannerIndex{
  line-height: 40px;
  text-align: center;
  color: #666666;
  font-size: 15px;
  text-align: center;
  span{
    color: #b5654d;
  }
}
.bannerBox{
  position: relative;
  height: 380px;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-container .swiper-wrapper .swiper-slide {
  width: 80% !important;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.swiper-container .swiper-wrapper .swiper-slide img {
  width: 100%;
  height: 380px;
  border-radius: 5px;
}
.swiper-container .swiper-wrapper .swiper-slide-prev,.swiper-container .swiper-wrapper .swiper-slide-next{
  height: 340px !important;
  margin-top: 20px;
}
.swiper-container .swiper-wrapper .swiper-slide-prev img,.swiper-container .swiper-wrapper .swiper-slide-next img{
  width: 100%;
  height: 100%;
}
</style>