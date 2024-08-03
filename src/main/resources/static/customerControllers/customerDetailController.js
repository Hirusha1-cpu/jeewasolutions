window.addEventListener('load', () => {
    refreshCustomerTable();
    refreshCustomerForm();
})

const refreshCustomerTable = () =>{
    const customerDetails = ajaxGetRequest("/customer/getlist")

    // console.log(customerDetailsbytypefStage);
    const displayProperties = [
        { property: 'name', dataType: 'string' },
        { property: 'phone', dataType: 'string' },
        { property: customertypes, dataType: 'function' },
        // { property: 'buymode', dataType: 'integer' },
    ]
    fillDataIntoTable(customerDetailsId, customerDetails, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn,  true)

}
const customertypes = (rowObject) =>{
    return rowObject?.customerType?.customertypes ? rowObject.customerType.customertypes : "-";
}

const refreshCustomerForm = () => {
    custype = {}
    cusItemArry = []
    fStageCusType = {}
    fStagecusItemArry = []
    sStageCusType = {}
    sStagecusItemArry = []
    const customerDetails = ajaxGetRequest("/customertype/getlist/" + "gold")
    discountLabel.innerHTML = customerDetails.discount
    discountRounds.innerHTML = customerDetails.buyrounds
    discountMinCash.innerHTML = customerDetails.mincash
    customerCount.innerHTML = ajaxGetRequest("/customer/count/" + "gold")

    const fStagecustomerDetails = ajaxGetRequest("/customertype/getlist/" + "silver")
    discountLabelfStage.innerHTML = fStagecustomerDetails.discount
    discountRoundsfStage.innerHTML = fStagecustomerDetails.buyrounds
    discountMinCashfStage.innerHTML = fStagecustomerDetails.mincash
    customerCountfStage.innerHTML = ajaxGetRequest("/customer/count/" + "silver")

    const sStagecustomerDetails = ajaxGetRequest("/customertype/getlist/" + "bronze")
    discountLabelsStage.innerHTML = sStagecustomerDetails.discount
    discountRoundssStage.innerHTML = sStagecustomerDetails.buyrounds
    discountMinCashsStage.innerHTML = sStagecustomerDetails.mincash
    customerCountsStage.innerHTML = ajaxGetRequest("/customer/count/" + "bronze")


}

const submitCustype = () => {
    console.log(custype);
    custype.customertypes = "gold"
    let serverResponseCustype = ajaxRequestBodyMethod("/customertype", "PUT", custype);
    console.log(serverResponseCustype);
}
const submitCustypefStage = () => {
    console.log(fStageCusType);
    fStageCusType.customertypes = "silver"
    console.log(fStageCusType);
    let serverResponseCustypefStage = ajaxRequestBodyMethod("/customertype", "PUT", fStageCusType);
    console.log(serverResponseCustypefStage);
}
const submitCustypesStage = () => {
    console.log(sStageCusType);
    sStageCusType.customertypes = "bronze"
    console.log(sStageCusType);
    let serverResponseCustypesStage = ajaxRequestBodyMethod("/customertype", "PUT", sStageCusType);
    console.log(serverResponseCustypesStage);
}

const showCustomers = () => {

    customerTableShow()

}
const showCustomersfStage = () => {

    customerTableShowfStage()

}
const showCustomerssStage = () => {

    customerTableShowsStage()

}
const customerTableShow = () => {
    const customerDetailsbytype = ajaxGetRequest("/customer/getcustomerbytype/" + "gold")
    console.log(customerDetailsbytype);
    const displayProperties = [
        { property: 'name', dataType: 'string' },
        { property: 'phone', dataType: 'string' },
        { property: getBuyRounds, dataType: 'function' },
    ]
    fillDataIntoPurcahsechkTable(customerDetailTable, customerDetailsbytype, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, checkBoxButton, false)

}
const getBuyRounds = (rowOb)=>{
   return rowOb?.buyrounds
}
const customerTableShowfStage = () => {
    const customerDetailsbytypefStage = ajaxGetRequest("/customer/getcustomerbytype/" + "silver")

    console.log(customerDetailsbytypefStage);
    const displayProperties = [
        { property: 'name', dataType: 'string' },
        { property: 'phone', dataType: 'string' },
        { property: getBuyRounds, dataType: 'function' },
    ]
    fillDataIntoPurcahsechkTable(customerDetailTablefStage, customerDetailsbytypefStage, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, checkBoxButtonfStage, false)

}
const customerTableShowsStage = () => {
    const customerDetailsbytypesStage = ajaxGetRequest("/customer/getcustomerbytype/" + "bronze")

    console.log(customerDetailsbytypesStage);
    const displayProperties = [
        { property: 'name', dataType: 'string' },
        { property: 'phone', dataType: 'string' },
        { property: getBuyRounds, dataType: 'function' },
    ]
    fillDataIntoPurcahsechkTable(customerDetailTablesStage, customerDetailsbytypesStage, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, checkBoxButtonsStage, false)

}

