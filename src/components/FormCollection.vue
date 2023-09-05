<template>
  <v-row>
    <v-col v-for="item, index in $attrs.value" :key="index" class="col-12">
      <slot name="collection-item" v-bind:fields="updateFields(fields, index)" v-bind:item="item" v-bind:index="index">
        <form-section :section="{ 'fields': fields }" v-bind:value="item"
          v-on:input="onInput($event, index)"></form-section>
      </slot>
    </v-col>
    <v-col class="col-12">
      <slot name="collection-btn-add"><button type="button"
          style="text-align: center; background-color: #E0E0E0;font-family: Helvetica;border: none;border-radius: 5px;font-size: 10px;font-weight: bold;color: black;padding: 5px 10px 5px 10px;"
          @click="addItem">ADD MORE</button></slot>
    </v-col>
  </v-row>
</template>
<script>
import CollectionMixin from "@/mixins/CollectionMixin"

export default {
  props: ['fields'],
  data() {
    return {
    }
  },
  mixins: [CollectionMixin],
  components: {
    FormSection: () => import('./FormSection.vue')
  },
  methods: {
    addItem() {
      this.$attrs.value.push({});
      this.$emit('input', this.$attrs.value)
    },
    onInput($event, index) {
      this.$attrs.value[index] = $event
      this.$emit('input', this.$attrs.value)
    }
  }
}
</script>
