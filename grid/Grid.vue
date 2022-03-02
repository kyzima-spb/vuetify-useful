<template>
  <div>
    <v-data-table
      :headers="allHeaders"
      :items="items"
      :server-items-length="totalItems"
      :loading="loading"
      :options.sync="options"
      :fixed-header="true"
      :footer-props="{
        'items-per-page-options': itemsPerPage
      }"
      show-select
      v-model="selectedItems"
      v-bind="$attrs"
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="$emit('create')">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            icon
            :disabled="selectedItems.length != 1"
            @click="updateAction(selectedItems[0])"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            icon
            :disabled="selectedItems.length != 1"
            @click="deleteAction(selectedItems[0])"
            v-if="deleteItem"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="updateData">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <slot name="toolbar"></slot>
        </v-toolbar>
      </template>

      <template #no-data>
        <span v-if="errorMessage">{{ errorMessage }}</span>
      </template>

      <template #[name]="slotProps" v-for="name in Object.keys($scopedSlots)">
        <slot :name="name" v-bind="slotProps" />
      </template>

      <template #item.created="{ item }">
        <span class="nowrap">
          {{ new Date(item.created).toLocaleString() }}
        </span>
      </template>

      <template #item.updated="{ item }">
        <span class="nowrap">
          {{ new Date(item.updated).toLocaleString() }}
        </span>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="viewAction(item)">
          mdi-eye
        </v-icon>
        <v-icon small class="mr-2" @click="updateAction(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteAction(item)" v-if="deleteItem">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import { SnackbarsMixin } from '../vuex-snackbars';


  export default {
    name: 'Grid',
    mixins: [SnackbarsMixin],

    props: {
      // заголовок таблицы
      title: String,

      // заголовки колонок таблицы
      headers: {
        type: Array,
        default: () => [],
      },

      // А callback to be run if data tables options changed.
      loadData: {
        type: Function,
        required: true,
      },

      // А callback to be run if delete button clicked.
      deleteItem: {
        type: Function,
        default: null,
      },
    },

    data: () => ({
      // отображаемые в текущий момент элементы
      items: [],
      // отмеченные флажком элементы
      selectedItems: [],
      // общее кол-во элементов в коллекции
      totalItems: 0,
      // отображает полосу загрузки при обновлении данных
      loading: true,
      // сообщение, которое отображается в случае ошибки при загрузке данных
      errorMessage: null,
      options: {},
      // кол-во отображаемых на одной странице элементов
      itemsPerPage: Array.from({length: 5}, (_, i) => (i + 1) * 5),
    }),

    computed: {
      allHeaders() {
        return [
          ...this.headers,
          {
            value: 'actions',
            align: 'center',
            sortable: false,
            cellClass: 'nowrap',
          },
        ];
      },
    },

    methods: {
      deleteAction(item) {
        if (confirm('Подтвердите удаление')) {
          this
            .deleteItem(item)
            .then(() => this.updateData())
            .catch(err => this.flashErrorMessage(err.message))
          ;
        }
      },

      viewAction(item) {
        this.$emit('view', item);
      },

      updateAction(item) {
        this.$emit('update', item);
      },

      updateData() {
        // Обновляет данные таблицы согласно текущему состоянию
        this.loading = true;
        this.errorMessage = null;

        let sort = this.options.sortBy.map(
          (name, i) => `${this.options.sortDesc[i] ? '-': ''}${name}`
        );

        this
          .loadData({
            params: {
              limit: this.options.itemsPerPage,
              offset: (this.options.page - 1) * this.options.itemsPerPage,
              sort: sort.join(','),
            },
          })
          .then(resp => {
            this.totalItems = +resp.headers['x-total-count'];
            return resp.data;
          })
          .catch(err => {
            this.errorMessage = err.message;
            return [];
          })
          .then(items => {
            this.items = items;
            this.loading = false;
          });
      },
    },

    watch: {
      options: {
        handler() {
          this.updateData();
        },
        deep: true,
      }
    },
  };
</script>

<style scoped>
  .nowrap {
    white-space: nowrap;
    width: 1px;
  }
</style>
