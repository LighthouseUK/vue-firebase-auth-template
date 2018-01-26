<template>
  <div>
    <div class="grid-y grid-padding-y align-center-middle text-center grid-frame">
      <div class="small-auto cell">
        <div class="grid-x grid-padding-x align-center-middle text-center">
          <div class="cell medium-9 large-6">
            You are not authorized to access this part of the app<br>
            <router-link :to="{name: 'core.home'}">Return to Dashboard</router-link>
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
    name: 'unauthorized',
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
      }
    },
    computed: {
    },
    mounted () {
    },
    methods: {
    },
    created () {
    }
  }
</script>

<style lang="scss">
  @import "../../../node_modules/firebaseui/dist/firebaseui.css";
</style>
