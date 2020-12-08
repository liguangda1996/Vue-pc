<template>
  <div id="header">
    <div id="shortcut">
      <ul class="left">
        <div v-if="$store.state.user.name">
          <span>{{$store.state.user.name}}</span>
          <a @click="exitLogin">退出</a>
        </div>
        <div v-else>
          <li>
            <router-link to="/login" class="clear-border">您好,请登录</router-link>
          </li>
          <li>
            <router-link to="/register">免费注册</router-link>
          </li>
        </div>
      </ul>
      <ul class="right">
        <li>
          <a href="###">我的订单</a>
        </li>
        <li>
          <router-link to="/shopcart">我的购物车</router-link>
        </li>
        <li>
          <a href="###">我的会员</a>
        </li>
        <li>
          <a href="###">企业采购</a>
        </li>
        <li>
          <a href="###">合作招商</a>
        </li>
        <li>
          <a href="###" class="clear-border">客户服务</a>
        </li>
      </ul>
    </div>
    <!-- logo和搜索框 -->
    <div id="banner">
      <div class="banner-logo">
        <router-link to="/">
          <img src="./images/logo.png" alt />
        </router-link>
      </div>
      <form @submit.prevent="search">
        <input type="text" v-model="searchText" />
        <!-- button 默认的type就是submit -->
        <button type="submit">搜索</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    /**
     * 搜索功能函数
     */
    /* $router.push(location)
          location 可以是字符串 path/:xxx?key=value
          location 可以是对象 
            {
              path: 路由路径,
              query: {} 查询字符串参数
            }

            {
              name: 命名路由名称,
              params: {} params参数
              query: {} 查询字符串参数
            }
              命名路由params可选 */
    /* 字符串处理可选参数
    search() {
      const { searchText } = this;
      const params = searchText ? `/${searchText}` : "";
      const location = "/search" + params;
      // 编程式导航：因为还要做搜素功能（要发送请求）
      this.$router.push(location);
    } */
    // 对象处理可选参数
    search() {
      const { searchText } = this;
      const location = {
        name: "Search"
      };
      if (searchText) {
        location.params = {
          searchText
        };
      }
      this.$router.push(location);
    },
    exitLogin() {
        this.$store.dispatch("exit")
    }
  },
  mounted() {
    this.$bus.$on("clearKeyword", () => {
      this.searchText = "";
    });
  }
};
</script>

<style lang="less" scoped>
// lang="less" 当前可以使用less写样式
// scoped 作用域样式代码（当前样式只对当前组件生效，其他组件没有效果）
/* 
  当添加 scoped 属性
    给当前组件所有结构添加一个唯一的属性 data-v-xxx
    所有元素选择器都会加上选择这个属性
      之前: .header-aaa { }
      之后：.header-aaa[data-v-xxx] {}
    因为只有当前组件具有这个属性 data-v-xxx
    所以样式只会对当前组件生效，其他组件不会影响
*/
#header {
  border-bottom: 1px solid #ddd;
}
#shortcut {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background-color: #e3e4e5;
}
.left {
  padding-left: 100px;
  float: left;
  list-style-type: none;
}
.left a:hover{
    color: red;
    }

.left li {
  float: right;
}

.right {
  float: right;
  list-style-type: none;
  padding-right: 100px;
}
.right li {
  float: left;
}

#shortcut a {
  padding-left: 10px;
  padding-right: 10px;
  border-right: 1px solid #b3aeae;
  text-decoration: none;
}
.clear-border {
  border: 0 !important;
}

/* banner的css，logo和搜索框 */
#banner {
  margin: 0 auto;
  width: 1200px;
  height: 110px;
  /* border: 1px solid pink; */
}

#banner .banner-logo {
  float: left;
  width: 250px;
  height: 110px;
  line-height: 110px;
  /* border: 1px solid blue; */
  font-size: 0;
  text-align: center;
}

#banner .banner-logo img {
  vertical-align: middle;
}

#banner form {
  float: right;
  height: 110px;
  line-height: 110px;
  font-size: 0;
  /* border: 1px solid red; */
}

#banner form input {
  width: 490px;
  height: 32px;
  border: 2px solid #ea4a36;
  outline: none; /*清除边框的默认样式 */
  border-right: 0;
  font-size: 12px;
  box-sizing: border-box;
  vertical-align: middle;
}

#banner form button {
  width: 68px;
  height: 32px;
  background-color: #ea4a36;
  font-size: 12px;
  color: #fff;
  border: 0;
  outline: none; /*去除点击时的边框*/
  vertical-align: middle;
  cursor: pointer; /*改变鼠标样式为小手 */
}
</style>