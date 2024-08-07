window.addEventListener('load', () => {
  refreshDashboard();
  // refreshGrnTable();
})
let chartInstance;
const refreshDashboard = () => {

  //fill data to customer card
  fillDataToCustomer()
  //fill data to Repair card
  fillDueTable()
  fillDueTable2()
  //fill data to Reorder part card
  fillDataIntoReorderTable()
  //fill data to return part card
  fillDataIntoReturnTable()

  fillDataIntoItemCateTable()

  fillDateIntoTechnicianTable()
  // $('#empAttendence').DataTable({
  //   responsive: true
  // });
  const ctx = document.getElementById('myChart');

  // Fetch invoices (assuming you have a working `ajaxGetRequest`)
  const invoices = ajaxGetRequest("/invoice/getlist");
  const monthlysale = ajaxGetRequest("reportdataworkingemployeechart/duerepaircountmonth")
  const weeklysale = ajaxGetRequest("reportdataworkingemployeechart/duerepaircountweek")

  const getRole = ajaxGetRequest1("/dashboard/getauth");

  console.log(getRole);
  let cleanString = getRole.replace(/[\[\]]/g, ''); // g for glaobal, apply for all and '' replaces with []
  // Trim any extra spaces (if needed)
  cleanString = cleanString.trim(); // trim for remove spaces
  console.log(cleanString);
  // grnDashboard
  // saleDashboard

  //check privileges
  if (cleanString === "Admin") {
    saleDashboard.classList.remove("d-none")
    customerDashboard.classList.remove("d-none")
    repairDashboard.classList.remove("d-none")
    reorderDashboard.classList.remove("d-none")
    returnDashboard.classList.remove("d-none")
  }
  else if (cleanString === "Assistant Manager") {
    repairDashboard.classList.remove("d-none")
    reorderDashboard.classList.remove("d-none")
    returnDashboard.classList.remove("d-none")
    grnDashboard1.classList.remove("d-none")
    requestOrderDashboard.classList.remove("d-none")

  }
  else if (cleanString === "Cashier") {
    gotosalesId.classList.remove("d-none")
    // addarepairId.classList.remove("d-none")
    viewItemsId.classList.remove("d-none")

  }else if(cleanString === "Technician") {
    viewItemsIdForTechnician.classList.remove("d-none")
    repairDashboardForTechnician.classList.remove("d-none")

  }
 

  updateChart(monthlysale, '', 'doughnut');



};

const updateChart = (data, fieldValue, charttype) => {
  // const colors = [
  //   { background: 'rgba(255, 99, 132, 0.2)', border: 'rgb(255, 99, 132)' },
  //   { background: 'rgba(255, 159, 64, 0.2)', border: 'rgb(255, 159, 64)' },
  //   { background: 'rgba(255, 205, 86, 0.2)', border: 'rgb(255, 205, 86)' },
  //   { background: 'rgba(75, 192, 192, 0.2)', border: 'rgb(75, 192, 192)' },
  //   { background: 'rgba(54, 162, 235, 0.2)', border: 'rgb(54, 162, 235)' },
  //   { background: 'rgba(153, 102, 255, 0.2)', border: 'rgb(153, 102, 255)' },
  //   { background: 'rgba(201, 203, 207, 0.2)', border: 'rgb(201, 203, 207)' }
  // ];

  // const labels = Utils.months({ count: 7 });

  // const datasets = colors.map((color, index) => ({
  //   label: `Color ${index + 1}`, // You can customize the label format here
  //   data: [65, 59, 80, 81, 56, 55, 40][index], // Assuming your data points match the color array
  //   backgroundColor: color.background,
  //   borderColor: color.border,
  //   borderWidth: 1
  // }));

  // const data = {
  //   labels: labels,
  //   datasets: datasets
  // };

  if (chartInstance) {
    chartInstance.destroy();
  }
  const ctx = document.getElementById('myChart');
  const customerNames = [];
  const itemCounts = [];

  for (const invoice of data) {
    if (fieldValue === '2') {
      const weekLabel = `${new Date(invoice.week_start).toLocaleDateString()} - ${new Date(invoice.week_end).toLocaleDateString()}`;

      customerNames.push(weekLabel); // Extract customer name
      itemCounts.push(invoice.categoryname); // Count serial numbers

    } else {

      customerNames.push(invoice.itemcount); // Extract customer name
      itemCounts.push(invoice.categoryname); // Count serial numbers
    }
    // const weekLabel = `${new Date(item.week_start).toLocaleDateString()} - ${new Date(item.week_end).toLocaleDateString()}`;

  }


  chartInstance = new Chart(ctx, {
    //  type: `${charttype}`,
    type: `pie`,
    data: {
      labels: customerNames,
      datasets: [{
        label: '',
        data: itemCounts,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(255, 105, 80)',
          'rgb(255, 200, 16)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Sales'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Time'
          }
        }
      }
    }
  });
}


