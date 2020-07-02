import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'
    constructor($root){
        super($root, {
            name:'Formula',
            listeners: ['click', 'input']
        })
    }
    onInput(event){
        console.log(this.$root)
        console.log('onInput Fromula', event.target.innerText)
    }
    onClick(event){
        console.log('onClick Fromula', event.target.innerText)
    }
    toHTML(){
        return ` <div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false"></div>
        `
    }
}