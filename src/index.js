//<a href="" v-permit:edit="tasks"></a>
const MLPermissions = {
  install(app, options = {}) {

    app.directive('permit', {
      mounted(el, binding) {

        let { permissions } = options;

        el.style.visibility = "hidden";

        permissions = permissions.map(p => { return p.toLowerCase(); });

        let ok = permissions.includes(`${binding.arg.toLowerCase()} ${binding.value.toLowerCase()}`);

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

    app.isPermittedBySegment = function(segment) {
      let { permissions } = options;
      permissions = permissions.map(p => { return p.toLowerCase(); });

      const arg = segment[1];
      const val = segment[0];

      return permissions.includes(`${arg.toLowerCase()} ${val.toLowerCase()}`);

    };

    app.isPermitted = function(action, type){
      let { permissions } = options;
      permissions = permissions.map(p => { return p.toLowerCase(); });

      return permissions.includes(`${action.toLowerCase()} ${type.toLowerCase()}`);
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MLPermissions);
}

export default MLPermissions;