// Function to handle select change
const selectFieldValidation9 = (fieldId) => {
  const monthlysale = ajaxGetRequest("reportdataworkingemployeechart/duerepaircountmonth")
  const weeklysale = ajaxGetRequest("reportdataworkingemployeechart/duerepaircountweek")
  const fieldValue = fieldId.value;

  if (fieldValue === '1') {
    updateChart(monthlysale, fieldValue);
  } else if (fieldValue === '2') {
    updateChart(weeklysale, fieldValue);
  }
};
const selectFieldValidationChart = (fieldId) => {
  const fieldValue = fieldId.value;

  if (fieldValue === 'bar') {

    updateChart('', '', 'bar');
  } else if (fieldValue === 'doughnut') {
    updateChart('', '', 'doughnut');
  }
  else if (fieldValue === 'pie') {
    updateChart('', '', 'pie');
  }
  else if (fieldValue === 'polarArea') {
    updateChart('', '', 'polarArea');
  }
  else if (fieldValue === 'radar') {
    updateChart('', '', 'radar');
  }
  else if (fieldValue === 'scatter') {
    updateChart('', '', 'scatter');
  }
};

const fillDataToCustomer = () => {
  customer = ajaxGetRequest('/reportdataworkingemployeechart/customertypedata')
  const displayProperties = [
    { property: "categoryname", dataType: 'string' },
    { property: getitemcount, dataType: 'function' },
  ]
  fillDataIntoDashBoardTable(customerTypeTable, customer, displayProperties, editEmployeeBtn1, false)

}
const getitemcount = (rowOb) => {
  return `<p class="working-status">${rowOb.itemcount}</p>`
}
const editEmployeeBtn1 = (rowOb) => {

}

const handleCustomer = () => {
  window.location.href = "/customer";
}

const fillDueTable = () => {
  dueRepair = ajaxGetRequest('/reportdataworkingemployeechart/duerepaircount')
  const displayProperties = [
    { property: "categoryname", dataType: 'string' },
    { property: getitemcount, dataType: 'function' },
  ]
  fillDataIntoDashBoardTable(dueRepId, dueRepair, displayProperties, editEmployeeBtn1, false)

}
const fillDueTable2 = () => {
  dueRepair = ajaxGetRequest('/reportdataworkingemployeechart/duerepaircount')
  const displayProperties = [
    { property: "categoryname", dataType: 'string' },
    { property: getitemcount, dataType: 'function' },
  ]
  fillDataIntoDashBoardTable(dueRepIdForTechnician, dueRepair, displayProperties, editEmployeeBtn1, false)

}


const handleDue = () => {
  window.location.href = "/repair";
}

const fillDataIntoReorderTable = () => {
  const categoryNames = ajaxGetRequest('category/getlist');
  const arrayListCate = (categoryNames.map((categoryName) => {
    console.log(categoryName);
    let categoriesItems1 = ajaxGetRequest(`/${categoryName.name}/getlist`);
    console.log(categoriesItems1);
    let getReorderItems = ajaxGetRequest(`/${categoryName.name}/getreorderreached`)
    console.log(getReorderItems);
    return {
      category_name: categoryName.name,
      items: categoriesItems1.map(categoryItem => {
        return {
          qty: categoryItem.qty,
          name: categoryItem.name,
          purchase_price: categoryItem.purchase_price,
          category_name: categoryItem.category_id?.name,
          reorderstatus: true,
          reorderqty: categoryItem.reorder_point
        }
      })
    }
  }))

  const displayProperties = [
    { property: getname, dataType: 'function' },
    { property: getqty, dataType: 'function' },
  ]
  fillDataIntoDashBoardTable(reorderId, arrayListCate, displayProperties, editEmployeeBtn0, false)

}


const getname = (rowOb) => {
  return rowOb.category_name
}
// const getname = (rowOb) => {
//   let iname = ''
//   rowOb?.items.forEach((item) => {

//     iname = iname + (`<button type="button" onclick="handleClickDash(${JSON.stringify(item.id)})" class = 'deleted-status'>  ${item.name}  </button>`)

//   })
//   return iname
// }
const getqty = (rowOb) => {
  let iqty = 0
  rowOb?.items.forEach((item) => {

    iqty = iqty + item.qty

  })
  return `<p class="working-status">${iqty}</p>`
}

const handleClickDash = (item) => {
  // If item is a string, parse it back to an object
  if (typeof item === 'string') {
    item = JSON.parse(item);
  }
  console.log(item);
}

const editEmployeeBtn0 = (rowOb) => {

}

const handleReorder = () => {
  window.location.href = "/inventory";
}

const fillDataIntoReturnTable = () => {
  const returnItems = ajaxGetRequest("duerepair/getduebystatusstatusofrepair/Return To Company")
  const displayProperties = [
    { property: getReturnname, dataType: 'function' },
    { property: getSerial, dataType: 'function' },
  ]
  fillDataIntoDashBoardTable(returnId, returnItems, displayProperties, editEmployeeBtn0, false)

}
const getReturnname = (rowOb) => {
  return rowOb?.itemname
}
const getSerial = (rowOb) => {

  return `<p class="working-status">${rowOb?.serialno}</p>`
}

