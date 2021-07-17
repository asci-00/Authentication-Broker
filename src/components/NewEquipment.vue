<template>
    <div class="wrapper">
        <div class="guide-msg">Authentication Broker에서 관리할 장비의 계정 등록을 진행 합니다.</div>
        <div>
            <label for="single">장비명</label>
            <input type="text" style="width:350px;"/>
        </div>
        <div>
            <input type="text" style="width:350px;"/>
        </div>
        <div>
            <input type="text" style="width:350px;"/>
        </div>
        <div>
            <div class="radio-box">
                <input type="radio" name="type" value="단일 계정" id="single"/>
                <label for="single">단일 계정</label>
                <input type="radio" name="type" value="복수 계정" id="multi"/>
                <label for="multi">복수 계정</label>
                <input type="radio" name="type" value="API Key" id="api">
                <label for="api">API Key</label>
            </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    width: 800px;
    margin: 0 auto;
    display: grid;
    grid-template-rows: repeat(1fr, 11);
    grid-gap: 10px;
    & > div {
        width: 100%;
        min-height: 30px;
        background: #eee;
        & input[type=text] {
            outline:none;
            margin:0; padding:0;
        }
    }
    & > .guide-msg {
        text-align: left;
    }
}
.wrapper > div:not(.guide-msg):not(.multi-form) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
}
.wrapper > div:not(.guide-msg) > div {

}
.wrapper .label {
    margin-top: 5px;
    text-align: right;
}
.wrapper .radio-box {
    margin-top: 5px;
}
</style>
