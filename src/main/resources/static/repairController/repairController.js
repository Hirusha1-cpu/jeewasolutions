document.addEventListener('DOMContentLoaded', function () {
  const myTabsEl = document.getElementById('myTabs');
  const firstTab = new bootstrap.Tab(myTabsEl.querySelector('.nav-tabs .nav-link.active'));
  firstTab.show();
  const myTabsEl2 = document.getElementById('myTabs2');
  const firstTab2 = new bootstrap.Tab(myTabsEl2.querySelector('.nav-tabs .nav-link.active'));
  firstTab2.show();

});

window.addEventListener('load', () => {
  refreshRepairForm();
  refreshRepairTable()
})
const refreshRepairForm = () => {
  repairUpdate = new Object();
  duetoRepair = new Object();
  paymentOb = new Object();
  repairitems = new Object();
  diagnosisUpdate = new Object();
  usedItemsObj = new Object();
  diagnosisDueUpdate = new Object();
  repairUpdate.usedItems = []
  repairUpdate.diagnosisUpdate = []
  diagnosisDueUpdate.usedItems = []
  diagnosisDueUpdate.diagnosedItems = []
  repairUpdate.duetoRepair = []
  repairitems.categoriesBrandsWithSuppliers = []
  usedItemsForRepair = new Object();
  const repairs = ajaxGetRequest("/repair/getlist")
  const duerepair1 = ajaxGetRequest("/duerepair/getlist")
  const duerepairShop = ajaxGetRequest("/duerepair/getduebystatus/Shop Item")
  const duerepairNonShop = ajaxGetRequest("/duerepair/getduebystatus/Non Shop Item")
  const duerepairUrgent = ajaxGetRequest("/duerepair/getduebystatus/Urgent Repair")
  const duerepairApproved= ajaxGetRequest("/duerepair/getduebystatusapproved")
  const duerepairProcessing = ajaxGetRequest("duerepair/getduebystatusforprocess")
  const availableSerials = ajaxGetRequest("serialno/getavailablelist")
  const categories = ajaxGetRequest("/category/getlist")
  console.log(repairs);
  fillDataIntoSelect(repairUsedItemCode, "Select Serial No", availableSerials, 'barcode')
  fillDataIntoSelect(selectUrgentRepairs, "Select Uregent Repairs", duerepairUrgent, 'fault')
  fillDataIntoSelect(selectShopRepairs, "Select Shop Repairs", duerepairShop, 'fault')
  fillDataIntoSelect(selectOutShopRepairs, "Select Non Shop Repairs", duerepairNonShop, 'fault')
  fillDataIntoSelect(selectPurchaseOrderProcess, "Select Processing", duerepairProcessing, 'fault')
  fillDataIntoSelect(selectApprovedRepairs, "Select Approved Repairs", duerepairApproved, 'fault')
  serialNoListCountForRepair = ajaxGetRequest("/serialno/getlistwithoutnotnull")
  fillDataIntoSelect(selectRepairCategory, "Select Category", categories, 'name')
}

const refreshRepairTable = () => {
  const repairDetails = ajaxGetRequest("/repair/getlist")
  // <th scope="col">#</th>
  // <th scope="col">Repair No</th>
  // <th scope="col">Itemname</th>
  // <th scope="col">Repair Status</th>
  // <th scope="col">Customer</th>
  // <th scope="col">Complete Status</th>
  // <th scope="col">Paid Status</th>
  // <th scope="col">Button</th>

  // console.log(customerDetailsbytypefStage);
  const displayProperties = [
    { property: 'repairno', dataType: 'string' },
    { property: getItemRepairName, dataType: 'function' },
    { property: getItemRepairStatus, dataType: 'function' },
    { property: getItemRepairCustomer, dataType: 'function' },
    { property: getRepairType, dataType: 'function' },
    { property: getItemRepairPaidStatus, dataType: 'function' }
  ]
  fillDataIntoTable(repairTab, repairDetails, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)

}

const getItemRepairName = (rowObject) => {
  console.log(rowObject);
  let DueRepairItemName = '';
  rowObject.duetoRepair.forEach(element => {
    DueRepairItemName = DueRepairItemName + "<p class = 'working-status'>" + element?.itemname ? element?.itemname : "-" + "</p>"
  })
  return DueRepairItemName
}
const getRepairType = (rowObject) => {
  console.log(rowObject);
  let DueRepairType = '';
  rowObject.duetoRepair.forEach(element => {
    DueRepairType = DueRepairType + "<p class = 'working-status'>" + element?.repairtype ? element?.repairtype : "-" + "</p>"
  })
  return DueRepairType
}
const getItemRepairStatus = (rowObject) => {
  let DueRepairItemStatus = '';
  rowObject.duetoRepair.forEach(element => {
    DueRepairItemStatus = DueRepairItemStatus + "<p class = 'working-status'>" + element?.statusofrepair ? element?.statusofrepair : "-" + "</p>"
  })
  return DueRepairItemStatus
}
const getItemRepairCustomer = (rowObject) => {
  return rowObject?.customer_id?.name ? rowObject.customer_id.name : "-";
}
const getItemRepairPaidStatus = (rowObject) => {
  if (rowObject?.incomePayments?.payment) {
    return "Paid";

  } else {
    return "No Paid";
  }
}

