window.addEventListener('load', () => {
    refreshLaptopTable();
    refreshLaptopForm();
})
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
const refreshLaptopForm = () =>{

}