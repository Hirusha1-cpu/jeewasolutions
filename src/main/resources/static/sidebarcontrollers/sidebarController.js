window.addEventListener('load', () => {
    refreshSideBar();

})
const refreshSideBar = () =>{
    console.log("sidebar");
    let userPrivilegeforemployee = ajaxGetRequest("/privilege/bylogedusermodule/employee")
    let userPrivilegeforuser = ajaxGetRequest("/privilege/bylogedusermodule/user")
    let userPrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/privilege")
    let supplierPrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/Supplier")
    let purchasePrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/Purchase")
    let grnPrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/Grn")
    let invoicePrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/Invoice")
    let repairPrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/Repair")
    let customerPrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/Customer")
    let itemsPrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/Items")
    let reportPrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/Report")
    let inventoryPrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/Inventory")
    let paymentPrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/Income")

    console.log(userPrivilegeforemployee);
    console.log(userPrivilegeforemployee.insert);
    if (!userPrivilegeforuser.select && !userPrivilegeforprivilege.select) {
        systemUserId.classList.add("d-none");
        systemPriviId.classList.add("d-none");
    } else{
        systemUserId.classList.remove("d-none");
        systemPriviId.classList.remove("d-none");
    }
    
    if (!supplierPrivilegeforprivilege.select && !purchasePrivilegeforprivilege.select && !grnPrivilegeforprivilege.select) {
        supplierSideId.classList.add("d-none");
        purchaseSideId.classList.add("d-none");
        grnSideId.classList.add("d-none");
    } else{
        supplierSideId.classList.remove("d-none");
        purchaseSideId.classList.remove("d-none");
        grnSideId.classList.remove("d-none");
    }
    
    if (!inventoryPrivilegeforprivilege.select ) {
        inventorySideId.classList.add("d-none");
    } else{
        inventorySideId.classList.remove("d-none");
       
    }
    if (!invoicePrivilegeforprivilege.select && !paymentPrivilegeforprivilege.select) {
        invoiceSideId.classList.add("d-none");
        paySideId.classList.add("d-none");
    } else{
        invoiceSideId.classList.remove("d-none");
        paySideId.classList.remove("d-none");
       
    }

    if (!repairPrivilegeforprivilege.select ) {
        repairSideId.classList.add("d-none");
    } else{
        repairSideId.classList.remove("d-none");
       
    }

    if (!customerPrivilegeforprivilege.select ) {
        customerSideId.classList.add("d-none");
    } else{
        customerSideId.classList.remove("d-none");
       
    }

    if (!reportPrivilegeforprivilege.select ) {
        reportSideId.classList.add("d-none");
    } else{
        reportSideId.classList.remove("d-none");
       
    }

    if (!itemsPrivilegeforprivilege.select ) {
        itemsideId.classList.add("d-none");
    } else{
        itemsideId.classList.remove("d-none");
       
    }









    const notificationElement = document.getElementById("notificationId");
    notificationElement.innerText = "12";

}