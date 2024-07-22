window.addEventListener('load', () => {
    // refreshReportTable();
    // refreshEmployeeForm();
    designations = ajaxGetRequest("/designation/getlist")
    fillDataIntoSelect(selectDesignation1, "Select Designation", designations, 'name')

    empstatus = ajaxGetRequest("empstatus/getlist")
    fillDataIntoSelect(selectEStatus1, "Select Emp status", empstatus, 'name')

    


})

const refreshReportTable = (employees2) => {
    // employees1 = ajaxGetRequest('/reportdataworkingemployee')
    const displayProperties = [
        { property: 'empno', dataType: 'string' },
        { property: 'fullname', dataType: 'string' },
        { property: 'nic', dataType: 'string' },
        { property: 'mobile', dataType: 'string' },
        { property: 'email', dataType: 'string' },
        { property: getEmployeeStatus, dataType: 'function' },
        { property: getEmployeeDesignation, dataType: 'function' },
    ]

    fillDataIntoTable(empTabReport, employees2, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, false)

    // let userPrivilegeforemployee = ajaxGetRequest("/privilege/bylogedusermodule/employee")
    // if (!userPrivilegeforemployee.insert) {
    //     empaddbtn.classList.add("d-none");
    // } else {
    //     empaddbtn.classList.remove("d-none");
    // }

   
}
const refreshReportCategoryTable = (id,employees3) => {
    console.log(id,employees3);
    // employees1 = ajaxGetRequest('/reportdataworkingemployee')
    const displayProperties = [
        
        // { property: getCategory, dataType: 'function' },
        // { property: getCount, dataType: 'function' },
        { property: "categoryname", dataType: 'string' },
        { property: "itemcount", dataType: 'string' },
    ]

    fillDataIntoTable(id, employees3, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, false)

    console.log("exectted");
    // let userPrivilegeforemployee = ajaxGetRequest("/privilege/bylogedusermodule/employee")
    // if (!userPrivilegeforemployee.insert) {
    //     empaddbtn.classList.add("d-none");
    // } else {
    //     empaddbtn.classList.remove("d-none");
    // }
 
}
// const getCategory = (rowOb) =>{
//     console.log(rowOb);
//     return rowOb.categoryname;
 
// }
// const getCount = (rowOb) =>{
//     return rowOb.itemcount
   
// }


function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const generateReports = (selectDesignation1,selectEStatus1,textIdentifier,chartViewId,label,textx,texty,id) =>{

    if (textIdentifier == "designationWorking") {
        employees1 = ajaxGetRequest('/reportdataemployee?status='+JSON.parse(selectEStatus1).id+'&designation='+JSON.parse(selectDesignation1).id)
        console.log(employees1);
        refreshReportTable(employees1)
        
    } else if (textIdentifier == "categoryVise"){
        console.log(formatDate(selectDesignation1),formatDate(selectEStatus1));
        // employees2 = ajaxGetRequest('/reportdataworkingemployeechart/categryvisecount?startdate='+formatDate(selectEStatus1)+'&enddate='+formatDate(selectDesignation1))
        employees2 = ajaxGetRequest(`/reportdataworkingemployeechart/categryvisecount?startdate=${selectDesignation1}&enddate=${selectEStatus1}`)

        console.log(employees2);
        // refreshReportTable(employees1)

        generateChart(employees2,chartViewId,label,textx,texty)
        refreshReportCategoryTable(id,employees2)

    }else if(textIdentifier == "saleCount"){
        employees4 = ajaxGetRequest(`/reportdataworkingemployeechart/datevisesale?startdate=${selectDesignation1}&enddate=${selectEStatus1}`)
        console.log(employees4);
        generateChart(employees4,chartViewId,label,textx,texty)
        refreshReportCategoryTable(id,employees4)
    }

}
let myChartView1;
const generateChart = (invoices,chartViewId,label,textx,texty) => {

    if (myChartView1) {
        myChartView1.destroy()

    }

    const ctx1 = document.getElementById(`${chartViewId}`);
    
    // Prepare data for the chart
    const customerNames1 = [];
    const itemCounts1 = [];
    
    for (const invoice of invoices) {
        customerNames1.push(invoice.categoryname); // Extract customer name
        itemCounts1.push(invoice.itemcount); // Count serial numbers
    }
    console.log(customerNames1, itemCounts1);
    // Create the chart with the prepared data
     myChartView1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: customerNames1,
            datasets: [{
                label: `${label}`,
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
                        text: `${textx}`
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: `${texty}`
                    }
                }
            }
        }
    });


}
const printChart1 = (viewChartId) => {

    const viewChart = document.getElementById(viewChartId);
    console.log(myChartView1);
    viewChart.src = myChartView1.toBase64Image();
    viewChart.style.display = 'block'; // Ensure the image is visible

    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <html>
        <head>
            <title>Print Chart</title>
        </head>
        <body>
            <img src="${viewChart.src}" style="width: 50%; height: auto;" />
        </body>
        </html>
    `);

    setTimeout(() => {
        newWindow.print();
        newWindow.close();
        viewChart.style.display = 'none';
    }, 500);
};
const printChart2 = (viewChart) => {
    const viewChart1 = document.getElementById(`${viewChart}`)
    viewChart1.src = myChartView.toBase64Image();
    let newwindow1 = window.open();
    newwindow1.document.write(viewChart1.outerHTML + `<script>${viewChart1}.style.removeProperty('display');</script>`);

    setTimeout(function () {
        newwindow1.print();
        newwindow1.close();
    }, 500)
}

const getEmployeeStatus = (rowObject) => {
    if (rowObject.employeestatus_id.name == "Resign") {
        return "<p class = 'resign-status'>" + rowObject.employeestatus_id.name + "</p>"
    }
    if (rowObject.employeestatus_id.name == "Working") {
        return "<p class = 'working-status'>" + rowObject.employeestatus_id.name + "</p>"
    }
    if (rowObject.employeestatus_id.name == "Deleted") {
        return "<p class = 'deleted-status'>" + rowObject.employeestatus_id.name + "</p>"
    }
}
const getEmployeeDesignation = (rowObject) => {
    
        return "<p >" + rowObject.employeestatus_id.name + "</p>"

}









const editEmployeeBtn = () => {
    console.log("update");
   
}
const updateEmployeeBtn = () => {
    console.log("update");
}
const deleteEmployeeBtn = (rowOb) => {
    console.log("delete");
    setTimeout(function () {

        const userConfirm = confirm('Are you sure you want to delete' + rowOb.fullname);
        if (userConfirm) {
            // employees[rowindex].employeeStatus_id = {id:3, name:'Delete'};

            let serverResponse = ajaxRequestBodyMethod("/employee", "DELETE", rowOb)
            if (serverResponse == "OK") {
                alert("Delete successfully...!")
                refreshEmployeeTable();
                formEmployee.reset();
                refreshEmployeeForm();


            } else {
                alert("Delete not succefully  .." + serverResponse)
            }

            // alert('Employee delete succefully');
            // refreshEmployeeTable()

        }
    }, 500)
}



