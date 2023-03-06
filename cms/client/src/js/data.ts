import { Model } from "./@types/types.d";

export const Data = (() => {
  let content = null;
  let models = null;
  
  return {
    async getData() {
      return Promise.all([
        (async () => {
          const res = await fetch(window.API + 'content');
          content = await res.json();
        })(),
        (async () => {
          const res = await fetch(window.API + 'models');
          models = await res.json();
        })()
      ])
    },
    async saveModel(model: Model) {
      const request = await fetch(window.API + 'models', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
      });
      models = await request.json();
    },
    content() {
      return content;
    },
    models() {
      return models;
    }
  }
})();