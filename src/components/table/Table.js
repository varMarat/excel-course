import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table-resize'
export class Table extends ExcelComponent {
    static className = 'excel__table'
    constructor($root){
        super($root, {
            name:'Table',
            listeners:['click', 'mousedown', 'mousemove', 'mouseup']
        })
    }
    onClick(){
        // console.log('click')
    }
    onMousedown(){
        if(event.target.dataset.resize){
            resizeHandler(this.$root, event)
        }
    }
    onMousemove(){
        
    }
    onMouseup(){
        
    }
    toHTML(){
        return createTable(20)
    }
}