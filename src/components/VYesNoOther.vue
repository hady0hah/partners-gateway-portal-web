<template>
  <div>
    <p style="color: #205023">{{ field.label }}
      <v-radio-group v-model="model" v-on:change="valueChange()" row>
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
        <v-radio label="Other" :value="null"></v-radio>
        <v-text-field v-if="model === null" v-model="model" label="Other"
          outlined></v-text-field>
      </v-radio-group>
    </p>
  </div>
</template>
<script>

export default {
  data() {
    return {
      model: null,
    }
  },
}
</script>