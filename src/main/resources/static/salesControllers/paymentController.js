window.addEventListener('load', () => {
    refreshIncomeTable();
    refreshGRNTable();
    console.log("kk");
})

const refreshIncomeTable = () => {
    incomeTable = ajaxGetRequest("income/cusvisegetlist")
    displayProperties = [
        // { property: getRepairCode, dataType: 'function' },
        { property: getInvoice, dataType: 'function' },
        { property: getDateOfSales, dataType: 'function' },
        { property: getCustomerOfSales, dataType: 'function' },
        { property: getTotalOfSales, dataType: 'function' },
    ]
    fillDataIntoDashBoardTable(incomePaymentTable, incomeTable, displayProperties, editEmployeeBtn2, false)

}

const getInvoice = (rowOb) => {
    return rowOb.invoiceno ? rowOb.invoiceno : "-"
}
const getDateOfSales = (rowOb) => {
    return rowOb.date ? rowOb.date : "-"
}

const getCustomerOfSales = (rowOb) => {
    console.log(rowOb.customer);
    let customer = ajaxGetRequest(`customer/getlist/${parseInt(rowOb.customer)}`)
    if (customer != null) {
        return (customer?.name ? customer?.name : "-")  + " || " +( customer?.phone ? customer?.phone : "-" )
    } else {
        return "-"
    }

}

const getTotalOfSales = (rowOb) => {
    return rowOb.total ? rowOb.total : "-"
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
    fillDataIntoDashBoardTable(grnExpenseTab, grnTable, displayProperties, editEmployeeBtn2, false)

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