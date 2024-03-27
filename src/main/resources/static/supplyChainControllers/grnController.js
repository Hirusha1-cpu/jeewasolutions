window.addEventListener('load', () => {
    refreshGrnForm();
    // refreshSupplyTable();

})

const refreshGrnForm = () => {
    grn = new Object();
    existingItems = []
    existingGItems = []

    purchaseOrders = ajaxGetRequest("/purchase/getlist")
    fillDataIntoSelect(selectPurchaseOrder1, "Select Purchase Order", purchaseOrders, 'id')

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

    purchaseOrders = ajaxGetRequest("/grn/purchaseoredrs/" + JSON.parse(selectPurchaseOrder1.value).id)
    console.log("purchaseOrders",purchaseOrders);

    const processedData = processPurchaseOrders(purchaseOrders);

    // Add new items to existingItems
    existingItems.push(...processedData);
    displayProperties = [
        { property: getPurchaseCode, dataType: 'function' },
        { property: getItemName, dataType: 'function' },
        { property: getItemPrice, dataType: 'function' },
        { property: getItemQty, dataType: 'function' },
        { property: getLinePrice, dataType: 'function' },
        { property: getSupplierName, dataType: 'function' },
        { property: getPurchaseOrderStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(selectedPurchaseOrderTable, existingItems, displayProperties, purchaseOrderBtn, deletePurchBtn,sendPurchBtn, true)

}
const processPurchaseOrders = (purchaseOrders) => {
    const processedItems = [];
    for (const purchaseOrder of purchaseOrders) {

        processedItems.push(purchaseOrder);
        inputPurchaseQuantity.value = purchaseOrders[0].purchase_id.purchaseHasCategory[0]?.qty ?? "-"
        inputPurchaseItemPrice.value = purchaseOrders[0].purchase_id.purchaseHasCategory[0]?.itemprice ?? "-"
        inputPurchaseLinePrice.value = purchaseOrders[0].purchase_id.purchaseHasCategory[0]?.lineprice ?? "-"
        purchaseOId.innerHTML = purchaseOrders[0].purchase_id.id
    }
    console.log("processedItems", processedItems);
    return processedItems;
};
const grnItemTable = () => {

    grnItems = ajaxGetRequest("/grn/purchaseoredrs/" + grn.purchase_id.id)
    console.log("purchaseOrders",purchaseOrders);

    const processedGData = processPurchaseOrders(grnItems);

    // Add new items to existingItems
    existingGItems.push(...processedGData);
    displayProperties = [
        { property: getGrnCode, dataType: 'function' },
        { property: getGrnItemName, dataType: 'function' },
        { property: getGrnItemPrice, dataType: 'function' },
        { property: getGrnItemQty, dataType: 'function' },
        { property: getGrnLinePrice, dataType: 'function' },
        { property: getGrnSupplierName, dataType: 'function' },
        { property: getGrnPurchaseOrderStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(selectedGrnTable, existingGItems, displayProperties, purchaseOrderBtn, deletePurchBtn,sendPurchBtn, true)

}
const processGrnItems = (grnItems) => {
    const processedGItems = [];
    for (const grnItem of grnItems) {

        processedGItems.push(grnItem);
    }
    console.log("processedItems", processedGItems);
    return processedGItems;
};
const getGrnCode = (rowOb) =>{ return null}
const getGrnItemName = (rowOb) =>{ return rowOb.purchase_id.purchaseHasCategory[0].itemname}
const getGrnItemPrice = (rowOb) =>{ return rowOb.item_price}
const getGrnItemQty = (rowOb) =>{ return rowOb.qty}
const getGrnLinePrice = (rowOb) =>{ return rowOb.lineprice}
const getGrnSupplierName = (rowOb) =>{ return  null}
const getGrnPurchaseOrderStatus = (rowOb) =>{ 
    if (rowOb.purchase_id.purchasestatus_id.status == "active") {
        return '<i class="fa-solid fa-check"></i>'
    }
}


const getPurchaseCode = (rowObject) => {
    console.log("rowObject", rowObject);
    return rowObject.purchase_id.purchase_code ?? "-"; // Handle potential null values
}
const getItemName = (rowObject) => {

    return rowObject.purchase_id.purchaseHasCategory[0]?.itemname ?? "-"; // Handle potential null values

    // return rowObject.purchaseHasCategory.itemname;
    // const relatedItemName = rowObject.purchaseHasCategory.map(item => item.purchase_id).indexOf(rowObject.id);
    // const relatedItemName = rowObject.purchaseHasCategory.find(item => item.purchase_id === rowObject.id);
    // console.log("relatedItemName", relatedItemName);
    // return relatedItemName ? relatedItemName.itemname : "-"; // Handle potential null values
}
const getItemPrice = (rowObject) => {
    return rowObject.purchase_id.purchaseHasCategory[0]?.itemprice ?? "-"; // Handle potential null values

    // const relatedItemPrice = rowObject.purchaseHasCategory.find(item => item.purchase_id === rowObject.id);
    // return relatedItemPrice?.itemprice ?? "-"; // Handle potential null values
}
const getItemQty = (rowObject) => {
    return rowObject.purchase_id.purchaseHasCategory[0]?.qty ?? "-"; // Handle potential null values
    // const relatedItemQty = rowObject.purchaseHasCategory.find(item => item.purchase_id === rowObject.id);
    // return relatedItemQty?.qty ?? "-"; // Handle potential null values
}
const getLinePrice = (rowObject) => {
    return rowObject.purchase_id.purchaseHasCategory[0]?.lineprice ?? "-"; // Handle potential null values

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
    if (rowObject.purchase_id.purchasestatus_id.status == "active") {
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

const generateLinePrice = () =>{
    linePrice = JSON.parse(parseInt(grn.qty) * parseInt(grn.item_price))
    inputPurchaseLinePrice.value =  linePrice
    grn.lineprice = linePrice
}

const addGrn = () =>{
    console.log("grn", grn);
    let serverResponse = ajaxRequestBodyMethod("/grn", "POST", grn);
    console.log(serverResponse);
    grnItemTable()

}