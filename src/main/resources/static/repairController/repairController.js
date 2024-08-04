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
  refreshRepairTable1()
  searchInRepairMainTable()
})
const refreshRepairForm = () => {
  purchRequest = new Object();
  requestedPrice = new Object();
  matchingRepairBarcode = ''
  matchingRepaiUsedItem = ''
  repairUpdate = new Object();
  repairUpdate1 = new Object();
  duetoRepair = new Object();
  duetoRepair1 = null
  serialObjectRepair = null
  paymentOb = new Object();
  repairitems = new Object();
  diagnosisUpdate = new Object();
  usedItemsObj = new Object();
  diagnosisDueUpdate = new Object();
  repairUpdate.usedItems = []
  duerepairShop1Array = []
  duerepairShop1Array2 = []
  duetoRepair.usedItems = []
  repairUpdate.diagnosisUpdate = []
  repairUpdate1.diagnosisUpdate = []
  diagnosisDueUpdate.usedItems = []
  diagnosisDueUpdate.diagnosedItems = []
  // repairUpdate.duetoRepair = []
  repairitems.categoriesBrandsWithSuppliers = []
  // usedItemsForRepair = new Object();
  const repairs = ajaxGetRequest("/repair/getlist")
  // const duerepair1 = ajaxGetRequest("/duerepair/getlist")
  const duerepairShop = ajaxGetRequest("/duerepair/getduebystatus/shop item")

  const duerepairShop1 = ajaxGetRequest("/duerepair/getduebystatusshopitemone/Lenovo Yoga")

  const duerepairNonShop = ajaxGetRequest("/duerepair/getduebystatus/non shop item")
  const duerepairUrgent = ajaxGetRequest("/duerepair/getduebystatus/urgent repair")
  const duerepairApproved = ajaxGetRequest("/duerepair/getduebystatusapproved")
  const duerepairProcessing = ajaxGetRequest("duerepair/getduebystatusforprocess")
  availableSerials = ajaxGetRequest("serialno/getavailablelist")
  availableBarcodes = ajaxGetRequest("duerepair/getrepairbybarcode")
  const categories = ajaxGetRequest("/category/getlist")
  // selectUrgentRepairsSpan.innerHTML = duerepairUrgent.length
  selectShopRepairsSpan.innerHTML = duerepairShop.length
  selectOutShopRepairsSpan.innerHTML = duerepairNonShop.length
  selectPurchaseOrderProcessSpan.innerHTML = duerepairProcessing.length
  console.log(repairs);

  duerepairShop1Array.push(duerepairShop1)
  console.log(duerepairShop1);

  // matchingRepairBarcode = availableBarcodes.find(item =>
  //   `${item.barcode} ${item.itemname} ${item.statusofrepair}` === value2
  // );
  // fillDataIntoSelect(repairUsedItemCode, "Select Serial No", availableSerials, 'barcode')
  // fillDataIntoSelect(selectUrgentRepairs, "Select Uregent Repairs", duerepairUrgent, 'fault')

  const array =  duerepairShop.forEach(item =>{
     ajaxGetRequest(`/duerepair/getduebystatusshopitemone/${item.itemname}`)
  })
  console.log(array);
  duerepairShop1Array2.push(array)
  console.log(duerepairShop1Array2);

  fillDataIntoSelect(selectShopRepairsItem, "Select Item", duerepairShop1Array, 'itemname')
  fillDataIntoSelect(selectShopRepairsCategory, "Select Category", duerepairShop, 'category')
  fillDataIntoSelect(selectShopRepairsReason, "Select Reason", duerepairShop, 'fault')
  fillDataIntoSelect(selectShopRepairsBarcode, "Select Barcode", duerepairShop, 'barcode')

  fillDataIntoSelect(selectOutShopRepairsItem, "Select Item", duerepairNonShop, 'itemname')
  fillDataIntoSelect(selectOutShopRepairsCategory, "Select Category", duerepairNonShop, 'category')
  fillDataIntoSelect(selectOutShopRepairsReason, "Select Reason", duerepairNonShop, 'fault')

  fillDataIntoSelect(selectPurchaseOrderProcessItem, "Select Item", duerepairProcessing, 'itemname')
  fillDataIntoSelect(selectPurchaseOrderProcessCategory, "Select Category", duerepairProcessing, 'category')
  fillDataIntoSelect(selectPurchaseOrderProcessReason, "Select Reason", duerepairProcessing, 'fault')

  fillDataIntoSelect(selectApprovedRepairsItem, "Select Item", duerepairApproved, 'itemname')
  fillDataIntoSelect(selectApprovedRepairsCategory, "Select Category", duerepairApproved, 'category')
  fillDataIntoSelect(selectApprovedRepairsReason, "Select Reason", duerepairApproved, 'fault')

  selectApprovedRepairsSpan.innerHTML = duerepairApproved.length
  serialNoListCountForRepair = ajaxGetRequest("/serialno/getlistwithoutnotnull")
  fillDataIntoSelect(selectRepairCategory, "Select Category", categories, 'name')
  // fillDataIntoSelect(repairItemBarcode, "Select Barcode", availableBarcodes, 'barcode')
  fillDataIntoDataList(dataListItemsForRepairs, availableBarcodes, 'barcode', 'itemname', 'statusofrepair')
  fillDataIntoDataList(dataListItemsForUsed, availableSerials, 'barcode', 'itemname', 'serialno')
}
// const reset = ()=>{
//   formRepair.reset()
// }

