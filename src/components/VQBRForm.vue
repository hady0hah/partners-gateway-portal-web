<template>
  <form-collection :fields="fields" v-model="$attrs.value" :disabled="disabled" :error-messages="errorMessages.fields">
    <template v-slot:collection-item="{ fields, item, index, errorMessages }">
      <v-row>
        <v-col class="col-12 col-md-4">
          <form-field :field="fields['name']" :form_name="form_name" v-bind:value="item.name"
            :error-messages="getErrors('name', errorMessages)" v-on:input="onInput($event, index, 'name')">
          </form-field>
          <form-field :field="fields['customer']" :form_name="form_name" v-bind:value="item.customer"
            :error-messages="getErrors('customer', errorMessages)" v-on:input="onInput($event, index, 'customer')">
          </form-field>
          <form-field :field="fields['reseller']" :form_name="form_name" v-bind:value="item.reseller"
            :error-messages="getErrors('reseller', errorMessages)" v-on:input="onInput($event, index, 'reseller')">
          </form-field>
          <form-field :field="fields['country']" :form_name="form_name" v-bind:value="item.country"
            :error-messages="getErrors('country', errorMessages)" v-on:input="onInput($event, index, 'country')">
          </form-field>
        </v-col>
        <v-col class="col-12 col-md-4">
          <product-list-form :disabled="disabled" :first_field_name="'product'" :second_field_name="'quantity'"
            :error-messages="getErrors('reviewProducts', errorMessages).fields"
            :fields="updateFields(fields['reviewProducts'].fields, index)" :form_name="form_name"
            v-bind="fields['reviewProducts']" v-bind:value="item.reviewProducts"
            v-on:input="onInput($event, index, 'reviewProducts')"></product-list-form>
        </v-col>
        <v-col class="col-12 col-md-4">

          <yes-no-other :field="{ radio: fields['dealRegistrationOption'], other: fields['otherOption'] }"
            v-bind="fields['dealRegistrationOption']"
            v-bind:value="{ radio: item.dealRegistrationOption, other: item.otherOption }"
            v-on:input="onInputObject($event, index)"></yes-no-other>

          <form-field :field="fields['stage']" :form_name="form_name" outlined v-bind:value="item.stage"
            :error-messages="getErrors('stage', errorMessages)" v-on:input="onInput($event, index, 'stage')">
          </form-field>

          <date-picker :field="fields['closeDate']" outlined :name="fields['closeDate'].full_name"
            :error-messages="getErrors('closeDate', errorMessages)" v-bind:value="item.closeDate"
            v-on:input="onInput($event, index, 'closeDate')">

          </date-picker>

          <table>
            <tr>
              <td>
                <p class="mb-4" style="color: #205023">{{ fields['amount'].label }}</p>
              </td>
              <td style="padding-left: 35px">
                <v-text-field type="number" :field="fields['amount']" :name="fields['amount'].full_name" outlined
                  :error-messages="getErrors('amount', errorMessages)" v-bind:value="item.amount"
                  v-on:input="onInput($event, index, 'amount')"
                  :rules="[v => (fields['amount'].required && !!v || 'Field is required')]">
                </v-text-field>
              </td>
            </tr>
          </table>

          <form-field :field="fields['remarks']" :form_name="form_name" outlined v-bind:value="item.remarks"
            :error-messages="getErrors('remarks', errorMessages)" v-on:input="onInput($event, index, 'remarks')">
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
import ProductListForm from "./ProductListForm.vue";

export default {
  props: ['fields', 'disabled', 'errorMessages'],
  components: {
    FormCollection,
    FormField,
    DatePicker,
    YesNoOther,
    ProductListForm,
  },
  mixins: [CollectionMixin],
  data() {
    return {
      form_name: 'QBR_view',
    }
  },
  created() {
    if (this.$attrs.required && !this.$attrs.value) {
      this.$attrs.value = [{}]
    }
  },
  methods: {
    getErrors(fieldName, errorMessages) {
      return errorMessages && fieldName in errorMessages ? errorMessages[fieldName] : []
    },
    onInput($event, index, fieldName) {
      if (!(index in this.$attrs.value))
        this.$attrs.value[index] = {}
      this.$attrs.value[index][fieldName] = $event
      this.$emit('input', this.$attrs.value)
    },

    onInputObject($event, index) {
      if (!(index in this.$attrs.value))
        this.$attrs.value[index] = {}
      this.$attrs.value[index] = { ...this.$attrs.value[index], ...$event }
      this.$emit('input', this.$attrs.value)
    },
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
