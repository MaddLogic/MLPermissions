import MLPermitBase from "./MLPermitBase";


class MLPermissions extends MLPermitBase{
  install(app) {

    const $this = this;

    //v-permit:edit="tasks"
    app.directive('permit', {
      mounted(el, binding) {

        el.style.visibility = "hidden";

        const behavior = binding.modifiers.disable ? 'disable' : 'hide';

        // var action = binding.arg.toLowerCase();
        // var vobject = binding.value.toLowerCase();

        let ok = $this.isPermitted(binding.arg, binding.value);

        if (!ok) {
          if (behavior === 'disable') {
            el.disabled = true;
            el.style.visibility = ""
          } else {
            el.parentElement.removeChild(el);
          }
        }else{
          el.style.visibility = ""
        }
      }
    });

    //global method
    //return bool (true/false)
    function isPermitted(action, vobject){
      return $this.isPermitted(action, vobject);
    }

    function setPermissions(permissions){
      $this.permissions = permissions;
    }

    function getPermissions() {
      return $this.permissions;
    }

    app.config.globalProperties.$isPermitted = (action, vobject) => {
      return $this.isPermitted(action, vobject);
    }

    app.config.globalProperties.setPermissions = (permissions) => {
      $this.permissions = permissions;
    }

    app.config.globalProperties.getPermissions = () => {
      return $this.permissions;
    }

    app.provide("vpermit", {isPermitted, setPermissions, getPermissions});

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