const refreshRepairTable1 = () => {
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
  fillDataIntoDashBoardTable(repairTab, repairDetails, displayProperties, editEmployeeBtn, true)
}

const filtering = (value1,value2,value3,value4)=>{
  let matchingrepair =''
  matchingrepair = duerepairShop.find(item =>
    `${item.barcode} ${item.itemname} ${item.statusofrepair}` ===  `${value1} ${value2} ${value3} ${value4}`
  );
  getSelectedRepair(matchingrepair)
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
    if (element?.statusofrepair === "Deleted") {

      DueRepairItemStatus = DueRepairItemStatus + "<p class = 'deleted-status'>" + element?.statusofrepair ? element?.statusofrepair : '-' + "</p>"
    }
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

const editEmployeeBtn = (rowOb) => {
  console.log("clicked purchase order");
  updateDueRepairObjTable = new Object();

  repairNoIdRepair.innerHTML = rowOb.repairno
  inputWarrentyCustNameRepairTable.value = rowOb.customer_id.name
  inputWarrentyCustPhoneRepairTable.value = rowOb.customer_id.phone
  rowOb.duetoRepair.forEach(elem => {
    updateDueRepairObjTable.id = elem?.id
    inputWarrentyCustDueserialRepairTable.value = elem?.serialno
    inputWarrentyCustDueCategoryRepairTable.value = elem?.category
    inputWarrentyCustDueItemnameRepairTable.value = elem?.itemname
    inputWarrentyCustDueFaultRepairTable.value = elem?.fault
    inputWarrentyCustDueTechNoteRepairTable.value = elem?.technicalnote
    inputWarrentyCustDueCostRepairTable.value = elem?.total
    let used = ''
    elem.usedItems.forEach(el=>{
      used = used + (el.itemname  +" "+ "["+el.serialno+'-serial no'+"]")
    })
    inputWarrentyCustDueCostRepairTableUsed.innerText = used
   
  })

  $('#staticBackdropforRepairTable').modal('show');

}

const button1 = ()=>{

}
const handleUpdateRepairTable = () => {
  let idRepairId = updateDueRepairObjTable.id
  let serverResponse2 = ajaxRequestBodyMethod(`/repair/${idRepairId}`, "PUT", updateDueRepairObjTable);
  console.log("serverResponse", serverResponse2);

}
// const updateEmployeeBtn = (rowObject) => {
//   console.log("clicked delete purchase order");
// }
// const deleteEmployeeBtn = (rowObject) => {
//   console.log("clicked send purchase order");
// }

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
        // let uprice = ajaxGetRequest("serialno/getitemprice/" + element?.name)
        let uprice = ajaxGetRequest("serialno/getitempriceforserial/" + element?.name)
        diagnosisUpdate.unitprice = uprice

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
  // console.log(value);
  addItemDetailsId.disabled = false

  // diagnosisId.disabled = false
  duetoRepair1 = JSON.parse(value)
  const repairforDueRepair = ajaxGetRequest("/duerepair/getrepairbydue/" + JSON.parse(duetoRepair1.repairid))
  console.log(repairforDueRepair);
  // diagnosisDueUpdate.repair_id = repairforDueRepair
  repairItemName1.value = duetoRepair1.itemname
  repairItemCategory.value = duetoRepair1.category
  repairItemStatus.value = duetoRepair1.statusofrepair
  repairItemFault.value = duetoRepair1.fault
  repairCustomerName.value = repairforDueRepair.customer_id.name
  repairCustomerPhone.value = repairforDueRepair.customer_id.phone
  if (duetoRepair1.diagnoserequire === "Require Diagnose") {
    requireDiagnosedId.innerHTML = "Require Diagnose"
    diagnosisId.disabled = false
  }

  getOtherRepairs()
}

