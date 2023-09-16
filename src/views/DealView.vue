<template>
  <parent-form lazy-validation :config="formConfig" ref="formRef">
    <template v-slot:header-left-post-back>
    <span></span>
    </template>
    <template v-slot:form-sections="{ form }">
      <v-col class="box col-12" v-for="section, i in form.form" :key="i">
        <form-section :section="section">
          <template v-slot:section-fields="{ section }">

            <v-row class="box">
              <v-row v-if="section.name === 'deal_details'">
                <v-col class="col-12 col-md-4">
                  <form-field :field="section.fields['accountManager']" :form_name="formConfig.form_name"
                              v-bind:value="getFieldValue(section.fields['accountManager'])"
                              v-on:input="onInput(section.fields['accountManager'], $event)" outlined></form-field>
                  <form-field :field="section.fields['name']" :form_name="formConfig.form_name"
                              v-bind:value="getFieldValue(section.fields['name'])"
                              v-on:input="onInput(section.fields['name'], $event)"></form-field>
                  <form-field :field="section.fields['region']" :form_name="formConfig.form_name"
                              v-bind:value="getFieldValue(section.fields['region'])"
                              v-on:input="onInput(section.fields['region'], $event)" outlined></form-field>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <form-field :field="section.fields['dealStatus']" :form_name="formConfig.form_name"
                              v-bind:value="getFieldValue(section.fields['dealStatus'])"
                              v-on:input="onInput(section.fields['dealStatus'], $event)" outlined></form-field>
                </v-col>
                <v-col class="col-12 col-md-4">
                  <date-picker :field="section.fields['renewalDate']" v-bind:value="getFieldValue(section.fields['renewalDate'])"
                               v-on:input="onInput(section.fields['renewalDate'], $event)" outlined>
                  </date-picker>
                  <form-field v-if="section.fields['reseller']" :field="section.fields['reseller']" :form_name="formConfig.form_name"
                              v-bind:value="getFieldValue(section.fields['reseller'])"
                              v-on:input="onInput(section.fields['reseller'], $event)"></form-field>
                </v-col>
              </v-row>

              <v-row v-if="section.name === 'end_customer_information'">
                <v-col class="col-12 col-md-4">
                  <form-field :field="section.fields['contact']" :form_name="formConfig.form_name"
                              v-bind:value="getFieldValue(section.fields['contact'])"
                              v-on:input="onInput(section.fields['contact'], $event)" outlined></form-field>
                </v-col>
              </v-row>

              <v-row v-if="section.name === 'opportunity_information'" class="box">
                <v-row>
                  <v-col class="col-12 col-md-4">
                    <form-field :field="section.fields['opportunity_desc']" :form_name="formConfig.form_name"
                                v-bind:value="getFieldValue(section.fields['opportunity_desc'])"
                                v-on:input="onInput(section.fields['opportunity_desc'], $event)" outlined></form-field>
                    <form-field :field="section.fields['budget']" :form_name="formConfig.form_name"
                                v-bind:value="getFieldValue(section.fields['budget'])"
                                v-on:input="onInput(section.fields['budget'], $event)" outlined></form-field>
                    <form-field :field="section.fields['product']" :form_name="formConfig.form_name"
                                v-bind:value="getFieldValue(section.fields['product'])"
                                v-on:input="onInput(section.fields['product'], $event)" outlined></form-field>
                  </v-col>
                  <v-col class="col-12 col-md-4">
                    <date-picker :field="section.fields['startDate']" v-bind:value="getFieldValue(section.fields['startDate'])"
                                 v-on:input="onInput(section.fields['startDate'], $event)" outlined>
                    </date-picker>
                    <form-field :field="section.fields['initiated_by']" :form_name="formConfig.form_name"
                                v-bind:value="getFieldValue(section.fields['initiated_by'])"
                                v-on:input="onInput(section.fields['initiated_by'], $event)"></form-field>
                    <date-picker :field="section.fields['lastMeetingDate']"
                                 v-bind:value="getFieldValue(section.fields['lastMeetingDate'])"
                                 v-on:input="onInput(section.fields['lastMeetingDate'], $event)" outlined>
                    </date-picker>
                    <v-yes-no-other v-bind="section.fields['technicalPresentationOption']" :field="section.fields['technicalPresentationOption']"
                                    v-bind:value="getFieldValue(section.fields['technicalPresentationOption'])"
                                    v-on:input="onInput(section.fields['technicalPresentationOption'], $event)">
                    </v-yes-no-other>
                    <form-field :field="section.fields['quantity']" :form_name="formConfig.form_name"
                                v-bind:value="getFieldValue(section.fields['quantity'])"
                                v-on:input="onInput(section.fields['quantity'], $event)" outlined></form-field>
                    <form-field :field="section.fields['competitors']" :form_name="formConfig.form_name"
                                v-bind:value="getFieldValue(section.fields['competitors'])"
                                v-on:input="onInput(section.fields['competitors'], $event)" outlined></form-field>
                  </v-col>
                  <v-col class="col-12 col-md-4">
