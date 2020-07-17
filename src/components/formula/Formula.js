import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root, options){
        super($root, {
            name:'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }
    init(){
        super.init()

        this.formula = this.$root.find('#formula')
        this.$on('table:select', ($cell)=>{
            this.formula.text($cell[0].$el.textContent)
        })
        this.$on('table:input', ($cell)=>{
            this.formula.text($cell[0].$el.textContent)
        })
    }
    onInput(event){
        const text = event.target.innerText
        this.$emit('formula:input', text)
    }
    onKeydown(event){
        const {key} = event
        if(key==='Enter'){
            event.preventDefault()
            this.$emit('formula:blur')
        }
    }

    toHTML(){
        return ` <div class="info">fx</div>
        <div 
            class="input" 
            contenteditable 
            spellcheck="false"
            id="formula"
            ></div>
        `
    }
}