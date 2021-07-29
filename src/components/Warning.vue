<template>
    <modal :name="name" :width="300" :height="200" :classes="['wrapper']">
        <div class="warning">
            <div>{{message}}</div>
            <footer class="button-box center">
                <button class="submit" @click="onsubmit()" v-if="submit">확인</button>
                <button class="reset secondary" @click="onclose()" v-if="reset">취소</button>
            </footer>
        </div>
    </modal>
</template>

<script lang="ts">

export default {
  props : {
    submit : {
        type : Boolean,
        default: true
    },
    reset : {
        type : Boolean,
        default : true
    },
    message : String,
    name : String,
  },
  methods : {
    onsubmit() { this.$emit('click') },
    onclose() { this.$emit('close') },
  },
}
</script>
