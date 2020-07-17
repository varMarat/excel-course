import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table-resize'
import { TableSelection } from './TableSelection'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root, options){
        super($root, {
            name:'Table',
            listeners:['mousedown', 'keydown', 'input'],
            ...options
        })
    }
    toHTML(){
        return createTable(20)
    }
    prepare(){
        this.selection = new TableSelection()
    }
    init(){
        super.init()
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
        // this.$emit('table:select', $cell)

        this.$on('formula:input', (text)=>{
           this.selection.current.text(text)
        })
        
        this.$on('formula:blur', ()=>{
            this.selection.current.focus()
        })
    }
    onMousedown(){
        if(event.target.dataset.resize){
            resizeHandler(this.$root, event)
        }else if(event.target.dataset.type==='cell'){
            const $target = $(event.target)

            if(event.shiftKey){
               const target = $target.id(true)
               const current = this.selection.current.id(true)
            
               const cols = range(current.col, target.col)
               const rows = range(current.row, target.row)

               const ids = cols.reduce((acc, col)=>{
                    rows.forEach(row => acc.push(`${row}:${col}`))
                    return acc
               }, [])
      
               const $cells = ids.map(id=>{
                   return this.$root.find(`[data-id="${id}"]`)
               })
               this.selection.selectGroup($cells)
            }else{
                this.selection.select($target)
            }
        }
    }
    onKeydown(event){
        const keys = ['Tab','Enter', 'ArrowRight','ArrowLeft','ArrowDown','ArrowUp']
        if(keys.includes(event.key) && !event.shiftKey){
            event.preventDefault()
            
            const {key} = event
            const id = this.selection.current.id(true)
            const selector = nextSelector(key, id)
            const $next = this.$root.find(selector)
            this.selection.select($next)
    
            this.$emit('table:select', $next)
        }
    }
    onInput(event){
        this.$emit('table:input', $(event.target))
    }
}
function nextSelector(key, {row, col}){
    const MIN_VALUE = 0
    switch(key){
        case 'ArrowRight':
        case 'Tab':    
            ++col
            break
        case 'ArrowLeft':
            col = col == MIN_VALUE? 0 : --col
            break
        case 'ArrowDown':
        case 'Enter':
            ++row
            break
        case 'ArrowUp':
            row = row == MIN_VALUE? 0 : --row
            break       
    }

    return `[data-id="${row}:${col}"]`
}



function range(start, end){
    if(start > end){
        [end, start]=[start, end]
    }

    return new Array(end-start+1).fill('').map((_, index)=>{
        return start+index
    })  
}