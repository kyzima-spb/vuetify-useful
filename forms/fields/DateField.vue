<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-combobox
        v-if="isMultiple"
        v-model="value"
        multiple
        chips
        small-chips
        deletable-chips
        append-icon="mdi-calendar"
        readonly
        v-bind="{...attrs, ...$attrs}"
        v-on="on"
      ></v-combobox>

      <v-text-field
        v-else
        :value="value"
        append-icon="mdi-calendar"
        clearable
        readonly
        v-bind="{...attrs, ...$attrs}"
        v-on="on"
        @click:clear="onChange('')"
      ></v-text-field>
    </template>

    <v-date-picker
      :value="value"
      no-title
      scrollable
      :multiple="isMultiple"
      v-bind="picker"
      @input="onChange"
    ></v-date-picker>
  </v-menu>
</template>

<script>
  export default {
    name: 'DateField',

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

    computed: {
      isMultiple() {
        return Array.isArray(this.value);
      },
    },

    methods: {
      onChange(newValue) {
        this.menu = false;
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
