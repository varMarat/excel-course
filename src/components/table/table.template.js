const CODE = {
    'A': 65,
    'Z': 90
}
function createRow(column, numRow=''){
    const resize = numRow ? `<div class="row-resize" data-resize="row"></div>` : ''
    return`
        <div class="row" data-type="resizable">
            <div class="row-info">
            ${numRow}
            ${resize}
            </div>
            <div class="row-data">
                ${column}
            </div>
        </div>
    `
}
function createColumn(el, index){
    return`<div class="column" data-type="resizable" data-col="${index}">
        ${el}
        <div class="col-resize" data-resize="col"></div>
    </div>`
}
function createCell(col, i){
    return `<div 
                class="cell" 
                data-col="${col}" 
                data-id="${i}:${col}"
                data-type="cell"
                contenteditable 
                >
            </div>`
}

export function createTable(countRow = 15){
    const colsCount = CODE.Z - CODE.A+1
    const rows = []
    const column = new Array(colsCount)
    .fill('')
    .map((el, index)=>{
        return String.fromCharCode(index+CODE.A)
    })
    .map((el, index)=>{
        return createColumn(el, index)
    })
    .join('')
    rows.push(createRow(column))

    for(let row = 0; row<countRow; row++){
        const cell = new Array(colsCount)
        .fill('')
        .map((el, index) =>{
            return el = createCell(index, row)
        })
        .join('')
        rows.push(createRow(cell, row+1))
    }

    return rows.join('')

}