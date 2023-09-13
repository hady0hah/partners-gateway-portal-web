<template>
  <div class="container" >
    <div class="box" >
      <div style="display: flex;">

        <div class="box pa-8">
          <v-row class="mt-4">
            <p class="greeting-text" style="padding-left: 10px"> Welcome, {{ firstName }} :)</p>
          </v-row>
          <v-row class="mt-16">
            <img :src="ThidesoftImagePath" alt="ThideSoft">
          </v-row>
          <v-row class="mt-4">
            <p class="platform-text">PARTNER'S PORTAL</p>
          </v-row>
        </div>

        <span class="vertical-line"></span>

        <div class="box pa-8">
          <v-row class="mt-16">
            <p class="welcome-paragraph"  v-html="response.description"></p>
          </v-row>
        </div>

      </div>

      <div class="box pa-8">
        <v-row >
<!--          <img class="welcome-image" :src="WelcomeImagePath" alt="ThideSoft"> -->
          <img class="welcome-image"  :src="response.welcome_image" alt="ThideSoft">
        </v-row>
      </div>


    </div>
  </div>
</template>

<script>

import IconBase from "@/components/IconBase.vue"
import IconProgram from "@/components/icons/IconProgram.vue"
import WelcomeScreen from "@/assets/welcomePageBanner.png"
import ThideSoftScreen from "@/assets/ThideSoft_Welcome_Screen.png"




export default {
  name: 'WelcomeView',

  components: {
    IconBase,
    IconProgram,
    WelcomeScreen,
    ThideSoftScreen,
  },
  data() {
    return {
      response:[],
      ThidesoftImagePath: ThideSoftScreen,
      WelcomeImagePath:WelcomeScreen,
      client: null,
      firstName: null,
    };
  },
  watch: {
    User () {
      this.loadClientProfile()
    }
  },

  mounted () {
    this.$root.$on('refreshClientProfile', () => {
      this.loadClientProfile()
    })
  },


  created() {
    this.loadClientProfile()
    const t = this
    this.$Progress.start()
    this.axios.get(axios.defaults.endpoints.welcome_page.url, {})
      .then(function (response) {
        t.$Progress.finish()
        t.response = response.data.data
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    loadClientProfile () {
      const t = this
      this.$Progress.start()
      this.axios.get('private/client/show', {})
        .then(function (response) {
          t.client = response.data.data
          t.firstName = response.data.data.firstName

        })
        .catch(err => {
          console.log(err);
        });
    },
  }
}
</script>

<style>
.platform-text{
  margin-top: 15px;
  color: #689922;
  text-align: center;
  font-family: Helvetica;
  font-size: 23px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 4.6px;
  text-transform: uppercase;
  white-space: nowrap;
}
.vertical-line {
  margin-top: 40px;
  width: 1px;
  height: 212px;
  background-color: #000;
  margin-inline: 40px;
}
.section-text{
  color: #205023;
}
.greeting-text{
  color: #205023;
  font-family: Helvetica;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.welcome-paragraph{
  font-family: Helvetica;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  padding-left: 10px;
  color: #000;
  width: 90%;
}
.welcome-image{
  width: 90%;
}
</style>
