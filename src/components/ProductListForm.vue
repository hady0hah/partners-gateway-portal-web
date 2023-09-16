<template>
  <table style="margin-top: 15px; width: 100%" class="products-table" :key="tableChangeDetector">
    <thead>
      <tr>
        <th>{{ fields['product'].label }}</th>
        <th>{{ fields['quantity'].label }}</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(tableitem, tableindex) in $attrs.value" :key="tableindex">
        <td>
          <form-field :field="updateField(fields['product'], tableindex)"
            :form_name="form_name" v-bind:value="tableitem.product"
            v-on:input="onInputTable($event, tableindex, 'product')"></form-field>
        </td>
        <td style="padding: 5px">
          <form-field :field="updateField(fields['quantity'], tableindex)"
            :form_name="form_name" v-bind:value="tableitem.quantity"
            v-on:input="onInputTable($event, tableindex, 'quantity')"></form-field>
        </td>
        <td><button type="button"
            style="text-align: center; background-color: #c30404;font-family: Helvetica;border: none;border-radius: 100%;font-size: 12px;font-weight: bold;color: white;padding: 0 2px;width:18px;height:18px"
            @click="removeTableItem(tableindex)">X</button></td>
      </tr>
    </tbody>
    <tfoot v-if="!disabled">
      <tr>
        <td colspan="3"><button type="button"
            style="text-align: center; background-color: #E0E0E0;font-family: Helvetica;border: none;border-radius: 5px;font-size: 10px;font-weight: bold;color: black;padding: 5px 10px 5px 10px;"
            @click="addTableItem()">ADD MORE</button></td>
      </tr>
    </tfoot>
  </table>
</template>
<script>
import CollectionMixin from '@/mixins/CollectionMixin'
import FormField from './FormField.vue'

export default {
  props : ['fields','disabled', 'form_name'],
  data() {
    return {
      tableChangeDetector: 0
    }
  },
  mixins : [CollectionMixin],
  components : {
    FormField
  },
  methods: {
    onInputTable($event, tableindex, fieldName) {
      this.$attrs.value[tableindex][fieldName] = $event
      this.$emit('input', this.$attrs.value)
      this.tableChangeDetector++
    },
    addTableItem() {
      if (!(this.$attrs.value))
        this.$attrs.value = []
      this.$attrs.value.push({});
      this.$emit('input', this.$attrs.value)
      this.tableChangeDetector++
    },
    removeTableItem(index) {
      this.$attrs.value = this.$attrs.value.splice(index,1)
      this.tableChangeDetector++
    }
  }
}
</script>