window.addEventListener('load', () => {
    refreshIncomeTable();
    refreshGRNTable();
    console.log("kk");
})

const refreshIncomeTable = () => {
    incomeTable = ajaxGetRequest("income/getlist")
    displayProperties = [
        // { property: getRepairCode, dataType: 'function' },
        { property: "invoiceno", dataType: 'string' },
        { property: getDateOfSales, dataType: 'function' },
        { property: getCustomerOfSales, dataType: 'function' },
        { property: getTotalOfSales, dataType: 'function' },
    ]
    fillDataIntoDashBoardTable(incomePaymentTable, incomeTable, displayProperties, editEmployeeBtn2, true)

}

const getDateOfSales = (rowOb) => {
    return rowOb.sales_id?.datetime
}

const getCustomerOfSales = (rowOb) => {
    return rowOb.sales_id?.customer_id?.name
}

const getTotalOfSales = (rowOb) => {
    return rowOb.sales_id?.total
}



const editEmployeeBtn2 = () => {

}
const refreshGRNTable = () => {
    grnTable = ajaxGetRequest("expensepayment/getlist")
//     #
// Grn No
//     Date
//     Category
//     Itemname
//     Payment
//     Qty
    displayProperties = [
        // { property: getRepairCode, dataType: 'function' },
        { property: getGrnNo, dataType: 'function' },
        { property: getDateOfGrn, dataType: 'function' },
        { property: getCategoryGrn, dataType: 'function' },
        { property: getItemGrn, dataType: 'function' },
        { property: getQtyGrn, dataType: 'function' },
        { property: getGrnPayment, dataType: 'function' },
    ]
    fillDataIntoDashBoardTable(grnExpenseTab, grnTable, displayProperties, editEmployeeBtn2, true)

}

const getGrnNo = (rowOb)=>{
   return rowOb?.grnno;
}
const getDateOfGrn = (rowOb)=>{
    return rowOb?.grnpayemntdate;
}
const getCategoryGrn = (rowOb)=>{
    let categories = '';
    rowOb.grn_id.grnHasCategory.forEach(element => {
        categories = categories + element?.category_id?.name
    });
    return categories;
}
const getItemGrn = (rowOb)=>{
    let categoriesItem = '';
    rowOb.grn_id.grnHasCategory.forEach(element => {
        categoriesItem = categoriesItem + element?.itemname
    });
    return categoriesItem;
}
const getGrnPayment = (rowOb)=>{
    return rowOb?.grnpayment;
}
const getQtyGrn = (rowOb)=>{
    let categoriesItemQty ='';
    rowOb.grn_id.grnHasCategory.forEach(element => {
        categoriesItemQty = categoriesItemQty + element?.qty
    });
    return categoriesItemQty;
}