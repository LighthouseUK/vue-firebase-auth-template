<template>
  <div class="row">
    <div class="small-12 medium-9 medium-centered large-6 large-centered columns text-center">
      <div class="card">
          <div class="card-section">
            <div :class="['circle-loader', { loadSuccess: commandResponse.complete && commandResponse.success, loadFailed: commandResponse.complete && !commandResponse.success }]">
              <div class="success draw" v-if="commandResponse.complete && commandResponse.success"></div>
              <div class="fail draw" v-if="commandResponse.complete && !commandResponse.success"></div>
            </div>
          </div>

          <template v-if="commandResponse.complete">

            <div class="card-section">
              <h2>{{ title }}</h2>
            </div>

            <div class="card-section">
              <template v-if="commandResponse.success">
                <p>{{ commandResponse.message }}</p>
                <template v-if="isComplex">
                  <!--TODO: can we even reach this if form generator wraps it?-->
                  <slot :commandResponse="commandResponse" name="complexResult">
                    <!--<p>The result is complex... but that's not the point.</p>-->
                  </slot>
                </template>
              </template>
              <p v-else class="error-messages">Please correct the following errors: <br/>
              <!--<template v-for="(fieldErrors, fieldName) in errors">-->
              <template v-for="(fieldErrors) in errors">
                <span class="form-error is-visible" style="font-size: inherit" v-for="(fieldError, index) in fieldErrors" :key="index">
                  {{ fieldError }}
                </span>
              </template>
              </p>
            </div>

            <!--TODO: only show button if simple response?-->
            <div v-if="commandResponse.complete" class="card-section">
              <button :class="['button', { success: commandResponse.complete && commandResponse.success, alert: commandResponse.complete && !commandResponse.success }]" @click="$emit('commandResponseContinue')">{{ buttonText }}</button>
            </div>

          </template>

          <template v-else>
            <div class="card-section">
              <p>
                {{ commandResponse.message }}
              </p>
            </div>
          </template>
      </div>
    </div>
  </div>
</template>

<script>
  // TODO: modify this to support multi-state commands e.g. 'processing'
  // TODO: modify this so that the success/loading changes based on the result type
  // e.g. if complex result then show it all on one line at a reduced size?
  // This would allow the complex result slot more room to feedback to the user
  export default{
    name: 'working',
    props: {
      commandResponse: {
        type: Object,
        required: true
      }
    },
    computed: {
      errors () {
        if (this.commandResponse.message && this.commandResponse.message.length) {
          try {
            return JSON.parse(this.commandResponse.message)
          } catch (error) {
            return {'general': [this.commandResponse.message]}
          }
        }
      },
      title () {
        return this.commandResponse.success ? 'Success' : 'Failed'
      },
      resultType () {
        if (this.commandResponse.hasOwnProperty('type') && this.commandResponse.type) {
          return this.commandResponse.type
        }
        return 'simple'
      },
      isComplex () {
        return this.resultType === 'complex'
      },
      buttonText () {
        return this.commandResponse.success ? 'Continue' : 'Fix Errors'
      }
    }
  }
</script>

<style lang="scss">
  .error-messages {
    line-height: 2;
  }

  // Define vars we'll be using
  $loading-color: #7575ce;
  $brand-success: #5cb85c;
  $brand-fail: red;
  $loader-size: 8rem;
  $check-height: $loader-size/2;
  $check-width: $check-height/2;
  $fail-width: .2rem;
  $check-left: ($loader-size/6 + $loader-size/12);
  $check-thickness: 2px;
  $check-color: $brand-success;
  $fail-color: $brand-fail;

  .circle-loader {
    margin: 0 0 30px 10px;
    border: $check-thickness solid rgba(138, 138, 138, 0.2);
    border-left-color: $loading-color;
    animation-name: loader-spin;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    position: relative;
    display: inline-block;
    vertical-align: top;
    &.loadSuccess {
      -webkit-animation: none;
      animation: none;
      border-color: $check-color;
      transition: border 200ms linear;
    }
    &.loadFailed {
      border-color: $fail-color;
      -webkit-animation: none;
      animation: shake 400ms;
      transition: border 200ms linear;
    }
  }

  .circle-loader,
  .circle-loader:after {
    border-radius: 50%;
    width: $loader-size;
    height: $loader-size;
  }

  .circle-loader {
    .success {
      &.draw:after {
        animation-duration: 800ms;
        animation-timing-function: ease;
        animation-name: success;
        transform: scaleX(-1) rotate(135deg);
      }

      &:after {
        opacity: 1;
        height: $check-height;
        width: $check-width;
        transform-origin: left top;
        border-right: $check-thickness solid $check-color;
        border-top: $check-thickness solid $check-color;
        content: '';
        left: $check-left;
        top: $check-height;
        position: absolute;
      }
    }
    .fail {
      &.draw:after {
        animation: fail 800ms ease;
        -webkit-transform:rotate(-45deg);
        -moz-transform:rotate(-45deg);
        transform:rotate(-45deg);
      }

      &.draw:before {
        animation: fail 800ms ease;
        -webkit-transform:rotate(45deg);
        -moz-transform:rotate(45deg);
        transform:rotate(45deg);
      }

      &:after, &:before {
        content:'';
        position:absolute;
        width: $fail-width;
        height: $check-height;
        background-color:red;
        border-radius: $check-thickness;
        top: $check-width - ($check-height/12);
        left: $check-height - ($loader-size/24);
      }
    }
  }

  @keyframes loader-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes success {
    0% {
      height: 0;
      width: 0;
      opacity: 1;
    }
    20% {
      height: 0;
      width: $check-width;
      opacity: 1;
    }
    40% {
      height: $check-height;
      width: $check-width;
      opacity: 1;
    }
    100% {
      height: $check-height;
      width: $check-width;
      opacity: 1;
    }
  }

  @keyframes fail {
    0% {
      height: 0;
      width: 0;
      opacity: 1;
    }
    20% {
      height: 0;
      width: $fail-width;
      opacity: 1;
    }
    40% {
      height: $check-height;
      width: $fail-width;
      opacity: 1;
    }
    100% {
      height: $check-height;
      width: $fail-width;
      opacity: 1;
    }
  }

  @keyframes shake {
    8%, 41% {
      transform: translateX(-10px);
    }
    25%, 58% {
      transform: translateX(10px);
    }
    75% {
      transform: translateX(-5px);
    }
    92% {
      transform: translateX(5px);
    }
    0%, 100% {
      transform: translateX(0);
    }
  }
</style>
