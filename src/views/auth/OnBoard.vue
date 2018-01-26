<template>
  <div>
    <h1>On Boarding page</h1>
  </div>
</template>

<script>

  export default {
    name: 'on-board',
    props: {
      user: {
        required: true
      },
      systemConfig: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style lang="scss">
</style>