const handleReturn = () => {
  window.location.href = "/invoice?showTable=true";
  // window.location.href = "/invoice";
  // const table = document.getElementById("empTable")
  // table.style.display = "block";
  // const form = document.getElementById("empForm")
  // form.style.display = "none"
}

const fillDataIntoItemCateTable = () => {
  const categoriesforCashier = ajaxGetRequest("category/getlist")
  const displayProperties = [
    { property: getCatName, dataType: 'function' },
  ]
  fillDataIntoDashBoardTable(viewItemsIdTable, categoriesforCashier, displayProperties, editEmployeeBtnCash, false)
  addCategoryClickListeners()

}
const getCatName = (rowOb) =>{
  // return  `<p class="yellow-status" onclick="handleCate()">${rowOb?.name}</p>`
  return `<button onclick="handleObj(${rowOb.id})" class="btn yellow-status" data-category-name="${rowOb.name}" data-category-id="${rowOb.id}">${rowOb.name}</button>`
}
const editEmployeeBtnCash = () => {
  
}
const handleObj = (rowOb)=>{
  console.log("created -1");
  console.log(rowOb);
}

// Call this function after the table is populated
const addCategoryClickListeners = () => {
  document.querySelectorAll('.yellow-status').forEach(button => {
    button.addEventListener('click', (event) => {
      const categoryName = event.target.getAttribute('data-category-name');
      const categoryId = event.target.getAttribute('data-category-id');
      handleCate(categoryName, categoryId);
    });
  });
}

const handleCate = (name, id) => {
  cashierCateDashboard.classList.remove("d-none")
  console.log('Category Name:', name);
  console.log('Category ID:', id);
  const cat = ajaxGetRequest(`${name}/getlist`)
  console.log(cat);
  handleCateTable(cat)
}

const handleCateTable = (cat) => {
  const displayProperties = [
    // { property: getCatNameForCate, dataType: 'function' },
    { property: getItemNamesForCate, dataType: 'function' },
  ]
  fillDataIntoDashBoardTable(cashierCateTable, cat, displayProperties, editEmployeeBtnCash, false)
}

// const getCatNameForCate = (rowOb)=>{
//   console.log(rowOb);
//   return `<p class="working-status" onclick="window.location.href='/${rowOb.category_id.name}/getlist''>${rowOb?.category_id.name}</p>`
// }
const getItemNamesForCate = (rowOb)=>{
  cateH5.innerHTML = rowOb.category_id.name
  return `<p class="working-status" onclick="window.location.href='/${rowOb.category_id.name}'">${rowOb?.name}</p>`
  
}

const handleCateH5 = ()=>{
  window.location.href=`/${cateH5.innerHTML}`
}

const fillDateIntoTechnicianTable = ()=>{
  const categoriesforTechnician = ajaxGetRequest("category/getlist")
  const displayProperties = [
    { property: getCatName, dataType: 'function' },
  ]
  fillDataIntoDashBoardTable(viewItemsIdTableForTechnician, categoriesforTechnician, displayProperties, editEmployeeBtnCash, false)
  addCategoryClickListeners()
}

const refreshProfileEdit = () => {
  loggedUser = ajaxGetRequest("/loggeduser")
  console.log(loggedUser);
  // inputUsernameSet.value = "www"
  console.log("kkkkk");
  inputUsernameSet.value = loggedUser.username;
  inputEmailSet.value = loggedUser.email

  // if (loggedUser.graphic_photo == null) {
  //   imageGraphic.src = "resourcesT/assets/jeewa-high-resolution-logo-white-transparent.png"
  // } else {
  //   imageGraphic.src = atob(loggedUser.graphic_photo)
  //   console.log("executed");
  // }

}



const submitUserSettings = () => {
  let serverResponse = ajaxRequestBodyMethod("/changeuser", "PUT", loggedUser)
  if (serverResponse == "OK") {
    alert("User profile change successfully...!")
    window.location.assign("/logout")
  } else {
    alert("Delete not succefully  .." + serverResponse)
  }

}

const passwordsValidation = () => {
  if (inputPasswordSet.value != "") {
    if (inputPasswordSet.value == inputRePasswordSet.value) {
      inputPasswordSet.style.border = "2px solid green";
      inputRePasswordSet.style.border = "2px solid green";
      loggedUser.password = inputPasswordSet.value;
    } else {
      inputPasswordSet.style.border = "2px solid red";
      inputRePasswordSet.style.border = "2px solid red";
      loggedUser.password = null;
    }

  } else {
    alert("Please fill password")
    inputPasswordSet.style.border = "2px solid red";
    inputRePasswordSet.style.border = "2px solid red";
    loggedUser.password = null;
  }
}


