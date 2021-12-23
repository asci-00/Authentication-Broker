<template>
  <div id="wrapper">
    <div class="error">{{ NOT_FOUND_MESSAGE }}</div>
  </div>
</template>

<script>
import { NOT_FOUND_MESSAGE } from '@/constants/common';

export default {
  data() {
    return { NOT_FOUND_MESSAGE };
  },
};
</script>
