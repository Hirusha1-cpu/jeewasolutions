window.addEventListener('load', () => {
    refreshGrnForm();
    // refreshSupplyTable();

})

const refreshGrnForm = () => {
    grn = new Object();
    purchaseOrders = ajaxGetRequest("/purchase/getlist")
    fillDataIntoSelect(selectPurchaseOrder,"Select Purchase Order",purchaseOrders, 'purchase_code')
}

