<template>
  <v-text-field type="number" v-bind="$attrs" v-bind:value="$attrs.value" v-on:input="$emit('input', $event)">
</v-text-field>
</template>
<script>

export default {
  data() {
    return {
    }
  },
}
</script>
