window.addEventListener('load', () => {
    refreshInvoiceForm();
    // refreshGrnTable();

})
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

const refreshInvoiceForm = () => {
    invoice = new Object();
    itemTableDetail = new Object();
    customer_id = new Object();
    invoice.serialNoList = []
    serialNumbers = new Object();

}
const getItemDetails = () => {
    itemsDetails1 = ajaxGetRequest("/invoice/getlist/" + JSON.parse(invoiceSerialId.value));
    console.log(itemsDetails1);
    console.log(itemsDetails1.itemname);
    lblItemName1.value = itemsDetails1.itemname
    invoiceUnitPrice.value = itemsDetails1.itemprice
    // let categoryName;
    // categoryName = itemsDetails1.category_id.name
    const categoryname1 = (itemsDetails1.category_id.name).replace(/\s/g, '').toLowerCase()
    categoriesItems = ajaxGetRequest(`/${categoryname1}/getlist`, categoryname1)
    console.log(categoriesItems);

    const filteredData = filterByName(itemsDetails1.itemname, categoriesItems);

    console.log("Filtered data:", filteredData);
    const warrentyPeriod = filteredData[0].warrenty
    console.log(warrentyPeriod);
    if (!isNaN(warrentyPeriod)) {
        inputWarrentyItemName.value = itemsDetails1.itemname
        inputWarPeriod.value = warrentyPeriod + " Days"
        inputWarStartDate.value = new Date().toISOString().slice(0, 10);
        const newDate = new Date(inputWarStartDate.value);
        newDate.setDate(newDate.getDate() + warrentyPeriod);
        inputWarrentyEnd.value = newDate.toISOString().slice(0, 10);
        //open bank collapse model
        const collapseWarrentyElement = document.getElementById("collapseItemWarrenty");

        // Remove the 'collapse' class to open the collapse
        collapseWarrentyElement.classList.remove("collapse");

        // Optionally, you can also set aria-expanded attribute to 'true' for accessibility
        collapseWarrentyElement.setAttribute("aria-expanded", "true");
    }
}

function filterByName(itemname, data) {
    return data.filter((item) => (item.name).includes(itemname));
}

const addToTable = () => {
    //customer table ekata save wenna one data tika e object eke piliwelata
    invoice.customer_id.name = inputCustomerName.value
    invoice.customer_id.phone = inputCustomerContact.value

    //me tika wadagath item table eke data tika penna gnna
    itemTableDetail.itemname = lblItemName1.value;
    itemTableDetail.serialno = invoiceSerialId.value
    itemTableDetail.unitprice = invoiceUnitPrice.value
    
    //me tikath item table ekata wadagath namuth penann na
    itemTableDetail.warrentyitemname = inputWarrentyItemName.value
    itemTableDetail.warrentystartdate = inputWarStartDate.value
    itemTableDetail.warrentyperiod = inputWarPeriod.value
    itemTableDetail.warrentyendate = inputWarrentyEnd.value

    // invoice.serialNoList = []
    // serialNumbers = new Object();
    //serial number list ekk lesa gnnwa serial number tika
    serialNumbers.serialno = invoiceSerialId.value
}

const selectCustomerType = () => {

    const selectedValue = discountCategorySelect.value;
    // Do something with the selectedValue variable here
    console.log("Selected discount type:", selectedValue);
    if (selectedValue == 2) {
        discountCusRate.disabled = false;
        discountCusPhone.disabled = true;

        invoice.discountrate = discountCusRate.value


    }
}
const calculateBalance = () => {
    invoice.invoicetotalprice = invoiceTotalPrice.value
    invoice.invoicecustomerpayment = invoiceCustomerPayment.value
    invoice.invoicebalance = invoice.invoicecustomerpayment - invoice.invoicetotalprice
    invoiceBalance.value = invoice.invoicebalance

}

const addToSerialiedTable = () => {

    addToTable()
    invoice.serialNoList.push(serialNumbers)
    console.log(invoice);

    displayProperties = [
        { property: getSerialedItemCode, dataType: 'function' },
        { property: getSerialedItemName, dataType: 'function' },
        { property: getSerialedItemPrice, dataType: 'function' },
        { property: getSerialedItemWarrenty, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(itemSerializedTable, grnItems.grnHasCategory, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)
    //reset the value attributes
    lblItemName1.value = ""
    invoiceSerialId.value = ""
    invoiceUnitPrice.value = ""
    inputCustomerName.value = ""
    inputCustomerContact.value = ""
    inputWarrentyItemName.value = ""
    inputWarStartDate.value = ""
    inputWarPeriod.value = ""
    inputWarrentyEnd.value = ""

}

const getSerialedItemCode = () => {

}
const getSerialedItemName = () => {

}
const getSerialedItemPrice = () => {

}
const getSerialedItemWarrenty = () => {

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

const submitInvoice = () =>{

}