window.addEventListener('load', () => {
    refreshRamTable();
    refreshRamForm();
})
const refreshRamForm = ()=>{
    ram = {}
    brands = ajaxGetRequest("brand/getlist")
    fillDataIntoSelect(selectBrandInRam, "Select brands", brands, 'name')

    pcpart = ajaxGetRequest("pcstatus/getlist")
    fillDataIntoSelect(ramCardPcPartStatus, "Select pcpart", pcpart, 'status')

}
const handleSalePrice = (value) =>{
    graphicCardSellPrice.value = parseFloat(value) * parseFloat(graphicCardPurchasePrice.value)
}
const handleMaxPrice = (value) =>{
    graphicCardMaxDiscount1.value = parseFloat(value) * parseFloat(graphicCardPurchasePrice.value)
}
const handleMinPrice = (value) =>{
    graphicCardMinDiscount1.value = parseFloat(value) * parseFloat(graphicCardPurchasePrice.value)
}
const addramCardDetails = () => {

    console.log(ram);
    // graphicCard.sales_rate = parseFloat(graphicCardSellRatio.value)
    if (ram1.sales_rate != "") {
        console.log(graphicCard1);
        // let sellPrice = parseFloat(graphicCard1.sales_rate1)
        // let purchasePrice = parseFloat(graphicCard.purchase_price)
        // graphicCard.sales_rate = parseFloat(sellPrice / purchasePrice)
        let serverGrphicResponse = ajaxRequestBodyMethod("/ram", "POST", ram);
        console.log(serverGrphicResponse);
    }else{
        let serverGrphicResponse = ajaxRequestBodyMethod("/ram", "POST", ram);
        console.log(serverGrphicResponse);
    }
}

const refreshRamTable = () => {
    motherBoards = ajaxGetRequest('/ram/getlist')
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

    fillDataIntoTable(graphicTab, motherBoards, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)


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

