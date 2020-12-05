<template>
  <div>
    <div class="pagination">
      <button :disabled="myCurrentPage <= 1" @click="setCurrentPage(myCurrentPage - 1)">上一页</button>
      <button :class="{ active: myCurrentPage === 1 }" @click="setCurrentPage(1)">1</button>
      <button v-show="startEnd.start > 2">...</button>
      <!-- 遍历得到中间按钮 -->
      <button
        v-for="item in mapBtnsCount"
        :key="item"
        @click="setCurrentPage(startEnd.start + item - 1)"
        :class="{ active: myCurrentPage === startEnd.start + item - 1 }"
      >{{ startEnd.start + item - 1 }}</button>

      <button v-show="startEnd.end < totalPages - 1">...</button>
      <button
        :class="{ active: myCurrentPage === totalPages }"
        v-show="totalPages > 1"
        @click="setCurrentPage(totalPages)"
      >{{ totalPages }}</button>
      <button :disabled="myCurrentPage >= totalPages" @click="setCurrentPage(myCurrentPage + 1)">下一页</button>
      <button>总数：{{ total }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 当前页面
    currentPage: {
      type: Number,
      default: 1
    },
    // 显示按钮数量
    pageCount: {
      type: Number,
      validator(val) {
        // 验证，验证通过才会有用
        // 大于等于 5 且小于等于 21 的奇数
        // 返回true验证成功，
        // 返回false验证失败
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
      default: 7
    },
    // 每页数据条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 数据总数
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 为了方便修改myCurrentPage，定义data数据
      // 原因：props数据只读不能修改
      myCurrentPage: this.currentPage
    };
  },
  watch: {
    // 将最新的当前页面 进行更新 接收来自父组件search中的 :current-page="options.pageNo" 里面的 options.pageNo
    currentPage(currentPage) {
      this.myCurrentPage = currentPage;
    },
    // 每次点击页面时，重新加载页面
    myCurrentPage(currentPage) {
      //this.$listeners.currentPage(currentPage)
      this.$emit("current-change", currentPage);
    }
  },
  computed: {
    // 总页数 = 总数据数/每个页面展示的数据条数
    totalPages() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算中间按钮的开始和结束位置
    startEnd() {
      //当前页面 / 显示的页码按钮的个数 / 总页数
      const { myCurrentPage, pageCount, totalPages } = this;
      // 计算中间按钮的数量 = 显示的页码按钮的个数 - 2（这个2 是开头和结尾页码按钮 ）
      const middleCount = pageCount - 2;
      // 计算中间按钮的中间值 = 中间按钮的数量/2
      const middleNum = Math.floor(middleCount / 2);

      let start, end;
      // 如果当前的页码 >= 总页码数 - 中间页码数
      if (myCurrentPage >= totalPages - middleCount) {
        // 开始页码 = 总页数 - 中间页码数
        start = totalPages - middleCount;
      } else {
        // 开始页码 = 当前页码数 - 中间按钮的中间值
        start = myCurrentPage - middleNum;
      }
      // start 最小值是2
      if (start <= 1) {
        start = 2;
      }
      // 结束值 = 开始值 + 中间页码个数 - 1
      end = start + middleCount - 1;
      // 结束值最大为 总页码数 - 1
      if (end >= totalPages) {
        end = totalPages - 1;
      }

      return {
        start,
        end
      };
    },

    // 需要遍历的按钮数量
    mapBtnsCount() {
      const { start, end } = this.startEnd;
      const count = end - start + 1;
      return count >= 1 ? count : 0;
    }
  },
  methods: {
    //   更新当前页面，触发watch，从而重新发请求，刷新页面
    setCurrentPage(currentPage) {
      this.myCurrentPage = currentPage;
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  white-space: nowrap;
  font-weight: 700;
  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }
}

button.active {
  background-color: #409eff;
  color: #fff;
}
</style>
