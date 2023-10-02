<template>
  <div>
    <v-text-field type="text" id="email" v-model="email" @input="validateEmail"  v-bind="$attrs" v-bind:value="$attrs.value" v-on:input="$emit('input', $event)">
    </v-text-field>
    <p v-if="!isValidEmail" class="error-message">
      Please enter a valid email address.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      isValidEmail: true,
    };
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isValidEmail = emailRegex.test(this.email);
    },
  },
};
</script>

<style>
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>






