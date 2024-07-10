window.addEventListener('load', () => {
    refreshDashboard();
    // refreshGrnTable();

})

const refreshDashboard = () => {
  // $('#empAttendence').DataTable({
  //   responsive: true
  // });
  const ctx = document.getElementById('myChart');

  // Fetch invoices (assuming you have a working `ajaxGetRequest`)
  const invoices = ajaxGetRequest("/invoice/getlist");
  const getRole = ajaxGetRequest1("/dashboard/getauth");
  let cleanString = getRole.replace(/[\[\]]/g, ''); // g for glaobal, apply for all and '' replaces with []
  // Trim any extra spaces (if needed)
  cleanString = cleanString.trim(); // trim for remove spaces
  console.log(cleanString);
  if (cleanString== "Manager") {
    dddd.classList.add("d-none")
  }else{
    dddd.classList.remove("d-none")
  }

  // Prepare data for the chart
  const customerNames = [];
  const itemCounts = [];

  for (const invoice of invoices) {
    customerNames.push(invoice.customer_id.name); // Extract customer name
    itemCounts.push(invoice.salesHasSerials.length); // Count serial numbers
  }

  // Create the chart with the prepared data
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: customerNames,
      datasets: [{
        label: 'Item Count',
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
            text: 'Number of Items'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Customer'
          }
        }
      }
    }
  });
  const notificationElement = document.getElementById("notificationId");
notificationElement.innerText = "12";
};

