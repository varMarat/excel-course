import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener{
    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name || '' 
        this.emitter = options.emitter
        this.prepare()
        this.unsubscriber = []
    }
    // Настраиваем компонет до init
    prepare(){
        console.log()
    }
    // уведобляем слушателей 
    $emit(event, ...arg){
        this.emitter.emit(event, arg)
    }
    // подписываемся слушателей 
    $on(event, fn){
       const unsub = this.emitter.subscribe(event, fn)
        this.unsubscriber.push(unsub)
    }
    // Инициализируем компонент
    // добавляем DOM слушателей 
    init(){
        this.initDOMListeners()
    }
    // Удаляем компонент
    // Чистим слушателей DOM
    destroy(){
        this.removeDOMListeners()
        this.unsubscriber.forEach(unsub=>{
            unsub()
        })
    }
    // возвращаем шаблон компонента
    toHTML(){
        return ''
    }
}