const editEmployeeBtn = (rowObject) => {
  console.log("clicked purchase order");
}
const updateEmployeeBtn = (rowObject) => {
  console.log("clicked delete purchase order");
}
const deleteEmployeeBtn = (rowObject) => {
  console.log("clicked send purchase order");
}

const filterByCategoryInDiagnosis = () => {
  console.log("clicked");
  categoryRepairBrand = new Object();

  // category eka click krama brands tika enw me query eken
  const categorynamefordiagnos = (JSON.parse(selectRepairCategory.value).name).replace(/\s/g, '').toLowerCase()
  listCategoryViseItemRepNames = ajaxGetRequest(`/${categorynamefordiagnos}/getlist`, categorynamefordiagnos)
  // listCategoryViseItemRepNames = ajaxGetRequest("/brand/listbrandbycategory/" + JSON.parse(selectRepairCategory.value).id) // meken check box generate wenna one
  console.log("json value", JSON.parse(selectRepairCategory.value).id);
  console.log("listBrandViseCategoryNames==>", listCategoryViseItemRepNames);
  //check boxes generate wenwa
  brandByCategory.innerHTML = ""
  listCategoryViseItemRepNames.forEach(element => {
    console.log(element);
    const div = document.createElement("div")
    div.className = "col-lg-4 form-check"

    const input = document.createElement("input")
    input.type = "checkbox"
    input.className = "form-check-input"
    input.id = "chk" + element.name

    input.onchange = function () {
      if (this.checked) {
        console.log("ss clicked", element.id);
        // selectedCategoryBrand me object ekata set wenw category id ekai brand id ekai
        const selectedCategoryBrand = {};
        selectedCategoryBrand.category_id = JSON.parse(selectRepairCategory.value);
        selectedCategoryBrand.brand_id = element
        diagnosisUpdate.itemname = element.name
        diagnosisUpdate.category = categorynamefordiagnos
        // categoryBrand.brand_id = element;
        // supplier.categoriesBrandsWithSuppliers.push(categoryBrand)
        repairitems.categoriesBrandsWithSuppliers.push(selectedCategoryBrand)
      } else {
        //uncheck ewa handle krnw
        repairitems.categoriesBrandsWithSuppliers.forEach((ele, ind) => {
          if (ele.category_id.id == JSON.parse(selectRepairCategory.value).id && ele.brand_id.id == element.id) {
            repairitems.categoriesBrandsWithSuppliers.splice(ind, 1);
          }
        })

      }
    }

    const label = document.createElement("label")
    label.id = "lbl" + element.name
    label.className = "form-check-label"
    label.innerText = element.name

    div.appendChild(label)
    div.appendChild(input)

    brandByCategory.appendChild(div)

  });
}

const addToRepairCateTable = () => {
  console.log(repairitems.categoriesBrandsWithSuppliers);
  displayProperties = [
    { property: getCategorySupplier, dataType: 'function' },
    { property: getBrandSupplier, dataType: 'function' },
  ]
  fillDataIntoPurcahseTable(repairDiagnosTable, repairitems.categoriesBrandsWithSuppliers, displayProperties, purchaseOrderBtn1, deletePurchBtn1, sendPurchBtn1, true)
  console.log("executed1");
  const categoryname = (JSON.parse(selectRepairCategory.value).name).replace(/\s/g, '').toLowerCase()
  listCategoryViseNames1 = ajaxGetRequest(`/${categoryname}/getlist`, categoryname)
  console.log(listCategoryViseNames1);
  // listCategoryViseBrandNames1 = ajaxGetRequest("/brand/listbrandbycategory/" + JSON.parse(selectRepairCategory.value).id) // meken check box generate wenna one

  listCategoryViseNames1.forEach(element => {
    const checkboxId = "chk" + element.name;
    const labelId = "lbl" + element.name
    const checkbox = document.getElementById(checkboxId);
    const lable1 = document.getElementById(labelId);
    if (checkbox) {
      checkbox.checked = false;
      lable1.innerText = ""
    }
  })
  selectRepairCategory.value = ""
  console.log("executed2");
}

