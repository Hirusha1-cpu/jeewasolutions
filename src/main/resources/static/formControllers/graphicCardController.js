window.addEventListener('load', () => {
    refreshGraphicTable();
    refreshGraphicForm();
})
const refreshGraphicTable = () => {
    graphic_Cards = ajaxGetRequest('/graphiccard/getlist')
    const displayProperties = [
        { property: 'name', dataType: 'string' },
        { property: 'memorycapacity', dataType: 'string' },
        { property: 'power_spply', dataType: 'string' },
        { property: 'sales_price', dataType: 'string' },
        { property: 'purchase_price', dataType: 'string' },
        { property: 'min_discount_price', dataType: 'string' },
        { property: 'max_discount_price', dataType: 'string' },
        { property: getBrand, dataType: 'function' },
        { property: getCategory, dataType: 'function' },
        { property: getPcpartstatus, dataType: 'function' },
    ]

    fillDataIntoTable(graphicTab, graphic_Cards, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)


}
const refreshGraphicForm = () =>{
    graphicCard = {}

    brands = ajaxGetRequest("brand/getlist")
    fillDataIntoSelect(selectBrandInGraphicard, "Select brands", brands, 'name')

    pcpart = ajaxGetRequest("pcstatus/getlist")
    fillDataIntoSelect(graphicCardPcPartStatus, "Select pcpart", pcpart, 'status')

}

const getBrand = (rowObject) => {
    return "<p class = 'working-status'>" + rowObject.brand_id.name + "</p>"
}

const getCategory = (rowObject) => {
    return "<p class = 'working-status'>" + rowObject.category_id.name + "</p>"
}

const getPcpartstatus = (rowObject) => {
    return "<p class = 'working-status'>" + rowObject.pc_part_status_id.status + "</p>"
}

const editEmployeeBtn = () => {
    console.log("edit");
}
const updateEmployeeBtn = () => {
    console.log("update");
}
const deleteEmployeeBtn = () => {
    console.log("delete");
}

const addGraphicCardDetails = () =>{
    console.log(graphicCard);
    let serverGrphicResponse = ajaxRequestBodyMethod("/graphiccard", "POST", graphicCard);
    console.log(serverGrphicResponse);
}