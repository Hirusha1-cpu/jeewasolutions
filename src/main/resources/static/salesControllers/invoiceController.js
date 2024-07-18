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
    irepairtable = []
    serialno_id = new Object();
    cusObject = new Object();
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
    dueRepairsList = ajaxGetRequest("/duerepair/getlist")
    getAvailableBarcodes = ajaxGetRequest("/serialno/getavailablelist")

    fillDataIntoSelect(barcodeNo, "Select Barcode", getAvailableBarcodes, 'barcode')
    fillDataIntoSelect(invoiceSerialId, "Select SerialNumber List", serialNoListCount, 'serialno')
    fillDataIntoSelect(barcodeNoRepair, "Select barcode", dueRepairsList, 'barcode')

    const collapseInvoiceElement = document.getElementById("collapseItemDetails");

    // Remove the 'collapse' class to open the collapse
    collapseInvoiceElement.classList.remove("collapse");

    // Optionally, you can also set aria-expanded attribute to 'true' for accessibility
    collapseInvoiceElement.setAttribute("aria-expanded", "true");

    const collapseInvoiceRepairElement = document.getElementById("collapseItemRepDetails");

    // Remove the 'collapse' class to open the collapse
    collapseInvoiceRepairElement.classList.remove("collapse");

    // Optionally, you can also set aria-expanded attribute to 'true' for accessibility
    collapseInvoiceRepairElement.setAttribute("aria-expanded", "true");

}
const handleItem = () => {
    displayPayforRepair.classList.add('d-none')
    displayPayforItem.classList.remove('d-none')
}
const handleRepair = () => {
    displayPayforItem.classList.add('d-none')
    displayPayforRepair.classList.remove('d-none')

}
const checkdiscount = (cusname) => {
    // const discountname = inputCustomerName.value;
    console.log(inputCustomerName.value);
    invoice.customer_id = cusObject
    // Initially disable the input field
    discountCusRate.disabled = true;
    let discountname = inputCustomerName.value
    console.log(inputCustomerName.value);
    try {
        // Make an asynchronous GET request
        try {
            serverresponseof_discount = ajaxGetRequest(`/customer/getdiscount/${inputCustomerName.value}`);
            boolDis = true
        } catch (error) {
            boolDis = false
        }

        console.log(serverresponseof_discount);

        // If the response is null or undefined, keep the input field disabled and set its value to "-"
        if (boolDis) {
            discountCusRate.disabled = true;
            discountCusRate.value = serverresponseof_discount?.discount ? serverresponseof_discount?.discount : 1;
            invoiceDiscountedPrice.disabled = false
            invoiceDiscountedPrice.value =parseFloat(invoiceTotalPrice.value)-(parseFloat(invoiceTotalPrice.value) * parseFloat(discountCusRate.value))
            console.log(invoiceDiscountedPrice.value);
        } else {
            // Enable the input field and set its value
            discountCusRate.disabled = false;
            discountCusRate.value = serverresponseof_discount?.discount ? serverresponseof_discount?.discount : 1;
            discountCusPhone.disabled = false
            discountCusPhone.value = discountname.phone
            invoiceDiscountedPrice.value = parseFloat(invoiceTotalPrice.value)-(parseFloat(invoiceTotalPrice.value) * parseFloat(discountCusRate.value))
            console.log(invoiceDiscountedPrice.value);
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
const getItemDetails = (serialObject) => {
    // serialObject = JSON.parse(invoiceSerialId.value)
    // console.log(serialObject);

    // // itemsDetails1 = ajaxGetRequest("/invoice/getlist/" + JSON.parse(invoiceSerialId.value));
    // // console.log(itemsDetails1);
    // // console.log(itemsDetails1.itemname);
    // lblItemName1.value = serialObject.itemname
    // invoiceUnitPrice.value = serialObject.itemprice
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
const getSerialItemDetails = (value2) => {
    lblItemName1.value = value2.itemname
    invoiceSerialId.value = value2.serialno
    invoiceUnitPrice.value = value2.itemprice
    getItemDetails(value2)
}

const getRepairItemDetails = (value1) => {
    console.log(value1);
    lblItemCate1Repair.value = value1.category
    lblItemName1Repair.value = value1.itemname
    let customerVal = ajaxGetRequest("duerepair/getrepairbydue/" + value1.repairid)
    console.log(customerVal);
    inputCustomerName.value = customerVal.customer_id.name
    inputCustomerContact.value = customerVal.customer_id.phone

}
const addToRepairTable = () => {
    itemRepairTableDetail = new Object();
    itemRepairTableDetail.itemCategory = lblItemCate1Repair.value
    itemRepairTableDetail.itemName = lblItemName1Repair.value
    itemRepairTableDetail.repairFor = invoiceRepairFor.value
    if (customer_id1 == null) {
        customer_id1.name = inputCustomerName.value
        customer_id1.phone = inputCustomerContact.value
        invoice.customer_id = customer_id1

    }
    console.log(customer_id1);

}
const addToTable = () => {
    //customer table ekata save wenna one data tika e object eke piliwelata
    if (customer_id1 == null) {
        customer_id1.name = inputCustomerName.value
        customer_id1.phone = inputCustomerContact.value
        invoice.customer_id = customer_id1

    }
    console.log(customer_id1);

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
const addRepairToSerialiedTable = () => {
    // Repair Code
    // Item Category
    // Item Name
    // Total
    addToRepairTable()
    invoice.itemorservicestatus = "service"
    console.log(itemRepairTableDetail);
    irepairtable.push(itemRepairTableDetail)

    barcodeNoRepair.value = ""
    lblItemCate1Repair.value = ""
    lblItemName1Repair.value = ""
    invoiceRepairFor.value = ""

    displayProperties = [
        // { property: getRepairCode, dataType: 'function' },
        { property: getRepairItemCategory, dataType: 'function' },
        { property: getRepairItemName, dataType: 'function' },
        { property: getRepairStatus, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(itemSerializedRepairTable, irepairtable, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, false)

}
// const getRepairCode = (rowOb) => {
//     return rowOb.repairCode
// }
// const getRepairTotal = (rowOb) => {
//     return rowOb.total
// }
const getRepairItemCategory = (rowOb) => {
    return rowOb.itemCategory
}
const getRepairItemName = (rowOb) => {
    return rowOb.itemName
}
const getRepairStatus = (rowOb) => {
    return rowOb.repairFor
}
const addToSerialiedTable = () => {

    invoiceDiscountedPrice.value = parseFloat(invoiceTotalPrice.value) - ((parseFloat(invoiceTotalPrice.value) * parseFloat(discountCusRate.value)));

    addToTable()
    // invoice.serialnolist_id.push(serialNumbers)
    saleSerial.serialno_id = JSON.parse(barcodeNo.value)
    invoice.salesHasSerials.push(saleSerial)
    invoice.itemorservicestatus = "item"

    console.log(invoice);
    console.log(itemTableDetail);
    itable.push(itemTableDetail)

    console.log(itable);
    let totalPrice = 0; // Initialize total price
    for (let index = 0; index < itable.length; index++) {
        let element = itable[index];
        console.log(element);
        // Check if 'itemprice' is a string and convert to a number if necessary
        // let price = typeof element.itemprice === 'string' ? parseFloat(element.itemprice) : element.itemprice;
        let price = parseInt(element.unitprice);
        console.log(price);
        console.log(typeof price);

        // Ensure 'price' is a number before adding
        if (typeof price === 'number' && !isNaN(price)) {
            totalPrice += price;
            invoiceTotalPrice.value = totalPrice; // Update invoice total (optional)
        } else {
            console.error("Invalid price format for item:", element.itemname); // Handle invalid price format
        }
    }

    console.log("Total price:", totalPrice);

    lblItemName1.value = ""
    invoiceSerialId.value = ""
    invoiceUnitPrice.value = ""
    inputWarrentyItemName.value = ""
    inputWarStartDate.value = ""
    inputWarPeriod.value = ""
    inputWarrentyEnd.value = ""


    const collapseInvoiceElement = document.getElementById("collapseItemWarrenty");

    // Remove the 'collapse' class to open the collapse
    collapseInvoiceElement.classList.add("collapse");

    // Optionally, you can also set aria-expanded attribute to 'true' for accessibility
    collapseInvoiceElement.setAttribute("aria-expanded", "false");

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
    printInvoice(serverResponse11)
}
const printInvoice = (response) => {
    setDataIntInvoicePrint(response)

    console.log("print");
    const table2 = document.getElementById("printingModalPrint1");

    // Remove the d-none class before copying the HTML
    table2.classList.remove("d-none");

    const tableHtmlInvoice = table2.outerHTML;

    // Add the d-none class back
    table2.classList.add("d-none");

    // let newWindow = window.open('', '_blank');
    let newWindow = window.open();
    newWindow.document.write(`
        <html>
        <head>
            <title>${1000}</title>
            <link rel='stylesheet' href='resourcesT/bootstrap_5.3.1/css/bootstrap.min.css'>
        </head>
        <body>
            ${tableHtmlInvoice}
        </body>
        </html>
    `);

    newWindow.document.close(); // Necessary for IE >= 10

    newWindow.onload = function () {
        setTimeout(() => {
            newWindow.print();
            newWindow.close();
        }, 250);
    };
}

const printInvoice1 = () => {

    console.log("print");
    // const table1 = document.getElementById("tableSupplier")
    const table2 = document.getElementById("printingModalPrint1")
    table2.classList.remove('d-none');

    const tableHtmlInvoice = table2.outerHTML;
    table2.classList.add('d-none');

    // const printWindow = window.open();
    // printWindow.document.write(tableHtml);
    let newWindow = window.open()
    newWindow.document.write(
        // "<title>" + rowOb.supplier_code + "</title>" +
        "<title>" + 1000 + "</title>" +
        "<link rel='stylesheet' href='resourcesT/bootstrap_5.3.1/css/bootstrap.min.css'>" + "</link>" +
        "<body>" + tableHtmlInvoice + "</body>"

    )
    setTimeout(() => { //data load wena eka krnne 500 kin
        newWindow.stop();//load wena eka nwattanwa
        newWindow.print();
        newWindow.close();
        // table2.classList.add("d-none")

    }, 500)


}

const setDataIntInvoicePrint = (invoiceP) => {
    console.log(invoiceP);
    cusNamePrint.innerHTML = invoiceP.customer_id.name
    cusPhonePrint.innerHTML = invoiceP.customer_id.phone

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    console.log(currentDate); // "17-6-2022"
    cusDatePrint.innerHTML = currentDate

    createTable(invoiceP)
    if (invoiceP.itemorservicestatus == "Repair") {
        createRepairTable()
    }
    cusPayMethodPrint.innerHTML = invoiceP.total
    cusReferrancePrint.innerHTML = invoiceP.referenceno
    cusSubTotalPrint.innerHTML = invoiceP.total
    cusPaidPrint.innerHTML = invoiceP.customerpaidamount
    cusBalancePrint.innerHTML = invoiceP.balance
    cusGrandPrint.innerHTML = invoiceP.total



}

const createRepairTable = () => {
    let invoiceCR = ajaxGetRequest("/duerepair/getrepairbydue/{id}")

    displayProperties = [
        { property: getRepairNo, dataType: 'function' },
        { property: getQtyForRepair, dataType: 'function' },
        { property: getSerialRepair, dataType: 'function' },
        { property: getCategoryRepair, dataType: 'function' },
        { property: getItem, dataType: 'function' },
        { property: getItemorServiceWarrantyRepair, dataType: 'function' },
        { property: getItemorServicePriceRepair, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(repairItemTable, invoiceCR, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, false)

}

const getRepairNo = (rowOb) => {
    return repairno;
}
const getQtyForRepair = (rowOb) => {
    return 1
}
const getSerialRepair = (rowOb) => {
    let serial = ""
    rowOb.duetoRepair.usedItems.forEach(element => {
        serial = serial + "<p class = 'working-status'>" + element.serialno + "</p>"

    })
    return serial;

}

const getCategoryRepair = (rowOb) => {
    let cat = ""
    rowOb.duetoRepair.usedItems.forEach(element => {
        cat = cat + "<p class = 'working-status'>" + element.category + "</p>"

    })
    return cat;

}
const getItem = (rowOb) => {
    let catIt = ""
    rowOb.duetoRepair.usedItems.forEach(element => {
        catIt = catIt + "<p class = 'working-status'>" + element.itemname + "</p>"

    })
    return catIt;

}
const getItemorServiceWarrantyRepair = (rowOb) => {
    categoriesItems1 = ajaxGetRequest(`/${categoryname1}/getlist`, categoryname1)
    // ajaxGetRequest(`/${categoryname1}/getqty`, categoryname1)
    console.log(categoriesItems1);


    let catItWarrenty = ""
    rowOb.duetoRepair.usedItems.forEach(element => {
        categoriesItemsRep = ajaxGetRequest(`/${element.category}/getlist`)
        const filteredDataRep = filterByName(element.itemname, categoriesItemsRep);

        console.log("Filtered data:", filteredDataRep[0]);
        const objRep = filteredDataRep[0]

        const warrentyPeriod = objRep.warrenty
        catItWarrenty = catItWarrenty + "<p class = 'working-status'>" + warrentyPeriod + "</p>"

    })
    return catItWarrenty;

}
const getItemorServicePriceRepair = (rowOb) => {
    let catItPrice = ""
    rowOb.duetoRepair.usedItems.forEach(element => {
        catItPrice = catItPrice + "<p class = 'working-status'>" + element.unitprice + "</p>"

    })
    return catItPrice;

}

const createTable = (invoiceC) => {

    displayProperties = [
        { property: getQty, dataType: 'function' },
        { property: getSerialNoSaleName, dataType: 'function' },
        { property: getCateName, dataType: 'function' },
        { property: getItemorService, dataType: 'function' },
        { property: getItemorServiceWarranty, dataType: 'function' },
        { property: getItemorServicePrice, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(repairItemTable, invoiceC.salesHasSerials, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, false)

}

const getQty = (rowOb) => {
    return 1;
}
const getCateName = (rowOb) => {
    return rowOb.serialno_id.category_id.name;
}

const getSerialNoSaleName = (rowOb) => {
    return rowOb.serialno_id.itemname;
}
const getItemorService = (rowOb) => {
    return "Item";
}

const getItemorServiceWarranty = (rowOb) => {
    return `<p>${rowOb.warrentystartdate}-${warrentyexpire}<span>(${warrentyperiod})Days</span></p>`
}
const getItemorServicePrice = (rowOb) => {
    // ajax
    return rowOb?.serialno_id?.itemprice ? rowOb?.serialno_id?.itemprice : null;

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
    console.log(rowOb);
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
            itemStatus += `<button type="button" class="working-status btn btn-secondary mb-3" 
            data-bs-toggle="modal" data-bs-target="#staticBackdrop00" 
            onclick="handleClick(${rowOb.id})">${statusText}</button>`;
        }
    });

    return itemStatus;
};

const handleClick = (elem) => {
    console.log(elem); // Log the clicked status or perform other actions
    let iddue = elem
    console.log(iddue);
    const diagnosistable = ajaxGetRequest(`/duerepair/getusedItemsbyDueRepairs/${iddue}`)
    console.log(diagnosistable);

    displayProperties = [
        { property: getDiagItemCategory, dataType: 'function' },
        { property: getDiagItemName, dataType: 'function' },
        { property: getDiagItemPrice, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(repairItemTableDig, diagnosistable, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, false)

    repairItemTotalPriceDig.value = "1000.00"
};
const getDiagItemCategory = (rowObject) => {

    let ItemDiagCategory = '';
    // rowObject.usedItems.forEach(element => {
    ItemDiagCategory = "<p class = 'working-status'>" + rowObject?.category ? rowObject?.category : "-" + "</p>"
    // })
    return ItemDiagCategory
}
const getDiagItemName = (rowObject) => {
    let ItemDiagName = '';
    // let getprice = '';
    // rowObject.usedItems.forEach(element => {
    ItemDiagName = "<p class = 'working-status'>" + rowObject.itemname ? rowObject.itemname : "-" + "</p>"

    // })
    return ItemDiagName
}
const getDiagItemPrice = (rowObject) => {
    let getprice = '';
    // rowObject.usedItems.forEach(element => {
    const get = ajaxGetRequest("serialno/getitemprice/" + rowObject.itemname)
    if (get) {
        // getprice = parseFloat(getprice) + parseFloat(get)
        getprice = parseFloat(get)
    } else {
        getprice = "-"
    }
    // })

    return (getDiagItemCategory(rowObject) === "-" && getDiagItemName(rowObject) === "-") ? "-" : getprice
}

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
const getPaymentMethod = (paymentMethod) => {
    console.log(paymentMethod);
    try {
      // Check if paymentMethod is a string (assuming it's the selected value)
      if (typeof paymentMethod === 'string') {
        const paymentObject = { value: paymentMethod.toLowerCase() }; // Convert to lowercase for case-insensitivity
        console.log(paymentObject);
  
        if (paymentObject.value === "card") {
          afterPayment1.classList.add("d-none");
          afterPayment2.classList.add("d-none");
          invoiceCustomerPaymentRefference1.classList.remove("d-none");
        } else if (paymentObject.value === "cash") {
          // Handle cash payment logic (add if needed)
          afterPayment1.classList.remove("d-none");
          afterPayment2.classList.remove("d-none");
          invoiceCustomerPaymentRefference1.classList.add("d-none");
        } else {
          console.warn("Unexpected payment method:", paymentObject.value);
        }
      } else {
        console.error("Invalid payment method type:", typeof paymentMethod);
      }
    } catch (error) {
      console.error("Error in getPaymentMethod:", error);
    }
  };
  

// const getPaymentMethod = (paymentOb) =>{
//     console.log(paymentOb);
//     if ( paymentOb.value == "card") {
//       afterPayment.classList.add("d-none")
//       invoiceCustomerPaymentRefference.classList.remove("d-none")

//     }
   
// }