<template>
  <div>
    <TypeNav />
    <!-- 列表导航 -->
    <ListContainer />
    <!-- 今日推荐 -->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!-- 楼层 -->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
    <!-- 商标 -->
    <Brand />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import TypeNav from "../../components/TypeNav/index";
import ListContainer from "./ListContainer/ListContainer";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
import Rank from "./Rank/Rank";
import Like from "./Like/Like";
import Floor from "./Floor/Floor";
import Brand from "./Brand/Brand";

export default {
  name: "Home",
  computed: {
    ...mapState({
      floors: state => state.home.floors
    })
  },
  methods: {
    ...mapActions(["getFloors"])
  },
  mounted() {
    this.getFloors();
  },
  components: {
    TypeNav,
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  
};
</script>

<style lang="less" scoped>
</style>