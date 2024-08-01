window.addEventListener('load', () => {
    refreshLaptopTable();
    refreshLaptopForm();
})
const refreshLaptopForm = ()=>{
    laptop = {}
    laptop1 = {}
 

    brands = ajaxGetRequest("brand/getlist")
    fillDataIntoSelect(selectBrandInLap, "Select brands", brands, 'name')

    pcpart = ajaxGetRequest("pcstatus/getlist")
    fillDataIntoSelect(laptopPcPartStatus, "Select pcpart", pcpart, 'status')
}
const refreshLaptopTable = () => {
    laps = ajaxGetRequest('/laptop/getlist')
    const displayProperties = [
        { property: 'name', dataType: 'string' },
        { property: getBrand, dataType: 'function' },
        { property: getCategory, dataType: 'function' },
        { property: getPcpartstatus, dataType: 'function' },
        { property: 'processor', dataType: 'string' },
        { property: 'gpu', dataType: 'string' },
        { property: 'screensize', dataType: 'string' },
        { property: 'storage', dataType: 'string' },
        { property: 'ramcapacity', dataType: 'string' },
    ]

    fillDataIntoTable(laptopTab, laps, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)


}
const getBrand = (rowOb) =>{
    return rowOb.brand_id.name
}
const getCategory = (rowOb) =>{
    return rowOb.category_id.name
}
const getPcpartstatus = (rowOb) =>{
    return rowOb.pc_part_status_id.status
}

const editEmployeeBtn = () =>{

}
const updateEmployeeBtn = () =>{

}
const deleteEmployeeBtn = () =>{

}
const showObject = () => {
    console.log(laptop);
}
const handleSalePrice = (value) =>{
    laptopSellPrice.value = parseFloat(value) * parseFloat(laptopPurchasePrice.value)
}
const handleMaxPrice = (value) =>{
    laptopMaxDiscount1.value = parseFloat(value) * parseFloat(laptopPurchasePrice.value)
}
const handleMinPrice = (value) =>{
    laptopMinDiscount1.value = parseFloat(value) * parseFloat(laptopPurchasePrice.value)
}
const addlaptopDetails = () => {

    console.log(laptop);
    // graphicCard.sales_rate = parseFloat(graphicCardSellRatio.value)
    if (laptop1.sales_rate != "") {
        console.log(laptop1);
        // let sellPrice = parseFloat(graphicCard1.sales_rate1)
        // let purchasePrice = parseFloat(graphicCard.purchase_price)
        // graphicCard.sales_rate = parseFloat(sellPrice / purchasePrice)
        let serverlapResponse = ajaxRequestBodyMethod("/laptop", "POST", laptop);
        console.log(serverlapResponse);
    }else{
        let serverlapResponse = ajaxRequestBodyMethod("/laptop", "POST", laptop);
        console.log(serverlapResponse);
    }
}
