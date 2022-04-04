
class MLPermissions {

  constructor(permissions = null) {
    this.permissions = permissions;
  }

  set permissions(perms){
    this._permissions = perms;
  }

  get permissions(){
    return this._permissions;
  }

  set permitted(callback){
    this._permitted = callback(this._permissions);
  }

  get permitted(){

    if(this._permitted === undefined){
      console.warn("Permitted function has not been set. Set it up first.");
    }
    return this._permitted;
  }

  install(app) {

    const $this = this;

    //global directive
    app.directive('permit', {
      mounted(el, binding) {

        el.style.visibility = "hidden";

        const behavior = binding.modifiers.disable ? 'disable' : 'hide';

        if (!$this.permitted) {
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
    app.isPermitted = () => {
      return $this.permitted;
    }

    //instance method
    app.prototype.$isPermitted = function(){ return $this.permitted; }

    //mixin method
    app.mixin({
      methods: {
        isPermitted: function(){ return $this.permitted; }
      }
    })
  }

}

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(new MLPermissions());
//
// }
export default MLPermissions;