const getSelectedBarcodeRepair = (value2) => {
  // console.log(value2);

  // Find the matching item in getAvailableBarcodes
  matchingRepairBarcode = availableBarcodes.find(item =>
    `${item.barcode} ${item.itemname} ${item.statusofrepair}` === value2
  );
  addItemDetailsId.disabled = false

  // duetoRepair1 = JSON.parse(value2)
  duetoRepair1 = matchingRepairBarcode
  const repairforDueRepair1 = ajaxGetRequest("/duerepair/getrepairbydue/" + JSON.parse(duetoRepair1.repairid))
  console.log(repairforDueRepair1);
  // diagnosisDueUpdate.repair_id = repairforDueRepair
  repairItemName1.value = duetoRepair1.itemname
  repairItemCategory.value = duetoRepair1.category
  repairItemStatus.value = duetoRepair1.statusofrepair
  repairItemFault.value = duetoRepair1.fault
  repairCustomerName.value = repairforDueRepair1.customer_id.name
  repairCustomerPhone.value = repairforDueRepair1.customer_id.phone
  if (duetoRepair1.diagnoserequire === "Require Diagnose") {
    requireDiagnosedId.innerHTML = "Require Diagnose"
    diagnosisId.disabled = false
  }

  getOtherRepairs()

}


const getUsedItemDetails = (value1) => {
  matchingRepaiUsedItem = availableSerials.find(item =>
    `${item.barcode} ${item.itemname} ${item.serialno}` === value1
  );

  if (matchingRepaiUsedItem) {

    // serialObjectRepair = JSON.parse(repairUsedItemCode.value)
    serialObjectRepair = matchingRepaiUsedItem
    console.log(serialObjectRepair);
    repairUsedItemCategory.value = serialObjectRepair.category_id.name
    repairUsedItemItemName.value = serialObjectRepair.itemname
  } else {
    console.log('No matching item found');

  }

}

const addUsedItemToSubTable = () => {
  usedItemsForRepair = new Object();
  repairItemName.value = repairItemName1.value
  repairCategoryName.value = repairItemCategory.value

  console.log("hi");
  const repairforDueRepair1 = ajaxGetRequest("/duerepair/getrepairbydue/" + JSON.parse(duetoRepair1.repairid))
  let repairDetail = ajaxGetRequest("/repair/getlist/" + repairforDueRepair1.id)

  // console.log(repairDetail);
  // repairUpdate = repairDetail
  // usedItemsForRepair.id = 1
  usedItemsForRepair.itemname = repairUsedItemItemName.value
  usedItemsForRepair.serialno = serialObjectRepair.serialno
  usedItemsForRepair.unitprice = serialObjectRepair.itemprice
  usedItemsForRepair.category = serialObjectRepair.category_id.name
  usedItemsForRepair.due_to_repairitem_id = serialObjectRepair
  console.log(usedItemsForRepair);
  // usedItemsForRepair.repair_id = repair
  duetoRepair.usedItems.push(usedItemsForRepair)
  // repairUpdate.id = repairDetail.id
  console.log(repairUpdate);

  repairUsedItemCode.value = ""
  repairUsedItemCategory.value = ""
  repairUsedItemItemName.value = ""

  const displayProperties = [
    { property: "serialno", dataType: 'string' },
    { property: "itemname", dataType: 'string' },
    { property: "category", dataType: 'string' },
    { property: "unitprice", dataType: 'string' },
  ]
  fillDataIntoDashBoardTable(repairUsedItemTable, duetoRepair.usedItems, displayProperties, editEmployeeBtn3, false)
  fillDataIntoDashBoardTable(repairUsedItemTable2, duetoRepair.usedItems, displayProperties, editEmployeeBtn2, false)




  //   displayProperties = [
  //     { property: getUsedItemCode, dataType: 'function' },
  //     { property: getUsedItemName, dataType: 'function' },
  //     { property: getUsedItemPrice, dataType: 'function' },
  //     { property: getUsedItemTotal, dataType: 'function' },
  // ]
  // fillDataIntoPurcahseTable(repairUsedItemTable, repairUpdate.usedItemsForRepair, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

}

