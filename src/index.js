const MLPermissions = {
  install(Vue, options = {}) {

    Vue.directive('can', {
      bind: function (el, binding, vnode) {
        const { user } = options;

        el.style.visibility = "hidden";

        const permissions = user.permissions.map(p => { return p.toLowerCase(); });

        let ok = permissions.includes(`${binding.arg} ${binding.expression}`);

        const show = binding.modifiers.show;

        console.log(permissions, options, ok, show);

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

      }
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(MLPermissions);
}

export default MLPermissions;
