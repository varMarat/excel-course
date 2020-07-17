class Dom{
    constructor(selector){
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }
    get data(){
        return this.$el.dataset
    }
    html(html){
        if(typeof html === 'string'){
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }
    text(text){
        // if(typeof text === 'string'){
            this.$el.textContent = text
        // }
        
    }
    clear(){
        this.html('')
        return this
    }
    append(node){
        if(node instanceof Dom){
            node = node.$el 
        }
        if(Element.prototype.append){
            this.$el.append(node)
        }else{
            this.$el.appendChild(node)
        }
        return this
    }
    on(eventType, callback){
        this.$el.addEventListener(eventType, callback)
    }
    off(eventType, callback){
        this.$el.removeEventListener(eventType, callback)
    }
    getCoords(){
        return this.$el.getBoundingClientRect() 
    }
    closest(selector){
        return $(this.$el.closest(selector))
    }
    findAll(selector){
        return this.$el.querySelectorAll(selector)
    }
    find(selector){
        return $(this.$el.querySelector(selector))
    }
    css(styles={}){
        Object.keys(styles).forEach(key=>{
            this.$el.style[key] = styles[key]
        })
    }
    addClass(className){
        return this.$el.classList.add(className)
    }
    removeClass(className){
        return this.$el.classList.remove(className)
    }
    id(parse){
        if(parse){
            const parsed = this.id().split(':')
            return{
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }
    focus(){
        return this.$el.focus()
    }
    blur(){
        return this.$el.blur()
    }
}

export function $(selector){
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {

    const el = document.createElement(tagName)
    if(classes){
        el.classList.add(classes)
    }
    return $(el)
}