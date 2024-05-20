window.addEventListener('load', () => {
    refreshGrnForm();
    refreshGrnTable();

})
//refresh the grn form
const refreshGrnForm = () => {
    grn = new Object();
    availableItem = new Object();
    existingItems = []
    existingGItems = []
    purchaseOrdersArray = []
    expensePaymentsObj = {}
    expensePayments = {}
    grnArray = []
    grnHasItems = new Object();
    serialNo = new Object();
    grn.grnHasCategory = new Array();
    // grn.grnHasCategory.serialNumbers = new Array();
    // grn.grnHasCategory.availableitems_id = new Array();
    // myArray = []

    //fill the select of the categories
    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectCategories, "Select Category", categories, 'name')
    //fill the select of the suppliers
    suppliers = ajaxGetRequest("/supplier/getlist")
    fillDataIntoSelect(selectSuppliersList, "Select Supplier", suppliers, 'name')
    console.log(suppliers);
    // getPurchBySuppliers() 

    // purchaseOrdersList = ajaxGetRequest("/purchase/getporeds")
}
//refresh the table of grn
const refreshGrnTable = () => {
    grnList = ajaxGetRequest('/grn/getlist')
    console.log(grnList);
    const displayProperties = [
        { property: getGrnItemCategory, dataType: 'function' },
        // { property: getGrnItemBrand, dataType: 'function' },
        { property: getGrnsItemName, dataType: 'function' },
        { property: getGrnsItemQty, dataType: 'function' },
        { property: getGrnsItemDiscount, dataType: 'function' },
        { property: getGrnsItemSupplier, dataType: 'function' },
        { property: getGrnsItemSupplierInvoice, dataType: 'function' },
        { property: getGrnsItemTotal, dataType: 'function' },
    ]
    fillDataIntoTable(grnTab, grnList, displayProperties, refillGrnBtn, updateEmployeeBtn, deleteEmployeeBtn, true, null)

}
const getGrnItemCategory = (rowObject) => {
    //object eke array ekk the nm meken for loop eken ekin eka aran pennawa
    let GrnItemCategory = '';
    rowObject.grnHasCategory.forEach(element => {
        GrnItemCategory = GrnItemCategory + "<p class = 'working-status'>" + element.category_id.name + "</p>"
    })
    return GrnItemCategory
}

const getGrnsItemName = (rowObject) => {
    let GrnItemName = '';
    rowObject.grnHasCategory.forEach(element => {
        GrnItemName = GrnItemName + "<p class = 'working-status'>" + element.itemname + "</p>"
    })
    return GrnItemName
}
const getGrnsItemQty = (rowObject) => {
    let GrnItemCategory = '';
    rowObject.grnHasCategory.forEach(element => {
        GrnItemCategory = GrnItemCategory + "<p class = 'working-status'>" + element.qty + "</p>"
    })
    return GrnItemCategory
}
const getGrnsItemDiscount = (rowObject) => {
    let GrnItemDiscount = '';
    rowObject.grnHasCategory.forEach(element => {
        GrnItemDiscount = GrnItemDiscount + "<p class = 'working-status'>" + element.discount + "</p>"
    })
    return GrnItemDiscount
}
const getGrnsItemSupplier = (rowObject) => {
    return "<p class = 'working-status'>" + rowObject.purchase_id.supplier_id.name + "</p>"

}
const getGrnsItemSupplierInvoice = (rowObject) => {
    return "<p class = 'working-status'>" + rowObject.supplierinvoiceno + "</p>"

}
const getGrnsItemTotal = (rowObject) => {
    let GrnItemTotal = '';
    rowObject.grnHasCategory.forEach(element => {

        GrnItemTotal = GrnItemTotal + "<p class = 'working-status'>" + (element.item_price) * (element.qty) + "</p>"
    })
    return GrnItemTotal
}



