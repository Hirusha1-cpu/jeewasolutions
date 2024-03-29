window.addEventListener('load', () => {
    refreshGrnForm();
    // refreshSupplyTable();

})

const refreshGrnForm = () => {
    grn = new Object();
    porderItems = new Object();
    existingItems = []
    purchaseOrdersArray = []


    purchaseOrdersList = ajaxGetRequest("/purchase/getlist")
    fillDataIntoSelect(selectPurchaseOrder1, "Select Purchase Order", purchaseOrdersList, 'id')

    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectCategories, "Select Category", categories, 'name')

    suppliers = ajaxGetRequest("/supplier/getlist")
    fillDataIntoSelect(selectSuppliers, "Select Supplier", suppliers, 'name')

}

const addPurchaseOrderItemToTable = () =>{
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
    else{
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

