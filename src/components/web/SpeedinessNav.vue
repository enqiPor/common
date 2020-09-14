<template>
<div class="rapid-nav">
    <div class="box">
        <div id="nav">
            <h1>标题1</h1>
        </div>
    </div>
    <div class="box">
        <div id="content">
            <h1>标题2</h1>
        </div>
    </div>
    <div class="box">
        <div id="footer">
            <h1>标题3</h1>
        </div>
    </div>
    <div class="rapid-box">
        <ul>
            <li>
                <h2 @click="add1">标题1</h2>
            </li>
            <li>
                <h2 @click="add2">标题2</h2>
            </li>
            <li>
                <h2 @click="add3">标题3</h2>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        add1() {
            document.getElementById('nav').scrollIntoView({
                block: "center",
                behavior: "auto",
                inline: "start"
            });
        },
        add2() {
            document.getElementById('content').scrollIntoView({
                block: "center",
                behavior: "auto",
                inline: "start"
            });
        },
        add3() {
            document.getElementById('footer').scrollIntoView({
                block: "center",
                behavior: "auto",
                inline: "start"
            });
        }
    },
    //scrollIntoView 方法参数说明：(参数可以为布尔值也可为对象)
    //为布尔值的时候：
    //true : 如果为true，元素的顶端将和其所在滚动区的可视区域的顶端对齐
    //false: 如果为false，元素的底端将和其所在滚动区的可视区域的底端对齐
    //例:document.getElementById('xxx').scrollIntoView(true);
    //-----------------------------------------------------------------
    //为对象的时候：
    //behavior 可选定义动画过渡效果， "auto"或 “smooth” 之一。默认为 “auto”
    //block 可选定义垂直方向的对齐， “start”, “center”, “end”, 或 "nearest"之一。默认为 “start”
    //inline 可选定义水平方向的对齐， “start”, “center”, “end”, 或 "nearest"之一。默认为 “nearest”
    //例:document.getElementById('xxx').scrollIntoView({block: "center",behavior :"auto",inline:"start"});
}
</script>

<style lang="scss">
.rapid {
    position: relative;
}

.box {
    width: 100%;
    height: 600px;
    border: 1px solid red;
    text-align: center;
}

.rapid-box {
    position: fixed;
    top: 45%;
    right: 0;
    cursor: pointer;
}
</style>
