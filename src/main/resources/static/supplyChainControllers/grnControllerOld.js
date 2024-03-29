window.addEventListener('load', () => {
    refreshGrnForm();
    // refreshSupplyTable();

})

const refreshGrnForm = () => {
    grn = new Object();
    existingItems = []
    existingGItems = []
    purchaseOrdersArray = []
    grnArray = []

    purchaseOrdersList = ajaxGetRequest("/purchase/getlist")
    fillDataIntoSelect(selectPurchaseOrder1, "Select Purchase Order", purchaseOrdersList, 'id')

    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectCategories, "Select Category", categories, 'name')

    suppliers = ajaxGetRequest("/supplier/getlist")
    fillDataIntoSelect(selectSuppliers, "Select Supplier", suppliers, 'name')

}

const purchaseOrderTable = () => {
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
    displayProperties = [
        { property: getPurchaseCode, dataType: 'function' },
        { property: getItemName, dataType: 'function' },
        { property: getItemPrice, dataType: 'function' },
        { property: getItemQty, dataType: 'function' },
        { property: getLinePrice, dataType: 'function' },
        { property: getSupplierName, dataType: 'function' },
        { property: getPurchaseOrderStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(selectedPurchaseOrderTable, existingItems, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

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
const grnItemTable = () => {

    grnItems = ajaxGetRequest("/grn/getlist/" + grn.purchase_id.id)
    console.log("grnItems", grnItems);

    // Add new items to existingItems
    grnArray.push(grnItems)
    const processedGData = processGrnItems(grnArray);
    console.log("grnArray", grnArray);
    // Filter new or updated items (assuming IDs are unique)
    const newItems = processedGData.filter(newItem => {
        return !existingGItems.some(existingItem => existingItem.id === newItem.id);
    });

    // Update existingGItems with new items
    existingGItems.push(...newItems);
    // existingGItems.push(...processedGData);
    console.log("existingGItems"), existingGItems;
    displayProperties = [
        { property: getGrnCode, dataType: 'function' },
        { property: getGrnItemName, dataType: 'function' },
        { property: getGrnItemPrice, dataType: 'function' },
        { property: getGrnItemQty, dataType: 'function' },
        { property: getGrnLinePrice, dataType: 'function' },
        { property: getGrnSupplierName, dataType: 'function' },
        { property: getGrnPurchaseOrderStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(selectedGrnTable, existingGItems, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

}
const processGrnItems = (grnArray) => {
    const processedGItems = [];
    for (const grnItem of grnArray) {

        processedGItems.push(grnItem);
    }
    console.log("processedItems", processedGItems);
    return processedGItems;
};
const getGrnCode = (rowOb) => { return null }
const getGrnItemName = (rowOb) => { return rowOb.purchase_id.purchaseHasCategory[0].itemname }
const getGrnItemPrice = (rowOb) => { return rowOb.item_price }
const getGrnItemQty = (rowOb) => { return rowOb.qty }
const getGrnLinePrice = (rowOb) => { return rowOb.lineprice }
const getGrnSupplierName = (rowOb) => { return rowOb.purchase_id.supplier_id.name }
const getGrnPurchaseOrderStatus = (rowOb) => {
    if (rowOb.purchase_id.purchasestatus_id.status == "active") {
        return '<i class="fa-solid fa-check"></i>'
    }
}


const getPurchaseCode = (rowObject) => {
    console.log("rowObject", rowObject);
    return rowObject.purchase_code ?? "-"; // Handle potential null values
}
const getItemName = (rowObject) => {

    return rowObject.purchaseHasCategory[0]?.itemname ?? "-"; // Handle potential null values

    // return rowObject.purchaseHasCategory.itemname;
    // const relatedItemName = rowObject.purchaseHasCategory.map(item => item.purchase_id).indexOf(rowObject.id);
    // const relatedItemName = rowObject.purchaseHasCategory.find(item => item.purchase_id === rowObject.id);
    // console.log("relatedItemName", relatedItemName);
    // return relatedItemName ? relatedItemName.itemname : "-"; // Handle potential null values
}
const getItemPrice = (rowObject) => {
    return rowObject.purchaseHasCategory[0]?.itemprice ?? "-"; // Handle potential null values

    // const relatedItemPrice = rowObject.purchaseHasCategory.find(item => item.purchase_id === rowObject.id);
    // return relatedItemPrice?.itemprice ?? "-"; // Handle potential null values
}
const getItemQty = (rowObject) => {
    return rowObject.purchaseHasCategory[0]?.qty ?? "-"; // Handle potential null values
    // const relatedItemQty = rowObject.purchaseHasCategory.find(item => item.purchase_id === rowObject.id);
    // return relatedItemQty?.qty ?? "-"; // Handle potential null values
}
const getLinePrice = (rowObject) => {
    return rowObject.purchaseHasCategory[0]?.lineprice ?? "-"; // Handle potential null values

    // const relatedItemLinePrice = rowObject.purchaseHasCategory.find(item => item.purchase_id === rowObject.id);
    // return relatedItemLinePrice?.lineprice ?? "-"; // Handle potential null values
}

const getSupplierName = (rowObject) => {
    console.log("supplier_id", rowObject.supplier_id);
    // return rowObject.supplier_id.name;
    return rowObject.supplier_id?.name ?? "-"; // Handle potential null values
}
const getPurchaseOrderStatus = (rowObject) => {


    // return '<i class="fa-solid fa-check"></i>'
    if (rowObject.purchasestatus_id.status == "active") {
        return '<i class="fa-solid fa-check"></i>'
    }
    // if (rowObject.purchasestatus_id.status == "0") {
    //     return '<i class="fa-solid fa-xmark"></i>'
    // }
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

const addPurchaseOrderItemToTable = () => {
    console.log("hi");
    console.log(JSON.parse(selectPurchaseOrder1.value).id);

    purchaseOrderTable()
    selectPurchaseOrder1.value = ""

}

const generateLinePrice = () => {
    const qty = parseInt(grn.qty, 10) || 0; // Handle potential NaN values
    const itemPrice = parseInt(grn.item_price, 10) || 0;
    const linePrice = qty * itemPrice;

    inputPurchaseLinePrice.value = linePrice;
    grn.lineprice = linePrice;
}

const addGrn = () => {
    console.log("grn", grn);
    let serverResponse = ajaxRequestBodyMethod("/grn", "POST", grn);
    console.log(serverResponse);
    grnItemTable()

}