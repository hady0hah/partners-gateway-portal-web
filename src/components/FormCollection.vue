<template>
  <form-section :section="{ 'fields': fields }" v-bind:value="$attrs.value" v-on:input="$emit('input', $event)"></form-section>
</template>
<script>
export default {
  props: ['fields'],
  components: {
    FormSection: () => import('./FormSection.vue')
  },
}
</script>
