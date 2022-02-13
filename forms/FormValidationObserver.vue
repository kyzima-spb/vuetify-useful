<template>
  <validation-observer
    tag="form"
    ref="observer"
    v-slot="{ invalid }"
    @submit.prevent="handleSubmit"
  >
    <slot />
    <slot name="actions" :is-processing="isProcessing">
      <v-row class="mt-1">
        <v-col>
          <v-btn @click="$router.go(-1)">Отмена</v-btn>
        </v-col>
        <v-col align="right">
          <v-progress-circular
            indeterminate
            :size="18"
            color="success"
            v-if="isProcessing"
          ></v-progress-circular>
<!--          <v-btn type="submit" color="success" :disabled="invalid || isProcessing">-->
          <v-btn type="submit" color="success">
            Сохранить
          </v-btn>
        </v-col>
      </v-row>
    </slot>
  </validation-observer>
</template>

<script>
  import { ValidationError } from 'api-call-simplifier/exceptions';
  import { ValidationObserver } from 'vee-validate';

  import { SnackbarsMixin } from '../vuex-snackbars';


  export default {
    name: 'FormValidationObserver',
    mixins: [SnackbarsMixin],
    components: { ValidationObserver },

    props: {
      // А callback to be run only if the client validation is successful.
      onSuccess: {
        type: Function,
        required: true,
      },
    },

    data() {
      return {
        isProcessing: false,
      };
    },

    methods: {
      handleSubmit() {
        this.$refs.observer.handleSubmit(async () => {
          try {
            this.isProcessing = true;
            const resp = await this.onSuccess();
            this.$refs.observer.reset();
            return resp;
          } catch (err) {
            if (err instanceof ValidationError) {
              this.$refs.observer.setErrors(err.errors);
            } else {
              this.flashErrorMessage(err.message);
            }
          } finally {
            this.isProcessing = false;
          }
        });
      },
    },
  };
</script>
