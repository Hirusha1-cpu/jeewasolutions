window.addEventListener('load', () => {
    refreshGrnForm();
    // refreshSupplyTable();

})

const refreshGrnForm = () => {
    grn = new Object();
    grnArray = []
    gArray = []
    existingItems = []
    existingGItems = []
    newGrnItems = [];
    purchaseOrdersArray = []
    newGrnItems = []
    grn.grnHasCategory = new Array();

    purchaseOrdersList = ajaxGetRequest("/purchase/getlist")
    fillDataIntoSelect(selectPurchaseOrder1, "Select Purchase Order", purchaseOrdersList, 'id')

    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectCategories, "Select Category", categories, 'name')

    suppliers = ajaxGetRequest("/supplier/getlist")
    fillDataIntoSelect(selectSuppliers, "Select Supplier", suppliers, 'name')

    refreshGrnToTable();

}

const refreshGrnToTable = () => {
    grnHasItems = new Object();

}

const addPurchaseOrderItemToTable = () => {
    inputPurchaseQuantity.value = ""
    inputPurchaseItemPrice.value = ""
    inputPurchaseLinePrice.value = ""
    purchaseOId.innerHTML = ""

    purchaseOrders = ajaxGetRequest("/purchase/purchaseoredrs/" + JSON.parse(selectPurchaseOrder1.value).id)
    console.log("purchaseOrders", purchaseOrders);

    purchaseOrdersArray.push(purchaseOrders)
    console.log("purchaseOrdersArray", purchaseOrdersArray);

    const processedData = processPurchaseOrders(purchaseOrdersArray);

    // Filter new or updated items (assuming IDs are unique)
    const newItems = processedData.filter(newItem => {
        return !existingItems.some(existingItem => existingItem.id === newItem.id);
    });

    // Update existingGItems with new items
    existingItems.push(...newItems);

    displayPurchaseProperties = [
        { property: getPurchaseCode, dataType: 'function' },
        { property: getItemName, dataType: 'function' },
        { property: getItemPrice, dataType: 'function' },
        { property: getItemQty, dataType: 'function' },
        { property: getLinePrice, dataType: 'function' },
        { property: getSupplierName, dataType: 'function' },
        { property: getPurchaseOrderStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(selectedPurchaseOrderTable, existingItems, displayPurchaseProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

    selectPurchaseOrder1.value = ""
}

const processPurchaseOrders = (purchaseOrdersArray) => {
    const processedItems = [];
    for (const purchaseOrder of purchaseOrdersArray) {
        processedItems.push(purchaseOrder);
        inputPurchaseQuantity.value = purchaseOrder.purchaseHasCategory[0]?.qty ?? "-"
        inputPurchaseItemPrice.value = purchaseOrder.purchaseHasCategory[0]?.itemprice ?? "-"
        inputPurchaseLinePrice.value = purchaseOrder.purchaseHasCategory[0]?.lineprice ?? "-"
        purchaseOId.innerHTML = purchaseOrder.id
    }
    console.log("processedItems", processedItems);
    return processedItems;
};


const getPurchaseCode = (rowObject) => {
    console.log("rowObject", rowObject);
    return rowObject.purchase_code ?? "-";
}
const getItemName = (rowObject) => {
    return rowObject.purchaseHasCategory[0]?.itemname ?? "-";
}
const getItemPrice = (rowObject) => {
    return rowObject.purchaseHasCategory[0]?.itemprice ?? "-";
}
const getItemQty = (rowObject) => {
    return rowObject.purchaseHasCategory[0]?.qty ?? "-";
}
const getLinePrice = (rowObject) => {
    return rowObject.purchaseHasCategory[0]?.lineprice ?? "-";
}
const getSupplierName = (rowObject) => {
    console.log("supplier_id", rowObject.supplier_id);
    return rowObject.supplier_id?.name ?? "-";
}
const getPurchaseOrderStatus = (rowObject) => {
    if (rowObject.purchasestatus_id.status == "active") {
        return '<i class="fa-solid fa-check"></i>'
    }
    else {
        return '-'
    }
}

const purchaseOrderBtn = (rowObject) => {
    console.log("clicked purchase order");
}
const deletePurchBtn = (rowObject) => {
    console.log("clicked delete purchase order");
}
const sendPurchBtn = (rowObject) => {
    console.log("clicked send purchase order");
}

const generateLinePrice = () => {
    const qty1 = parseInt(inputPurchaseQuantity.value)
    const itemPrice1 = parseInt(inputPurchaseItemPrice.value)
    const linePrice = qty1 * itemPrice1;

    grnHasItems.lineprice = linePrice;
    inputPurchaseLinePrice.value = linePrice;
}
const addGrn = () => {
    const myArray = [];
    myArray.push(grnHasItems);

    console.log("grnHasItems", grnHasItems);

    // Access the last item using array destructuring
    const lastItem = myArray.slice(-1)[0];

    console.log(lastItem); // Output: { qty: 10, lineprice: 120, item_price: 12 }

    grn.grnHasCategory.push(lastItem); // Push all filtered items
    console.log("grn", grn);

    let serverResponse = ajaxRequestBodyMethod("/grn", "POST", grn);
    console.log(serverResponse);
    refreshGrnToTable();
    addToGrnTable()

};

const addToGrnTable = () =>{
    
    // gArray.push(grn.grnHasCategory)

    // console.log("selectPurchaseOrder1.value",selectPurchaseOrder1.value);
    // console.log("selectPurchaseOrder1.value",JSON.parse(selectPurchaseOrder1.value).id);
    // grns = ajaxGetRequest("/grn/getlist/" + selectPurchaseOrder1.value)
    grns = ajaxGetRequest("/grn/getlist")

    console.log("grns", grns);
    gArray.push(grns)

    const processedGData = processGrnItems(gArray);
    console.log("grnArray", gArray);
    // Filter new or updated items (assuming IDs are unique)
    const newItems = processedGData.filter(newItem => {
        return !existingGItems.some(existingItem => existingItem.id === newItem.id);
    });

    // Update existingGItems with new items
    existingGItems.push(...newItems);
    // existingGItems.push(...processedGData);
    console.log("existingGItems"), existingGItems;
    displayGRNProperties = [
        { property: getGrnCode, dataType: 'function' },
        { property: getGrnItemName, dataType: 'function' },
        { property: getGrnItemPrice, dataType: 'function' },
        { property: getGrnItemQty, dataType: 'function' },
        { property: getGrnLinePrice, dataType: 'function' },
        { property: getGrnSupplierName, dataType: 'function' },
        { property: getGrnPurchaseOrderStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(selectedGrnTable, existingGItems, displayGRNProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

}
const processGrnItems = (grnArray) => {
    const processedGItems = [];
    for (const grnItem of grnArray) {

        processedGItems.push(grnItem);
    }
    console.log("processedItems", processedGItems);
    return processedGItems;
}
const getGrnCode = (rowOb) => { return null }
// const getGrnItemName = (rowOb) => { return rowOb.purchase_id.purchaseHasCategory[0].itemname }
const getGrnItemName = (rowOb) => { return null }
// const getGrnItemPrice = (rowOb) => { return rowOb.item_price }
const getGrnItemPrice = (rowOb) => { return null }
const getGrnItemQty = (rowOb) => { return null }
const getGrnLinePrice = (rowOb) => { return null }
// const getGrnSupplierName = (rowOb) => { return rowOb.purchase_id.supplier_id.name }
const getGrnSupplierName = (rowOb) => { return null }
const getGrnPurchaseOrderStatus = (rowOb) => {
    // if (rowOb.purchase_id.purchasestatus_id.status == "active") {
    //     return '<i class="fa-solid fa-check"></i>'
    // }else{
    //     return '-'
    // }
    return  null
}