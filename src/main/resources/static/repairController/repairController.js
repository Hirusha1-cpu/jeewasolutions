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
    { property: 'repairstatus', dataType: 'string' },
    { property: getItemRepairPaidStatus, dataType: 'function' }
  ]
  fillDataIntoTable(repairTab, repairDetails, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)

}

const getItemRepairName = (rowObject) => {
  console.log(rowObject);
  let DueRepairItemName = '';
  rowObject.duetoRepair.forEach(element => {
    DueRepairItemName = DueRepairItemName + "<p class = 'working-status'>" + element?.itemname ? element?.itemname  : "-" + "</p>"
  })
  return DueRepairItemName
}
const getItemRepairStatus = (rowObject) => {
  let DueRepairItemStatus = '';
  rowObject.duetoRepair.forEach(element => {
    DueRepairItemStatus = DueRepairItemStatus + "<p class = 'working-status'>" + element?.statusofrepair ? element?.statusofrepair  : "-" + "</p>"
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


const refreshRepairForm = () => {
  repairUpdate = new Object();
  paymentOb = new Object();
  repairUpdate.usedItems = []
  usedItemsForRepair = new Object();
  const repairs = ajaxGetRequest("/repair/getlist")
  console.log(repairs);
  fillDataIntoSelect2(selectUrgentRepairs, "Select Uregent Repairs", repairs, 'fault')
  serialNoListCountForRepair = ajaxGetRequest("/serialno/getlistwithoutnotnull")
  fillDataIntoSelect(repairUsedItemCode, "Select SerialNumber List", serialNoListCountForRepair, 'serialno')
}

const getSelectedRepair = () => {
  repair = JSON.parse(selectUrgentRepairs.value)
  console.log(repair);
  repairItemName1.value = repair.duetoRepair[0].itemname
  repairItemCategory.value = repair.duetoRepair[0].category
  repairItemStatus.value = repair.duetoRepair[0].statusofrepair
  repairItemFault.value = repair.duetoRepair[0].fault
  repairCustomerName.value = repair.customer_id.name
  repairCustomerPhone.value = repair.customer_id.phone
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
  let repairDetail = ajaxGetRequest("/repair/getlist/" + repair.id)
  console.log(repairDetail);
  repairUpdate = repairDetail
  usedItemsForRepair.id = 1
  usedItemsForRepair.itemname = repairUsedItemItemName.value
  usedItemsForRepair.serialno = serialObjectRepair.serialno
  usedItemsForRepair.unitprice = serialObjectRepair.itemprice
  usedItemsForRepair.category = serialObjectRepair.category_id.name
  console.log(usedItemsForRepair);
  // usedItemsForRepair.repair_id = repair
  repairUpdate.usedItems.push(usedItemsForRepair)
  repairUpdate.id = repair.id
  console.log(repairUpdate);

  //   displayProperties = [
  //     { property: getUsedItemCode, dataType: 'function' },
  //     { property: getUsedItemName, dataType: 'function' },
  //     { property: getUsedItemPrice, dataType: 'function' },
  //     { property: getUsedItemTotal, dataType: 'function' },
  // ]
  // fillDataIntoPurcahseTable(repairUsedItemTable, repairUpdate.usedItemsForRepair, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

}
const getOtherRepairs = () => {

  const getRepairsByCustomer = ajaxGetRequest(`/repair/getrepairbycustomer/${repairCustomerName.value}`)
  if (getRepairsByCustomer.length > 0) {
    
    fillDataIntoSelect(selectRepairsByCustomer, "Select Repairs", getRepairsByCustomer, 'id')
  }else{
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
  let id2 = repair.id
  let serverResponse2 = ajaxRequestBodyMethod(`/repair/${id2}`, "PUT", repairUpdate);
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
  repairTotalPrice.textContent = parseInt(1000)

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
  let id2 = repair.id
  let serverResponse2 = ajaxRequestBodyMethod(`/repair/${id2}`, "PUT", repairUpdate);
  console.log("serverResponse", serverResponse2);
}