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
        { property: "graphic_photo", dataType: 'photoarray' },
    ]

    fillDataIntoTable(graphicTab, graphic_Cards, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)


}
const refreshGraphicForm = () =>{
    graphicCard = {}

    graphicCard.graphic_photo= null;
    graphicCardPhoto.files = null
    imageGraphic.src = "resourcesT/assets/jeewa-high-resolution-logo-white-transparent.png"
    textGraphicPhoto.value = ""

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

const editEmployeeBtn = (rowOb) => {
    console.log(rowOb);
    console.log("edit");
    //refill image
    if (rowOb.graphic_photo == null) {
        imageGraphic.src = "resourcesT/assets/jeewa-high-resolution-logo-white-transparent.png"
    } else {
        imageGraphic.src = atob(rowOb.graphic_photo)
        console.log("executed");
    }
}
const updateEmployeeBtn = () => {
    console.log("update");
}
const deleteEmployeeBtn = () => {
    console.log("delete");
}

const objectshow = () =>{
    console.log(graphicCard);
}

const addGraphicCardDetails = () =>{
    console.log(graphicCard);
    let serverGrphicResponse = ajaxRequestBodyMethod("/graphiccard", "POST", graphicCard);
    console.log(serverGrphicResponse);
}

const clearImageBtn = () =>{
    console.log(graphicCard);
    if (graphicCard.graphic_photo != null) {
        const userConfirm = confirm("Are you sure you want to delete image")
        if (userConfirm) {
            graphicCard.graphic_photo= null;
            graphicCardPhoto.files = null
            imageGraphic.src = "resourcesT/assets/jeewa-high-resolution-logo-white-transparent.png"
            textGraphicPhoto.value = ""
            console.log(graphicCard);
        }
    } else {
        graphicCard.graphic_photo= null;
        imageGraphic.src = "resourcesT/assets/jeewa-high-resolution-logo-white-transparent.png"

    }
}

