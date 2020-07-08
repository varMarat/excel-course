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
function createCell(col){
    return `<div class="cell" data-col="${col}"></div>`
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

    for(let i = 0; i<countRow; i++){
        const cell = new Array(colsCount)
        .fill('')
        .map((el, index) =>{
            return el = createCell(index)
        })
        .join('')
        rows.push(createRow(cell, i+1))
    }

    return rows.join('')

}