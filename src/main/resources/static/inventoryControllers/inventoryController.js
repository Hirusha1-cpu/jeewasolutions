window.addEventListener('load', () => {
    console.log("gggg");
    refreshInventoryTable();
})

const refreshInventoryTable = () => {
    getCountsCategory()
    searchInInventoryTable()
    // itemGraphicList = ajaxGetRequest('/inventory?name=graphiccard')
    // itemRamList = ajaxGetRequest('/inventory?name=ram')
    // itemCasingList = ajaxGetRequest('/inventory?name=casing')
    // itemHardList = ajaxGetRequest('/inventory?name=harddisk')
    // itemMonitorList = ajaxGetRequest('/inventory?name=monitor')
    // itemPowerList = ajaxGetRequest('/inventory?name=powersupply')
    // itemProList = ajaxGetRequest('/inventory?name=processor')
    // itemMotherboardList = ajaxGetRequest('/inventory?name=motherboard')
    // itemAccessoriesList = ajaxGetRequest('/inventory?name=accesories')

    // const allItemsList = [
    //     ...itemGraphicList,
    //     ...itemRamList,
    //     ...itemCasingList,
    //     ...itemHardList,
    //     ...itemMonitorList,
    //     ...itemPowerList,
    //     ...itemProList,
    //     ...itemMotherboardList,
    //     ...itemAccessoriesList
    // ];

    // //meken itemname null nowana tika array eken aragena eka eka array ekakata gannawa(uniqueItemNamesArray)
    // const allItemNames = new Set();
    // const itemSummaryList = allItemsList
    //     .filter(item => item.itemname != null)
    //     .map(item => ({
    //         itemname: item.itemname
    //     }));
    // allItemNames.add(itemSummaryList)
    // const uniqueItemNamesArray = Array.from(allItemNames); // Convert Set to an array

    // console.log(uniqueItemNamesArray);

    // //me array eke item
    // const itemNameCounts = uniqueItemNamesArray[0].reduce((acc, item) => {
    //     acc[item.itemname] = (acc[item.itemname] || 0) + 1;
    //     return acc;
    // }, {});

    // console.log(itemNameCounts);

    // const itemNameCountArray = Object.entries(itemNameCounts).map(([itemname, count]) => ({
    //     itemname,
    //     count
    // }));

    // // array.reduce(function(accumulator, currentValue, currentIndex, array) {
    // //     // Code to process each element and update the accumulator
    // //     return accumulator;
    // //   }, initialValue);

    // console.log(itemNameCountArray);

    // // const allItemNames = new Set(); // Use a Set for efficient unique values collection

    // // allItemsList.forEach(itemList1 => {
    // //     itemList1.forEach(item => {
    // //         if (item.itemname) { // Check for existence before adding
    // //             allItemNames.add(item.itemname.trim()); // Add trimmed itemname for cleaner results
    // //         }
    // //     });
    // // });
    // // const uniqueItemNamesArray = Array.from(allItemNames); // Convert Set to an array
    // // console.log(uniqueItemNamesArray);

    // console.log(allItemsList);
    // const displayProperties = [
    //     { property: "category_name", dataType: 'string' },
    //     { property: getItemname, dataType: 'string' },
    //     { property: getItemprice, dataType: 'integer' },
    //     { property: getQty, dataType: 'string' }
    // ]

    // fillDataIntoTable(inventoryTab, allItemsList, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, false)

}

const searchInInventoryTable = ()=>{
    const searchInput = document.getElementById('searchInput');
    const table = document.getElementById('inventoryTab');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');

    searchInput.addEventListener('keyup', function() {
        const filter = searchInput.value.toLowerCase();
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let rowContainsFilter = false;

            for (let j = 0; j < cells.length; j++) {
                if (cells[j].innerText.toLowerCase().includes(filter)) {
                    rowContainsFilter = true;
                    break;
                }
            }
            rows[i].style.display = rowContainsFilter ? '' : 'none';
        }
    });
}

const editEmployeeBtn = () => {

}
const updateEmployeeBtn = () => {

}
const deleteEmployeeBtn = () => {

}