const editEmployeeBtn3 = () => {

}
const editEmployeeBtn2 = () => {

}


const handleUsedSubmit = () => {

}

const getOtherRepairs = () => {

  try {
    // const getRepairsByCustomer = ajaxGetRequest(`/repair/getrepairbycustomer/${repairCustomerName.value}`)
    const getRepairsByCustomer = ajaxGetRequest(`/repair/getrepairbycustomer?phone=${repairCustomerPhone.value}&iddue=${duetoRepair1.id}`)
    //employees4 = ajaxGetRequest(`/reportdataworkingemployeechart/datevisesale?startdate=${selectDesignation1}&enddate=${selectEStatus1}`)

    if (getRepairsByCustomer.length > 0) {
      selectRepairsByCustomer.disabled = false
      fillDataIntoSelect(selectRepairsByCustomer, `Select ${repairCustomerName.value}'s Repairs`, getRepairsByCustomer, 'id')
    } else {
      selectRepairsByCustomer.value = null
    }

  } catch (error) {
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
  const repairforDueRepair2 = ajaxGetRequest("/duerepair/getrepairbydue/" + JSON.parse(duetoRepair1.repairid))
  let repairDetail2 = ajaxGetRequest("/repair/getlist/" + repairforDueRepair2.id)
  console.log(repairDetail2);
  let idr3 = repairDetail2.id
  repairUpdate = repairDetail2
  // duetoRepair =repairDetail2.duetoRepair
  // repairUpdate.repairstatus = selectRepairStatus.value
  duetoRepair.id = duetoRepair1.id
  duetoRepair.technicalnote = repairTechnicalNote.value
  console.log(repairUpdate);
  console.log(repairDetail2);
  console.log(duetoRepair);
  // let id  = repair.id
  // let serverResponse2 = ajaxRequestBodyMethod(`/repair/${id}`, "PUT", repairUpdate);
  // console.log("serverResponse", serverResponse2);
  // repairPaymentUpdate = serverResponse2
  repairItemNamePayment.textContent = usedItemsForRepair.itemname
  repairTotalPrice.textContent = parseInt(1000)
  // paymentOb.payment = parseInt(1000)
  // paymentOb.invoiceno = "Roooo1"
  // paymentOb.repair_id = repairUpdate
  // repairUpdate.incomePayments = paymentOb
  // duetoRepair.statusofrepair = "Completeted"

  // Update the existing DuetoRepair
  let existingDuetoRepair = repairDetail2.duetoRepair.find(dr => dr.id === duetoRepair.id);
  if (existingDuetoRepair) {
    if (repairPrice.value != null) {
      // existingDuetoRepair.total = parseFloat(repairPrice.value)
      existingDuetoRepair.total = parseFloat(requestedPrice.amount)
    }
    existingDuetoRepair.statusofrepair = "Completed";
    existingDuetoRepair.technicalnote = repairTechnicalNote.value;
    // Add new UsedItems to the existing DuetoRepair
    existingDuetoRepair.usedItems.push(...duetoRepair.usedItems);
  } else {
    // If not found, add the new DuetoRepair
    if (repairPrice.value != null) {
      duetoRepair.total = parseFloat(repairPrice.value).toFixed(2);
    }
    repairUpdate.duetoRepair.push(duetoRepair);
  }

  repairUpdate.repairstatus = selectRepairStatus.value;


  // repairUpdate.incomePayments = {
  //     payment: parseInt(1000),
  //     invoiceno: "Roooo1"
  // };

  // repairUpdate.duetoRepair.push(duetoRepair)
  console.log(repairUpdate);

  let serverResponse2 = ajaxRequestBodyMethod(`/repair/${idr3}`, "PUT", repairUpdate);
  console.log("serverResponse", serverResponse2);

  serverResponse2?.duetoRepair?.forEach(elem => {
    elem?.usedItems?.forEach(item => {

      let categoryname3 = (item?.category).replace(/\s/g, '').toLowerCase()
      ajaxGetRequest(`/${categoryname3}/getqty/${item?.itemname}`)
    })
  })
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
  repairItemName.value = ""
  repairCategoryName.value = ""
  selectRepairStatus.value = ""
  repairTechnicalNote.value = ""
  // selectUrgentRepairs.value = ""
  selectShopRepairs.value = ""
  selectOutShopRepairs.value = ""
  selectPurchaseOrderProcess.value = ""
  selectApprovedRepairs.value = ""
  // if (selectRepairsByCustomer.value == null) {
  repairCustomerName.value = ""
  repairCustomerPhone.value = ""
  repairPrice.value = ""
  // }
  refreshRepairForm();
  refreshRepairTable1()
  // meken form close wela table eka open wenwa
  const table = document.getElementById("empTable");
  const form = document.getElementById("empForm");

  // Animate table disappearance
  form.style.opacity = 1; // Ensure opacity is initially 1
  form.style.transition = "opacity 1.5s ease-out";
  form.style.display = "none"; // Trigger the animation

  // Delay form appearance slightly
  setTimeout(function () {
    table.style.opacity = 0;
    table.style.display = "block";
    table.style.transition = "opacity 1.5s ease-in";
    table.style.opacity = 1; // Gradually fade in
  }, 100); // Adjust the delay as needed


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

// const submitPayment = () => {
//   paymentOb.payment = parseInt(1000)
//   // paymentOb.repair_id = repairUpdate
//   repairUpdate.incomePayments = paymentOb
//   console.log(repairUpdate);
//   const repairforDueRepair2 = ajaxGetRequest("/duerepair/getrepairbydue/" + JSON.parse(duetoRepair.repairid))
//   let repairDetail2 = ajaxGetRequest("/repair/getlist/" + repairforDueRepair2.id)
//   let id2 = repairDetail2.id
//   let serverResponse2 = ajaxRequestBodyMethod(`/repair`, "PUT", repairUpdate);
//   console.log("serverResponse", serverResponse2);
// }

const submitDiagnosis = () => {
  let dueRepairDetail2 = ajaxGetRequest("/duerepair/getlist/" + JSON.parse(duetoRepair1.id))
  // diagnosisDueUpdate = JSON.parse(selectUrgentRepairs.value)
  // diagnosisDueUpdate = duetoRepair
  // console.log(JSON.parse(selectRepairCategory.value).name);
  console.log(selectRepairCategory.value);
  console.log(repair);
  let id3 = repair.id
  console.log(id3);
  paymentOb.payment = parseInt(1000)
  // paymentOb.repair_id = repairUpdate

  // repairUpdate1.incomePayments = paymentOb
  diagnosisDueUpdate = dueRepairDetail2
  diagnosisDueUpdate.id = dueRepairDetail2.id

  diagnosisDueUpdate.statusofrepair = "Diagnoesed"
  // diagnosisUpdate.category = JSON.parse(selectRepairCategory.value).name
  // diagnosisUpdate.due_to_repairitem_id = duetoRepair1
  diagnosisDueUpdate.diagnosedItems.push(diagnosisUpdate)


  // repairUpdate1.duetoRepair.push(diagnosisDueUpdate)
  // repairUpdate.usedItems.push(diagnosisUpdate) 
  console.log(diagnosisDueUpdate);
  console.log("created");
  let id7 = duetoRepair1.id
  let serverResponse3 = ajaxRequestBodyMethod(`/duerepair/${id7}`, "PUT", diagnosisDueUpdate);
  console.log(serverResponse3);
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
  repairItemName.value = ""
  repairCategoryName.value = ""
  selectRepairStatus.value = ""
  repairTechnicalNote.value = ""
  // selectUrgentRepairs.value = ""
  selectShopRepairs.value = ""
  selectOutShopRepairs.value = ""
  selectPurchaseOrderProcess.value = ""
  selectApprovedRepairs.value = ""
  // if (selectRepairsByCustomer.value == null) {
  repairCustomerName.value = ""
  repairCustomerPhone.value = ""
  repairPrice.value = ""
  // }
  refreshRepairForm();

}

const handlePRequestSubmit = () => {
  let serverResponse = ajaxRequestBodyMethod("/purchaseorderrequest", "POST", purchRequest);
  console.log(serverResponse);
}

const searchInRepairMainTable = () => {
  const searchInput = document.getElementById('searchRepairMainInput');
  const table = document.getElementById('repairTab');
  const tbody = table.getElementsByTagName('tbody')[0];
  const rows = tbody.getElementsByTagName('tr');

  searchInput.addEventListener('keyup', function () {
    const filter = searchInput.value.toLowerCase();
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      let rowContainsFilter = false;

      for (let j = 0; j < cells.length; j++) {
        if (cells[j].innerText.toLowerCase().includes(filter)) {
          rowContainsFilter = true;
          break;
        }
      }
      rows[i].style.display = rowContainsFilter ? '' : 'none';
    }
  });
}