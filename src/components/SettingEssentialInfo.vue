<template>
    <div class = "wrapper secondary">
        <div class = "title secondary">
            <label>필수 정보</label>
        </div>
        <div class = "element">
            <div class = "element-item"
                v-for = "(item,index) in item"
                v-bind:key="index">
                <label :for="item.key">{{item.key}}</label>
                <input
                    type="text"
                    :id="item.key"
                    v-model = "item.value"
                    disabled
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        if(this.props.ip!=undefined){
            this.item.push(
                { key : "IP 주소",
                  value : this.props.ip },
                { key : "호스트 이름",
                  value : this.props.host },
                { key : "장비 이름",
                  value : this.props.equip },
                { key : "모델 이름",
                  value : this.props.model },
            )
        }
        else {
            this.item.push(
                { key : "IP 주소",
                  value : "" },
                { key : "호스트 이름",
                  value : "" },
                { key : "장비 이름",
                  value : "" },
                { key : "모델 이름",
                  value : "" },
            )
        }
    },
    props : {
      props : Object
    },
   data(){
       return{
           item : []
       }
    }
}
</script>
<style lang="scss" scoped>
.element {
    padding:10px;
    display: grid;
    grid-gap:10px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    & .element-item {
        display: grid;
        grid-gap:10px;
        grid-template-columns: 2fr 3fr;
        & label {
            line-height:37px;
            vertical-align: middle;
        }
    }
}
</style>