<!--                    <form-field :field="section.fields['otherOption']" :form_name="formConfig.form_name"-->
<!--                                v-bind:value="getFieldValue(section.fields['otherOption'])"-->
<!--                                v-on:input="onInput(section.fields['otherOption'], $event)" outlined></form-field>-->
                    <form-field :field="section.fields['dealOS']" :form_name="formConfig.form_name"
                                v-bind:value="getFieldValue(section.fields['dealOS'])"
                                v-on:input="onInput(section.fields['dealOS'], $event)" outlined></form-field>
                    <form-field :field="section.fields['notes']" :form_name="formConfig.form_name"
                                v-bind:value="getFieldValue(section.fields['notes'])"
                                v-on:input="onInput(section.fields['notes'], $event)" outlined></form-field>
                  </v-col>
                </v-row>
                <span class="horizontal-line"></span>
              </v-row>

            </v-row>

          </template>
        </form-section>
      </v-col>
      <v-row class="box">
      <v-row class="mt-10" v-if="deal.id">
        <v-col class="box col-12 col-md-9">
          <v-data-table
            :headers="milestonesHeaders"
            :items="deal.dealMilestones"
            :footer-props="{'items-per-page-options':[16, 32, 64, 128, -1]}"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                v-if="!formConfig.disabled"
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                v-if="!formConfig.disabled"
                small
                class="mr-2"
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:item.date.date="{ item }">
              {{ friendlyDate(item.date.date) }}
            </template>
            <template v-slot:item.amount="{ item }">
              {{ item.amount | currency }}
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Milestones</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      small
                      elevation="0"
                    >
                      Add Milestone
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.project"
                              label="Project"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.amount"
                              label="Amount"
                              prefix="$"
                              type="number"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-menu
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedItem.date.date"
                                  label="Date"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  :rules="[v => !!v || 'Field is required']"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="editedItem.date.date"
                                @input="menu2 = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row v-if="editedItem.error">
                          <v-alert
                            border="top"
                            color="red lighten-2"
                            dark
                          >
                            {{ editedItem.error }}
                          </v-alert>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title>Are you sure you want to delete this milestone?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="closeDelete">Cancel</v-btn>
                      <v-btn color="primary" text @click="deleteItemConfirm">OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row class="mt-10" v-if="payments">
        <v-col class="box col-12 col-md-6">
          <v-data-table
            :headers="paymentsHeaders"
            :items="payments"
            :footer-props="{'items-per-page-options':[16, 32, 64, 128, -1]}"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                v-if="!formConfig.disabled"
                small
                class="mr-2"
                @click="editPaymentItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                v-if="!formConfig.disabled"
                small
                class="mr-2"
                @click="deletePaymentItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:item.paymentDate.date="{ item }">
              {{ friendlyDate(item.paymentDate.date) }}
            </template>
            <template v-slot:item.payment="{ item }">
              {{ item.payment | currency }}
            </template>
            <template v-slot:item.status="{ item }">
              <v-chip v-if="item.status == 'Paid'" class="ml-2" :color="'green'" label dark small>
                {{ item.status }}
              </v-chip>
              <v-chip v-if="item.status == 'Due'" class="ml-2" :color="'red'" label dark small>
                {{ item.status }}
              </v-chip>
              <v-chip v-if="item.status == 'Sched'" class="ml-2" :color="'blue'" label dark small>
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Payments</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialogPayment" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                      small
                      elevation="0"
                    >
                      Add Payment
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ paymentFormTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedPaymentItem.payment"
                              label="Payment"
                              prefix="$"
                              type="number"
                              :rules="[v => !!v || 'Field is required']"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-select
                              :items="paymentStatuses"
                              label="Status"
                              v-model="editedPaymentItem.status"
                              :rules="[v => !!v || 'Field is required']"
                            ></v-select>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-menu
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedPaymentItem.paymentDate.date"
                                  label="Date"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                  :rules="[v => !!v || 'Field is required']"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="editedPaymentItem.paymentDate.date"
                                @input="menu2 = false"
                              ></v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                        <v-row v-if="editedPaymentItem.error">
                          <v-alert color="red lighten-2" dark>
                            {{ editedPaymentItem.error }}
                          </v-alert>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="closePayment"
                      >
                        Cancel
                      </v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="savePayment"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogPaymentDelete" max-width="500px">
                  <v-card>
                    <v-card-title>Are you sure you want to delete this payment?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="closePaymentDelete">Cancel</v-btn>
                      <v-btn color="primary" text @click="deletePaymentItemConfirm">OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
          </v-data-table>
        </v-col>
        <v-col class="box col-12 col-md-4">
          <v-card elevation="2" shaped class="financial-summary pa-5 pb-10" v-if="financialSummary">
            <h4 class="text-center">Financial Summary</h4>
            <hr class="mt-4 mb-6 ml-15 mr-15">
            <v-row>
              <v-col cols="7" class="text-left">Total Paid</v-col>
              <v-col cols="5" class="text-right">{{ financialSummary.total_paid ? financialSummary.total_paid : '0' | currency }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="7" class="text-left">Total Due</v-col>
              <v-col cols="5" class="text-right">{{ financialSummary.total_due ? financialSummary.total_due : '0' | currency }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="7" class="text-left">Total Credit</v-col>
              <v-col cols="5" class="text-right">{{ financialSummary.total_credit ? financialSummary.total_credit : '0' | currency }}</v-col>
            </v-row>
            <v-row>
              <v-col cols="7" class="text-left">Next Expectance</v-col>
              <v-col cols="5" class="text-right">{{ financialSummary.next_expectance_amount ? financialSummary.next_expectance_amount : '0' | currency }}</v-col>
            </v-row>
            <v-row v-if="financialSummary.next_expectance_date">
              <v-col cols="6" class="text-left">By</v-col>
              <v-col cols="6" class="text-right">{{ friendlyDate(financialSummary.next_expectance_date.date) }}</v-col>
            </v-row>
            <hr class="mt-6 mb-4 ml-15 mr-15">
            <v-row>
              <v-col cols="7" class="text-left">Total Amount</v-col>
              <v-col cols="5" class="text-right">{{ financialSummary.total_amount ? financialSummary.total_amount : '0' | currency }}</v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      </v-row>
    </template>
  </parent-form>
</template>


<script>
import { mapGetters } from "vuex";
import FormMixin from "@/mixins/FormMixin"
import ParentForm from '../views/base/BaseFormGeneratorView.vue';
// import eventBus from '@/eventBus.js';
import FormField from "@/components/FormField";
// import DealStatus from "@/components/DealStatuses";
import DatePicker from "@/components/DatePicker";
import VYesNoOther from "@/components/VYesNoOther";
import FormSection from "@/components/FormSection";
// import ComponentMapper from "@/components/ComponentMapper";

export default {
  props:['id'],
  components: {
    VYesNoOther,
    DatePicker,
    FormField,
    ParentForm,
    // DealStatus,
    FormSection,
  },
  mixins: [FormMixin],

  data() {
    return {
      model: {},
      formConfig: {
        form_name: 'deal_view',
        form_url: this.axios.defaults.endpoints.deal.form,
        form_add: this.axios.defaults.endpoints.deal.add,
        form_edit: this.axios.defaults.endpoints.deal.edit,
        form_data: this.axios.defaults.endpoints.deal.show,
        disabled: null,
      },
      deal: {
        renewalDate: {
          date: ''
        }
      },
      contact: {},
      payments: null,
      financialSummary: null,
      milestone: {},
      dialog: false,
      dialogDelete: false,
      dialogPayment: false,
      dialogPaymentDelete: false,
      milestonesHeaders: [
        {text: '', value: 'actions', sortable: false, align: 'center'},
        {text: 'Date', value: 'date.date', align: 'center'},
        {text: 'Project', value: 'project', align: 'center'},
        {text: 'Amount', value: 'amount', align: 'center'}
      ],
      paymentsHeaders: [
        {text: '', value: 'actions', sortable: false, align: 'center'},
        {text: 'Date', value: 'paymentDate.date', align: 'center'},
        {text: 'Payment', value: 'payment', align: 'center'},
        {text: 'Status', value: 'status', align: 'center'}
      ],
      paymentStatuses: [
        'Paid',
        'Due',
        'Sched'
      ],
      editedIndex: -1,
      editedItem: {
        id: 0,
        date: {
          date: ''
        },
        project: '',
        amount: '',
        payments: [],
        error: ''
      },
      defaultItem: {
        id: 0,
        date: {
          date: ''
        },
        project: '',
        amount: '',
        payments: [],
        error: ''
      },
      editedPaymentIndex: -1,
      editedPaymentItem: {
        id: 0,
        payment: 0,
        status: '',
        paymentDate: {
          date: ''
        },
        error: ''
      },
      defaultPaymentItem: {
        id: 0,
        payment: 0,
        status: '',
        paymentDate: {
          date: ''
        },
        error: ''
      },
      oldMilestoneAmount: 0
    };
    },
  computed: {
    ...mapGetters({
      Statuses: "StateStatuses",
      ProgramLevels: "StateProgramLevels",
      ProgramLevel: "StateProgramLevel",
      Regions: "StateRegions"
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'New Milestone' : 'Edit Milestone'
    },
    paymentFormTitle () {
      return this.editedPaymentIndex === -1 ? 'New Payment' : 'Edit Payment'
    },
    dealRenewalText() {
      return this.getDate(this.deal.renewalDate.date)
    },
    paymentDateText(date) {
      return this.getDate(date)
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    paymentDialog (val) {
      val || this.closePayment()
    },
  },
  created() {
    const t = this
    if(this.formConfig.disabled === null)
      this.formConfig.disabled = this.$route.params.disabled
    if (this.id) {
      this.payments = []
      this.$Progress.start()
      this.axios.get('private/deals/show?id='+this.id, {})
        .then(function (response) {
          t.deal = response.data.data
          if (!t.deal.dealMilestones)
            t.deal.dealMilestones = []
            .catch(err => {
              console.log(err);
            });

          t.$Progress.increase(10)
          t.axios.get('private/deal/payments?id='+t.id, {})
            .then(function (response) {
              t.$Progress.finish()
              t.payments = response.data.data.payments
              t.getFinancialSummary()
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    getFieldValue(field) {
      if (!(field.name in this.model))
        this.model[field.name] = null
      return this.model[field.name]
    },
    onInput(field, $event) {
      this.model[field.name] = $event
      this.$emit('input', this.model)
    },
    getFinancialSummary() {
      const t = this
      this.$Progress.start()
      this.axios.get('private/payments/financial?id='+this.id, {})
        .then(function (response) {
          t.$Progress.finish()
          t.financialSummary = response.data.data
        })
        .catch(err => {
          console.log(err);
        });
    },
    editItem (item) {
      item.error = ''
      this.editedIndex = this.deal.dealMilestones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.oldMilestoneAmount = this.editedItem.amount
      this.dialog = true
    },

    save () {
      var endpoint = ""
      if (this.editedIndex > -1)
        endpoint = 'private/dealms/edit?id='+this.editedItem.id
      else
        endpoint = 'private/dealms/add'

      const t = this

      const formData = new FormData();
      formData.append("form[project]", this.editedItem.project);
      formData.append("form[amount]", this.editedItem.amount);
      formData.append("form[deal]", this.deal.id);
      formData.append("form[date]", this.editedItem.date.date);

      this.$Progress.start()
      this.axios.post(endpoint, formData)
        .then(function (response) {
          t.$Progress.finish()
          if (response.data.success == true) {
            if (t.editedIndex > -1) {
              Object.assign(t.deal.dealMilestones[t.editedIndex], response.data.data)
              t.deal.amount = t.deal.amount - t.oldMilestoneAmount + t.deal.dealMilestones[t.editedIndex].amount
            } else {
              t.deal.dealMilestones.push(response.data.data)
              t.deal.amount = t.deal.amount + response.data.data.amount
            }
            t.getFinancialSummary()
            t.close()
            t.$root.$emit('refreshClientProfile')
          } else if (response.data.errors.global.length > 0) {
            t.editedItem.error = response.data.errors.global[0]
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    deleteItem (item) {
      this.editedIndex = this.deal.dealMilestones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      const t = this
      this.$Progress.start()
      this.axios.delete('private/dealms/delete?id='+this.editedItem.id, {})
        .then(function (response) {
          t.$Progress.finish()
          t.deal.amount = t.deal.amount - t.deal.dealMilestones[t.editedIndex].amount
          t.deal.dealMilestones.splice(t.editedIndex, 1)
          t.getFinancialSummary()
          t.closeDelete()
          t.$root.$emit('refreshClientProfile')
        })
        .catch(err => {
          console.log(err);
        });
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    addPaymentItem (item) {
      this.dialogPayment = true
      this.editedIndex = this.deal.dealMilestones.indexOf(item)
      this.editedItem = Object.assign({}, item)
    },

    editPaymentItem (item) {
      item.error = ''
      this.editedPaymentIndex = this.payments.indexOf(item)
      this.editedPaymentItem = Object.assign({}, item)
      this.dialogPayment = true
    },

    savePayment () {
      var endpoint = ""
      if (this.editedPaymentIndex > -1)
        endpoint = 'private/payments/edit?id='+this.editedPaymentItem.id
      else
        endpoint = 'private/payments/add'

      const t = this

      const formData = new FormData();
      formData.append("form[deal]", this.deal.id);
      formData.append("form[payment]", this.editedPaymentItem.payment);
      formData.append("form[status]", this.editedPaymentItem.status);
      formData.append("form[payment_date]", this.getDate(this.editedPaymentItem.paymentDate.date));

      this.$Progress.start()
      this.axios.post(endpoint, formData)
        .then(function (response) {
          t.$Progress.finish()
          if (response.data.success == true) {
            if (t.editedPaymentIndex > -1)
              Object.assign(t.payments[t.editedPaymentIndex], response.data.data)
            else
              t.payments.push(response.data.data)
            t.getFinancialSummary()
            t.closePayment()
          } else if (response.data.errors.global.length > 0) {
            t.editedPaymentItem.error = response.data.errors.global[0]
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    deletePaymentItem (item) {
      this.editedPaymentIndex = this.payments.indexOf(item)
      this.editedPaymentItem = Object.assign({}, item)
      this.dialogPaymentDelete = true
    },

    deletePaymentItemConfirm () {
      const t = this
      this.$Progress.start()
      this.axios.delete('private/payments/delete?id='+this.editedPaymentItem.id, {})
        .then(function (response) {
          t.$Progress.finish()
          t.payments.splice(t.editedPaymentIndex, 1)
          t.getFinancialSummary()
          t.closePaymentDelete()
        })
        .catch(err => {
          console.log(err);
        });
    },

    closePayment () {
      this.dialogPayment = false
      this.$nextTick(() => {
        this.editedPaymentItem = Object.assign({}, this.defaultPaymentItem)
        this.editedPaymentIndex = -1
      })
    },

    closePaymentDelete () {
      this.dialogPaymentDelete = false
      this.$nextTick(() => {
        this.editedPaymentItem = Object.assign({}, this.defaultPaymentItem)
        this.editedPaymentIndex = -1
      })
    },
  }
};
</script>

<style lang="scss">
.horizontal-line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: black;
  margin-top: 40px;
  margin-bottom: 40px;
}
.status-box {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 200px;
}
.payment-amount {
  text-align: right;
  display: inline-block;
  width: 40px;
}
.financial-summary .row {
  height: 40px;
  font-size: 0.875rem;
}


.financial-summary .text-left {
  font-weight: bold;
  font-size: 14px;
}

.milestones {
  margin-top: -100px !important;
}
</style>



