<template>
  <v-snackbars
    :objects.sync="objects"
    top
    right
    app
  >
    <template #action="{ close }">
      <v-btn text @click="close()">Закрыть</v-btn>
    </template>
  </v-snackbars>
</template>

<script>
  import VSnackbars from 'v-snackbars';
  import { mapActions } from 'vuex';

  export default {
    name: 'VuexSnackbars',
    components: { VSnackbars },
    computed: {
      objects: {
        get () {
          return this.$store.state.snackbars.objects;
        },
        set (items) {
          this.clean(items);
        },
      },
    },
    methods: mapActions('snackbars', ['clean']),
  };
</script>
