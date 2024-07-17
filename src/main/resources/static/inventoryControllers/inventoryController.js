window.addEventListener('load', () => {
    console.log("gggg");
    refreshInventoryTable();
})

const refreshInventoryTable = () => {
    itemGraphicList = ajaxGetRequest('/inventory?name=graphiccard')
    itemRamList = ajaxGetRequest('/inventory?name=ram')
    itemCasingList = ajaxGetRequest('/inventory?name=casing')
    itemHardList = ajaxGetRequest('/inventory?name=harddisk')
    itemMonitorList = ajaxGetRequest('/inventory?name=monitor')
    itemPowerList = ajaxGetRequest('/inventory?name=powersupply')
    itemProList = ajaxGetRequest('/inventory?name=processor')
    itemMotherboardList = ajaxGetRequest('/inventory?name=motherboard')
    itemAccessoriesList = ajaxGetRequest('/inventory?name=accesories')

    const allItemsList = [
        ...itemGraphicList,
        ...itemRamList,
        ...itemCasingList,
        ...itemHardList,
        ...itemMonitorList,
        ...itemPowerList,
        ...itemProList,
        ...itemMotherboardList,
        ...itemAccessoriesList
    ];

    // const itemNamesList = allItemsList
    //     .filter(item => item.itemname != null)
    //     .map(item => item.itemname);

    // console.log(itemNamesList);

    const allItemNames = new Set();
    const itemSummaryList = allItemsList
        .filter(item => item.itemname != null)
        .map(item => ({
            itemname: item.itemname
        }));
    allItemNames.add(itemSummaryList)
    const uniqueItemNamesArray = Array.from(allItemNames); // Convert Set to an array

    console.log(uniqueItemNamesArray);

    // const allItemNames = new Set(); // Use a Set for efficient unique values collection

    // allItemsList.forEach(itemList1 => {
    //     itemList1.forEach(item => {
    //         if (item.itemname) { // Check for existence before adding
    //             allItemNames.add(item.itemname.trim()); // Add trimmed itemname for cleaner results
    //         }
    //     });
    // });
    // const uniqueItemNamesArray = Array.from(allItemNames); // Convert Set to an array
    // console.log(uniqueItemNamesArray);

    uniqueItemNamesArray.forEach(element => {
        const rtxItems = allItemsList.filter(item => item.itemname?.toLowerCase() === element.itemname);
        console.log(rtxItems);

    })

    console.log(allItemsList);
    const displayProperties = [
        { property: getCategory, dataType: 'function' },
        { property: 'itemname', dataType: 'string' },
        { property: 'itemprice', dataType: 'integer' },
        { property: getQty, dataType: 'string' }
    ]

    fillDataIntoTable(inventoryTab, allItemsList, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, false)

}

const getCategory = (rowOb) => {

}
const getQty = (rowOb) => {

}

const editEmployeeBtn = () => {

}
const updateEmployeeBtn = () => {

}
const deleteEmployeeBtn = () => {

}
