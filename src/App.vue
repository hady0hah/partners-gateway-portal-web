<template>
  <v-app>
    <!--    TODO : make menu dynamic       -->
    <v-navigation-drawer v-model="drawer" app clipped v-if="User" width="210">
      <v-list dense nav class="mt-10">
        <v-list-item>
          <v-list-item-icon class="mr-4"><icon-base icon-name="program-overview"><icon-program /></icon-base></v-list-item-icon>
          <v-list-item-content><router-link to="/program_overview">Program Overview</router-link></v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-4"><icon-base icon-name="sales"><icon-deal /></icon-base></v-list-item-icon>
          <v-list-item-content><router-link to="/sales">Deal Registration</router-link></v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-4"><icon-base icon-name="sales"><icon-sales /></icon-base></v-list-item-icon>
          <v-list-item-content><router-link to="/sales_marketing">Sales & Marketing</router-link></v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-4"><icon-base icon-name="technical"><icon-product /></icon-base></v-list-item-icon>
          <v-list-item-content><router-link to="/products_technical">Products/Technical</router-link></v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-4"><icon-base icon-name="demo"><icon-demo /></icon-base></v-list-item-icon>
          <v-list-item-content><router-link to="/demo">Demo</router-link></v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon class="mr-4"><icon-base icon-name="program-overview"><icon-guide /></icon-base></v-list-item-icon>
          <v-list-item-content><router-link to="/howto">How To Guides</router-link></v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark clipped-left v-if="User">
      <!--<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
      <div v-if="client" class="partner-program-level-box" :style="'background-color: '+ProgramLevel(client['partnerProgramLevel.id']).color"></div>
      <div v-if="client" class="partner-program-level-text">
        <span>a</span>
        <span v-if="client['partnerProgramLevel.id'] == 1"> platinum </span>
        <span v-if="client['partnerProgramLevel.id'] == 2"> gold </span>
        <span v-if="client['partnerProgramLevel.id'] == 3"> silver </span>
        <span>partner of</span>
      </div>
      <div class="partner-program-level-logo">
        <v-img
          alt="Thidesoft Logo"
          class="shrink mr-2"
          contain
          src="./assets/Thidesoft_Screen_H_white.png"
          transition="scale-transition"
          light
          width="140"
        />
      </div>

      <v-spacer></v-spacer>

      <div v-if="User">
        <div class="d-flex align-center">
          <v-icon color="white" class="mr-2" x-large>mdi-account-circle-outline</v-icon>
          <div class="mr-2" v-if="client && client.firstName">
            Hello, {{ client.firstName }}
            <br>
            {{ friendlyDate(new Date()) }}
          </div>
          <v-menu nudge-bottom="58" :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                icon
                v-bind="attrs"
                v-on="on"
                x-large
              >
                <v-icon color="white">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list color="#e7ede7" width="500" class="user-info-list">
              <v-list-item>
                <v-list-item-title class="mr-2">Partner program level</v-list-item-title>
                <v-list-item-subtitle v-if="client">
                  <v-icon :color="ProgramLevel(client['partnerProgramLevel.id']).color">mdi-circle</v-icon>
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Contract Expiry Date</v-list-item-title>
                <v-list-item-subtitle v-if="client">{{ friendlyDate(client.contractExpiryDate.date) }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Turnover generated</v-list-item-title>
                <v-list-item-subtitle v-if="client">{{ client.attributes.turnover | currency }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Registered Deals</v-list-item-title>
                <v-list-item-subtitle v-if="client && client.attributes && client.attributes.registered_deals">{{ client.attributes.registered_deals }} out of {{ client.attributes.total_deals }}</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>Scanned Contract download</v-list-item-title>
                <v-list-item-subtitle><v-btn elevation="2" x-small @click="downloadFile(client.file)">Download</v-btn></v-list-item-subtitle>
              </v-list-item>
              <v-list-item v-if="client && client.pricelist" >
                <v-list-item-title>Pricelist</v-list-item-title>
                <v-select
									:items="client.pricelist"
									item-text="region"
									item-value="region"
									label="Select Region"
									v-model="region"
									class="mr-2"
								></v-select>
								<v-list-item-subtitle><v-btn elevation="2" x-small @click="downloadPricelist()" v-if="region">Download</v-btn></v-list-item-subtitle>
              </v-list-item>
              <v-list-item link @click="logout">
                <v-list-item-title>
                  <v-icon>mdi-logout</v-icon>
                  Logout
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
        <vue-progress-bar></vue-progress-bar>
      </v-container>
    </v-main>

    <v-footer app class="d-flex justify-space-between" color="#292929" dark>
      © 2022 potech global. All rights reserved. Version {{ $store.getters.appVersion }}
      <div>
        <v-btn href="https://ob-soft.com/OBSoft/#contact" target="_blank" min-width=20 plain><span class="">Contact us</span></v-btn>
        <v-btn href="https://www.facebook.com/potechglobal" target="_blank" max-width=20  plain><v-icon color="white" large>mdi-facebook</v-icon></v-btn>
        <v-btn href="https://www.linkedin.com/company/potech-consulting" max-width=20 target="_blank" plain><v-icon color="white" class="" large>mdi-linkedin</v-icon></v-btn>
        <v-btn href="https://twitter.com/potechglobal" target="_blank" max-width=20 plain><v-icon color="white" class="" large>mdi-twitter</v-icon></v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters } from "vuex";
  import { mapActions } from "vuex";
  import IconBase from "./components/IconBase.vue"
  import IconDashboard from "./components/icons/IconDashboard.vue"
  import IconDemo from "./components/icons/IconDemo.vue"
  import IconDocumentation from "./components/icons/IconDocumentation.vue"
  import IconMDF from "./components/icons/IconMDF.vue"
  import IconDeal from "./components/icons/IconDeal.vue"
  import IconSales from "./components/icons/IconSales.vue"
  import IconProduct from "./components/icons/IconProduct.vue"
  import IconProgram from "./components/icons/IconProgram.vue"
  import IconGuide from "./components/icons/IconGuide.vue"


  export default {
    name: 'App',

    components: {
      IconBase,
      IconDashboard,
      IconDemo,
      IconDocumentation,
      IconMDF,
      IconSales,
      IconDeal,
      IconProduct,
      IconProgram,
      IconGuide
    },

    data: () => ({
      drawer: false,
      client: null,
      programLevel: null,
      region: null
    }),

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

    computed: {
      ...mapGetters({
        User: "StateUser",
        ProgramLevels: "StateProgramLevels",
        ProgramLevel: "StateProgramLevel"
      })
    },

    created() {
      this.drawer = true

      this.loadClientProfile()
    },

    methods: {
      ...mapActions(["StateSetProgramLevels"]),

      loadClientProfile () {
        if (!this.User)
          return;

        const t = this
        this.$Progress.start()
        this.axios.get('private/client/show', {})
        .then(function (response) {
          t.client = response.data.data
          t.axios.get('private/programLevel/list', {})
          .then(function (response) {
            t.$Progress.finish()
            t.StateSetProgramLevels(response.data.data)
          })
          .catch(err => {
            console.log(err);
          });
        })
        .catch(err => {
          console.log(err);
        });
      },

      downloadPricelist () {
        this.client.pricelist.forEach ((pricelist) => {
          if (pricelist.region == this.region)
            this.downloadFile(pricelist.file)
        });
      },

      downloadFile (file) {
        this.axios.get(file, { responseType: 'blob' })
          .then(response => {
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = "download"
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error)
      },

      logout: function () {
        this.$router.push('/login')
        this.$store.dispatch('StateLogout')
      }
    }
  };
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .partner-program-level-box {
    background-color: red;
    width: 35px;
    height: 64px;
    margin-left: -16px;
  }

  .partner-program-level-text {
    font-size: 10px;
    margin-left: 10px;
    margin-top: -30px;
  }

  .partner-program-level-logo {
    margin-left: -60px;
    margin-top: 15px;
  }

  .container {
    margin: auto;
  }

  .v-menu__content .user-info-list  {
    padding-left: 20px !important;
  }

  .user-info-list .v-list-item {
    padding: 20px !important;
  }

  .box {
    background-color: white;
    margin-top: 10px !important;
    padding: 20px !important;
  }

  .v-main {
    background-color: #f2f2f2;
  }

  .v-navigation-drawer {
    a {
      font-weight: normal;
      font-family: Helvetica;
      color: #2c3e50;
      text-decoration: none;

      &.router-link-exact-active {
        color: #42b983;

      }
    }
  }

  .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
    text-align: center !important;
  }

  .v-chip {
    width: 100px;
  }

  .v-chip__content {
    margin: auto;
  }

  .v-input__control, .v-select__selections {
    width: 150px;
  }
</style>
