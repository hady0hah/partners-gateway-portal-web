<template>
  <v-row class="box">
      <v-col v-for="field in section.fields" :key="field.name" class="col-12 col-md-4">
<!--        <component v-if="field.name === 'region'" :is="getFieldComponent(field.type)" :items="Regions" outlined
          item-text="name" item-value="id" v-bind="fieldProps(field)" v-model="region.id" v-on:change="valueChange()"></component>

        <component v-else-if="field.name === 'countries'" :is="getFieldComponent(field.type)" :items="Countries"
          item-text="name" item-value="id" v-bind="fieldProps(field)" v-model="baseForm['country.id']"
          v-on:change="countryChange()" label="Select Country"></component>

        <component v-else-if="field.name === 'cities'" :is="getFieldComponent(field.type)" :items="cities"
          item-text="name" item-value="id" v-bind="fieldProps(field)" v-model="baseForm['city.id']"
          v-on:change="valueChange()" label="City" ></component>

        <component outlined
                   v-else-if="field.type ===  'Symfony\\Bridge\\Doctrine\\Form\\Type\\EntityType' && field.name !== 'dealStatus' "
                   :is="getFieldComponent(field.type)" v-bind="fieldProps(field)" v-model="form[field.name]"
                   v-on:change="valueChange()"></component>

        <component outlined
          v-else-if="field.name === 'opportunity_desc'"
          :is="getFieldComponent(field.type)" v-bind="fieldProps(field)" v-model="form[field.name]"
          v-on:change="valueChange()"></component>

        <component outlined
                   type="number"
                   v-else-if="field.type === 'Symfony\\Component\\Form\\Extension\\Core\\Type\\NumberType'"
                   :is="getFieldComponent(field.type)" v-bind="fieldProps(field)" v-model="form[field.name]"
                   v-on:change="valueChange()"></component>

          <div v-else-if="field.type === 'date'" >


          <v-menu
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                v-model="baseForm[field.name]"
                append-icon="mdi-calendar"
                readonly
                v-bind="getFieldProps(field)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="baseForm[field.name]"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </div>

        <div v-else-if="field.type === 'Symfony\\Component\\Form\\Extension\\Core\\Type\\ChoiceType'">
          <p style="color: #205023">{{ field.label }}
            <v-radio-group v-model="baseForm[field.name]" v-on:change="valueChange()" row>
              <v-radio label="Yes" :value="true"></v-radio>
              <v-radio label="No" :value="false"></v-radio>
              <v-radio label="Other" :value="null"></v-radio>
              <v-text-field
                v-if="baseForm[field.name] === null"
                v-model="baseForm[field.name]"
                label="Other"
                outlined
              ></v-text-field>
            </v-radio-group>
          </p>

        </div>

        <div v-else-if="field.name === 'status' || field.name === 'dealStatus' ">
            <v-select outlined
              v-model="status.id"
              v-on:change="statusChange()"
              :items="Statuses"
              item-text="label"
              item-value="id"
              return-object
              v-bind="fieldProps(field)"
            >
              <template v-slot:item="{ item }">
                <template
                  v-bind="fieldProps(field)"
                  v-on:change="statusChange()">
                  <v-list-item-avatar>
                    <img :src="item.imageFile" alt="Image" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.label }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-select>
        </div>
      -->


        <form-field
            :field="field" :form="form" :name="name">
        </form-field>

      </v-col>
    </v-row>
</template>
<script>
import FormMixin from '@/mixins/FormMixin';
import FormField from './FormField.vue';

export default {
  props : ['section','name'],
  components : {
    FormField
  },
  mixins : [FormMixin],
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>
