<template>
  <table style="margin-top: 15px; width: 100%" class="products-table" :key="tableChangeDetector">
    <thead>
    <tr>
      <th>{{ fields[first_field_name].label }}</th>
      <th v-if="second_field_name">{{ fields[second_field_name].label }}</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(tableitem, tableindex) in $attrs.value" :key="tableindex">
      <td>
        <form-field :field="updateField(fields[first_field_name], tableindex)"
                    :form_name="form_name" v-bind:value="parseValue(tableitem,first_field_name)"
                    v-on:input="onInputTable($event, tableindex, first_field_name)"></form-field>
      </td>
      <td v-if="second_field_name" style="padding: 5px" >
        <form-field :field="updateField(fields[second_field_name], tableindex)"
                    :form_name="form_name" v-bind:value="parseValue(tableitem,second_field_name)"
                    v-on:input="onInputTable($event, tableindex, second_field_name)"></form-field>
      </td>
      <td><button v-if="!disabled && canDelete()" type="button"
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
  props : ['fields','disabled', 'form_name','first_field_name','second_field_name'],
  data() {
    return {
      tableChangeDetector: 0
    }
  },
  mixins : [CollectionMixin],
  components : {
    FormField
  },
  created() {
    if(this.$attrs.required && !this.$attrs.value) {
      this.$attrs.value = [{}]
    }
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
      this.$attrs.value.splice(index,1)
      this.$emit('input', this.$attrs.value)
      this.tableChangeDetector++
    },
    parseValue(tableitem,fieldName){
      const fieldNameObject = fieldName.replace("'", "").replace(".", "");
      return tableitem[fieldNameObject]
    },
    canDelete() {
      return this.$attrs.value.length > 1
    }
  }
}
</script>
