<template>
  <v-row :key="tableChangeDetector">
    <v-col v-for="item, index in $attrs.value" :key="index" class="col-12">
      <v-row>
        <v-col class="col-12" style="text-align: right;">
          <button type="button" v-if="!disabled && canDelete()"
            style="text-align: center; background-color: #950404;font-family: Helvetica;border: none;border-radius: 5px;font-size: 10px;font-weight: bold;color: white;padding: 5px 10px 5px 10px;"
            @click="removeItem(index)">DELETE</button>
        </v-col>
      </v-row>
      <slot name="collection-item" v-bind:fields="updateFields(fields, index)" v-bind:item="item" v-bind:index="index" v-bind:error-messages="getErrors(index, errorMessages)">
        <form-section :section="{ 'fields': fields }" v-bind:value="item" :error-messages="getErrors(index, errorMessages)"
          v-on:input="onInput($event, index)"></form-section>
      </slot>
    </v-col>
    <v-col class="col-12" v-if="!disabled">
      <slot name="collection-btn-add"><button type="button"
          style="text-align: center; background-color: #E0E0E0;font-family: Helvetica;border: none;border-radius: 5px;font-size: 10px;font-weight: bold;color: black;padding: 5px 10px 5px 10px;"
          @click="addItem">ADD MORE</button></slot>
    </v-col>
  </v-row>
</template>
<script>
import CollectionMixin from "@/mixins/CollectionMixin"

export default {
  props: ['fields', 'disabled', 'errorMessages'],
  data() {
    return {
      tableChangeDetector: 0
    }
  },
  mixins: [CollectionMixin],
  components: {
    FormSection: () => import('./FormSection.vue')
  },
  created() {
    if(this.$attrs.required && !this.$attrs.value) {
      this.$attrs.value = [{}]
    }
  },
  methods: {
    getErrors(tableindex,errorMessages) {
      return errorMessages && tableindex in errorMessages ? errorMessages[tableindex].fields : []
    },
    addItem() {
      if(!this.$attrs.value)
          this.$attrs.value=[]
      this.$attrs.value.push({});
      this.$emit('input', this.$attrs.value)
      this.tableChangeDetector++
    },
    removeItem(index) {
      this.$attrs.value.splice(index,1)
      this.$emit('input', this.$attrs.value)
      this.tableChangeDetector--
    },
    onInput($event, index) {
      this.$attrs.value[index] = $event
      this.$emit('input', this.$attrs.value)
    },
    canDelete() {
      return this.$attrs.value.length > 1
    }
  }
}
</script>
