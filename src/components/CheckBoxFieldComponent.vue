<template>
  <v-radio-group label="" v-bind="$attrs">
    <p style="color: #205023;font-weight: bold">{{ field.activities.label }}</p>
    <div v-for="(choice, key) in  field.activities.choices" :key="key" style="display: flex; flex-direction: row;">
      <input :id="'act_'+choice.value" type="checkbox" v-bind:value="choice.value" v-on:change="onActivitiesChange" :checked="isChecked($attrs,choice.value)" :name="field.activities.full_name+'[]'" />
      <label style="padding: 4px;color: #205023;" :for="'act_'+choice.value">{{ choice.label }}</label>
    </div>
    <div>
      <v-text-field :label="field.otherOption.label" outlined v-bind:value="other" v-on:input="onOtherChange" :name="field.otherOption.full_name"></v-text-field>
    </div>
  </v-radio-group>
</template>
<script>

export default {
  props: ['field', 'form_name'],
  data() {
    return {
      activities: [],
      other: ""
    }
  },
  created() {
    this.activities = this.$attrs.value.activities?this.$attrs.value.activities:[]
    this.other = this.$attrs.value.otherOption
  },
  methods: {
    onActivitiesChange($event) {
      if($event.target.checked) {
        this.activities.push($event.target.value)
      } else {
        let index = this.activities.indexOf($event.target.value)
        if (index > -1) { // only splice array when item is found
          this.activities.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
      this.emitValue()
    },
    onOtherChange($event) {
      this.other = $event
      this.emitValue()
    },
    emitValue() {
      this.$emit('input', {activities: this.activities, otherOption: this.other})
    },
    isChecked($attrs, choiceValue) {
      try {
        const activity = $attrs.value.activities.find(item => item.id == choiceValue);
        return activity ? true : false;
      } catch (error) {
        return false;
      }
    },
  }
}
</script>
