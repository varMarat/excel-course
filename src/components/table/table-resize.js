import {$} from '@core/dom'
export function resizeHandler($root, event){
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)
    const type = $resizer.data.resize
    const sideProp = type === 'col'? 'bottom' : 'right'
    let value

    $resizer.css({
         [sideProp]: '-5000px',
         opacity: '1'
     })  
     
    document.onmousemove= (e)=>{
     if(type === 'col'){
         const delta = e.pageX-coords.right
         value = coords.width + delta+'px'
         $resizer.css({
             right: -delta+'px'
         })
        
     }else if(type==='row'){
         const delta = e.pageY - coords.bottom
         value = coords.height + delta + 'px'
         $resizer.css({
             bottom: -delta+'px'
         })
     }
    }
    document.onmouseup = ()=>{
        document.onmousemove = null
        document.onmouseup = null
        if(type === 'col'){
         $parent.css({width: value})
         cells.forEach(element => {
             element.style.width = value
         });

        }else if(type === 'row'){
         $parent.css({height: value})
        }
        $resizer.css({
         opacity:'0',
         bottom: '0',
         right: '0'
     })
    }
}