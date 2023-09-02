<template>
  <v-row >
    <table>
      <tr>
        <td>
          <p class="mb-4" style="font-weight: bold;color: #205023">{{ field.label }}</p>
        </td>
       <td style="padding-left: 35px">
         <v-text-field
           :field="field"
           v-model="form[field.name]"
           outlined
         >
         </v-text-field>
       </td>
      </tr>
    </table>
  </v-row>
</template>
<script>
import FormField from "@/components/FormField";
import FormMixin from "@/mixins/FormMixin";

export default {
  props : ['field'],
  mixins : [FormMixin],
  components : {
    FormField,
  },
  data: () => ({
  }),
  created() {
  },
}
</script>

