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
   
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let today = `${year}-${day}-${month}`;
    dateId.innerHTML = today;

    refreshInvoiceForm();
    // refreshGrnTable();
    refreshRepairTable();
    searchInRepairTable()
})


const refreshInvoiceForm = () => {
    serverResponseForIsExisting = ''
    customerVal = null
    button = ''
    getExistCustomer = ''
    diagnosistable = ''
    matchingItem = ''
    matchingRepair = ''
    matchingSeral = ''
    price = 0
    totalUnitPrice = 0;
    totalPrice = 0;
    invoice = new Object();
    duetoRepair = new Object();
    duetoRepair2 = new Object();
    itable = []
    irepairtable = []
    totalForRepair = 0
    totalForItem = 0
    serialno_id = new Object();
    cusObject = new Object();
    category_id = new Object();
    customer_id = new Object();
    customer_id1 = new Object();
    usedItemsObj = new Object();
    duetoRepair.usedItems = new Array();
    incomePaymentsObj = new Object();
    invoice.serialnolist_id = new Array();
    invoice.salesHasSerials = new Array();
    invoice.salesHasDues = new Array();
    saleSerial = new Object();
    salesHasDue = new Object();
    serialwarrentyObject = new Object();
    itemRepairTableDetail = new Object();
    itemTableDetail = new Object();
    serialNumbers = new Object();
    // serialNoListCount = ajaxGetRequest("/serialno/getlist")
    serialNoListCount = ajaxGetRequest("/serialno/getlistwithoutnotnull")
    dueRepairsList = ajaxGetRequest("/duerepair/getduebystatusfordiagnoesedcompleted")
    getAvailableBarcodes = ajaxGetRequest("/serialno/getavailablelist")

   // getInvoiceNumbersNotInDueRepairInSales = ajaxGetRequest("/serialno/getlist")

   
    // fillDataIntoSelect(barcodeNo, "Select Barcode", getAvailableBarcodes, 'barcode')
    fillDataIntoDataList(dataListItemsForItemBarcode, getAvailableBarcodes, 'barcode','itemname')
    fillDataIntoSelect(invoiceSerialId, "Select SerialNumber List", serialNoListCount, 'serialno')
    // fillDataIntoSelect(barcodeNoRepair, "Select barcode", dueRepairsList, 'barcode')
    fillDataIntoDataList(dataListItemsForRepairBarcode, dueRepairsList, 'barcode','itemname')

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
const getDetailsByInvoiceNo = ()=>{

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
    if (cusObject != null) {
        
       cusObject.name = inputCustomerName.value
         cusObject.phone =  inputCustomerContact.value

    } 
        
        invoice.customer_id = cusObject
    
    // Initially disable the input field
    discountCusRate.disabled = true;
    let discountname = inputCustomerName.value
    console.log(inputCustomerName.value);
    console.log(inputCustomerContact.value);
    let serverresponseof_discount = null
    try {
        // Make an asynchronous GET request
       
            // serverresponseof_discount = ajaxGetRequest(`/customer/getdiscount/${inputCustomerName.value}`);
            serverresponseof_discount = ajaxGetRequest(`/customer/getdiscount/${inputCustomerContact.value}`);
            if (serverresponseof_discount.length > 0) {
                
                boolDis = true
            }else{
                boolDis = false
            }
    

        console.log(serverresponseof_discount);

        // If the response is null or undefined, keep the input field disabled and set its value to "-"
        if (boolDis) {
            discountCusRate.disabled = true;
            discountCusRate.value = serverresponseof_discount?.discount ? serverresponseof_discount?.discount : "-";
            invoiceDiscountedPrice.disabled = false
            if (discountCusRate.value == 0.01) {
                discountCusRate.value = "-"
                invoiceDiscountedPrice.value =parseFloat(invoiceTotalPrice.value)
            }else{

                invoiceDiscountedPrice.value =parseFloat(invoiceTotalPrice.value)-(parseFloat(invoiceTotalPrice.value) * parseFloat(discountCusRate.value))
            }
            // console.log(invoiceDiscountedPrice.value);
        } else {
            // Enable the input field and set its value
            discountCusRate.disabled = true;
            discountCusRate.value = serverresponseof_discount?.discount ? serverresponseof_discount?.discount : "-";
            discountCusPhone.disabled = false
            discountCusPhone.value = discountname.phone
            if (discountCusRate.value === "-") {
                discountCusRate.value = "-"
                invoiceDiscountedPrice.value =parseFloat(invoiceTotalPrice.value)
            }else{

                invoiceDiscountedPrice.value = parseFloat(invoiceTotalPrice.value)-(parseFloat(invoiceTotalPrice.value) * parseFloat(discountCusRate.value))
            }
            // console.log(invoiceDiscountedPrice.value);
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
        inputWarrentyItemName.value = lblItemName1.value
        inputWarPeriod.value = warrentyPeriod + " Days"
        inputWarStartDate.value = new Date().toISOString().slice(0, 10);
        saleSerial.warrentystartdate = date(inputWarStartDate.value)
  
        // saleSerial.warrentystartdate=inputWarStartDate.value
        const newDate = new Date(inputWarStartDate.value);
        newDate.setDate(newDate.getDate() + warrentyPeriod);
        inputWarrentyEnd.value = newDate.toISOString().slice(0, 10);
        saleSerial.warrentyexpire = date(inputWarrentyEnd.value)


      
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

const date = (dateString) =>{
    
        // Parse the string into a Date object
        const parsedDate = new Date(dateString);

        // Get just the date part (year, month, day)
        const year = parsedDate.getFullYear();
        const month = parsedDate.getMonth() + 1; // Months are zero-indexed (0-11)
        const day = parsedDate.getDate();
    
        // Create a new Date object with only year, month, and day
        const dateWithoutTime = new Date(year, month - 1, day);
    
        console.log(dateWithoutTime); // Output: 2024-07-18 (without time)
        return dateWithoutTime;
}

function filterByName(itemname, data) {
    console.log(data)
    return data.filter(
        (item) => (item.name).includes(itemname)
    );
}
// const getSerialItemDetails = (value2) => {
//     console.log(barcodeNo.value)
//     console.log(value2);
//     lblItemName1.value = value2.itemname
//     invoiceSerialId.value = value2.serialno
//     invoiceUnitPrice.value = value2.itemprice

//     totalForItem += value2.itemprice

//     getItemDetails(value2)
    
// }
const getSerialItemDetails = (inputValue) => {
    console.log(inputValue);
    
    // Find the matching item in getAvailableBarcodes
     matchingItem = getAvailableBarcodes.find(item => 
        `${item.barcode} ${item.itemname}` === inputValue
    );

    if (matchingItem) {
        console.log('Matching item:', matchingItem);
        lblItemName1.value = matchingItem.itemname;
        invoiceSerialId.value = matchingItem.serialno;
        invoiceUnitPrice.value = matchingItem.itemprice;

        totalForItem += matchingItem.itemprice;

        getItemDetails(matchingItem);
    } else {
        console.log('No matching item found');
    }
}


const getRepairItemDetails = (value1) => {
    console.log(value1);
    // if (inputCustomerName.value !="" ) {
    //     inputCustomerName.disabled = true
    //     inputCustomerContact.disabled = true
    //     customerVal = ajaxGetRequest("duerepair/getrepairbydue/" + value1.repairid)
    //     console.log(customerVal);
        
    //     if (inputCustomerContact.value === customerVal.customer_id.phone) {
    //         console.log(value1);
    //         lblItemCate1Repair.value = value1.category
    //         lblItemName1Repair.value = value1.itemname
            
    //         totalForRepair += value1.total
    //        console.log(totalForRepair);
    //      if (value1.statusofrepair === "Diagnoesed") {
    //             selectElement('invoiceRepairFor','Diagnosed')
    //         } else {
    //             selectElement('invoiceRepairFor','Full Repair')
                
    //         }
    //       checkdiscount()
    //     }else{
    //         alert(`This Repair is not owe to ${inputCustomerName.value} `)
    //     }
    // }else{

    //     console.log(value1);
    //     lblItemCate1Repair.value = value1.category
    //     lblItemName1Repair.value = value1.itemname
        
    //     totalForRepair += value1.total
        
    //     // lblItemName1Repair.value = value1.itemname
    //     console.log(totalForRepair);
    
    //     // invoiceTotalPrice.value = totalForRepair
    //     // function isNumeric(value) {
    //     //     return !isNaN(parseFloat(value)) && isFinite(value);
    //     //   }     
    //     // if (isNumeric(invoiceTotalPrice.value)) {
    //     //     invoiceTotalPrice.value = parseFloat(invoiceTotalPrice.value) + parseFloat(value1.total)
    //     // }else{
    //     //     invoiceTotalPrice.value = parseFloat(value1.total)
    //     // }
    //     // invoiceTotalPrice.value = value1.total
    //     // const selectElement = document.getElementById('invoiceRepairFor');
    //     // const diagnosedOption = Array.from(selectElement.options).find(option => option.value === 'Diagnosed');
    //     // const fullRepairOption = Array.from(selectElement.options).find(option => option.value === 'Full Repair');
    
    //     if (value1.statusofrepair === "Diagnoesed") {
    //         selectElement('invoiceRepairFor','Diagnosed')
    //     } else {
    //         selectElement('invoiceRepairFor','Full Repair')
            
    //     }
    //     // selectElement.value = value1.statusofrepair
    //     customerVal = ajaxGetRequest("duerepair/getrepairbydue/" + value1.repairid)
    //     console.log(customerVal);
    //     inputCustomerName.value = customerVal.customer_id.name
    //     inputCustomerContact.value = customerVal.customer_id.phone

    //     checkdiscount()
    // }

    matchingRepair = dueRepairsList.find(item => 
        `${item.barcode} ${item.itemname}` === value1
    );
    if (matchingRepair) {
        
        if (inputCustomerName.value !="" ) {
            inputCustomerName.disabled = true
            inputCustomerContact.disabled = true
            customerVal = ajaxGetRequest("duerepair/getrepairbydue/" + matchingRepair.repairid)
            console.log(customerVal);
            
            if (inputCustomerContact.value === customerVal.customer_id.phone) {
                console.log(matchingRepair);
                lblItemCate1Repair.value = matchingRepair.category
                lblItemName1Repair.value = matchingRepair.itemname
                
                totalForRepair += matchingRepair.total
               console.log(totalForRepair);
             if (matchingRepair.statusofrepair === "Diagnoesed") {
                    selectElement('invoiceRepairFor','Diagnosed')
                } else {
                    selectElement('invoiceRepairFor','Full Repair')
                    
                }
              checkdiscount()
            }else{
                alert(`This Repair is not owe to ${inputCustomerName.value} `)
            }
        }else{
    
            console.log(matchingRepair);
            lblItemCate1Repair.value = matchingRepair.category
            lblItemName1Repair.value = matchingRepair.itemname
            
            totalForRepair += matchingRepair.total
            
            // lblItemName1Repair.value = value1.itemname
            console.log(totalForRepair);
        
            // invoiceTotalPrice.value = totalForRepair
            // function isNumeric(value) {
            //     return !isNaN(parseFloat(value)) && isFinite(value);
            //   }     
            // if (isNumeric(invoiceTotalPrice.value)) {
            //     invoiceTotalPrice.value = parseFloat(invoiceTotalPrice.value) + parseFloat(value1.total)
            // }else{
            //     invoiceTotalPrice.value = parseFloat(value1.total)
            // }
            // invoiceTotalPrice.value = value1.total
            // const selectElement = document.getElementById('invoiceRepairFor');
            // const diagnosedOption = Array.from(selectElement.options).find(option => option.value === 'Diagnosed');
            // const fullRepairOption = Array.from(selectElement.options).find(option => option.value === 'Full Repair');
        
            if (matchingRepair.statusofrepair === "Diagnoesed") {
                selectElement('invoiceRepairFor','Diagnosed')
            } else {
                selectElement('invoiceRepairFor','Full Repair')
                
            }
            // selectElement.value = value1.statusofrepair
            customerVal = ajaxGetRequest("duerepair/getrepairbydue/" + matchingRepair.repairid)
            console.log(customerVal);
            inputCustomerName.value = customerVal.customer_id.name
            inputCustomerContact.value = customerVal.customer_id.phone
    
            checkdiscount()
        }
    } else {
        console.log('No matching item found');

    }



}

function selectElement(id, valueToSelect) {    
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

const addToRepairTable = () => {
    // itemRepairTableDetail = new Object();
    itemRepairTableDetail.itemCategory = lblItemCate1Repair.value
    itemRepairTableDetail.itemName = lblItemName1Repair.value
    itemRepairTableDetail.repairFor = invoiceRepairFor.value
    itemRepairTableDetail.total = totalForRepair
    console.log(itemRepairTableDetail);
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

    // itemTableDetail = new Object();
    //me tika wadagath item table eke data tika penna gnna
    itemTableDetail.itemname = lblItemName1.value;
    // itemTableDetail.serialno = invoiceSerialId.value
    itemTableDetail.unitprice = invoiceUnitPrice.value
    itemTableDetail.itotal = totalForItem


    //me tikath item table ekata wadagath namuth penann na
    // itemTableDetail.warrentyitemname = inputWarrentyItemName.value
    // itemTableDetail.warrentystartdate = inputWarStartDate.value
    // itemTableDetail.warrentyendate = inputWarrentyEnd.value

    // invoice.serialNoList = []
    // serialNumbers = new Object();
    //serial number list ekk lesa gnnwa serial number tika
    // serialNumbers.serialno = invoiceSerialId.value
}

const addSubRepair = () =>{
 //open bank collapse model
 const collapseWarrentyItemElement = document.getElementById("collapseItemsWarrenty");

 // Remove the 'collapse' class to open the collapse
 collapseWarrentyItemElement.classList.add("collapse")
 warrentySerialId.value = ""
 lblItemWarrentyName.value = ""
 lblItemWarrentyCategory.value = ""
 warrentyStatus.value = ""
 warrentyFault.value = ""
 inputItemRepName.value = ""
 inputWarrentyItemStart.value = ""
 inputWarrentyItemPeriod.value = ""
 inputWarrentyItemEnd.value = ""
 if (flexCheckCheckedForCus.checked = false) {
    
     inputWarrentyCustomerName.value =""
     inputWarrentyCustomerContact.value =""
 }
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
    cusRepairTablePrintDiv.classList.remove('d-none')
    cusRepairUsedItemTablePrint.classList.remove('d-none')
    salesHasDue.statusofserviceorrepair = "service" 
    // salesHasDue.due_to_repairitem_id = JSON.parse(barcodeNoRepair.value)
    salesHasDue.due_to_repairitem_id = matchingRepair
    invoice.salesHasDues.push(salesHasDue)
    console.log(itemRepairTableDetail);
    irepairtable.push(itemRepairTableDetail)

    
    let totalPrice = 0; // Initialize total price
    for (let index = 0; index < irepairtable.length; index++) {
        let element = irepairtable[index];
        console.log(element);
        // Check if 'itemprice' is a string and convert to a number if necessary
        // let price = typeof element.itemprice === 'string' ? parseFloat(element.itemprice) : element.itemprice;
        price = parseInt(element.total);
        console.log(price);
        console.log(typeof price);

        function isNumeric(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
          }
        // Ensure 'price' is a number before adding
        if (typeof price === 'number' && !isNaN(price)) {
            totalPrice += price;
            tot = totalForRepair + totalForItem
            invoiceTotalPrice.value = tot
            // if (isNumeric(invoiceTotalPrice.value)) {
            //     // invoiceTotalPrice.value = parseFloat(invoiceTotalPrice.value) + parseFloat(price)
            //     invoiceTotalPrice.value =  parseFloat(price)
            // }else{
            //     invoiceTotalPrice.value = totalPrice; // Update invoice total (optional)
            //   }
        } else {
            console.error("Invalid price format for item:", element.itemname); // Handle invalid price format
        }
    }


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
    checkdiscount()
    inputCustomerName.disabled = true
    inputCustomerContact.disabled = true
    
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
    
    // saleSerial.serialno_id = JSON.parse(barcodeNo.value)
    saleSerial.serialno_id = matchingItem
    invoice.salesHasSerials.push(saleSerial)
    invoice.itemorservicestatus = "item"

    console.log(invoice);
    console.log(itemTableDetail);
    itable.push(itemTableDetail)

    console.log(itable);
    // let totalPrice = 0; // Initialize total price
    for (let index = 0; index < itable.length; index++) {
        let element = itable[index];
        console.log(element);
        // Check if 'itemprice' is a string and convert to a number if necessary
        // let price = typeof element.itemprice === 'string' ? parseFloat(element.itemprice) : element.itemprice;
        price = parseInt(element.itotal);
        console.log(price);
        console.log(typeof price);
        function isNumeric(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
          }

        // Ensure 'price' is a number before adding
        if (typeof price === 'number' && !isNaN(price)) {
            totalPrice += price;
            tot = totalForRepair + totalForItem
            invoiceTotalPrice.value = tot
            // if (isNumeric(invoiceTotalPrice.value)) {
            //     // invoiceTotalPrice.value =  price
            //     invoiceTotalPrice.value = parseFloat(price)
            // }else{

            //     invoiceTotalPrice.value = parseFloat(price); // Update invoice total (optional)
            // }

        } else {
            console.error("Invalid price format for item:", element.itemname); // Handle invalid price format
        }
    }

    console.log("Total price:", totalPrice);
    checkdiscount()

    barcodeNo.value = ''
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
    fillDataIntoPurcahseTable(itemSerializedTable, itable, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, false)

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
    console.log(salesHasDue);
    if (salesHasDue.due_to_repairitem_id) {
        invoice.repairidforsale = customerVal.id
        // const repairforDueRepair2 = ajaxGetRequest("/duerepair/getrepairbydue/" + JSON.parse(duetoRepair.repairid))
        duetoRepair2.statusofrepair = "Paid"
        
        let serverResponse4 = ajaxRequestBodyMethod(`/duerepair/${salesHasDue.due_to_repairitem_id.id}`, "PUT", duetoRepair2);
        console.log(serverResponse4);
        // incomePaymentsObj.repair_id = customerVal
    }else{
        incomePaymentsObj.repair_id = null
        invoice.repairidforsale = null
    }
    // incomePaymentsObj.sales_id = invoice
    invoice.incomePayments = incomePaymentsObj

    console.log(invoice);
    let serverResponse11 = ajaxRequestBodyMethod("/invoice", "POST", invoice);
   
    console.log("serverResponse", serverResponse11);
    try {
        
        serverResponse11.salesHasSerials.forEach(elem =>{
    
            let categoryname13 = (elem.serialno_id.category_id.name).replace(/\s/g, '').toLowerCase()
            ajaxGetRequest(`/${categoryname13}/getqty/${elem.serialno_id.itemname}`)
        })
    } catch (error) {
        console.log(error);
    }

    printInvoice(serverResponse11)
    barcodeNo.value = ''
    inputCustomerName.value = ''
    inputCustomerContact.value = ''
    invoiceTotalPrice.value = ''
    discountCusRate.value = ''
    invoiceDiscountedPrice.value = ''
    paymentMethod.value = ''
    invoiceCustomerPaymentRefference.value = ''
    invoiceCustomerPayment.value = ''
    invoiceBalance.value = ''
    irepairtable = []
    itable = []
    refreshInvoiceForm()
refreshRepairTable();
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

    let newWindow = window.open('', '_blank');
    // let newWindow = window.open();
    newWindow.document.write(`
        <html>
        <head>
            <title>${inputCustomerName.value}-${response.invoiceno}</title>
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

// const printInvoice1 = () => {

//     console.log("print");
//     // const table1 = document.getElementById("tableSupplier")
//     const table2 = document.getElementById("printingModalPrint1")
//     table2.classList.remove('d-none');

//     const tableHtmlInvoice = table2.outerHTML;
//     table2.classList.add('d-none');

//     // const printWindow = window.open();
//     // printWindow.document.write(tableHtml);
//     let newWindow = window.open()
//     newWindow.document.write(
//         // "<title>" + rowOb.supplier_code + "</title>" +
//         "<title>" + 1000 + "</title>" +
//         "<link rel='stylesheet' href='resourcesT/bootstrap_5.3.1/css/bootstrap.min.css'>" + "</link>" +
//         "<body>" + tableHtmlInvoice + "</body>"

//     )
//     setTimeout(() => { //data load wena eka krnne 500 kin
//         newWindow.stop();//load wena eka nwattanwa
//         newWindow.print();
//         newWindow.close();
//         // table2.classList.add("d-none")

//     }, 500)


// }

const setDataIntInvoicePrint = (invoiceP) => {
    if (invoiceP?.salesHasSerials?.length>0) {
        
        createTable(invoiceP)
        cusTablePrintDiv.classList.remove("d-none")

    }
    console.log(invoiceP);
    if (invoiceP?.salesHasDues?.length > 0) {
        
        createRepairTable(invoiceP)
        createTechNoteTable(invoiceP)
        cusRepairTechTablePrintDiv.classList.remove("d-none")
    
        // if (invoiceP.salesHasDues.due_to_repairitem_id.usedItems.length > 0)  {
            cusRepairUsedItemTablePrintDiv.classList.remove("d-none")
            createRepairUsedTable(invoiceP)
        // }
          
    }
    // if (invoiceP.salesHasDues.statusofserivceorrepair === "service") {
    //     cusRepairTablePrintDiv.classList.remove('d-none')
    //     console.log("executed --1");
    // }
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

  
    cusPayMethodPrint.innerHTML = invoiceP?.paymentmethod ? invoiceP?.paymentmethod : "cash"
    if (invoiceP?.paymentmethod == "card") {
        printReffer.classList.remove("d-none")
        cusPaidPrintDiv.classList.add("d-none")
cusBalancePrintDiv.classList.add("d-none")
    }else{
        printReffer.classList.add("d-none")
    }
    cusReferrancePrint.innerHTML = invoiceP.referenceno
    cusSubTotalPrint.innerHTML = invoiceP.total
    cusPaidPrint.innerHTML = invoiceP.customerpaidamount
    cusBalancePrint.innerHTML = invoiceP.balance
    cusGrandPrint.innerHTML = invoiceP.total
}


const createRepairUsedTable = (invoiceUItem) => {
    console.log(invoiceUItem);
    displayProperties = [
        { property: getRepairNoUItems, dataType: 'function' },
        { property: getSerialRepairUItems, dataType: 'function' },
        { property: getCategoryRepairUItems, dataType: 'function' },
        { property: getItemUItems, dataType: 'function' },
        { property: getItemorServiceWarrantyRepairUItems, dataType: 'function' },
        { property: getItemorServicePriceRepairUItems, dataType: 'function' },
    ]
    fillDataIntoTable(cusRepairUsedItemTablePrint, invoiceUItem.salesHasDues, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, false)

}

const getRepairNoUItems = (rowOb)=>{
    return rowOb?.due_to_repairitem_id?.repairid
}
const getSerialRepairUItems = (rowOb)=>{
        let getSerial = ''
    rowOb?.due_to_repairitem_id?.usedItems.forEach(elem => {
         getSerial = getSerial + `<p>${elem?.serialno}</p>`
        })
    return getSerial
}
const getCategoryRepairUItems = (rowOb)=>{
      let cat = ""
    rowOb?.due_to_repairitem_id?.usedItems?.forEach(elem => {
        cat = cat + `<p>${elem?.category}</p>`

    })
    return cat
}
const getItemUItems = (rowOb)=>{
    let catItems = ""
    rowOb?.due_to_repairitem_id?.usedItems?.forEach(elem => {
        catItems = catItems + `<p> ${elem?.itemname}</p>`

    })
    return catItems
}
const getItemorServiceWarrantyRepairUItems = (rowOb)=>{
    let catIUtWarrenty = ""
    rowOb?.due_to_repairitem_id?.usedItems.forEach(element => {
        try {
            categoriesItemsRep = ajaxGetRequest(`/${element?.category}/getlist`)
            const filteredDataRep = filterByName(element?.itemname, categoriesItemsRep);
    
            console.log("Filtered data:", filteredDataRep[0]);
            const objRep = filteredDataRep[0]
    
            const warrentyPeriod = objRep.warrenty
            catIUtWarrenty = catIUtWarrenty  +"<p >"+ warrentyPeriod + "</p>"
            
        } catch (error) {
            catIUtWarrenty = catIUtWarrenty + "<p >" + "-" + "</p>"
        }

    })
    return catIUtWarrenty;
}
const getItemorServicePriceRepairUItems = (rowOb)=>{
    let catItemsPrice = ""
    rowOb?.due_to_repairitem_id?.usedItems?.forEach(elem => {
        catItemsPrice = catItemsPrice +  `<p>${elem?.unitprice}</p>`

    })
    return catItemsPrice
}
const createRepairTable = (invoiceCR) => {
    console.log(invoiceCR);
    displayProperties = [
        { property: getRepairNo, dataType: 'function' },
        { property: getQtyForRepair, dataType: 'function' },
        { property: getSerialRepair, dataType: 'function' },
        { property: getCategoryRepair, dataType: 'function' },
        { property: getItem, dataType: 'function' },
        { property: getUsedItemsRepair, dataType: 'function' },
        { property: getItemorServiceWarrantyRepairTotal, dataType: 'function' },
        // { property: getItemorServicePriceRepair, dataType: 'function' },
    ]
    fillDataIntoTable(cusRepairTablePrint, invoiceCR.salesHasDues, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, false)

}
const createTechNoteTable = (invoiceCPT) => {
    console.log(invoiceCPT);
    displayProperties = [
        { property: getRepairNoForT, dataType: 'function' },
        { property: getTechnote, dataType: 'function' },
      
        // { property: getItemorServicePriceRepair, dataType: 'function' },
    ]
    fillDataIntoTable(cusRepairTechTablePrintTabel, invoiceCPT.salesHasDues, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, false)

}
const getRepairNoForT = (elem1)=>{
    return elem1.due_to_repairitem_id?.repairid;
}
const getTechnote = (elem1)=>{
    return elem1.due_to_repairitem_id?.technicalnote;

}


const getRepairNo = (elem) => {
    // console.log(rowOb);
    // let repNo = ''
    // rowOb.forEach(elem => {
    //      repNo = repNo + elem?.due_to_repairitem_id?.repairid
    //     })
    return elem.due_to_repairitem_id?.repairid;
}
const getQtyForRepair = (rowOb) => {
    return 1;
}
const getSerialRepair = (rowOb) => {
    // let getSerial = ''
    // rowOb.forEach(elem => {
    //      getSerial = getSerial + rowOb?.due_to_repairitem_id?.serialno
    //     })
    return rowOb?.due_to_repairitem_id?.serialno;

}
const getCategoryRepair = (rowOb) => {
    // let cat = ""
    // rowOb.forEach(elem => {
    //     cat = cat + rowOb?.due_to_repairitem_id?.category

    // })
    return rowOb?.due_to_repairitem_id?.category;

}
const getItem = (rowOb) => {
    return rowOb?.due_to_repairitem_id?.itemname;
    // let catIt = ""
    // try {
    //     rowOb?.due_to_repairitem_id?.usedItems.forEach(elem => {
    //         catIt = catIt + elem?.itemname ? elem?.itemname : "-" 
    
    //     })
    // } catch (error) {
    //     catIt = catIt + "-"
    // }
   
    // return catIt;

}
const getUsedItemsRepair = (rowOb) =>{
    let usedItemsForRepair = ""
    rowOb?.due_to_repairitem_id?.usedItems.forEach(element => {
        try {
            
            usedItemsForRepair = usedItemsForRepair  +"<p >"+ element.itemname  + "</p>"
            
        } catch (error) {
            usedItemsForRepair = usedItemsForRepair + "<p >" + "-" + "</p>"
        }

    })
    return usedItemsForRepair;
}
const getItemorServiceWarrantyRepairTotal = (rowOb) => {
    return rowOb?.due_to_repairitem_id?.total;
    // categoriesItems1 = ajaxGetRequest(`/${categoryname1}/getlist`, categoryname1)
    // // ajaxGetRequest(`/${categoryname1}/getqty`, categoryname1)
    // console.log(categoriesItems1);


    // let catItWarrenty = ""
    // rowOb.due_to_repairitem_id.usedItems.forEach(element => {
    //     try {
    //         categoriesItemsRep = ajaxGetRequest(`/${element?.category}/getlist`)
    //         const filteredDataRep = filterByName(element?.itemname, categoriesItemsRep);
    
    //         console.log("Filtered data:", filteredDataRep[0]);
    //         const objRep = filteredDataRep[0]
    
    //         const warrentyPeriod = objRep.warrenty
    //         catItWarrenty = catItWarrenty  +"<p >"+ warrentyPeriod + "</p>"
            
    //     } catch (error) {
    //         catItWarrenty = catItWarrenty + "<p >" + "-" + "</p>"
    //     }

    // })
    // return catItWarrenty;

}
const getItemorServicePriceRepair = (rowOb) => {
    // let catItPrice = ""
    // try {
        
    //     rowOb.due_to_repairitem_id.usedItems.forEach(element => {
    //         catItPrice = catItPrice + "<p class = 'working-status'>" + element.unitprice + "</p>"
    
    //     })
    // } catch (error) {
    //     catItPrice = catItPrice + "-"
    // }
    // return catItPrice;

}

const createTable = (invoiceC) => {
    console.log(invoiceC);
    // let boolIsService = ''
    // if ( invoiceC.salesHasDues.statusofserivceorrepair == "service") {
    //     boolIsService = true
    // }else{
    //     boolIsService = false
    // }
    console.log(invoiceC.salesHasSerials);
    displayProperties = [
        { property: getQty, dataType: 'function' },
        { property: getSerialNoSaleName, dataType: 'function' },
        { property: getCateName, dataType: 'function' },
        { property: getItemorService, dataType: 'function' },
        { property: getItemorServiceWarranty, dataType: 'function' },
        { property: getItemorServicePrice, dataType: 'function' },
    ]
    fillDataIntoTable(cusTablePrint, invoiceC.salesHasSerials, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, false)
    console.log(invoiceC.salesHasSerials);
}

const getQty = (rowOb) => {
    return 1;
}
const getSerialNoSaleName = (rowOb) => {
    // let itemName1 = ''
    // rowOb.forEach(elem => {
    //      itemName1 = itemName1 + elem.serialno_id.itemname
    //     })
    return rowOb.serialno_id.itemname;

}
const getCateName = (rowOb) => {
    console.log(rowOb);
    // let cateName = ''
    // rowOb.forEach(elem => {
    //      cateName = cateName + elem.serialno_id.category_id.name
    //     })
    // return cateName;
    return rowOb.serialno_id.category_id.name;

}

const getItemorService = (rowOb) => {
    // if (boolIsService) {       
    //     return "Serivice";
    // }else{
        return "Item"
    // }
}

const getItemorServiceWarranty = (elem) => {
    // return `<p>${rowOb.warrentystartdate}-${rowOb.warrentyexpire}<span>(${rowOb.warrentyperiod})Days</span></p>`
    // let itemWar = ''
    // rowOb.forEach(elem => {
    //      itemWar = itemWar + `<p>${elem?.warrentystartdate}-${elem?.warrentyexpire}<span>(${elem?.warrentyperiod})Days</span></p>`
    //     })
    return `<p>${elem?.warrentystartdate}-${elem?.warrentyexpire}<span>(${elem?.warrentyperiod})Days</span></p>`;
}
const getItemorServicePrice = (elem) => {
    // ajax
    // let itemPrice = ''
    // rowOb.forEach(elem => {
    //      itemPrice = itemPrice + elem?.serialno_id?.itemprice
    //     })
    return elem?.serialno_id?.itemprice;

}

const refreshRepairTable = () => {
    repair = new Object();
    warrentyItem = new Object();
    warrentyItem.repairtype = "shop item"

    usedItems = new Object();
    customer_id = new Object();
    customerObj = new Object();
    repair.duetoRepair = new Array();
    warrentyItem.usedItems = new Array();
    // repair.usedItems = new Array();
    duetoRepair.usedItems = new Array();
    useItem = new Object();


    getInvoiceNumbersNotInDueRepairInSales = ajaxGetRequest("/invoice/getinvoicesnotindueandinsaleserial")
    
    // fillDataIntoSelect(warrentySerialId, "Select Serial No", getInvoiceNumbersNotInDueRepairInSales, 'serialno')
    fillDataIntoDataList(dataListItemsForSerialNo, getInvoiceNumbersNotInDueRepairInSales, 'serialno','itemname')
    // serialNoListCountForWarrenty = ajaxGetRequest("/serialno/getlistwithoutnotnull")
    // fillDataIntoSelect(warrentySerialId, "Select SerialNumber List", serialNoListCountForWarrenty, 'serialno')
    repairItemIntoTable()

}


const getWarrentyItemDetails = (valueSerial) => {
    matchingSeral = getInvoiceNumbersNotInDueRepairInSales.find(item => 
        `${item.serialno} ${item.itemname}` === valueSerial
    );
    // serialwarrentyObject = JSON.parse(warrentySerialId.value)
    serialwarrentyObject = matchingSeral
    getWarrntyStartDate = ajaxGetRequest1("/invoice/getwarrantystartdate/" + serialwarrentyObject.serialno)
    console.log(serialwarrentyObject);

    lblItemWarrentyName.value = serialwarrentyObject.itemname
    lblItemWarrentyCategory.value = serialwarrentyObject.category_id.name
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
        // inputWarrentyItemStart.value = getWarrntyStartDate
        inputWarrentyItemStart.value = new Date(getWarrntyStartDate).toISOString().slice(0, 10);
        // saleSerial.warrentystartdate=inputWarStartDate.value
        const newWarrentyDate = new Date(inputWarrentyItemStart.value);
        newWarrentyDate.setDate(newWarrentyDate.getDate() + warrentyItemPeriod);
        inputWarrentyItemEnd.value = newWarrentyDate.toISOString().slice(0, 10);
        toBeExpier.innerHTML = inputWarrentyItemEnd.value
        // inputWarrentyItemEnd.value = newWarrentyDate;
        // saleSerial.warrentyexpire=inputWarrentyEnd.value

        const today = new Date()
        console.log("executed",inputWarrentyItemEnd.value, date(today));
        if (inputWarrentyItemEnd.value < today.toISOString().slice(0, 10)) {
            console.log("executed");
            returnId.disabled = true;
        } else {
            readyRepairId.disabled = true;
        }
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
        { property: getRepairItemTakenDate, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(repairItemTable, repairtable, displayProperties, viewBtnForWarranty, deleteBtnForWarranty, printBtnForWarranty, true)

}
const viewBtnForWarranty =(rowOb)=>{
    repairNoId.innerHTML = rowOb.repairno 
    inputWarrentyCustName.value = rowOb.customer_id.name 
    inputWarrentyCustPhone.value =  rowOb.customer_id.phone
    rowOb.duetoRepair.forEach(elem=>{
    inputWarrentyCustDueserial.value = elem?.serialno
    inputWarrentyCustDueCategory.value = elem?.category
    inputWarrentyCustDueItemname.value = elem?.itemname    
    inputWarrentyCustDueFault.value = elem?.fault
    inputWarrentyCustDueTechNote.value = elem?.technicalnote
    })
    $('#staticBackdropforRepair').modal('show');
    console.log(rowOb);
    // staticBackdropforRepair.setAttribute('data-bs-toggle','modal')
    // staticBackdropforRepair.setAttribute('data-bs-target','staticBackdropforRepair')



}
const deleteBtnForWarranty =()=>{}
const printBtnForWarranty =()=>{}

const getRepairItemCustomer = (rowOb)=>{
    return rowOb?.customer_id?.name
}
const getSerialNo = (rowOb) => {
    console.log(rowOb);
    let ItemRepair = '';
    rowOb.duetoRepair.forEach(element => {
        ItemRepair = ItemRepair + "<p class = 'working-status'>" + element.serialno + "</p>"
    })
    return ItemRepair
}
const getRepairItemTakenDate = (rowOb) => {
    console.log(rowOb);
    let ItemRepairDate = '';
    rowOb.duetoRepair.forEach(element => {
        ItemRepairDate = ItemRepairDate + "<p class = 'working-status'>" + element.takendate + "</p>"
    })
    return ItemRepairDate
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
            itemStatus += `<p class="deleted-status">${statusText}</p>`;
        } else if (statusText === "Diagnoesed") {
            itemStatus += `<button type="button" class="working-status btn btn-secondary mb-3" 
            data-bs-toggle="modal" data-bs-target="#staticBackdrop00" 
            onclick="handleClick(${element.id})">${statusText}</button>`;
        }else {
            itemStatus += `<p class="resign-status">${statusText}</p>`;
        }
    });

    return itemStatus;
};
const handleClick = (elem) => {
    //dure repair id eka hmbenawa
    console.log(elem); // Log the clicked status or perform other actions
    let iddue = elem
    console.log(iddue);

    diagnosistable = ajaxGetRequest(`/duerepair/getlist/${iddue}`)
    console.log(diagnosistable);

    displayProperties = [
        { property: getDiagItemCategory, dataType: 'function' },
        { property: getDiagItemName, dataType: 'function' },
        { property: getDiagItemPrice, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(repairItemTableDig, diagnosistable.diagnosedItems, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, false)

    // let totalUnitPrice = 0;

        // Loop through diagnosed items and fetch their prices
        // for (const item of diagnosistable.diagnosedItems) {
        //     const priceResponse = ajaxGetRequest(`serialno/getitemprice/${item?.itemname}`);
        //     const price = parseFloat(priceResponse);
        //     totalUnitPrice += price;
        // }
        diagnosistable.diagnosedItems.forEach(item => {
            //wenas kara mekata getitempriceforserial
            let priceResponse = ajaxGetRequest(`serialno/getitempriceforserial/${item?.itemname}`);
            let price = parseFloat(priceResponse);
            totalUnitPrice += price;
        });
    // let tots = diagnosistable.diagnosedItems.forEach(data => {

    //      calculateTotalPrice(data).then(totalPrice => {
    //         repairItemTotalPriceDig.value = totalPrice;
    //     });
    // })

    repairItemTotalPriceDig.value = totalUnitPrice

     button = document.createElement('button')
    button.className = 'btn btn-danger'
    button.innerHTML = 'Approve'
    button.type = 'button';
    
    button.onclick = () => {
        // console.log('edit', item.id, index);
        handleApprove(elem)
        // button.setAttribute('data-bs-dismiss', 'modal');
        $("#staticBackdrop00").on('hide.bs.modal'); 
        repairItemIntoTable()
        handleClose()
        // $("staticBackdrop00").model('hide')
    }

    let div = document.getElementById('diagnosedItemFooter'); // Create the div element
   
    // Append the button to the div
    div.appendChild(button);

};
const handleClose = () =>{
    if (button) {
        // Remove the button from its parent node
        button.parentNode.removeChild(button);
        // Optionally, you can set button to null or empty string
        button = null;
    }}
const calculateTotalPrice = async (diagnosistable) => {
    let total = 0;
    const itemPricePromises = diagnosistable.map(item => {
        return ajaxGetRequest("serialno/getitemprice/" + item?.itemname);
    });
    // const itemPricePromises = ajaxGetRequest("serialno/getitemprice/" + diagnosistable?.itemname)

    const itemPrices = await Promise.all(itemPricePromises);
    itemPrices.forEach(price => {
        total += parseFloat(price);
    });
    return total;
};
const handleApprove = (elem)=>{
    console.log(elem);
    let getDueRepair =  ajaxGetRequest(`duerepair/getlist/${elem}`)
    console.log(getDueRepair);
    getDueRepair.statusofrepair = "Approved";
    // let repairSelected =  ajaxGetRequest(`repair/getlist/${elem}`)
    // let dueRepair = repairSelected.duetoRepair
    // console.log(dueRepair);
    let serverResponse2 = ajaxRequestBodyMethod(`/duerepair/${elem}`, "PUT", getDueRepair);
    console.log(serverResponse2);
    handleClose()

}
const getDiagItemCategory = (rowObject) => {
    // console.log(rowObject);
    
    // let ItemDiagCategory = '';
    // rowObject.forEach(element => {
    // ItemDiagCategory =  ItemDiagCategory + "<p class = 'working-status'>" + element?.category ? element?.category : "-" + "</p>"
    // })
    return rowObject.category
}
const getDiagItemName = (rowObject) => {
    // let ItemDiagName = '';
    // // let getprice = '';
    // rowObject.forEach(element => {
    // ItemDiagName = ItemDiagName + "<p class = 'working-status'>" + element.itemname ? element.itemname : "-" + "</p>"

    // })
    return rowObject.itemname
}
const getDiagItemPrice = (rowObject) => {
    // let getprice = 0;
    // rowObject.forEach(element => {
    let get = ajaxGetRequest("serialno/getitemprice/" + rowObject?.itemname)
    if (get) {
        // getprice = parseFloat(getprice) + parseFloat(get)
        getprice = parseFloat(get)
    } else {
        getprice = "-"
    }
    // })

    // return "-"
    // return (getDiagItemCategory(rowObject) === "-" && getDiagItemName(rowObject) === "-") ? "-" : getprice
    return getprice
}


const readyRepair = () => {
    warrentyItem.serialno = serialwarrentyObject.serialno
    if (warrentyItem.serialno) {
        
        warrentyItem.itemname = serialwarrentyObject.itemname
        warrentyItem.category = serialwarrentyObject.category_id.name
    }
    warrentyItem.statusofrepair = "pending diagnosis"
    warrentyItem.fault = warrentyFault.value
    if (flexCheckCheckedForDiagnose.checked = true) {
        warrentyItem.diagnoserequire = "Require Diagnose"
    }else{
        warrentyItem.diagnoserequire = ""
    }
    

    warrentyItem.usedItems.push(usedItemsObj)
    customerObj.name = inputWarrentyCustomerName.value
    customerObj.phone = inputWarrentyCustomerContact.value
    repair.customer_id = customerObj

    repair.duetoRepair.push(warrentyItem);
    // repair.usedItems.push(useItem)

    console.log(repair);
    let phone = inputWarrentyCustomerContact.value

        try {
            serverResponseForIsExisting = ajaxRequestBodyMethod(`repair/getrepairbycustomerphone/${phone}`)
            console.log(serverResponseForIsExisting);
            
        } catch (error) {
            serverResponseForIsExisting = null
            console.log(serverResponseForIsExisting);
        }
        if (serverResponseForIsExisting.length >0 || serverResponseForIsExisting != '') {
            
         
            // idForNext = serverResponse1.id
                let idForNext = serverResponseForIsExisting.id
                // inputWarrentyCustomerName.value = serverResponseForIsExisting.customer_id.name
                // inputWarrentyCustomerContact.value = serverResponseForIsExisting.customer_id.phone
                console.log(repair);
                let serverResponse1Updated = ajaxRequestBodyMethod(`/repair/${idForNext}`, "PUT", repair);
                if (flexCheckCheckedForCus.checked = true) {
                    inputWarrentyCustomerName.value = serverResponseForIsExisting.customer_id.name
                    inputWarrentyCustomerContact.value = serverResponseForIsExisting.customer_id.phone
                }
                console.log(serverResponse1Updated);
        }else{
    
            let serverResponse1 = ajaxRequestBodyMethod("/repair", "POST", repair);
            console.log("serverResponse", serverResponse1);
            if (flexCheckCheckedForCus.checked = true) {
                // idForNext = serverResponse1.id
                inputWarrentyCustomerName.value = serverResponse1.customer_id.name
                inputWarrentyCustomerContact.value = serverResponse1.customer_id.phone
            }
        }
        if (flexCheckCheckedForCus.checked = false) {

            refreshInvoiceForm()
        }
 
    
    repairItemIntoTable()
    addSubRepair()
   
    

}
const returnCompany = () => {
    warrentyItem.serialno = serialwarrentyObject.serialno
    warrentyItem.itemname = serialwarrentyObject.itemname
    warrentyItem.category = serialwarrentyObject.category_id.name

    warrentyItem.statusofrepair = "Return To Company"
    warrentyItem.fault = warrentyFault.value
    warrentyItem.repairtype = "shop item"

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
    addSubRepair()

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

const checkIstheCustomerExisting = (cusvalue)=>{
    getExistCustomerByName = ajaxGetRequest(`/customer/getexistingcustomerbyname?name=${inputCustomerName.value}`)
    console.log(getExistCustomerByName);
    if (getExistCustomerByName != '') {
        
        inputCustomerContact.value = getExistCustomerByName.phone
    }else{
        inputCustomerContact.value = ''
    }
}
//    getExistCustomerByPhone = ajaxGetRequest(`/customer/getexistingcustomerbyphone?phone=${inputCustomerContact.value}`)
//    console.log(getExistCustomerByPhone);
//    if (getExistCustomerByPhone != '') {
//        if (getExistCustomerByPhone.name == inputWarrentyCustName.value) {
//            inputCustomerName.style.border = '2px solid orange';
//            inputCustomerContact.style.border = '2px solid orange';
           
//        }else{
//            inputCustomerName.style.border = '2px solid red';
//            inputCustomerContact.style.border = '2px solid red';
//        }
      
    
//    }else{
//     inputCustomerName.style.border = '2px solid #ced4da';
//     inputCustomerContact.style.border = '2px solid #ced4da';
//    }
const searchInRepairTable = ()=>{
    const searchInput = document.getElementById('searchRepairInput');
    const table = document.getElementById('repairItemTable');
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
