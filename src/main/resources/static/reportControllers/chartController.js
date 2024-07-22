window.addEventListener('load',()=>{
    

    const ctx1 = document.getElementById('myChartView');
    
    // Prepare data for the chart
    const customerNames1 = [];
    const itemCounts1 = [];
    
    const invoices = ajaxGetRequest("/invoice/getlist");
    for (const invoice of invoices) {
        customerNames1.push(invoice.customer_id.name); // Extract customer name
        itemCounts1.push(invoice.salesHasSerials.length); // Count serial numbers
    }
    
    // Create the chart with the prepared data
     myChartView = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: customerNames1,
            datasets: [{
                label: 'Item Count',
                data: itemCounts1,
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
})


const printChart = () => {
    viewChart.src = myChartView.toBase64Image();
    let newwindow = window.open();
    newwindow.document.write(viewChart.outerHTML + "<script>viewChart.style.removeProperty('display');</script>");

    setTimeout(function () {
        newwindow.print();
        newwindow.close();
    }, 500)
}

