
const MLPermissions = {
  install(app, options = {}) {

    app.directive('can', (el, binding, vnode) => {
      const { user } = options;

      el.style.visibility = "hidden";

      const permissions = user.permissions.map(p => { return p.toLowerCase(); });

      let ok = permissions.includes(`${binding.arg} ${binding.expression}`);

      const show = binding.modifiers.show;

      console.log(permissions, options, ok, show);
      console.log(vnode);

      vnode.context.$nextTick(() => {
        if(show){
          if (!ok) {
            vnode.elm.parentElement.removeChild(vnode.elm);
          }
        }else{
          const behavior = binding.modifiers.disable ? 'disable' : 'hide';
          if (!ok) {
            if (behavior === 'hide') {
              vnode.elm.parentElement.removeChild(vnode.elm);
            } else if (behavior === 'disable') {
              el.disabled = true;
              el.style.visibility = ""
            }
          }
        }
      });

      if(ok){
        el.style.visibility = ""
      }

    });

    //params i.e segment = ["tasks", "add"]
    app.isPermittedRoute = function(segment) {
      const permissions = user.permissions.map(p => { return p.toLowerCase(); });

      const arg = segment[1];
      const exp = segment[0];

      return permissions.includes(`${arg} ${exp}`);

    };
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MLPermissions);
}

export default MLPermissions;
