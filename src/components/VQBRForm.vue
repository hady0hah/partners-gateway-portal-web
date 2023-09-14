<template>
  <form-collection :fields="fields" :key="tableChangeDetector" v-model="$attrs.value" :disabled="disabled">
    <template v-slot:collection-item="{ fields, item, index }" >
      <v-row>
        <v-col class="col-12 col-md-4">
          <form-field :field="fields['name']" :form_name="form_name" v-bind:value="item.name" v-on:input="onInput($event, index, 'name')">
          </form-field>
          <form-field :field="fields['customer']" :form_name="form_name" v-bind:value="item.customer" v-on:input="onInput($event, index, 'customer')">
          </form-field>
          <form-field :field="fields['reseller']" :form_name="form_name" v-bind:value="item.reseller" v-on:input="onInput($event, index, 'reseller')">
          </form-field>
          <form-field :field="fields['country']" :form_name="form_name" v-bind:value="item.country" v-on:input="onInput($event, index, 'country')">
          </form-field>
        </v-col>
        <v-col class="col-12 col-md-4">
          <table style="margin-top: 15px" class="products-table">
            <thead>
              <tr>
                <th>{{ fields['reviewProducts']['fields']['product'].label }}</th>
                <th>{{ fields['reviewProducts']['fields']['quantity'].label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tableitem, tableindex) in item.reviewProducts" :key="tableindex">
                <td>
                  <form-field :field="updateField(updateField(fields['reviewProducts']['fields']['product'],index),tableindex)" :form_name="form_name"
                    v-bind:value="tableitem.product" v-on:input="onInputTable($event, index, tableindex, 'product')"></form-field>
                </td>
                <td style="padding: 5px">
                  <form-field :field="updateField(updateField(fields['reviewProducts']['fields']['quantity'],index),tableindex)" :form_name="form_name"
                    v-bind:value="tableitem.quantity" v-on:input="onInputTable($event, index, tableindex, 'quantity')"></form-field>
                </td>
              </tr>
            </tbody>
            <tfoot v-if="!disabled">
              <tr>
                <td colspan="2"><button type="button" style="text-align: center; background-color: #E0E0E0;font-family: Helvetica;border: none;border-radius: 5px;font-size: 10px;font-weight: bold;color: black;padding: 5px 10px 5px 10px;" @click="addTableItem(index)">ADD MORE</button></td>
              </tr>
            </tfoot>
          </table>
        </v-col>
        <v-col class="col-12 col-md-4">

          <yes-no-other v-bind="fields['dealRegistrationOption']" :field="fields['dealRegistrationOption']" :name="fields['dealRegistrationOption'].full_name" v-bind:value="item.dealRegistrationOption" v-on:input="onInput($event, index, 'dealRegistrationOption')">

          </yes-no-other>

          <form-field :field="fields['stage']" :form_name="form_name" outlined  v-bind:value="item.stage" v-on:input="onInput($event, index, 'stage')">
          </form-field>

          <date-picker :field="fields['closeDate']" outlined :name="fields['closeDate'].full_name" v-bind:value="item.closeDate" v-on:input="onInput($event, index, 'closeDate')">

          </date-picker>

          <table>
            <tr>
              <td>
                <p class="mb-4" style="color: #205023">{{ fields['amount'].label }}</p>
              </td>
              <td style="padding-left: 35px">
                <v-text-field type="number" :field="fields['amount']" :name="fields['amount'].full_name" outlined v-bind:value="item.amount" v-on:input="onInput($event, index, 'amount')">
                </v-text-field>
              </td>
            </tr>
          </table>

          <form-field :field="fields['remarks']" :form_name="form_name" outlined v-bind:value="item.remarks" v-on:input="onInput($event, index, 'remarks')">
          </form-field>
        </v-col>
        <span class="horizontal-line"></span>
      </v-row>
    </template>
  </form-collection>
</template>
<script>
// This form is rendered statically due to its specific design and cannot be dynamically generated using the baseForm Generator
import CollectionMixin from "@/mixins/CollectionMixin"
import FormCollection from "./FormCollection.vue";
import FormField from "@/components/FormField";
import DatePicker from "@/components/DatePicker";
import YesNoOther from "@/components/VYesNoOther"

export default {
  props: ['fields', 'disabled'],
  components: {
    FormCollection,
    FormField,
    DatePicker,
    YesNoOther,
  },
  mixins: [CollectionMixin],
  data() {
    return {
      form_name: 'QBR_view',
      tableChangeDetector: 0,
    }
  },
  methods: {
    onInput($event, index, fieldName) {
      if (!(index in this.$attrs.value))
        this.$attrs.value[index] = {}
      this.$attrs.value[index][fieldName] = $event
      this.$emit('input', this.$attrs.value)
    },
    onInputTable($event, index, tableindex, fieldName) {
      if (!(index in this.$attrs.value))
        this.$attrs.value[index] = {}
      if(!(tableindex in this.$attrs.value[index]['reviewProducts']))
        this.$attrs.value[index]['reviewProducts'][tableindex] = {}
      this.$attrs.value[index]['reviewProducts'][tableindex][fieldName] = $event
      this.$emit('input', this.$attrs.value)
      this.tableChangeDetector++
    },
    addTableItem(index) {
      if (!(index in this.$attrs.value))
        this.$attrs.value[index] = {}
      if (!('reviewProducts' in this.$attrs.value[index]))
        this.$attrs.value[index]['reviewProducts'] = []
      this.$attrs.value[index]['reviewProducts'].push({});
      this.$emit('input', this.$attrs.value)
      this.tableChangeDetector++
    },
  },
  created() {
  },
}
</script>
<style>
.products-table th,
.products-table td {
  border-bottom: 1px solid #E0E0E0;
  padding-bottom: 10px;
  padding-top: 10px;
}

.horizontal-line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
