<template>
    <div class="wrapper">
        <div class="title">신규 등록</div>
        <div class="guide-box">
            <div><input id='set-auth' type='radio' name='type' value='인증 정보' checked/><label for='set-auth'>인증 정보</label></div>
            <div><input id='set-customer' type='radio' name='type' value='고객사'/><label for='set-customer'>고객사</label></div>
            <input type='text' name='customer' placeholder="고객사명"/>
        </div>
        <section class="container">
            <div class="inner-container">
                <div class="wrapper">
                    <div class="title secondary">필수 정보</div>
                    <ul class='list-box info-list'>
                        <li><label for='ip'>IP 주소</label><input id='ip' type='text' placeholder='IP Address'/></li>
                        <li><label for='equip'>장비 이름</label><input id='equip' type='text' placeholder='IP Address'/></li>
                        <li><label for='host'>호스트 이름</label><input id='host' type='text' placeholder='IP Address'/></li>
                        <li><label for='model'>모델 이름</label><input id='model' type='text' placeholder='IP Address'/></li>
                    </ul>
                </div>
            </div>
            <div class="inner-container">
                <div class="wrapper">
                    <div class="title secondary">접속 정보</div>
                    <section class='connect-info'>
                        <ul class='list-box type-list'>
                            <li class="list-title">접속 방식</li>
                            <li><input id='ssh' type='radio' name='connect-type' value='SSH' checked/><label for='ssh'>SSH</label></li>
                            <li><input id='api' type='radio' name='connect-type' value='API'/><label for='api'>API</label></li>
                            <li><input id='hmac' type='radio' name='connect-type' value='HMAC'/><label for='hmac'>HMAC</label></li>
                            <li><input id='gui' type='radio' name='connect-type' value='GUI'/><label for='gui'>GUI</label></li>
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
            </div>
        </section>
        <footer class="button-box">
            <button class="submit" @click="onsubmit()">확인</button>
            <button class="reset secondary" @click="onExit()">취소</button>
        </footer>
        <warning
            :submit="modal_reset"
            :reset="modal_submit"
            :name="modal_name"
            :message="`취소하시겠습니까?`"
            @click="modal_onSubmit()"
            @close="modal_onExit()"/>
    </div>
</template>

<script>
import Warning from '@/components/Warning'

export default {
  components : {  Warning },
  props : {
//state : Object,
  },
  data() {
      return {
          modal_name : 'auth-create-modal-depth-1',
          modal_reset : true, modal_submit : true,
          infos : {}
      }
  },
  methods : {
    onsubmit() {
        //입력 유효성 검증
        this.$emit('submit', { info : this.infos })
    },
    onExit() { this.$modal.show(this.modal_name) },
    modal_onSubmit() {
        this.$modal.hide(this.modal_name)
        this.$emit('close')
    },
    modal_onExit() { this.$modal.hide(this.modal_name) }
  },
}
</script>

<style lang="scss" scoped>
.guide-box {
    margin:10px;
    height:40px; line-height:40px;
    vertical-align: middle;
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    width:300px;
}
.container {
    display:grid;
    grid-template-columns: 2fr 3fr;
    grid-gap: 10px;
    height:auto;
    & .inner-container {
        padding:10px;
        & .wrapper { min-height:300px; }
        & .info-list {
            padding:10px;
            & li {
                display:grid;
                grid-template-columns: repeat(2, 1fr);
                &:not(:last-child) { margin-bottom:10px; }
                & label {
                    line-height: 37px;
                    vertical-align: middle;
                }
            }
        }
        & .connect-info {
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
    }
}
</style>
