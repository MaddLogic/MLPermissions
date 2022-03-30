//<a href="" v-permit:edit="tasks"></a>
const MLPermissions = {
  install(app, options = {}) {

    app.directive('permit', {
      mounted(el, binding) {

        const { user } = options;

        el.style.visibility = "hidden";

        const permissions = user.permissions.map(p => { return p.toLowerCase(); });

        let ok = permissions.includes(`${binding.arg} ${binding.value}`);

        const behavior = binding.modifiers.disable ? 'disable' : 'hide';

        if (!ok) {
          if (behavior === 'hide') {
            el.parentElement.removeChild(el);
          } else if (behavior === 'disable') {
            el.disabled = true;
            el.style.visibility = ""
          }
        }else{
          el.style.visibility = ""
        }
      }
    });

    app.isPermitted = function(segment) {
      const { user } = options;
      const permissions = user.permissions.map(p => { return p.toLowerCase(); });

      const arg = segment[1];
      const val = segment[0];

      return permissions.includes(`${arg} ${val}`);

    };
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MLPermissions);
}

export default MLPermissions;
