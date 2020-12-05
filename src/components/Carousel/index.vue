<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in carouselList" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>

    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.css";
// https://swiperjs.com/get-started/
// Swiper6默认只有核心轮播图功能，其他功能没有
// 要使用其他功能，需要先加载
Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  name: "Carousel",
  props: {
    carouselList: {
      type: Array,
      required: true
    }
  },
  /* 
      1. 在mounted去new Swiper，为了保证DOM结构生成了在new
      2. mounted直接new Swiper，此时还没有获取到banners数据
        轮播图图片还未生成，所以失败
      3. 要等轮播图图片数据请求回来，在new Swiper
      4. await this.getBanners() --> 等待vuex将数据更新完毕，再执行后面代码
      5. 轮播图数据有了，但是DOM结构没有
        更新用户界面都是异步的，所以要等同步全部执行完，在去更新
      6. 方案一：定时器  
        通过定时器将new Swiper添加宏任务队列，而更新用户界面是微任务队列
        所以是先更新用户界面，此时就有DOM结构
        再new Swiper，此时就OK
      7. 方案二：
        this.$nextTick(() => {}) 
        Vue.nextTick(() => {})  
          等当前用户界面更新完毕，在触发其中的回调函数
          将其中的回调函数放到更新完成DOM后在触发
          其中的回调函数可以近似看做实在updated中执行（但是只会执行一次）
      8. 注意：Swiper6需要手动引入其他插件才可以使用
      
      调试代码：打印调试
    */

  watch: {
    carouselList() {
      // [] --> 最终的数据 数据发生变化才会触发
      // 轮播图DOM元素要渲染完成 --> 轮播图数据
      // watch为了确保有轮播图数据
      // this.$nextTick为了确保轮播图数据已经渲染成DOM元素

      // 确保：swiper不能new多次
      if (this.swiper) return;
      this.$nextTick(() => {         
          this.initSwiper()
      });
    }
  },
  methods: {
    initSwiper() {
      // 使用 this.$refs.swiper 取代 .swiper-container
      // 使用 this.$refs.swiper 才能保证轮播图组件使用的自己的swiper
      this.swiper = new Swiper(this.$refs.swiper, {
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false, // 最后一页停住
          disableOnInteraction: false // 操作不会影响自动轮播
        },
        // Optional parameters
        //direction: "horizontal",
        loop: true,

        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    }
  },
  mounted() {
      // 轮播图数据要有 且 轮播图DOM元素要渲染完成 才能 new Swiper
    /* 
      1. ListContainer组件
        一上来没有数据 -- 触发watch
      2. Floor 
        一上来就有数据 -- mounted  
    */
   if(!this.carouselList.length) return;
   this.initSwiper();
  }
};
</script>

<style lang="less" scoped>
/* .swiper-container {
  width: 720px;
  height: 455px;
} */
</style>
