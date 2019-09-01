<template>
  <section>
    <div>twitter user id: {{ user.id }}</div>
    <div>error: {{ error }}</div>
    <a href="http://127.0.0.1:3000/server/logout">logout</a>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {},
      error: null,
    };
  },
  mounted() {
    // 1
    axios.get('http://127.0.0.1:3000/server/auth/twitter/callback', {
      params: this.$route.query,
    }).then(res => {
      // 3
      this.user = res.data.user;
    }).catch(err => {
      this.error = err;
    });
  },
};
</script>