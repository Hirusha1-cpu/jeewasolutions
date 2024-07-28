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
  //fill data to Reorder part card
  fillDataIntoReorderTable()
  //fill data to return part card
  fillDataIntoReturnTable()
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
  }
  if (cleanString === "Assistant Manager") {
    customerDashboard.classList.add("d-none")
    prequsetDashboard.classList.remove("d-none")
    // saleDashboard.classList.remove("d-none")
    grnDashboard.classList.remove("d-none")
    // repairDashboard.classList.add("d-none")
    // reorderDashboard.classList.add("d-none")
    // returnDashboard.classList.add("d-none")
  } else {
    // customerDashboard.classList.remove("d-none")
    // repairDashboard.classList.remove("d-none")
    // reorderDashboard.classList.remove("d-none")
    // returnDashboard.classList.remove("d-none")
  }
  // if (cleanString === "Technician") {
  //   customerDashboard.classList.add("d-none")
  //   repairDashboard.classList.add("d-none")
  //   reorderDashboard.classList.add("d-none")
  //   returnDashboard.classList.add("d-none")
  // } else {
  //   customerDashboard.classList.remove("d-none")
  //   repairDashboard.classList.remove("d-none")
  //   reorderDashboard.classList.remove("d-none")
  //   returnDashboard.classList.remove("d-none")
  // }
  // if (cleanString === "Cashier") {
  //   customerDashboard.classList.add("d-none")
  //   repairDashboard.classList.add("d-none")
  //   reorderDashboard.classList.add("d-none")
  //   returnDashboard.classList.add("d-none")
  // } else {
  //   customerDashboard.classList.remove("d-none")
  //   repairDashboard.classList.remove("d-none")
  //   reorderDashboard.classList.remove("d-none")
  //   returnDashboard.classList.remove("d-none")
  // }
  // if (cleanString === "Data Entry Operator") {
  //   customerDashboard.classList.add("d-none")
  //   repairDashboard.classList.add("d-none")
  //   reorderDashboard.classList.add("d-none")
  //   returnDashboard.classList.add("d-none")
  // } else {
  //   customerDashboard.classList.remove("d-none")
  //   repairDashboard.classList.remove("d-none")
  //   reorderDashboard.classList.remove("d-none")
  //   returnDashboard.classList.remove("d-none")
  // }

  // Prepare data for the chart
  
  
  

  // for (const invoice of invoices) {
  //   customerNames.push(invoice.customer_id.name); // Extract customer name
  //   itemCounts.push(invoice.salesHasSerials.length); // Count serial numbers
  // }


  // for (const invoice of weeklysale) {
  //   customerNames.push(invoice.itemcount); // Extract customer name
  //   itemCounts.push(invoice.categoryname); // Count serial numbers    
  // }
  // console.log(time.type);

  // if (time.type === "1") {
    
  //   for (const invoice of monthlysale) {
  //   customerNames.push(invoice.itemcount); // Extract customer name
  //   itemCounts.push(invoice.categoryname); // Count serial numbers
  //   }
  // }else{
  //   for (const invoice of weeklysale) {
  //     customerNames.push(invoice.itemcount); // Extract customer name
  //     itemCounts.push(invoice.categoryname); // Count serial numbers    
  //     }
  // }



  // Create the chart with the prepared data
  // const updateChart = (data) => {
  //   if (data === 1) {
  //     for (const invoice of monthlysale) {
  //       customerNames.push(invoice.itemcount); // Extract customer name
  //       itemCounts.push(invoice.categoryname); // Count serial numbers
  //       }
  //   } else {
  //     for (const invoice of weeklysale) {
  //       customerNames.push(invoice.itemcount); // Extract customer name
  //       itemCounts.push(invoice.categoryname); // Count serial numbers    
  //       }
  //   }
  //   if (chartInstance) {
  //     chartInstance.destroy();
  //   }
  //   chartInstance =  new Chart(ctx, {
  //      type: 'bar',
  //      data: {
  //        labels: customerNames,
  //        datasets: [{
  //          label: 'Item Count',
  //          data: itemCounts,
  //          borderWidth: 1
  //        }]
  //      },
  //      options: {
  //        scales: {
  //          y: {
  //            beginAtZero: true,
  //            title: {
  //              display: true,
  //              text: 'Sales'
  //            }
  //          },
  //          x: {
  //            title: {
  //              display: true,
  //              text: 'Time'
  //            }
  //          }
  //        }
  //      }
  //    });
  // }

  updateChart(monthlysale);


  
};

const updateChart = (data,fieldValue) => {
  
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
 

  chartInstance =  new Chart(ctx, {
     type: 'line',
     data: {
       labels: customerNames,
       datasets: [{
         label: 'Sales',
         data: itemCounts,
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
    updateChart(monthlysale,fieldValue);
  } else if (fieldValue === '2') {
    updateChart(weeklysale,fieldValue);
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
  return  `<p class="working-status">${iqty}</p>`
}

const handleClickDash = (item)=>{
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

const fillDataIntoReturnTable = ()=>{
  const returnItems = ajaxGetRequest("duerepair/getduebystatusstatusofrepair/Return To Company")
  const displayProperties = [
    { property: getReturnname, dataType: 'function' },
    { property: getSerial, dataType: 'function' },
  ]
  fillDataIntoDashBoardTable(returnId, returnItems, displayProperties, editEmployeeBtn0, false)

}
const getReturnname = (rowOb)=>{
  return rowOb?.itemname
}
const getSerial = (rowOb)=>{
  
  return `<p class="working-status">${rowOb?.serialno}</p>`
}

const handleReturn = ()=>{
  window.location.href = "/invoice?showTable=true";
  // window.location.href = "/invoice";
  // const table = document.getElementById("empTable")
  // table.style.display = "block";
  // const form = document.getElementById("empForm")
  // form.style.display = "none"
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


