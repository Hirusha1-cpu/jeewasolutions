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

const addToTable = () =>{
    lblItemName1.addEventListener("change", (event) => {
       invoice.itemname =lblItemName1.value;
      });
    console.log(invoice);
}