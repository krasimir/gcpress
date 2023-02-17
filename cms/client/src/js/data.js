export const Data = (() => {
  let content = null;
  let models = null;
  
  return {
    async ensureData() {
      if (!content) {
        const res = await fetch(window.API + 'content');
        content = await res.json();
      }
      if (!models) {
        const res = await fetch(window.API + 'models');
        models = await res.json();
      } 
    }
  }
})();