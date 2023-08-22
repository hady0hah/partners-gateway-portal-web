<template>
  <div class="container">
    <parent-form  lazy-validation :main_action_onsubmit="submitForm" ref="formRef" >
      <template v-slot:header-left-post-back>
        <v-btn class="mr-4" color="primary" small elevation="0">Add a deal</v-btn>
<!--        <v-btn class="mr-4" color="primary" small elevation="0" @click="submitForm">Save</v-btn>-->
      </template>
    </parent-form>
  </div>
</template>

<script>
import ParentForm from '../views/base/BaseFormGeneratorView.vue';
import eventBus from '@/eventBus.js';

export default {
  components: {
    ParentForm
  },
  mixins: [ParentForm],
  data() {
    return {
      response: {
        title: 'Deal Registration Form',
        description: 'Dear Partner, please fill this form, if you wish to book a deal.',
        formName:'DealForm',
        sections: [{
          title: 'section 1',
          description: 'desc 1',
          fields: [
            {
              name: 'name',
              type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType',
              label: 'Name',
              required: true
            },
            {
              name: 'language',
              type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
              label: 'Language',
              required: false
            },
            {
              name: 'status',
              type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
              label: 'Status',
              required: true
            },
            {
              name: 'countries',
              type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
              label: 'Countries',
              required: true
            },
            {
              name: 'cities',
              type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
              label: 'Cities',
              required: true
            },
            {
              name: 'region',
              type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
              label: 'Region',
              required: true
            },
            {
              name: 'text',
              type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType',
              label: 'Text',
              required: true
            },
            {
              name: 'Text',
              type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextAreaType',
              label: 'Note',
              required: false
            },
            {
              name: 'date',
              type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\DateType',
              label: 'Some Date',
              required: true
            },
          ],
        },
          {
            title: 'section 2',
            description: 'desc 2',
            fields: [
              {
                name: 'name',
                type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType',
                label: 'Name',
                required: true
              },
              {
                name: 'language',
                type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
                label: 'Language',
                required: false
              },
              {
                name: 'status',
                type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
                label: 'Status',
                required: true
              },
              {
                name: 'countries',
                type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
                label: 'Countries',
                required: true
              },
              {
                name: 'cities',
                type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
                label: 'Cities',
                required: true
              },
              {
                name: 'region',
                type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
                label: 'Region',
                required: true
              },
              {
                name: 'text',
                type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType',
                label: 'Text',
                required: true
              },
              {
                name: 'Text',
                type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextAreaType',
                label: 'Note',
                required: false
              },
              {
                name: 'date',
                type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\DateType',
                label: 'Some Date',
                required: true
              },
            ],
          },
          {
            title: 'section 3',
            description: 'desc 3',
            fields: [
              {
                name: 'name',
                type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType',
                label: 'Name',
                required: true
              },
              {
                name: 'language',
                type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
                label: 'Language',
                required: false
              },
              {
                name: 'status',
                type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
                label: 'Status',
                required: true
              },
              {
                name: 'countries',
                type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
                label: 'Countries',
                required: true
              },
              {
                name: 'cities',
                type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
                label: 'Cities',
                required: true
              },
              {
                name: 'region',
                type: 'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType',
                label: 'Region',
                required: true
              },
              {
                name: 'text',
                type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextType',
                label: 'Text',
                required: true
              },
              {
                name: 'Text',
                type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\TextAreaType',
                label: 'Note',
                required: false
              },
              {
                name: 'date',
                type: 'Symfony\\Component\\Form\\Extension\\Core\\Type\\DateType',
                label: 'Some Date',
                required: true
              },
            ],
          }]
      },
    };
  },
  mounted() {
    const dataToSend = this.response;
    eventBus.$emit('form-received', dataToSend);
  },
  methods: {
    submitForm() {
      var endpoint = ""
      const t = this
      if (!t.baseForm.id)
        endpoint = 'private/deal/add'
      else
        endpoint = 'private/deals/edit?id='+t.deal.id

      ParentForm.methods.submitForm(this.response,endpoint,t,this.$refs);
    },
  },
};
</script>
