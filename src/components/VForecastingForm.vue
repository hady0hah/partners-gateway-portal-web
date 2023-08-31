<template>
  <v-row >
    <v-col class="col-12 col-md-4">

      <form-field
        :field="fields['name']" :form="form" :form_name="form_name" outlined>
      </form-field>
      <form-field
        :field="fields['customer']" :form="form" :form_name="form_name">
      </form-field>
      <form-field
        :field="fields['reseller']" :form="form" :form_name="form_name">
      </form-field>
      <form-field
        :field="fields['country']" :form="form" :form_name="form_name" outlined>
      </form-field>
    </v-col>
    <v-col class="col-12 col-md-4">
      <table style="margin-top: 15px" class="products-table"><thead><tr><th>{{fields['reviewProducts']['fields']['product'].label }}</th><th>{{fields['reviewProducts']['fields']['quantity'].label }}</th></tr></thead>
        <tbody ><tr><td>
          <form-field :field="fields['reviewProducts']['fields']['product']" :form="form" :form_name="form_name" outlined>
          </form-field></td><td style="padding: 5px">
          <form-field
            :field="fields['reviewProducts']['fields']['quantity']" :form="form" :form_name="form_name" outlined>
          </form-field></td></tr></tbody>
      </table>
    </v-col>
    <v-col class="col-12 col-md-4">

      <VYesNoOther v-bind="fields['dealRegistrationOption']">

      </VYesNoOther>

      <form-field
        :field="fields['stage']" :form="form" :form_name="form_name" outlined>
      </form-field>

      <VDatePicker v-bind="fields['closeDate']" outlined>

      </VDatePicker>

      <table>
        <tr>
          <td>
            <p class="mb-4" style="color: #205023">{{ fields['amount'].label }}</p>
          </td>
          <td style="padding-left: 35px">
            <v-text-field
              type="number"
              :field="fields['amount']"
              v-model="form[fields['amount'].name]"
              outlined
            >
            </v-text-field>
          </td>
        </tr>
      </table>

      <form-field
        :field="fields['remarks']" :form="form" :form_name="form_name" outlined>
      </form-field>
    </v-col>
  </v-row>
</template>
<script>
// This form is rendered statically due to its specific design and cannot be dynamically generated using the baseForm Generator
import FormField from "@/components/FormField";
import FormMixin from "@/mixins/FormMixin";
import VDatePicker from "@/components/DatePicker";
import VYesNoOther from "@/components/VYesNoOther"

export default {
  // props : ['section','form_name'],
  props : ['fields'],
  mixins : [FormMixin],
  components : {
    FormField,
    VDatePicker,
    VYesNoOther,
  },
  data: () => ({
    model: [],
    radio: [],
    date:'',
    form_name:'Forecasting_view',
  }),
  created() {
  },
}
</script>
<style>
.products-table th,.products-table td{
  border-bottom:1px solid #E0E0E0;
  padding-bottom:10px;
  padding-top:10px;
}
</style>
