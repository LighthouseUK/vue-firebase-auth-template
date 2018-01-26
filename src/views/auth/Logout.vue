<template>
  <div>
    <div class="grid-y grid-padding-y align-center-middle text-center grid-frame">
      <div class="small-auto cell">
        <div class="grid-x grid-padding-x align-center-middle text-center">
          <div class="cell medium-9 large-6">
            <template v-if="user">
              Are you sure you want to log out?<br>
              <button class="button" @click="cancelLogout">No, take me back</button>
              <button class="button alert" @click="handleLogout">Yes, log me out</button>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div id="outdated"></div>
  </div>
</template>

<script>
  import Loading from '@/components/core/Loading'

  export default{
    name: 'logout',
    props: {
      user: {
        required: true
      },
      systemConfig: {
        type: Object,
        required: true
      }
    },
    components: {
      Loading
    },
    data () {
      return {
        uiLoading: true
      }
    },
    computed: {

    },
    mounted () {
    },
    methods: {
      handleLogout () {
        this.$emit('logoutUser')
      },
      cancelLogout () {
        this.$router.go(-1)
      }
    },
    created () {
      // this.handleLogout()
    }
  }
</script>

<style lang="scss">
  @import "../../../node_modules/firebaseui/dist/firebaseui.css";
</style>
