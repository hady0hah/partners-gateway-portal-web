<template>
  <v-row>
    <v-col v-for="item,index in items" :key="index" class="col-12">
      <slot name="collection-item"><form-section :section="{ 'fields': fields }" v-bind:value="item" v-on:input="onInput($event, index)"></form-section></slot>
    </v-col>
    <v-col class="col-12">
      <slot name="collection-btn-add"><button type="button" style="text-align: center; background-color: #E0E0E0;font-family: Helvetica;border: none;border-radius: 5px;font-size: 10px;font-weight: bold;color: black;padding: 5px 10px 5px 10px;" @click="addItem">ADD MORE</button></slot>
    </v-col>
  </v-row>
  
  
</template>
<script>
export default {
  props: ['fields'],
  data() {
    return {
      items: this.$attrs.value?this.$attrs.value:[]
    }
  },
  components: {
    FormSection: () => import('./FormSection.vue')
  },
  methods: {
    addItem() {
      this.items.push({});
    },
    onInput($event, index) {
      this.items[index] = $event
      this.$emit('input', this.items)
    }
  }
}
</script>
