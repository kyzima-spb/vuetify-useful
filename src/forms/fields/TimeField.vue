<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        :value="value"
        append-icon="mdi-clock-time-four-outline"
        clearable
        readonly
        v-bind="{...attrs, ...$attrs}"
        v-on="on"
        @click:clear="onChange('')"
      ></v-text-field>
    </template>

    <v-time-picker
      v-if="menu"
      :value="value"
      full-width
      format="24hr"
      scrollable
      v-bind="picker"
      @input="onChange"
      @click:minute="menu = false"
    ></v-time-picker>
  </v-menu>
</template>

<script>
  export default {
    name: 'TimeField',

    props: {
      value: {
        type: [String, Array],
      },

      // Properties for v-date-picker component.
      picker: {
        type: Object,
      },
    },

    data: () => ({
      menu: false,
    }),

    methods: {
      onChange(newValue) {
        this.$emit('input', newValue);
      },
    },

    // watch: {
    //   menu(menu) {
    //     if (!menu) {
    //       this.$emit('input', this.value);
    //     }
    //   },
    // },
  };
</script>