const editEmployeeBtn = (rowObject) => {
    console.log("clicked purchase order");
    // const collapseElement = document.getElementById('collapseItemDetails');

    // // Check if the element exists before adding attributes
    // if (collapseElement) {
    //     collapseElement.setAttribute('data-bs-toggle', 'collapse');
    //     collapseElement.setAttribute('data-bs-target', '#collapseItemDetails');
    //     collapseElement.setAttribute('aria-expanded', 'false');
    //     collapseElement.setAttribute('aria-controls', 'collapseItemDetails');
    // } else {
    //     console.error('Element with ID "collapseItemDetails" not found.');
    // }

}
const checkBoxButton = (rowObject) => {
    cusItemArry = []
    const collapseElement = document.getElementById('collapseItemDetails');
    const collapseInstance = new bootstrap.Collapse(collapseElement);
    collapseInstance.show();
    checkCustomerItemTable(rowObject)
}
const checkBoxButtonfStage = (rowObject) => {
    fStagecusItemArry = []
    const collapseElement = document.getElementById('collapseItemDetailsfStage');
    const collapseInstance = new bootstrap.Collapse(collapseElement);
    collapseInstance.show();
    checkCustomerItemTablefStage(rowObject)
}
const checkBoxButtonsStage = (rowObject) => {
    fStagecusItemArry = []
    const collapseElement = document.getElementById('collapseItemDetailssStage');
    const collapseInstance = new bootstrap.Collapse(collapseElement);
    collapseInstance.show();
    checkCustomerItemTablesStage(rowObject)
}
const checkCustomerItemTable = (rowObject) => {
    console.log(rowObject);
    const customerDetailsbytype = ajaxGetRequest("/serialno/getitemsbycusname/" + rowObject.name)
    cusItemArry.push(customerDetailsbytype)
    console.log(customerDetailsbytype);
    const displayProperties1 = [
        { property: "itemcode", dataType: 'string' },
        { property: "itemprice", dataType: 'string' },

    ]
    fillDataIntoPurcahseTable(collapseItemDetailsTable, cusItemArry, displayProperties1, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)

}
const checkCustomerItemTablefStage = (rowObject) => {
    console.log(rowObject);
    const customerDetailsbytypefStage = ajaxGetRequest("/serialno/getitemsbycusname/" + rowObject.name)
    fStagecusItemArry.push(customerDetailsbytypefStage)
    // console.log(customerDetailsbytype);
    const displayProperties1 = [
        { property: "itemcode", dataType: 'string' },
        { property: "itemprice", dataType: 'string' },

    ]
    fillDataIntoPurcahseTable(collapseItemDetailsTablefStage, fStagecusItemArry, displayProperties1, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)

}
const checkCustomerItemTablesStage = (rowObject) => {
    console.log(rowObject);
    const customerDetailsbytypesStage = ajaxGetRequest("/serialno/getitemsbycusname/" + rowObject.name)
    fStagecusItemArry.push(customerDetailsbytypesStage)
    // console.log(customerDetailsbytype);
    const displayProperties1 = [
        { property: "itemcode", dataType: 'string' },
        { property: "itemprice", dataType: 'string' },

    ]
    fillDataIntoPurcahseTable(collapseItemDetailsTablesStage, sStagecusItemArry, displayProperties1, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)

}
const updateEmployeeBtn = (rowObject) => {
    console.log("clicked delete purchase order");
}
const deleteEmployeeBtn = (rowObject) => {
    console.log("clicked send purchase order");
    const collapseElement = document.getElementById('collapseItemDetails');
    const collapseInstance = new bootstrap.Collapse(collapseElement);
    collapseInstance.hide();
}