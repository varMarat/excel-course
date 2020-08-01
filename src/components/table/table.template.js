const CODE = {
    'A': 65,
    'Z': 90
}
function createRow(column, numRow=''){
    return`
        <div class="row" >
            <div class="row-info">${numRow}</div>
            <div class="row-data">
                ${column}
            </div>
        </div>
    `
}
function createColumn(el){
    return`<div class="column">${el}</div>`
}
function createCell(){
    return `<div class="cell"></div>`
}

export function createTable(countRow = 15){
    const colsCount = CODE.Z - CODE.A+1
    const rows = []
    const column = new Array(colsCount)
    .fill('')
    .map((el, index)=>{
        return String.fromCharCode(index+CODE.A)
    })
    .map(el=>{
        return createColumn(el)
    })
    .join('')
    rows.push(createRow(column))

    for(let i = 0; i<countRow; i++){
        const cell = new Array(colsCount)
        .fill('')
        .map((el, index) =>{
            return el = createCell()
        })
        .join('')
        rows.push(createRow(cell, i+1))
    }

    return rows.join('')

}