<template>
  <div class="login-container">
    <v-img
      alt="Thidesoft Logo"
      class="login-logo"
      contain
      src="../assets/Group_670@2x.png"
      transition="scale-transition"
      width="240"
    />
    <div class="green-box">
      <v-card elevation="0" class="login-card pa-4 ma-auto mt-20 " width="500" rounded dark>
        <v-container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col>
              <v-form
                ref="form"
                lazy-validation
              >
                <v-text-field
                  v-model="username"
                  v-if="step == 0"
                  :append-icon="'mdi-chevron-right'"
                  @click:append="username ? step++ : 0"
                  v-on:keyup.enter="username ? step++ : 0"
                  :rules="[v => !!v && (v || '').indexOf(' ') < 0 || 'Field is required']"
                  label="Username"
                  required
                ></v-text-field>
    
                <p v-if="step == 2">{{ message }}</p>
                <v-text-field
                  v-model="token"
                  v-if="step == 2"
                  :rules="[v => !!v || 'Field is required']"
                  label="Token"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  v-if="step > 0"
                  :append-icon="'mdi-chevron-right'"
                  @click:append="proceed"
                  v-on:keyup.enter="proceed"
                  :type="'password'"
                  :rules="[v => !!v || 'Field is required']"
                  label="Password"
                  required
                ></v-text-field>
        
                <v-btn v-if="step == 1" color="primary" class="mr-4 btn-forgot" @click="forgotPassword" x-small plain>Forgot Password?</v-btn>
      
                <v-alert v-if="error" class="error-box" color="red lighten-2" dark>
                  {{ error }}
                </v-alert>       

                <v-btn v-if="step >= 1" color="primary" class="mr-4" @click="step--;error=null" x-small>Back</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: 'LoginView',
    components: {
    },

    data: () => ({
      username: "",
      password: "",
      token: "",
      data: {},
      step: 0,
      error: null,
      message: ""
    }),
    methods: {
      ...mapActions(["StateLogin"]),
      proceed() {
        if (this.$refs.form.validate()) {
          const t = this
          if (this.step == 1) {
            this.$Progress.start()
            const formData = new FormData();
            formData.append("username", this.username);
            formData.append("password", this.password);
            this.axios.post('login', formData)
            .then(function (response) {
              t.$Progress.finish()
              t.login(response.data.data)
            })
            .catch(err => {
              console.log(err)
              t.$Progress.finish()
              //t.error = "Invalid username/password combination"
            });
          } else {
            this.$Progress.start()
            const formData = new FormData();
            formData.append("username", this.username);
            formData.append("token", this.token);
            formData.append("password", this.password);
            this.axios.post('reset_password', formData)
            .then(function (response) {
              t.$Progress.finish()
              t.login(response.data.data)
            })
            .catch(err => {
              t.$Progress.finish()
              //t.error = "Invalid token"
            });
          }
        }
      },
      login (data) {
        this.StateLogin({ id: data.id, token: data.token, wsse: data.wsse, username: data.username });
        this.$router.push("/");
      },
      forgotPassword () {
        const t = this
        this.$Progress.start()
          this.axios.post('forgot_password?username='+this.username, {})
          .then(function (response) {
            t.message = response.data.message
            t.$Progress.finish()
            t.step++
          })
          .catch(err => {
            t.$Progress.finish()
          });  
      }
    }
  };
</script>

<style lang="scss">
  .login-container {
    background-color: white;
    height: calc(100vh + 20px);
    margin-top: -75px;
    margin-left: -12px;
    margin-right: -12px;
    margin-bottom: -30px;
  }
  
  .login-logo {
    padding-top: 300px;
    margin-left: 100px;
  }
  
  .green-box {
    padding: 30px;
    width: 100%;
    background-image: url('../assets/background.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: #638835;
    height: 450px;
    display:flex;
    align-items:center;
    border-bottom: 30px solid #205023;
  }
  
  .v-sheet.v-card.login-card {
    background-color: rgba(255, 255, 255, 0.4) !important;
    margin: auto !important;
    height: 300px;
    border-radius: 20px !important;
  }
  
  .btn-forgot {
    float: right;
  }
  
  .error-box {
    margin-top: 40px;
  }
</style>

