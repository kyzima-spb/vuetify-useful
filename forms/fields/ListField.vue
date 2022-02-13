<template>
  <div>
    <v-input v-bind="$attrs">
      <div class="field">
        <div class="headline mb-3">{{ label }}</div>

        <v-btn small class="mr-3" @click="appendItem" v-if="value.length < 1">
          Добавить
        </v-btn>

        <div class="my-6" v-for="(field, index) in value" :key="index">
          <slot
            name="body"
            :item="field"
            :index="index"
            :onAppend="appendItem"
            :onInsertBefore="insertBefore"
            :onInsertAfter="insertAfter"
            :onDelete="removeItem"
          >
            <div class="title" v-if="itemLabel">
              {{ itemLabel }} №{{ index + 1 }}
            </div>

            <slot :item="field" :index="index"></slot>

            <div>
              <v-btn small class="mr-3" @click="insertBefore(index)">Добавить до</v-btn>
              <v-btn small class="mr-3" @click="insertAfter(index)">Добавить после</v-btn>
              <v-btn small color="error" @click="removeItem(index)">Удалить</v-btn>
            </div>
          </slot>
        </div>
      </div>
    </v-input>
  </div>
</template>

<script>
  export default {
    name: 'ListField',

    props: {
      value: {
        type: Array,
        required: true,
      },
      emptyItem: {
        type: Object,
        required: true,
      },
      label: {
        type: String,
      },
      itemLabel: {
        type: String,
      },
    },

    methods: {
      // Возвращает копию пустой модели элемента списка.
      getEmptyItem() {
        return Object.assign({}, this.emptyItem);
      },

      // Добавляет новый элемент списка перед указанным.
      insertBefore(index) {
        this.value.splice(index, 0, this.getEmptyItem());
      },

      // Добавляет новый элемент списка после указанного.
      insertAfter(index) {
        this.value.splice(index + 1, 0, this.getEmptyItem());
      },

      // Добавляет последним новый элемент списка.
      appendItem() {
        this.value.push(this.getEmptyItem());
      },

      // Удаляет элемент ввода по индексу.
      removeItem(index) {
        this.value.splice(index, 1);
      },
    },
  };
</script>

<style>
  .field {
    min-width: 100%;
    width: 100%;
  }
</style>
