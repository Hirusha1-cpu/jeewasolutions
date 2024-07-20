window.addEventListener('load', () => {
    // refreshReportTable();
    // refreshEmployeeForm();
    designations = ajaxGetRequest("/designation/getlist")
    fillDataIntoSelect(selectDesignation1, "Select Designation", designations, 'name')

    empstatus = ajaxGetRequest("empstatus/getlist")
    fillDataIntoSelect(selectEStatus1, "Select Emp status", empstatus, 'name')


})

const refreshReportTable = async (employees2) => {
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

const generateReports = () =>{
    employees1 = ajaxGetRequest('/reportdataemployee?status='+JSON.parse(selectEStatus1.value).id+'&designation='+JSON.parse(selectDesignation1.value).id)
    console.log(employees1);
    refreshReportTable(employees1)

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



