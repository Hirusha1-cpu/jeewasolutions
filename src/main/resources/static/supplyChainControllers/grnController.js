window.addEventListener('load', () => {
    refreshGrnForm();
    // refreshSupplyTable();

})

const refreshGrnForm = () => {
    grn = new Object();
    grn.grnhascategory = []

    purchaseOrdersList = ajaxGetRequest("/purchase/getlist")
    fillDataIntoSelect(selectPurchaseOrder1, "Select Purchase Order", purchaseOrdersList, 'id')

    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectCategories, "Select Category", categories, 'name')

    suppliers = ajaxGetRequest("/supplier/getlist")
    fillDataIntoSelect(selectSuppliers, "Select Supplier", suppliers, 'name')

}