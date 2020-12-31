class Control{
    static instance
    constructor(){
    }
    setItem(params){
        for(let x in params){
            sessionStorage.setItem(x,params[x])
        }
    }
    getItem(name){
       return sessionStorage.getItem(name)
    }
    removeItem(name){
        if(typeof(name)==='string'){
            sessionStorage.removeItem(name)
        }
        if(Array.isArray(name)){
            for(let x of name){
                sessionStorage.removeItem(x) 
            }
        }
    }
    clear(){
        sessionStorage.clear()
    }
}
let control 
if(!Control.instance) {
    Control.instance=  new Control()
}
control = Control.instance
export default control