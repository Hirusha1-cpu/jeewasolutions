document.addEventListener('DOMContentLoaded', function () {
    const uploadForm = document.getElementById('uploadForm');

    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        console.log("ssss");
        const formData = new FormData();
        formData.append('qrCodeImage', document.getElementById('qrCodeImage').files[0]);

        fetch('/invoice/read-qr-code', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log('QR code content:', data);
                // Do something with the QR code content (e.g., display it on the page)
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors
            });
    })
});
window.addEventListener('load', () => {
    refreshInvoiceForm();
    // refreshGrnTable();
    refreshRepairTable();

})


const refreshInvoiceForm = () => {
    invoice = new Object();
    duetoRepair = new Object();
    itable = []
    serialno_id = new Object();
    customer_id = new Object();
    customer_id1 = new Object();
    usedItemsObj = new Object();
    duetoRepair.usedItems = new Array();
    incomePaymentsObj = new Object();
    invoice.serialnolist_id = new Array();
    invoice.salesHasSerials = new Array();
    saleSerial = new Object();
    serialNumbers = new Object();
    // serialNoListCount = ajaxGetRequest("/serialno/getlist")
    serialNoListCount = ajaxGetRequest("/serialno/getlistwithoutnotnull")

    fillDataIntoSelect(invoiceSerialId, "Select SerialNumber List", serialNoListCount, 'serialno')

    const collapseInvoiceElement = document.getElementById("collapseItemDetails");

    // Remove the 'collapse' class to open the collapse
    collapseInvoiceElement.classList.remove("collapse");

    // Optionally, you can also set aria-expanded attribute to 'true' for accessibility
    collapseInvoiceElement.setAttribute("aria-expanded", "true");

}
const checkdiscount = async (discountname) => {
    // const discountname = inputCustomerName.value;
    console.log(discountname);
    invoice.customer_id = discountname
    // Initially disable the input field
    discountCusRate.disabled = true;

    try {
        // Make an asynchronous GET request
        const serverresponseof_discount = await ajaxGetRequest(`/customer/getdiscount/${discountname.name}`);

        console.log(serverresponseof_discount);

        // If the response is null or undefined, keep the input field disabled and set its value to "-"
        if (!serverresponseof_discount) {
            discountCusRate.disabled = true;
            discountCusRate.value = "-";
            invoiceDiscountedPrice.disabled = false
        } else {
            // Enable the input field and set its value
            discountCusRate.disabled = false;
            discountCusRate.value = serverresponseof_discount.discount || "-";
            discountCusPhone.disabled = false
            discountCusPhone.value = discountname.phone
            invoiceDiscountedPrice.value = invoiceTotalPrice.value * discountCusRate.value
        }
    } catch (error) {
        console.error("Error fetching discount:", error);
        // In case of an error, keep the input field disabled and set its value to "-"
        discountCusRate.disabled = true;
        discountCusRate.value = "-";
    }
};

// const checkdiscount = () =>{
//     discountname = inputCustomerName.value
//     discountCusRate.disabled = true
//     const serverresponseof_discount = ajaxGetRequest(`/customer/getdiscount/${discountname}`)
//     console.log(serverresponseof_discount);
//     console.log(serverresponseof_discount);
//     if (serverresponseof_discount === null) {
//         discountCusRate.disabled = true
//         discountCusRate.value = "-"
//     }else{

