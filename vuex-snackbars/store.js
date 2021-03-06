const types = {
  'error': {
    color: 'error',
    icon: '',
  },
  'info': {
    color: 'info',
    icon: '',
  },
  'success': {
    color: 'success',
    icon: 'check_circle',
  },
  'warning': {
    color: 'warning',
    icon: '',
  }
};


const makeObject = item => {
  let type = item.type || 'default';
  delete item.type;
  return {
    timeout: 5000,
    top: true,
    bottom: false,
    left: false,
    right: true,
    icon: '',
    ...(type in types ? types[type] : {}),
    ...item,
  };
};


export default () => {
  const state = () => ({
    objects: [],
  });

  const mutations = {
    clean(state, items) {
      state.objects = items;
    },
    push(state, item) {
      state.objects.push(item);
    },
  };

  const actions = {
    // Удаляет сообщения, закрытые пользователем или по таймеру.
    clean({ commit }, items) {
      commit('clean', items);
    },

    // Добавляет новое всплывающее сообщение.
    push({ commit }, payload) {
      if (!payload.isArray) {
        payload = [payload];
      }
      payload.forEach(item => {
        item = makeObject(item);
        commit('push', item);
      });
    },

    // Действия, которые принимают объект-сообщение.

    flashError({ dispatch }, item) {
      item.type = 'error';
      dispatch('push', item);
    },
    flashInfo({ dispatch }, item) {
      item.type = 'info';
      dispatch('push', item);
    },
    flashSuccess({ dispatch }, item) {
      item.type = 'success';
      dispatch('push', item);
    },
    flashWarning({ dispatch }, item) {
      item.type = 'warning';
      dispatch('push', item);
    },

    // Действия, которые принимают текстовое сообщение.

    flashErrorMessage({ dispatch }, message) {
      dispatch('flashError', {message});
    },
    flashInfoMessage({ dispatch }, message) {
      dispatch('flashInfo', {message});
    },
    flashSuccessMessage({ dispatch }, message) {
      dispatch('flashSuccess', {message});
    },
    flashWarningMessage({ dispatch }, message) {
      dispatch('flashWarning', {message});
    },
  };

  return store => {
    store.registerModule('snackbars', {
      namespaced: true,
      state,
      mutations,
      actions,
    });
  };
};
