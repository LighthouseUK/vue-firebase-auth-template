<template>
  <router-view :firebaseUser="firebaseUser" :user="user" :systemConfig="systemConfig" v-on:logoutUser="raiseLogoutUser"></router-view>
</template>

<script>
  export default{
    name: 'auth',
    props: {
      firebaseUser: {
        required: true
      },
      user: {
        required: true
      },
      systemConfig: {
        type: Object,
        required: true
      }
    },
    methods: {
      raiseLogoutUser () {
        this.$emit('logoutUser')
      }
    }
  }
</script>
