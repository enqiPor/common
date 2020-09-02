<template>
    <div class="axios-demo">
<!--        axios组件示例-->
        <p>配置再utils文件夹里（文件夹自行创建）</p>
        {{info}}
    </div>
</template>

<script>
    //在你需要使用到axios的vue组件里引入
    import axios from "../../utils/axios";
    let Axios = new axios();
    export default {
        name: "Axios",
        data(){
            return{
                info:''
            }
        },
        mounted() {
            Axios.shopList().then(res =>{
                this.info = res.data.data;
            })
        }
    }
</script>

<style lang="scss">

</style>