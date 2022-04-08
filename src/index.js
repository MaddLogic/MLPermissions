import MLPermitBase from "./MLPermitBase";


class MLPermissions extends MLPermitBase{
  install(app) {

    const $this = this;

    app.directive('permit', {
      mounted(el, binding) {

        el.style.visibility = "hidden";

        const behavior = binding.modifiers.disable ? 'disable' : 'hide';

        var action = binding.arg.toLowerCase();
        var vobject = binding.value.toLowerCase();

        let ok = $this.isPermitted(action, vobject);

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

    //global method
    app.isPermitted = (action, vobject) => {
      return $this.isPermitted(action, vobject);
    }

    //instance method
    // app.prototype.$isPermitted = function(){ return $this.permitted; }

    //mixin method
    app.mixin({
      methods: {
        isPermitted: function(action, vobject){ return $this.isPermitted(action, vobject); }
      }
    })

  }

}

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(new MLPermissions());
//
// }

export default MLPermissions;