const getCategorySupplier = (rowOb) => { return rowOb.category_id.name ?? "-"; }
const getBrandSupplier = (rowOb) => { return rowOb.brand_id.name ?? "-"; }

const purchaseOrderBtn1 = (rowObject) => {
  console.log("clicked purchase order");
}
const deletePurchBtn1 = (rowObject) => {
  console.log("clicked delete purchase order");
}
const sendPurchBtn1 = (rowObject) => {
  console.log("clicked send purchase order");
}

const getSelectedRepair = (value) => {

  duetoRepair = JSON.parse(value)
  const repairforDueRepair = ajaxGetRequest("/duerepair/getrepairbydue/" + JSON.parse(duetoRepair.repairid))
  console.log(repairforDueRepair);
  // diagnosisDueUpdate.repair_id = repairforDueRepair
  repairItemName1.value = duetoRepair.itemname
  repairItemCategory.value = duetoRepair.category
  repairItemStatus.value = duetoRepair.statusofrepair
  repairItemFault.value = duetoRepair.fault
  repairCustomerName.value = repairforDueRepair.customer_id.name
  repairCustomerPhone.value = repairforDueRepair.customer_id.phone
  getOtherRepairs()
}

const getUsedItemDetails = () => {
  serialObjectRepair = JSON.parse(repairUsedItemCode.value)
  console.log(serialObjectRepair);
  repairUsedItemCategory.value = serialObjectRepair.category_id.name
  repairUsedItemItemName.value = serialObjectRepair.itemname
}

const addUsedItemToSubTable = () => {
  repairItemName.value = repairItemName1.value
  repairCategoryName.value = repairItemCategory.value

  console.log("hi");
  const repairforDueRepair1 = ajaxGetRequest("/duerepair/getrepairbydue/" + JSON.parse(duetoRepair.repairid))
  let repairDetail = ajaxGetRequest("/repair/getlist/" + repairforDueRepair1.id)

  console.log(repairDetail);
  repairUpdate = repairDetail
  // usedItemsForRepair.id = 1
  usedItemsForRepair.itemname = repairUsedItemItemName.value
  usedItemsForRepair.serialno = serialObjectRepair.serialno
  usedItemsForRepair.unitprice = serialObjectRepair.itemprice
  usedItemsForRepair.category = serialObjectRepair.category_id.name
  console.log(usedItemsForRepair);
  // usedItemsForRepair.repair_id = repair
  duetoRepair.usedItems.push(usedItemsForRepair)
  repairUpdate.id = repairDetail.id
  console.log(repairUpdate);

  repairUsedItemCode.value = ""
  repairUsedItemCategory.value = ""
  repairUsedItemItemName.value = ""

  const displayProperties = [
    { property: getSerialNo, dataType: 'function' },
    { property: "itemname", dataType: 'String' },
    { property: "category", dataType: 'string' },
    { property: getItemPrice, dataType: 'string' },
  ]
  fillDataIntoDashBoardTable(repairUsedItemTable, duetoRepair.usedItems, displayProperties, editEmployeeBtn1,false)
  fillDataIntoDashBoardTable(repairUsedItemTable2, duetoRepair.usedItems, displayProperties, editEmployeeBtn1,false)



  //   displayProperties = [
  //     { property: getUsedItemCode, dataType: 'function' },
  //     { property: getUsedItemName, dataType: 'function' },
  //     { property: getUsedItemPrice, dataType: 'function' },
  //     { property: getUsedItemTotal, dataType: 'function' },
  // ]
  // fillDataIntoPurcahseTable(repairUsedItemTable, repairUpdate.usedItemsForRepair, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

}

const getSerialNo = (rowOb)=>{
  return rowOb?.serialno
}
const getItemPrice = (rowOb)=>{
  return rowOb?.unitprice
}

const handleUsedSubmit = ()=>{

}
const getOtherRepairs = () => {

  const getRepairsByCustomer = ajaxGetRequest(`/repair/getrepairbycustomer/${repairCustomerName.value}`)
  if (getRepairsByCustomer.length > 0) {

    fillDataIntoSelect(selectRepairsByCustomer, "Select Repairs", getRepairsByCustomer, 'id')
  } else {
    selectRepairsByCustomer.value = null
  }

}

