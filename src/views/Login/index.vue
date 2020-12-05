<template>
  <div>
    <p>Login</p>
    <button @click="login">按钮</button>
  </div>
</template>

<script>
import { reqLogin } from "../../api/user"

export default {
  name: "Login",
  methods:{
      login(){
          reqLogin("13700000000","1111111")
          .then((res) => {
              console.log("res",res)
          })
          .catch((error)=>{
              console.log("err",error)
          })
      }
  }
};
</script>

<style lang="less" scoped>
</style>