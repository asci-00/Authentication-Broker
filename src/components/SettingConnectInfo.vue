<template>
      <div class = "wrapper">
        <div class = "title secondary">접속 정보</div>
        <section class='connect-info'>
          <ul class='list-box type-list'>
              <li class="list-title">접속 방식</li>
              <li v-for="(type, idx) in modeList" :key="idx">
                <input :id='type' type='radio' name='connect-type' :value='type' :checked="props.connect === type" disabled/><label :for='type'>{{type}}</label>
              </li>
          </ul>
          <ul class='list-box config-list'>
              <li class="list-title"><span>Key</span><span>Value</span></li>
              <li>
                  <select value='none'><option value='none'>none</option></select>
                  <input type='text' placeholder='input value'/>
              </li>
              <li>
                  <select value='none'><option value='none'>none</option></select>
                  <input type='text' placeholder='input value'/>
              </li>
              <li>
                  <select value='none'><option value='none'>none</option></select>
                  <input type='text' placeholder='input value'/>
              </li>
          </ul>
      </section>
      </div>

</template>

<script>
export default  {
  created(){
    if(this.props.ip == undefined){
      this.props.connect = "";
      for(var i=0;i<this.props.list.length;i++){
        this.props.list[i].id = "";
        this.props.list[i].value = "";
      }
    }
  },
    props : {
      props : Object
    },
    data() {
      return {
        modeList : ["SSH","API","HMAC","GUI"],
      }
    },
}

</script>

<style lang="scss" scoped>
.connect-info {
    padding:10px;
    display:grid;
    grid-template-columns: 2fr 3fr;
    & li:not(:last-child) { margin-bottom:10px; }

    & .list-title { margin-bottom:15px; }
    & .config-list li {
        display:grid;
        grid-gap:5px;
        grid-template-columns: 2fr 3fr;

    }
}

</style>
