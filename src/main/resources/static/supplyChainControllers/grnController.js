window.addEventListener('load', () => {
    refreshGrnForm();
    // refreshSupplyTable();

})

const refreshGrnForm = () => {
    grn = new Object();
    purchaseOrders = ajaxGetRequest("/purchase/getlist")
    fillDataIntoSelect(selectPurchCategory,"Select Category",categories, 'name')
}