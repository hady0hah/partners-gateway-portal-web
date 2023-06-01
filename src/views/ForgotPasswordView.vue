<template>
  <v-form
    ref="form"
    lazy-validation
  >
    <h2>Forgot Password</h2>
    <v-text-field
      v-model="username"
      :rules="[v => !!v && (v || '').indexOf(' ') < 0 || 'Username is required']"
      label="Username"
      required
    ></v-text-field>

    <v-btn class="mr-4" @click="resetPassword">Reset</v-btn>
  </v-form>
</template>

<script>

  export default {
    name: 'forgotPasswordView',
    components: {
    },

    data: () => ({
      username: "z.medlej@ob-soft.com"
    }),
    methods: {
      async resetPassword() {
      }
    }
  };
</script>
