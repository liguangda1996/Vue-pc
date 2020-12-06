<template>
  <div class="spec-preview">
      <!-- 中图 -->
    <img  :src="imgUrl" />
    <div class="event" @mousemove="handleMove" ref="event"></div>
    <!-- 大图 -->
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg"/>
    </div>
    <!-- 蒙版 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:{
        skuInfo:Object,
        imgUrl:String,
        bigImgUrl:String
    },
    data() {
        return {
            maskWidth:0
        }
    },
    methods:{
        handleMove(event) {
            const { offsetX, offsetY } = event;
            //console.log(offsetX, offsetY);

            const maskWidth = this.maskWidth;
            let left = 0;
            let top = 0;
            // mask 移动距离
            left = offsetX - maskWidth/2;
            top = offsetY - maskWidth/2;
            // left 的移动范围
            if(left < 0) {
                left = 0;
            }else if( left > maskWidth ) {
                left = maskWidth;
            }

            if(top < 0) {
                top = 0
            } else if( top > maskWidth) {
                top =maskWidth;
            }
            // mask 的移动
            const maskMove = this.$refs.mask;
            maskMove.style.left = left + "px";
            maskMove.style.top = top + "px";
            // 大图 的移动
            const bigImgMove = this.$refs.bigImg;
            bigImgMove.style.left = -2*left + "px";
            bigImgMove.style.top = -2*top + "px";
        }
    },
    mounted() {
        // 获取mask的宽度，因为mask的宽是固定值，不变，所以没有必要定义在data中
        this.maskWidth = this.$refs.event.clientWidth/2;// mask 为 event的一半
        //console.log(this.maskWidth);
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>