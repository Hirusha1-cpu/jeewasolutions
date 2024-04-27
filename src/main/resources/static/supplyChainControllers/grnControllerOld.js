window.addEventListener('load', () => {
    refreshGrnForm();
    refreshGrnTable();

})
const refreshGrnForm = () => {
    grn = new Object();
    availableItem = new Object();
    existingItems = []
    existingGItems = []
    purchaseOrdersArray = []
    grnArray = []
    grnHasItems = new Object();
    serialNo = new Object();
    grn.grnHasCategory = new Array();
    // grn.grnHasCategory.serialNumbers = new Array();
    // grn.grnHasCategory.availableitems_id = new Array();
    // myArray = []

    
    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectCategories, "Select Category", categories, 'name')
    
    suppliers = ajaxGetRequest("/supplier/getlist")
    fillDataIntoSelect(selectSuppliersList, "Select Supplier", suppliers, 'name')
    console.log(suppliers);
    // getPurchBySuppliers() 

    // purchaseOrdersList = ajaxGetRequest("/purchase/getporeds")
}

const refreshGrnTable = ()=>{
    grnList = ajaxGetRequest('/grn/getlist')
    const displayProperties = [
        { property: getGrnItemCategory, dataType: 'function' },
        { property: getGrnItemBrand, dataType: 'function' },
        { property: getGrnsItemName, dataType: 'function' },
        { property: getGrnsItemQty, dataType: 'function' },
        { property: getGrnsItemDiscount, dataType: 'function' },
        { property: getGrnsItemSupplier, dataType: 'function' },
        { property: getGrnsItemTotal, dataType: 'function' },
    ]
 

    fillDataIntoTable(grnTab, grnList, displayProperties, refillGrnBtn, updateEmployeeBtn, deleteEmployeeBtn, true, null)

}
const getGrnItemCategory = (rowObject) => {
    let GrnItemCategory  = '';
    rowOb.purchaseHasCategory.forEach(element => {
        purchCategory = purchCategory + "<p class = 'working-status'>" + element.category_id.name + "</p>"
    })
    return purchCate.purchaseHasCategory
}
const getGrnItemBrand = (rowObject) => {
}
const getGrnsItemName = (rowObject) => {
}
const getGrnsItemQty = (rowObject) => {
}
const getGrnsItemDiscount = (rowObject) => {
}
const getGrnsItemSupplier = (rowObject) => {
}
const getGrnsItemTotal = (rowObject) => {
}


const refillGrnBtn = (rowObject) => {
    console.log("clicked purchase order");
}
const updateEmployeeBtn = (rowObject) => {
    console.log("clicked delete purchase order");
}
const deleteEmployeeBtn = (rowObject) => {
    console.log("clicked send purchase order");
}

const porderLists = (item) =>{
    // console.log(item);
    console.log(JSON.parse(selectSuppliersList.value).id);
    purchaseOrdersList = ajaxGetRequest("/purchase/getpurchasesupplier/"+JSON.parse(selectSuppliersList.value).id)
    console.log(purchaseOrdersList);
    // purchaseOrdersList = ajaxGetRequest("/purchase/getlist")
    // purchaseOrdersList = ajaxGetRequest("/purchase/getpurchasesupplier/"+ (selectSuppliersList.value).id)
    fillDataIntoSelectMulProp(selectPurchaseOrder1, "Select Purchase Order", purchaseOrdersList, 'purchase_code', "purchaseHasCategory",)

}

// const getPurchBySuppliers = () =>{
//     purchaseOrdersList = ajaxGetRequest("/purchase/getpurchasesupplier/1")
//     fillDataIntoSelect(selectPurchaseOrder1, "Select Purchase Order", purchaseOrdersList, 'id')
// }

