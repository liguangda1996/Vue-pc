<template>
<div>
    <div id="footer-bottom">
        <div>
            <a href="#">联系我们</a> |
            <a href="#">关于我们</a> |
            <a href="#">商家入驻</a> |
            <a href="#">营销中心</a> |
            <a href="#">友情链接</a> |
            <a href="#">关于我们</a> |
            <a href="#">友情链接</a> |
            <a href="#">营销中心</a> |
        </div>
        <div>
            地址：北京市昌平区宏福科技园综合楼6楼
        </div>
        <div>
            京ICP备19006430号
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="less" scoped>
#footer-bottom{
    height: 80px;
    background-color:rgb(234,234,234);
    padding: 20px;
}
#footer-bottom div{
    height: 26px;
    font-size: 12px;
    text-align: center;
}
#footer-bottom div a{
    text-decoration: none;
    color: #333;
}
</style>