const getUsedItemCode = (rowOb) => {
  let ItemUsedRepairCode = '';
  rowOb.forEach(element => {
    ItemUsedRepairCode = ItemUsedRepairCode + "<p class = 'working-status'>" + element.serialno + "</p>"
  })
  return ItemUsedRepairCode
}
const getUsedItemName = (rowOb) => {
  let ItemUsedRepairName = '';
  rowOb.forEach(element => {
    ItemUsedRepairName = ItemUsedRepairName + "<p class = 'working-status'>" + element.itemname + "</p>"
  })
  return ItemUsedRepairName
}
const getUsedItemPrice = (rowOb) => {
  let ItemUsedRepairPrice = '';
  rowOb.forEach(element => {
    ItemUsedRepairPrice = ItemUsedRepairPrice + "<p class = 'working-status'>" + element.unitprice + "</p>"
  })
  return ItemUsedRepairPrice
}
const getUsedItemTotal = (rowOb) => {
  return null;
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

const submitRepair = () => {
  repairUpdate.repairstatus = selectRepairStatus.value
  repairUpdate.technicalnote = repairTechnicalNote.value
  console.log(repairUpdate);
  // let id  = repair.id
  // let serverResponse2 = ajaxRequestBodyMethod(`/repair/${id}`, "PUT", repairUpdate);
  // console.log("serverResponse", serverResponse2);
  // repairPaymentUpdate = serverResponse2
  repairItemNamePayment.textContent = usedItemsForRepair.itemname
  repairTotalPrice.textContent = parseInt(1000)
  paymentOb.payment = parseInt(1000)
  // paymentOb.repair_id = repairUpdate
  repairUpdate.incomePayments = paymentOb
  console.log(repairUpdate);
  duetoRepair.statusofrepair = "Completeted"
  const repairforDueRepair2 = ajaxGetRequest("/duerepair/getrepairbydue/" + JSON.parse(duetoRepair.repairid))
  let repairDetail2 = ajaxGetRequest("/repair/getlist/" + repairforDueRepair2.id)
  let id2 = repairDetail2.id
  
  let serverResponse2 = ajaxRequestBodyMethod(`/repair`, "PUT", repairUpdate);
  console.log("serverResponse", serverResponse2);

  repairItemName1.value = ""
  repairItemCategory.value = ""
  repairItemStatus.value = ""
  repairItemFault.value = ""
  // selectPurchaseOrder1.value = ""
  repairItemFault.value = ""
  selectRepairStatus.value = ""
  repairTechnicalNote.value = ""
  repairUsedItemCode.value = ""
  repairUsedItemCategory.value = ""
  repairUsedItemItemName.value = ""

  refreshRepairForm();

}

const nextRepair = (repair1) => {
  console.log(repair1);
  repairItemName1.value = repair1.duetoRepair[0].itemname
  repairItemCategory.value = repair1.duetoRepair[0].category
  repairItemStatus.value = repair1.duetoRepair[0].statusofrepair
  repairItemFault.value = repair1.duetoRepair[0].fault
  repairTotalPrice.textContent += parseInt(1000)
  // repairCustomerName.value = repair1.customer_id.name
  // repairCustomerPhone.value = repair1.customer_id.phone
}

const submitPayment = () => {
  paymentOb.payment = parseInt(1000)
  // paymentOb.repair_id = repairUpdate
  repairUpdate.incomePayments = paymentOb
  console.log(repairUpdate);
  const repairforDueRepair2 = ajaxGetRequest("/duerepair/getrepairbydue/" + JSON.parse(duetoRepair.repairid))
  let repairDetail2 = ajaxGetRequest("/repair/getlist/" + repairforDueRepair2.id)
  let id2 = repairDetail2.id
  let serverResponse2 = ajaxRequestBodyMethod(`/repair`, "PUT", repairUpdate);
  console.log("serverResponse", serverResponse2);
}

const submitDiagnosis = () => {
  // diagnosisDueUpdate = JSON.parse(selectUrgentRepairs.value)
  diagnosisDueUpdate = duetoRepair
  // console.log(JSON.parse(selectRepairCategory.value).name);
  console.log(selectRepairCategory.value);
  console.log(repair);
  let id3 = repair.id
  console.log(id3);
  paymentOb.payment = parseInt(1000)
  // paymentOb.repair_id = repairUpdate
  repairUpdate.incomePayments = paymentOb
  diagnosisDueUpdate.statusofrepair = "Diagnoesed"
  // diagnosisUpdate.category = JSON.parse(selectRepairCategory.value).name
  diagnosisDueUpdate.diagnosedItems.push(diagnosisUpdate)

  repairUpdate.duetoRepair.push(diagnosisDueUpdate)
  // repairUpdate.usedItems.push(diagnosisUpdate) 
  console.log(diagnosisDueUpdate);
  console.log("created");
  let id7 = diagnosisDueUpdate.id
  let serverResponse3 = ajaxRequestBodyMethod(`/duerepair/${id7}`, "PUT", diagnosisDueUpdate);
  console.log(serverResponse3);

}