const updateEmployeeBtn = (rowObject) => {
    console.log("clicked delete purchase order");
}
const deleteEmployeeBtn = (rowObject) => {
    console.log("clicked send purchase order");
}

const porderLists = (item) => {
    // console.log(item);
    //when select the supplier get that supplier value id eka aragena ekata adala purchase orders list eka aragnnwa select value widhata
    console.log(JSON.parse(selectSuppliersList.value).id);
    purchaseOrdersList = ajaxGetRequest("/purchase/getpurchasesupplier/" + JSON.parse(selectSuppliersList.value).id)
    console.log(purchaseOrdersList);
    // purchaseOrdersList = ajaxGetRequest("/purchase/getlist")
    // purchaseOrdersList = ajaxGetRequest("/purchase/getpurchasesupplier/"+ (selectSuppliersList.value).id)
    fillDataIntoSelect(selectPurchaseOrder1, "Select Purchase Order", purchaseOrdersList, 'purchase_code')

}
const refillGrnBtn = (item) => {
    grn = JSON.parse(JSON.stringify(item));
    oldgrn = JSON.parse(JSON.stringify(item));
    console.log(grn);
    console.log("clicked purchase order");
    //grn.grnHasCategory.length eka 1 ta wadi nm prompt ekk call wenwa
    if (grn.grnHasCategory.length > 1) {

        const inputNo = prompt("Enter a value for purchase.purchaseHasCategory[0]:");
        const inputValue = parseInt(inputNo)
        inputPurchaseQuantity.value = grn.grnHasCategory[inputValue].qty
        inputPurchaseItemPrice.value = grn.grnHasCategory[inputValue].item_price
        inputPurchaseLinePrice.value = grn.grnHasCategory[inputValue].lineprice
        inputPurchaseDiscount.value = grn.grnHasCategory[inputValue].discount
    } else {
        inputPurchaseQuantity.value = grn.grnHasCategory[0].qty
        inputPurchaseItemPrice.value = grn.grnHasCategory[0].item_price
        inputPurchaseLinePrice.value = grn.grnHasCategory[0].lineprice
        inputPurchaseDiscount.value = grn.grnHasCategory[0].discount
    }
    // console.log(inputValue);
    fillDataIntoSelect(selectSuppliersList, "Select Supplier", suppliers, 'name', grn.purchase_id.supplier_id.name);
    purchaseOrdersList1 = ajaxGetRequest("/purchase/getpurchasesupplier/" + JSON.parse(grn.purchase_id.supplier_id.id))
    fillDataIntoSelect(selectPurchaseOrder1, "Select Purchase Order", purchaseOrdersList1, 'purchase_code', grn.purchase_id.purchase_code)
    //mekedi qty eka enter karama ekata adalawa serial no input boxes set ekk generate wela 
    //mekedi inputSerialNoDiv kiyn id eke div ekata set wenwa serial no input box list ekak
    console.log(inputPurchaseQuantity.value);
    const inputSerialNoDiv = document.querySelector("#inputSerialNoDiv");

    inputSerialNoDiv.innerHTML = ""
    const qty = parseInt(document.querySelector(".inputPurchaseQuantity").value)
    const serialNumbers = []; // Array to store serial number objects
    // grn has category eke array length eka 1ta wadi nm prompt box ehekin input value ekk aragena 
    // ekata adalwa thyena array eke object eka aran pennwa
    if (grn.grnHasCategory.length > 1) {

        const inputNo = prompt("Enter a value for purchase.purchaseHasCategory[0]:");
        const inputValue = parseInt(inputNo)
        for (let id = 0; id < qty; id++) {
            const div = document.createElement("div");
            div.className = "col-3 form-floating p-1";

            const label = document.createElement("label");
            label.setAttribute("for", "floatingInput");
            label.innerText = "Serial No " + id;

            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.id = "txtqty" + id;

            input.value = grn.grnHasCategory[inputValue].serialNumbers[id].serialno

            // Add event listener to each input field
            input.addEventListener("input", () => {
                updateSerialNo(id, input.value);
            });

            div.appendChild(label);
            div.appendChild(input);
            inputSerialNoDiv.appendChild(div);
        }
    } else {

        for (let id = 0; id < qty; id++) {
            const div = document.createElement("div");
            div.className = "col-3 form-floating p-1";

            const label = document.createElement("label");
            label.setAttribute("for", "floatingInput");
            label.innerText = "Serial No " + (id + 1);

            const input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.id = "txtqty" + id;

            input.value = grn.grnHasCategory[0].serialNumbers[id].serialno

            // Add event listener to each input field
            input.addEventListener("input", () => {
                updateSerialNo(id, input.value);
            });

            div.appendChild(label);
            div.appendChild(input);
            inputSerialNoDiv.appendChild(div);
        }
    }

    console.log("serialNo", serialNo);
    for (let id in serialNo) {
        serialNumbers.push({ serialno: serialNo[id] });
    }

    // return serialNumbers;

    const updateSerialNo = (id, value) => {
        serialNo[id] = value;
        console.log("serialNo", serialNo);
    }

    displayProperties = [
        // { property: getPurchaseCode, dataType: 'function' },
        { property: getItemName, dataType: 'function' },
        { property: getItemPrice, dataType: 'function' },
        { property: getItemQty, dataType: 'function' },
        { property: getLinePrice, dataType: 'function' },
        // { property: getSupplierName, dataType: 'function' },
        // { property: getPurchaseOrderStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahsechkTable(selectedPurchaseOrderTable, grn.purchase_id.purchaseHasCategory, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, checkBoxButton, true)

    displayProperties = [
        { property: getPurchaseForGrnCode, dataType: 'function' },
        { property: getGrnItemName, dataType: 'function' },
        { property: getGrnItemPrice, dataType: 'function' },
        { property: getGrnItemQty, dataType: 'function' },
        { property: getGrnLinePrice, dataType: 'function' },
        // { property: getGrnSupplierName, dataType: 'function' },
        { property: getGrnPurchaseOrderStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(selectedGrnTable, grn.grnHasCategory, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

    // purchaseOrderTable()
    // grnItemTable()
    inputSupplierInvoice.value = grn.supplierinvoiceno
    inputGrnTotalAmount.value = grn.totalamount
    inputGrnDiscount.value = grn.discountrate
    inputGrnNetAmount.value = grn.netamount


    const table = document.getElementById("empTable");
    const form = document.getElementById("empForm");

    // Animate table disappearance
    table.style.opacity = 1; // Ensure opacity is initially 1
    table.style.transition = "opacity 1.5s ease-out";
    table.style.display = "none"; // Trigger the animation

    // Delay form appearance slightly
    setTimeout(function () {
        form.style.opacity = 0;
        form.style.display = "block";
        form.style.transition = "opacity 1.5s ease-in";
        form.style.opacity = 1; // Gradually fade in
    }, 100); // Adjust the delay as needed    
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
    //when select porder then fill the table related to porder with ItemName,ItemPrice,ItemQty,LinePrice wlin
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
    console.log(grn);
    grnItems = ajaxGetRequest("/grn/getlist/" + grn.purchase_id.id)
    console.log("grnItems", grnItems);

    // Add new items to existingItems
    // grnArray.push(grnItems)
    // const processedGData = processGrnItems(grnArray);
    // console.log("grnArray", grnArray);
    // Filter new or updated items (assuming IDs are unique)
    // const newItems = processedGData.filter(newItem => {
    //     return !existingGItems.some(existingItem => existingItem.id === newItem.id);
    // });

    // // Update existingGItems with new items
    // existingGItems.push(...newItems);
    // // existingGItems.push(...processedGData);
    // console.log("existingGItems"), existingGItems;
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
// const processGrnItems = (grnArray) => {
//     const processedGItems = [];
//     for (const grnItem of grnArray) {

//         processedGItems.push(grnItem);
//     }
//     console.log("processedGGItems", processedGItems);
//     return processedGItems;
// };
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
const generateSerialNumberList2 = () =>{
    
    if (isSerialNos.checked == true) {
        generateSerialNumberList()
    }else{
        inputSerialNoDiv.className = "d-none" 
    }
}
const generateSerialNumberList = () => {
    const inputSerialNoDiv = document.querySelector("#inputSerialNoDiv");
        
        //inputSerialNoDiv id eka allagannwa
    
        inputSerialNoDiv.innerHTML = ""
        //ita psse qty ekata dana value eka allagannwa
        const qty = parseInt(document.querySelector(".inputPurchaseQuantity").value)
        const serialNumbers = []; // Array to store serial number objects
        //ita passe ekata adalwa qty eke length ekata input box tikk generate wenw
        for (let id = 1; id <= qty; id++) {
            const div = document.createElement("div");
            div.className = "col-6  ";
        
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
        // ita passe e array eka push wenwa object ekk widhata serialNumbers kiyna array ekata
        console.log("serialNo", serialNo);
        for (let id in serialNo) {
            serialNumbers.push({ serialno: serialNo[id] });
        }
        //eka return wenwa, eka allagnnwa add grn eken
        return serialNumbers;
        
        
    }

// Function to update serialNo object
//serila no value tika me array ekata danagnnwa
const updateSerialNo = (id, value) => {
    serialNo[id] = value;
    console.log("serialNo", serialNo);
}

const addGrn = () => {


    //add grn button eken post wenwa data tika grn table ekata grn main eken wenne ekata adala data 
    //update wena eka
    //serial no variable ekata assign wenw check box wla serial no wla output eka
    const serialNumbers = generateSerialNumberList();
    if (serialNumbers != "") {
        grnHasItems.serialNumbers = serialNumbers;
    }
    else{
        grnHasItems.serialNumbers = null
    }

    console.log("grn", grn);
    //e serial no output eka set krnwa grnHasItems object ekata ita passe e object eka  grn.grnHasCategory arraye
    //ekata set wenwa ita passe e array eka pass krnwa grn eka haraha post controller ekata
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
    //post krama ena response eka set krnwa ayeth grn ekata 
    grn = grnObjects
    //table eka update krnwa ita psse
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
    // console.log(grnItems.id);
    // delete grn.grnHasCategory;
    expensePaymentsObj.grnpayment = inputGrnNetAmount.value
    expensePaymentsObj.grn_id = grn

    let serverResponsepayment = ajaxRequestBodyMethod(`/expensepayment`, "POST", expensePaymentsObj); // meken put ekak call karnna
    console.log(serverResponsepayment);

    const id = grnItems.id
    //metana kalin post krpu grn ekata update ekk wadinwa
    let serverResponse1 = ajaxRequestBodyMethod(`/grn/${id}`, "PUT", grn); // meken put ekak call karnna
    console.log(serverResponse1);

    refreshGrnTable();

    inputSupplierInvoice.value = ""
    inputGrnTotalAmount.value = ""
    inputGrnDiscount.value = ""
    inputGrnNetAmount.value = ""


    // meken form close wela table eka open wenwa
    const table = document.getElementById("empTable");
    const form = document.getElementById("empForm");

    // Animate table disappearance
    form.style.opacity = 1; // Ensure opacity is initially 1
    form.style.transition = "opacity 1.5s ease-out";
    form.style.display = "none"; // Trigger the animation

    // Delay form appearance slightly
    setTimeout(function () {
        table.style.opacity = 0;
        table.style.display = "block";
        table.style.transition = "opacity 1.5s ease-in";
        table.style.opacity = 1; // Gradually fade in
    }, 100); // Adjust the delay as needed

}

