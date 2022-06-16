export default class MLPermitBase{

  constructor(permissions = null) {
    this.permissions = permissions;
  }

  set permissions(perms){
    this._permissions = perms;
  }

  get permissions(){
    return this._permissions;
  }

  //TODO: Create function CallPermitted

  isPermitted(action, vobject){
    return this._permitted(action, vobject, this.permissions);
  }

  set permitted(callback){
    //arguments[1]: request action ie. edit, delete, create
    //arguments[2]: request vobject ie. blogs, tasks
    //arguments[3]: permissions
    this._permitted = callback;
  }

  get permitted(){

    if(this._permitted === undefined){
      console.warn("Permitted function has not been set. Set it up first.");
    }
    return this._permitted;
  }

}