const purchaseOrderTable = () => {
    inputPurchaseQuantity.value = ""
    inputPurchaseItemPrice.value = ""
    inputPurchaseLinePrice.value = ""
    purchaseOId.innerHTML = ""

    purchaseOrders = ajaxGetRequest("/purchase/purchaseoredrs/" + JSON.parse(selectPurchaseOrder1.value).id)

    console.log("purchaseOrders", purchaseOrders);

    // purchaseOrdersArray.push(purchaseOrders)
    // console.log("purchaseOrdersArray", purchaseOrdersArray);

    // const processedData = processPurchaseOrders(purchaseOrdersArray);

    // Filter new or updated items (assuming IDs are unique)
    // const newItems = processedData.filter(newItem => {
    //     return !existingItems.some(existingItem => existingItem.id === newItem.id);
    // });

    // // Update existingGItems with new items
    // existingItems.push(...newItems);
    displayProperties = [
        // { property: getPurchaseCode, dataType: 'function' },
        { property: getItemName, dataType: 'function' },
        { property: getItemPrice, dataType: 'function' },
        { property: getItemQty, dataType: 'function' },
        { property: getLinePrice, dataType: 'function' },
        // { property: getSupplierName, dataType: 'function' },
        // { property: getPurchaseOrderStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahsechkTable(selectedPurchaseOrderTable, purchaseOrders.purchaseHasCategory, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, checkBoxButton, true)

}
// const processPurchaseOrders = (purchaseOrdersArray) => {
//     const processedItems = [];
//     for (const purchaseOrder of purchaseOrdersArray) {

//         processedItems.push(purchaseOrder);
//         inputPurchaseQuantity.value = purchaseOrder.purchaseHasCategory[0]?.qty ?? "-"
//         inputPurchaseItemPrice.value = purchaseOrder.purchaseHasCategory[0]?.itemprice ?? "-"
//         inputPurchaseLinePrice.value = purchaseOrder.purchaseHasCategory[0]?.lineprice ?? "-"
//         purchaseOId.innerHTML = purchaseOrder.id
//     }
//     console.log("processedItems", processedItems);
//     return processedItems;
// };
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
        { property: getPurchaseForGrnCode, dataType: 'function' },
        { property: getGrnItemName, dataType: 'function' },
        { property: getGrnItemPrice, dataType: 'function' },
        { property: getGrnItemQty, dataType: 'function' },
        { property: getGrnLinePrice, dataType: 'function' },
        // { property: getGrnSupplierName, dataType: 'function' },
        { property: getGrnPurchaseOrderStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(selectedGrnTable, grnItems.grnHasCategory, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

}
const processGrnItems = (grnArray) => {
    const processedGItems = [];
    for (const grnItem of grnArray) {

        processedGItems.push(grnItem);
    }
    console.log("processedGGItems", processedGItems);
    return processedGItems;
};
const getPurchaseForGrnCode = (rowOb) => { return null }
// const getGrnItemName = (rowOb) => { return rowOb.purchase_id.purchaseHasCategory[0].itemname }
const getGrnItemName = (rowOb) => {
    console.log(rowOb);
    return rowOb.itemname ?? "-";
}
// const getGrnItemPrice = (rowOb) => { return rowOb.item_price }
const getGrnItemPrice = (rowOb) => { return rowOb.item_price ?? "-"; }
// const getGrnItemQty = (rowOb) => { return rowOb.qty }
const getGrnItemQty = (rowOb) => { return rowOb.qty ?? "-" }
// const getGrnLinePrice = (rowOb) => { return rowOb.lineprice }
const getGrnLinePrice = (rowOb) => { return rowOb.lineprice ?? "-" }
// const getGrnSupplierName = (rowOb) => { return rowOb.purchase_id.supplier_id.name }
// const getGrnSupplierName = (rowOb) => { return rowOb.purchase_id.supplier_id?.name ?? "-" }
const getGrnPurchaseOrderStatus = (rowOb) => {
    // if (rowOb.purchase_id.purchasestatus_id?.status == "active") {
    //     return '<i class="fa-solid fa-check"></i>'
    // } else {
    //     return '-'
    // }
    return null
}

const getPurchaseCode = (rowObject) => {
    console.log("rowObject", rowObject);
    return rowObject.purchase_code ?? "-"; 
}
const getItemName = (rowObject) => {

    return rowObject.itemname ?? "-"; 
}
const getItemPrice = (rowObject) => {
    return rowObject.itemprice ?? "-"; 
}
const getItemQty = (rowObject) => {
    return rowObject.qty ?? "-";
}
const getLinePrice = (rowObject) => {
    return rowObject.lineprice ?? "-"; 
}

const getSupplierName = (rowObject) => {
    console.log("supplier_id", rowObject.supplier_id);
    return rowObject.supplier_id?.name ?? "-"; 
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
const checkBoxButton = (rowObject) => {
    console.log("clicked check box");
    inputPurchaseQuantity.value = rowObject.qty
    inputPurchaseItemPrice.value = rowObject.itemprice
    inputPurchaseLinePrice.value = rowObject.lineprice
    purchaseOId.innerHTML = rowObject.id
    grnHasItems.category_id = rowObject.category_id
    
}

const addPurchaseOrderItemToTable = () => {
    console.log("hi");
    console.log(JSON.parse(selectPurchaseOrder1.value).id);
    purchaseOrderTable()
    selectPurchaseOrder1.value = ""
}


const generateLinePrice = () => {
    const qty1 = parseInt(inputPurchaseQuantity.value)
    const itemPrice1 = parseInt(inputPurchaseItemPrice.value)
    const linePrice = qty1 * itemPrice1;

    grnHasItems.lineprice = linePrice;
    inputPurchaseLinePrice.value = linePrice;
}
const generateSerialNumberList = () =>{
    const inputSerialNoDiv = document.querySelector("#inputSerialNoDiv");

    inputSerialNoDiv.innerHTML = ""
    const qty = parseInt(document.querySelector(".inputPurchaseQuantity").value)
    const serialNumbers = []; // Array to store serial number objects

    for (let id = 1; id <= qty; id++) {
        const div = document.createElement("div");
        div.className = "col-3 form-floating p-1";

        const label = document.createElement("label");
        label.setAttribute("for", "floatingInput");
        label.innerText = "Serial No " + id;

        const input = document.createElement("input");
        input.type = "text";
        input.className = "form-control";
        input.id = "txtqty" + id;

        // Add event listener to each input field
        input.addEventListener("input", () => {
            updateSerialNo(id, input.value);
        });

        div.appendChild(label);
        div.appendChild(input);
        inputSerialNoDiv.appendChild(div);
    }
    console.log("serialNo",serialNo);
    for (let id in serialNo) {
        serialNumbers.push({ serialno: serialNo[id] });
    }

    return serialNumbers;

}
// Function to update serialNo object
const updateSerialNo = (id, value) => {
    serialNo[id] = value;
    console.log("serialNo", serialNo);
}

const addGrn = () => {
    const serialNumbers = generateSerialNumberList();

    console.log("grn", grn);
    grnHasItems.serialNumbers = serialNumbers;
    grn.grnHasCategory.push(grnHasItems); // Push all filtered items
    // grn.grnHasCategory.availableitems_id.push(availableItem)
    // grn.grnHasCategory.serialNumbers.push(serialNo)
    // grn.grnHasCategory.serialNumbers = serialNumbers; 
    // grn.grnHasCategory.push(serialNumbers)
    console.log("grn", grn);
    // delete grn.purchase_id;

    let serverResponse = ajaxRequestBodyMethod("/grn", "POST", grn);
    console.log("serverResponse", serverResponse);
    let grnObjects = ajaxGetRequest("grn/getlists/" + serverResponse)
    console.log("grnObjects", grnObjects);
    grn = grnObjects
    grnItemTable()

    inputPurchaseQuantity.value = ""
    inputPurchaseItemPrice.value = ""
    inputPurchaseLinePrice.value = ""
    inputPurchaseDiscount.value = ""
    // inputSerialNo.value = ""
}

const generateNetAmount = () => {
    console.log("hi");
}

const addGrnMain = () => {
    console.log(grn);
    console.log(grnItems.id);
    // delete grn.grnHasCategory;

    const id = grnItems.id
    //metana kalin eka natuwa grn eka post krnna
    let serverResponse1 = ajaxRequestBodyMethod(`/grn/${id}`, "PUT", grn); // meken put ekak call karnna
    console.log(serverResponse1);

    inputSupplierInvoice.value = ""
    inputGrnTotalAmount.value = ""
    inputGrnDiscount.value = ""
    inputGrnNetAmount.value = ""

}

