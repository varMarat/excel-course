 export class Emitter{
    constructor(){
        this.listeners={}
    }
    // уведобляем слушателя если они есть
    emit(event, ...args){
        if(!Array.isArray(this.listeners[event])){
            return false
        }
        this.listeners[event].forEach(listen => {
            listen(...args)
        });
        return true
    }
    // подписывается на уведомление 
    // добавляем нового слушателя 
    subscribe(event, fn){
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return ()=>{
            this.listeners[event] = 
            this.listeners[event].filter(listen=> listen !==fn)
        }
    }
}
// ТЕСТ ОБСЕРВЕР
// const emitter = new Emitter()
// const unsub = emitter.subscribe('click', (data, id)=>console.log('sub:', data, id ))


// setTimeout(()=>{
//     emitter.emit('click', '2000')
// }, 2000)
// setTimeout(()=>{
//     unsub()
// }, 3000)
// setTimeout(()=>{
//     emitter.emit('click', '2000')
// }, 4000)