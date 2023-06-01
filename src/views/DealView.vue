<template>
  <div class="container">
    <v-form ref="dealForm" lazy-validation>
      <v-row>
        <v-col class="col-12 col-md-9">
          <v-row class="box">
            <v-col class="col-12 col-sm-8 col-lg-8">
              <v-row class="mb-4">
                <v-btn class="mr-4" color="primary" @click="saveDeal"small elevation="0">Save</v-btn>
                <v-btn class="mr-4" @click="back" small elevation="0">Back</v-btn>
              </v-row>
              <v-row v-if="ProgramLevel(deal['partnerProgramLevel.id'])">
                <v-icon :color="ProgramLevel(deal['partnerProgramLevel.id']).color">mdi-square</v-icon>
              </v-row>
              <v-row>
                <v-text-field v-model="deal.name" label="Deal Name" :rules="[v => !!v || 'Field is required']"></v-text-field>
              </v-row>
              <v-row>
                <v-select 
                  label="Region" 
                  :items="Regions" 
                  item-text="label" 
                  item-value="id"
                  v-model="region.id" 
                  :rules="[v => !!v || 'Field is required']"
                ></v-select>
              </v-row>
              <v-row>
                <v-text-field v-model="contact.name" label="Contact Name" :rules="[v => !!v || 'Field is required']"></v-text-field>
              </v-row>
              <v-row>
                <v-text-field v-model="deal.amount" label="Amount" prefix="$" type="number" disabled></v-text-field>
              </v-row>
              <v-row>
                <v-menu
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dealRenewalText"
                      label="Renewal Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[v => !!v || 'Field is required']"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="deal.renewalDate.date"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-row>
            </v-col> 
            <v-col class="col-6 col-sm-4 col-lg-4">
              <v-card elevation="2" shaped class="pa-4">
                <v-row>
                  <v-col cols="3">
                    <v-img v-if="dealStatus" :src="dealStatus.icon"></v-img>
                  </v-col>
                  <v-col cols="9">
                    <div><b>Status update</b></div>
                    <div>
                      <v-select 
                        :items="Statuses" 
                        item-text="label" 
                        item-value="id"
                        v-model="dealStatus.id" 
                        v-on:change="dealStatusChange()"
                        :rules="[v => !!v || 'Field is required']"
                      ></v-select>
                      <span>as of <span v-if="deal.statusDate">{{ friendlyDate(deal.statusDate.date) }}</span><span v-if="!deal.statusDate">Today</span></span>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      
        <v-col class="col-12 col-md-3">
          <v-card elevation="2" class="pa-8 mb-4 box">
            <v-row>
              <v-text-field v-model="contact.phone" label="Contact Phone" :rules="[v => !!v || 'Field is required']"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="contact.email" label="Email" :rules="[v => !!v || 'Field is required']"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="contact.address" label="Address" :rules="[v => !!v || 'Field is required']"></v-text-field>
            </v-row>
          </v-card>
          <v-card elevation="2" class="pa-4 box">
            <h4>Notes</h4>
            <div>
              <v-textarea
                v-model="deal.note"
              ></v-textarea>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    <v-row class="milestones" v-if="deal.id">
      <v-col class="box col-12 col-md-9">
        <v-data-table 
          :headers="milestonesHeaders" 
          :items="deal.dealMilestones"
          :footer-props="{'items-per-page-options':[16, 32, 64, 128, -1]}"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
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
              small
              class="mr-2"
              @click="editPaymentItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
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
      <v-col class="box col-12 col-md-3">
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
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: 'DealView',
    props: ['id'],
    
    data: () => ({
      deal: {  
        renewalDate: {
          date: ''
        }
      },
      contact: {},
      payments: null,
      financialSummary: null,
      statuses: [],
      dealStatus: {},
      region: {},
      milestone: {},
      dialog: false,
      dialogDelete: false,
      dialogPayment: false,
      dialogPaymentDelete: false,
      milestonesHeaders: [
        { text: '', value: 'actions', sortable: false, align: 'center' },
        { text: 'Date', value: 'date.date', align: 'center' },
        { text: 'Project', value: 'project', align: 'center' },
        { text: 'Amount', value: 'amount', align: 'center' }
      ],
      paymentsHeaders: [
        { text: '', value: 'actions', sortable: false, align: 'center' },
        { text: 'Date', value: 'paymentDate.date', align: 'center' },
        { text: 'Payment', value: 'payment', align: 'center' },
        { text: 'Status', value: 'status', align: 'center' }
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
    }),
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
      if (this.id) {
        this.payments = []
        this.$Progress.start()
        this.axios.get('private/deals/show?id='+this.id, {})
        .then(function (response) {
          t.deal = response.data.data
          if (!t.deal.dealMilestones)
            t.deal.dealMilestones = []
          t.dealStatus = Object.assign({}, t.Statuses.find(status => status.id === t.deal['dealStatus.id']))
          t.region = Object.assign({}, t.Regions.find(region => region.id === t.deal['region.id']))
      
          t.$Progress.increase(10)
          t.axios.get('private/contact/show?id='+t.deal['contact.id'], {})
          .then(function (response) {
            t.$Progress.finish()
            t.contact = response.data.data
          })
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
      saveDeal() {
        if (!this.$refs.dealForm.validate())
          return;
          
        const t = this
        var endpoint = ""
        
        if (!this.contact.id)
          endpoint = 'private/contact/add'
        else
          endpoint = 'private/contact/edit?id='+this.contact.id
          
        const formData = new FormData();
        formData.append("form[name]", this.contact.name);
        formData.append("form[phone]", this.contact.phone);
        formData.append("form[email]", this.contact.email);
        formData.append("form[address]", this.contact.address);
        formData.append("form[company]", this.contact.company);
        
        this.$Progress.start()
        this.axios.post(endpoint, formData)
        .then(function (response) {
          
          if (response.data.data == null)
            return
          
          t.contact = response.data.data
          
          var endpoint = ""
          
          if (!t.deal.id)
            endpoint = 'private/deal/add'
          else
            endpoint = 'private/deals/edit?id='+t.deal.id
          
          const formData = new FormData();
          formData.append("form[name]", t.deal.name);
          formData.append("form[renewal_date]", t.deal.renewalDate.date);
          formData.append("form[contact]", t.contact.id);
          formData.append("form[region]", t.region.id);
          formData.append("form[dealStatus]", t.dealStatus.id);
          formData.append("form[note]", t.deal.note);
          
          t.$Progress.increase(10)
          t.axios.post(endpoint, formData)
          .then(function (response) {
            t.$Progress.finish()
            if (!t.payments)
              t.payments = []
            t.deal = response.data.data
            t.$root.$emit('refreshClientProfile')
          })
          .catch(err => {
            console.log(err);
          });
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
      
      dealStatusChange () {
        this.dealStatus = Object.assign({}, this.Statuses.find(status => status.id === this.dealStatus.id))
      },
      
      back() {
        this.$router.push("/");
      }
    }
  };
</script>

<style lang="scss">
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