//         discountCusRate.disabled = false
//         discountCusRate.value = serverresponseof_discount.discount
//     }
// }
const getItemDetails = () => {
    serialObject = JSON.parse(invoiceSerialId.value)
    console.log(serialObject);

    // itemsDetails1 = ajaxGetRequest("/invoice/getlist/" + JSON.parse(invoiceSerialId.value));
    // console.log(itemsDetails1);
    // console.log(itemsDetails1.itemname);
    lblItemName1.value = serialObject.itemname
    invoiceUnitPrice.value = serialObject.itemprice
    // let categoryName;
    // categoryName = itemsDetails1.category_id.name
    const categoryname1 = (serialObject.category_id.name).replace(/\s/g, '').toLowerCase()
    categoriesItems1 = ajaxGetRequest(`/${categoryname1}/getlist`, categoryname1)
    // ajaxGetRequest(`/${categoryname1}/getqty`, categoryname1)
    console.log(categoriesItems1);

    const filteredData = filterByName(serialObject.itemname, categoriesItems1);

    console.log("Filtered data:", filteredData[0]);
    const obj = filteredData[0]

    const warrentyPeriod = obj.warrenty

    // serialNumbers.warrentyperiod = warrentyPeriod
    saleSerial.warrentyperiod = warrentyPeriod

    console.log(warrentyPeriod);
    if (!isNaN(warrentyPeriod)) {
        // inputWarrentyItemName.value = itemsDetails1.itemname
        inputWarPeriod.value = warrentyPeriod + " Days"
        inputWarStartDate.value = new Date().toISOString().slice(0, 10);
        // saleSerial.warrentystartdate=inputWarStartDate.value
        const newDate = new Date(inputWarStartDate.value);
        newDate.setDate(newDate.getDate() + warrentyPeriod);
        inputWarrentyEnd.value = newDate.toISOString().slice(0, 10);
        // saleSerial.warrentyexpire=inputWarrentyEnd.value
        //open bank collapse model
        const collapseWarrentyElement = document.getElementById("collapseItemWarrenty");

        // Remove the 'collapse' class to open the collapse
        collapseWarrentyElement.classList.remove("collapse");

        // Optionally, you can also set aria-expanded attribute to 'true' for accessibility
        collapseWarrentyElement.setAttribute("aria-expanded", "true");
    }
    // itemsDetails1 = null
}
function filterByName(itemname, data) {
    console.log(data)
    return data.filter(
        (item) => (item.name).includes(itemname)
    );
}
const addToTable = () => {
    //customer table ekata save wenna one data tika e object eke piliwelata
    customer_id1.name = inputCustomerName.value
    customer_id1.phone = inputCustomerContact.value
    invoice.customer_id = customer_id1

    itemTableDetail = new Object();
    //me tika wadagath item table eke data tika penna gnna
    itemTableDetail.itemname = lblItemName1.value;
    // itemTableDetail.serialno = invoiceSerialId.value
    itemTableDetail.unitprice = invoiceUnitPrice.value

    //me tikath item table ekata wadagath namuth penann na
    // itemTableDetail.warrentyitemname = inputWarrentyItemName.value
    // itemTableDetail.warrentystartdate = inputWarStartDate.value
    // itemTableDetail.warrentyendate = inputWarrentyEnd.value

    // invoice.serialNoList = []
    // serialNumbers = new Object();
    //serial number list ekk lesa gnnwa serial number tika
    // serialNumbers.serialno = invoiceSerialId.value
}
const selectCustomerType = () => {

    const selectedValue = discountCategorySelect.value;
    if (selectedValue == 1) {
        customerDiscount.disabled = false
        const customers = ajaxGetRequest("/customer/getlist")
        fillDataIntoSelect(customerDiscount, "Select Customer", customers, "name")


    } else if (selectedValue == 2) {
        discountCusRate.disabled = false;
        discountCusPhone.disabled = true;
    }


}
const calculateBalance = () => {
    // invoice.total = invoiceTotalPrice.value
    invoice.total = invoiceDiscountedPrice.value
    invoice.customerpaidamount = invoiceCustomerPayment.value
    invoice.balance = invoice.customerpaidamount - invoice.total
    invoiceBalance.value = invoice.balance
}
const addToSerialiedTable = () => {


    addToTable()
    // invoice.serialnolist_id.push(serialNumbers)
    saleSerial.serialno_id = serialObject
    invoice.salesHasSerials.push(saleSerial)

    console.log(invoice);
    console.log(itemTableDetail);
    itable.push(itemTableDetail)
    console.log(itable);

    lblItemName1.value = ""
    invoiceSerialId.value = ""
    invoiceUnitPrice.value = ""
    inputCustomerName.value = ""
    inputCustomerContact.value = ""
    inputWarrentyItemName.value = ""
    inputWarStartDate.value = ""
    inputWarPeriod.value = ""
    inputWarrentyEnd.value = ""

    displayProperties = [
        { property: getSerialedItemCode, dataType: 'function' },
        { property: getSerialedItemName, dataType: 'function' },
        { property: getSerialedItemPrice, dataType: 'function' },
        { property: getSerialedItemWarrenty, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(itemSerializedTable, itable, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

    //reset the value attributes

}
const getSerialedItemCode = (rowOb) => {
    return null
}
const getSerialedItemName = (rowOb) => {
    console.log(rowOb);
    return rowOb.itemname
}
const getSerialedItemPrice = (rowOb) => {
    return rowOb.unitprice
}
const getSerialedItemWarrenty = () => {
    return "warrentied"
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
const submitInvoice = () => {
    // invoice.invoicetotalprice = invoiceTotalPrice.value
    // invoice.invoicebalance = invoiceBalance.value
    //serial number list
    console.log(invoice);
    // invoice.serialNoList.push(serialNumbers)
    incomePaymentsObj.payment = invoiceTotalPrice.value
    // incomePaymentsObj.sales_id = invoice
    invoice.incomePayments = incomePaymentsObj

    let serverResponse11 = ajaxRequestBodyMethod("/invoice", "POST", invoice);
    // const categoryname1 = (serialObject.category_id.name).replace(/\s/g, '').toLowerCase()
    // ajaxGetRequest(`/${categoryname1}/getqty`, categoryname1)
    console.log("serverResponse", serverResponse11);
}


const refreshRepairTable = () => {
    repair = new Object();
    warrentyItem = new Object();
    usedItems = new Object();
    customer_id = new Object();
    customerObj = new Object();
    repair.duetoRepair = new Array();
    warrentyItem.usedItems = new Array();
    // repair.usedItems = new Array();
    duetoRepair.usedItems = new Array();
    useItem = new Object();


    serialNoListCountForWarrenty = ajaxGetRequest("/serialno/getlistwithoutnotnull")
    fillDataIntoSelect(warrentySerialId, "Select SerialNumber List", serialNoListCountForWarrenty, 'serialno')
    repairItemIntoTable()

}

const getWarrentyItemDetails = () => {
    serialwarrentyObject = JSON.parse(warrentySerialId.value)
    console.log(serialwarrentyObject);

    lblItemWarrentyName.value = serialwarrentyObject.itemname
    // warrentyUnitPrice.value = serialwarrentyObject.itemprice

    customer3 = ajaxGetRequest1("/invoice/getcustomer/" + serialwarrentyObject.serialno)
    console.log(customer3);
    const parts = customer3.split(",");
    console.log(parts);

    inputWarrentyCustomerName.value = parts[0]
    inputWarrentyCustomerContact.value = parts[1];

    // let categoryName;
    // categoryName = itemsDetails1.category_id.name
    const categoryWarrentyname = (serialwarrentyObject.category_id.name).replace(/\s/g, '').toLowerCase()
    categoriesWarrentyItems = ajaxGetRequest(`/${categoryWarrentyname}/getlist`, categoryWarrentyname)
    console.log(categoriesWarrentyItems);

    const filteredWarrentyData = filterByWarrentyName(serialwarrentyObject.itemname, categoriesWarrentyItems);

    console.log("Filtered data:", filteredWarrentyData);

    const warrentyItemPeriod = filteredWarrentyData[0].warrenty

    console.log(warrentyItemPeriod);
    if (!isNaN(warrentyItemPeriod)) {
        // inputWarrentyItemName.value = itemsDetails1.itemname
        inputWarrentyItemPeriod.value = warrentyItemPeriod + " Days"
        inputWarrentyItemStart.value = new Date().toISOString().slice(0, 10);
        // saleSerial.warrentystartdate=inputWarStartDate.value
        const newWarrentyDate = new Date(inputWarrentyItemStart.value);
        newWarrentyDate.setDate(newWarrentyDate.getDate() + warrentyItemPeriod);
        inputWarrentyItemEnd.value = newWarrentyDate.toISOString().slice(0, 10);
        // saleSerial.warrentyexpire=inputWarrentyEnd.value
        //open bank collapse model
        const collapseWarrentyItemElement = document.getElementById("collapseItemsWarrenty");

        // Remove the 'collapse' class to open the collapse
        collapseWarrentyItemElement.classList.remove("collapse");

        // Optionally, you can also set aria-expanded attribute to 'true' for accessibility
        collapseWarrentyItemElement.setAttribute("aria-expanded", "true");
    }
    inputItemRepName.value = serialwarrentyObject.itemname

    // itemsDetails1 = null
}
function filterByWarrentyName(itemname, data) {
    console.log(data)
    return data.filter(
        (item) => (item.name).includes(itemname)
    );
}

const repairItemIntoTable = () => {
    const repairtable = ajaxGetRequest("/repair/getlist")
    console.log(repairtable);


    displayProperties = [
        { property: getSerialNo, dataType: 'function' },
        { property: getSerialNoItemName, dataType: 'function' },
        { property: getRepairItemStatus, dataType: 'function' },
        { property: getRepairItemCustomer, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(repairItemTable, repairtable, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

}

const getSerialNo = (rowOb) => {
    let ItemRepair = '';
    rowOb.duetoRepair.forEach(element => {
        ItemRepair = ItemRepair + "<p class = 'working-status'>" + element.serialno + "</p>"
    })
    return ItemRepair
}
const getSerialNoItemName = (rowOb) => {
    let ItemSerialNo = '';
    rowOb.duetoRepair.forEach(element => {
        ItemSerialNo = ItemSerialNo + "<p class = 'working-status'>" + element.itemname + "</p>"
    })
    return ItemSerialNo
}
// const getRepairItemStatus = (rowOb) => {
//     let ItemStatus = '';
//     rowOb.duetoRepair.forEach(element => {
//         if (element.statusofrepair === "pending diagnosis") {
//             ItemStatus = ItemStatus + "<p class = 'working-status'>" + element.statusofrepair + "</p>"
//         } else if (element.statusofrepair === "Diagnoesed") {
//             ItemStatus = ItemStatus + `<button  type="button" class="working-status btn btn-secondary mb-3" data-bs-toggle="modal"
//             data-bs-target="#staticBackdrop00" onclick='handleClick("${element.statusofrepair}")'>` + element.statusofrepair + "</button>"
//         }
//     })
//     return ItemStatus
// }
// const handleClick = (elem) =>{
//     console.log(elem);

// }
const getRepairItemStatus = (rowOb) => {
    let itemStatus = ''; // Use a more descriptive variable name
  
    rowOb.duetoRepair.forEach(element => {
      const statusText = element.statusofrepair; // Store status for readability
  
      if (statusText === "pending diagnosis") {
        itemStatus += `<p class="working-status">${statusText}</p>`;
      } else if (statusText === "Diagnoesed") {
        // Use template literal for clarity and to avoid string concatenation
        itemStatus += `<button type="button" class="working-status btn btn-secondary mb-3" data-bs-toggle="modal"
        //             data-bs-target="#staticBackdrop00" onclick="handleClick('${statusText}')">${statusText}</button>`;
      }
    });
  
    return itemStatus;
  };
  
  const handleClick = (elem) => {
    console.log(elem); // Log the clicked status or perform other actions
    
  };
const getRepairItemCustomer = (rowOb) => {
    return rowOb.customer_id.name
}

const readyRepair = () => {
    warrentyItem.serialno = serialwarrentyObject.serialno
    warrentyItem.itemname = serialwarrentyObject.itemname
    warrentyItem.category = serialwarrentyObject.category_id.name
    // warrentyItem.statusofrepair = warrentyItemStatus.value
    warrentyItem.fault = warrentyFault.value

    warrentyItem.usedItems.push(usedItemsObj)
    customerObj.name = inputWarrentyCustomerName.value
    customerObj.phone = inputWarrentyCustomerContact.value
    repair.customer_id = customerObj

    repair.duetoRepair.push(warrentyItem);
    // repair.usedItems.push(useItem)

    console.log(repair);

    let serverResponse1 = ajaxRequestBodyMethod("/repair", "POST", repair);
    console.log("serverResponse", serverResponse1);
    repairItemIntoTable()

}