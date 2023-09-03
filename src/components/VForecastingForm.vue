<template>
  <v-row >
    <v-row v-for="(component, index) in formComponents" :key="index">
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
        <table style="margin-top: 15px" class="products-table">
          <thead>
          <tr>
            <th>{{ fields['reviewProducts']['fields']['product'].label }}</th>
            <th>{{ fields['reviewProducts']['fields']['quantity'].label }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row, index) in tableRows" :key="index">
            <td>
              <form-field
                :field="fields['reviewProducts']['fields']['product']"
                :form="form"
                :form_name="form_name"
                outlined
              ></form-field>
            </td>
            <td style="padding: 5px">
              <form-field
                :field="fields['reviewProducts']['fields']['quantity']"
                :form="form"
                :form_name="form_name"
                outlined
              ></form-field>
            </td>
          </tr>
          </tbody>
        </table>
        <button  type="button" style="text-align: center; background-color: #E0E0E0;font-family: Helvetica;border: none;border-radius: 5px;font-size: 10px;font-weight: bold;color: black;padding: 5px 10px 5px 10px;" @click="addRow">ADD MORE</button>
      </v-col>
      <v-col class="col-12 col-md-4">

      <yes-no-other v-bind="fields['dealRegistrationOption']">

      </yes-no-other>

        <form-field
          :field="fields['stage']" :form="form" :form_name="form_name" outlined>
        </form-field>

      <date-picker v-bind="fields['closeDate']" outlined>

      </date-picker>

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
    <span class="horizontal-line"></span>
    </v-row>
    <button  type="button" style="text-align: center; background-color: #E0E0E0;font-family: Helvetica;border: none;border-radius: 5px;font-size: 10px;font-weight: bold;color: black;padding: 5px 10px 5px 10px;" @click="addForm">ADD MORE</button>
  </v-row>
</template>
<script>
// This form is rendered statically due to its specific design and cannot be dynamically generated using the baseForm Generator
import FormField from "@/components/FormField";
import FormMixin from "@/mixins/FormMixin";
import DatePicker from "@/components/DatePicker";
import YesNoOther from "@/components/VYesNoOther"

export default {
  props : ['fields'],
  mixins : [FormMixin],
  components : {
    FormField,
    DatePicker,
    YesNoOther,
  },
  data: () => ({
    tableRows: [{}],
    formComponents: [{}],
    model: [],
    radio: [],
    date:'',
    form_name:'forecasting_view',
  }),
  methods:{
    addRow() {
      this.tableRows.push({});
    },
    addForm() {
      this.formComponents.push({});
    },
  },
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
.horizontal-line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
  margin-top: 40px;
  margin-bottom: 40px;
}
</style>