const getCountsCategory = async () => {
    const categoryNames = await ajaxGetRequest('category/getlist');
    const catArray = Array.from(categoryNames);
    console.log(catArray);

    const arrayListCate = await Promise.all(categoryNames.map(async (categoryName) => {
        console.log(categoryName);
        let categoriesItems1 = await ajaxGetRequest(`/${categoryName.name}/getlist`);
        console.log(categoriesItems1);
        let getReorderItems = await ajaxGetRequest(`/${categoryName.name}/getreorderreached`)
        console.log(getReorderItems);
        if (getReorderItems.length > 0) {

            if (Array.isArray(categoriesItems1) && categoriesItems1.length > 0) {
                //some- Determines whether the specified callback function returns true for any element of an array.
                const hasMatchingReorderItems = categoriesItems1.some(categoryItem =>
                    getReorderItems.some(reorderItem => reorderItem.name === categoryItem.name)
                );
                console.log(hasMatchingReorderItems);
                if (hasMatchingReorderItems) {

                    return {
                        category_name: categoryName.name,
                        items: categoriesItems1.map(categoryItem => {
                            const matchingReorderItem = getReorderItems.find(reorderItem => reorderItem.name === categoryItem.name);
                            if (matchingReorderItem) {
                                
                                return {
                                    qty: categoryItem.qty,
                                    name: categoryItem.name,
                                    purchase_price: categoryItem.purchase_price,
                                    category_name: categoryItem.category_id?.name,
                                    reorderstatus: true,
                                    reorderqty: categoryItem.reorder_point
                                };
                            } else {
                                return {
                                    qty: categoryItem.qty,
                                    name: categoryItem.name,
                                    purchase_price: categoryItem.purchase_price,
                                    category_name: categoryItem.category_id?.name,
                                    reorderstatus: false,
                                    reorderqty: categoryItem.reorder_point
                                };
                            }
                        }),
                    };
                } else {
                    return {
                        category_name: categoryName.name,
                        items: categoriesItems1.map(item => ({
                            qty: item.qty,
                            name: item.name,
                            purchase_price: item.purchase_price,
                            category_name: item.category_id?.name,
                            reorderstatus: false,
                            reorderqty: item.reorder_point
                        })),
                    }
                }
            

            } else {
                if (Array.isArray(categoriesItems1) && categoriesItems1.length > 0) {
                  
                    categoriesItems1.forEach(categoryItem => {
                       
                        return {
                            category_name: categoryName.name,
                            items: categoriesItems1.map(item => ({
                                qty: item.qty,
                                name: item.name,
                                purchase_price: item.purchase_price,
                                category_name: item.category_id?.name,
                                reorderstatus: false,
                                reorderqty: item.reorder_point
                            })),

                        };

                    })
                } else {
                    return {
                        category_name: categoryName.name,
                        items: []
                    };
                }
            }
        } else {
            return {
                category_name: categoryName.name,
                items: categoriesItems1.map(item => ({
                    qty: item.qty,
                    name: item.name,
                    purchase_price: item.purchase_price,
                    category_name: item.category_id?.name,
                    reorderstatus: false,
                    reorderqty: item.reorder_point
                })),
            }
        };
    }))

    console.log(arrayListCate);

    // This filter is not necessary anymore since we're always returning an object
    // const filteredArrayListCate = arrayListCate.filter(category => category !== null);
    console.log(arrayListCate);
    const displayProperties = [
        { property: getCategory, dataType: 'function' },
        { property: getItemname, dataType: 'function' },
        { property: getItemprice, dataType: 'function' },
        { property: getQty, dataType: 'function' },
        { property: getReorderQty, dataType: 'function' }
    ]

    fillDataIntoTable(inventoryTab, arrayListCate, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, false)

};

const getCategory = (rowOb) => {
    console.log(rowOb);
    return rowOb?.category_name
}

const getQty = (rowOb) => {

    console.log(rowOb);
    let qty = ''
    rowOb?.items.forEach((item) => {
        if (item.reorderstatus == true) {
            qty = qty + "<p class = 'deleted-status'>" + item.qty + "</p>"
        } else {

            qty = qty + "<p class = 'working-status'>" + item.qty + "</p>"
        }
    })
    return qty
}
const getItemname = (rowOb) => {
    let iname = ''
    rowOb?.items.forEach((item) => {
        if (item.reorderstatus == true) {
            iname = iname + ("<p class = 'deleted-status'>" + item.name + "</p>")
        } else {

            iname = iname + ("<p class = 'working-status'>" + item.name + "</p>")
        }
    })
    return iname
}
const getItemprice = (rowOb) => {
    let price = ''
    rowOb?.items.forEach((item) => {
        if (item.reorderstatus == true) {
            price = price + "<p class = 'deleted-status'>" + item.purchase_price + "</p>"
        } else {

            price = price + "<p class = 'working-status'>" + item.purchase_price + "</p>"
        }
    })
    return price
}
const getReorderQty = (rowOb) => {
    let price = ''
    rowOb?.items.forEach((item) => {
        if (item.reorderstatus == true) {
            price = price + "<p class = 'deleted-status'>" + item.reorderqty + "</p>"
        } else {

            price = price + "<p class = 'working-status'>" + item.reorderqty + "</p>"
        }
    })
    return price
}

// const getCountsCategory = () => {
//     categoryNames = ajaxGetRequest('category/getlist')
//     const catArray = Array.from(categoryNames);
//     console.log(catArray);
//     let arrayListCate = categoryNames.forEach(categoryName => {
//         console.log(categoryName);
//         let categoriesItems1 = ajaxGetRequest(`/${categoryName.name}/getlist`)
//         console.log(categoriesItems1);
//         if (categoriesItems1.length > 0) {
//             return {
//                 category_name: categoryName.name,
//                 items: categoriesItems1.map(item => ({
//                     qty: item.qty,
//                     name: item.name,
//                     purchase_price: item.purchase_price,
//                     category_name: item.category_id?.name
//                 }))
//             };
//         }else{
//             return {
//                 category_name: categoryName.name,
//                 items: []
//             };
//         }
//     })

//     console.log(arrayListCate);
//     const filteredArrayListCate = arrayListCate.filter(category => category !== null);

//     console.log(filteredArrayListCate);
//     return filteredArrayListCate;

// }


