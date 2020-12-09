<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              @click="productCheck(cart.skuId,cart.isChecked)"
              name="chk_list"
              :checked="isCheck"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <button
              href="javascript:void(0)"
              @click="updateCount(cart.skuId, -1)"
              class="mins"
              :disabled="cart.skuNum === 1"
            >-</button>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @blur="update(cart.skuId, cart.skuNum, $event)"
              @input="formatSkuNum"
            />
            <button
              href="javascript:void(0)"
              @click="updateCount(cart.skuId,1)"
              class="plus"
              :disabled="cart.skuNum === 20"
            >+</button>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" @click="delProduct(cart.skuId)" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllCheeck" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{total}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalParice}}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade" class="sum-btn" target="_blank">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ShopCart",
  data() {
    return {
      isCheck: true
    };
  },
  computed: {
    ...mapState({
      // state是总state吗？？？
      cartList: state => state.shopcart.cartList
    }),
    // 选中商品总数数量
    total() {
      return this.cartList
        .filter(cart => cart.isChecked === 1)
        .reduce((p, c) => (p += c.skuNum), 0);
    },
    // 选中商品总价
    totalParice() {
      return this.cartList
        .filter(cart => cart.isChecked === 1)
        .reduce((p, c) => (p += c.skuNum * c.skuPrice), 0);
    },
    isAllCheeck: {
      get() {
        return (
          this.cartList.length > 0 &&
          this.cartList.every(cart => cart.isChecked === 1)
        );
      },
      // 设置全选 复选框
      set(isAllChecked) {
        if (isAllChecked) {
          isAllChecked = 1;
          this.isCheck = true;
        } else {
          isAllChecked = 0;
          this.isCheck = false;
        }
        //this.isAllCheck(isAllChecked)
        this.cartList.forEach(cart => {
          cart.isChecked = isAllChecked;
        });

        //this.getShopCartList()
        //console.log(isAllChecked);
      }
    }
  },
  methods: {
    ...mapActions([
      "getShopCartList",
      "updateCartCount",
      "delCartProduct",
      "updateCartCheck",
      "isAllCheck"
    ]),
    // 商品数量添加减少处理
    formatSkuNum(e) {
      //console.log(e.target.value)
      let skuNum = +e.target.value.replace(/\D/g, "");
      //    if (skuNum <= 0) {
      //     alert("商品必须大于0")
      //     skuNum = 1;
      //   } else if (skuNum > 20) {
      //     // 10就是假设的库存量
      //     skuNum = 10;
      //   }
      e.target.value = skuNum;
    },
    // 处理商品数量直接输入数字
    update(skuId, skuNum, e) {
        console.log(skuNum);
        
      if (e.target.value <= 0) {
        alert("商品必须大于0");
        // 如果输入的数量小于等于零  就让数量等于1； 1 - 当前商品数量，结果永远为负， 这样就是让当前的商品数量看减去多少，到1
        this.updateCartCount({ skuId, skuNum: 1 - skuNum });
        return;
      } else if (e.target.value > 20) {
        // 20就是假设的库存量
        // skuNum = 20;
        //如果输入的数字大于库存 用库存减当前商品数量 就是相当于看当前的商品数量还有多少到达20，结果永远为正，就让他加上之后为20，也就是库存数量
        this.updateCartCount({ skuId, skuNum: 20 - skuNum });
        return;
      }
      //console.log(skuId, skuNum, e.target.value); e.target.value 得到的值为字符串
      // 如果输入的值和原本的值相等就不处理
      if (+e.target.value === skuNum) {
        return;
      }
      // 当前商品数量是10 e.target.value 6 -->  6 - 10 = -4
      // 当前商品数量是3 e.target.value 6 --> 6 - 3 = 3
      this.updateCartCount({ skuId, skuNum: e.target.value - skuNum });
    },
    // 更新商品数量
    async updateCount(skuId, skuNum) {
      // 更新商品
      await this.updateCartCount({ skuId, skuNum });
      // 刷新页面
      //this.getShopCartList(); // 2. 重新请求所有购物车数据(改变商品数量之后，更新页面方式二)
    },
    // 删除商品
    delProduct(skuId) {
      if (window.confirm("却认删除商品吗")) {
        this.delCartProduct(skuId);
      }
    },
    // 切换商品选中状态
    productCheck(skuID, isChecked) {
      //let isChecked = isChecked === 1 ? 0 : 1;
      if (isChecked === 1) {
        isChecked = 0;
      } else {
        isChecked = 1;
      }
      this.updateCartCheck({ skuID, isChecked });
    }
  },
  mounted() {
    this.getShopCartList();
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 45.8333%;

          img {
            width: 100px;
            height: 82px;
            margin: 0 10px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 200px;
            margin: 0 30px;
            line-height: 18px;
          }
        }

        /* .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          } */

        .cart-list-con4 {
          width: 9.5%;
        }

        .cart-list-con5 {
          width: 15.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>