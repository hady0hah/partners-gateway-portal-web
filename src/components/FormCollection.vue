<template>
  <form-section :section="{'fields':fields}"></form-section>
</template>
<script>
export default {
  props:['fields'],
  components : {
    FormSection: () => import('./FormSection.vue')
  },
}
</script>
