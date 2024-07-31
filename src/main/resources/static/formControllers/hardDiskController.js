window.addEventListener('load', () => {
    refreshHardDiskTable();
    refreshHardForm();
})

const refreshHardForm = ()=>{
    hardisk = {}
    
}
const addHardDetails = () => {

    console.log(graphicCard);
    // graphicCard.sales_rate = parseFloat(graphicCardSellRatio.value)
    if (hard1.sales_rate != "") {
        console.log(hard1);
        // let sellPrice = parseFloat(graphicCard1.sales_rate1)
        // let purchasePrice = parseFloat(graphicCard.purchase_price)
        // graphicCard.sales_rate = parseFloat(sellPrice / purchasePrice)
        let serverGrphicResponse = ajaxRequestBodyMethod("/harddisk", "POST", graphicCard);
        console.log(serverGrphicResponse);
    }else{
        let serverGrphicResponse = ajaxRequestBodyMethod("/harddisk", "POST", graphicCard);
        console.log(serverGrphicResponse);
    }
}
const refreshHardDiskTable = () => {
    graphic_Cards = ajaxGetRequest('/harddisk/getlist')
    const displayProperties = [
        { property: 'name', dataType: 'string' },
        { property: 'memory', dataType: 'string' },
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

