window.addEventListener('load', () => {
    refreshEmployeeTable();
    refreshEmployeeForm();
})

const refreshEmployeeTable = () => {
    employees = ajaxGetRequest('/reportdataworkingemployee')
    const displayProperties = [
        { property: 'empno', dataType: 'string' },
        { property: 'fullname', dataType: 'string' },
        { property: 'nic', dataType: 'string' },
        { property: 'mobile', dataType: 'string' },
        { property: 'email', dataType: 'string' },
        { property: getEmployeeStatus, dataType: 'function' },
        { property: getEmployeeDesignation, dataType: 'function' },
    ]

    fillDataIntoTable(empTabReport, employees, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, false)

    let userPrivilegeforemployee = ajaxGetRequest("/privilege/bylogedusermodule/employee")
    if (!userPrivilegeforemployee.insert) {
        empaddbtn.classList.add("d-none");
    } else {
        empaddbtn.classList.remove("d-none");
    }

    designations = ajaxGetRequest("/designation/getlist")
    fillDataIntoSelect(selectDesignation1, "Select Designation", designations, 'name')

    empstatus = ajaxGetRequest("empstatus/getlist")
    fillDataIntoSelect(selectEStatus1, "Select Emp status", empstatus, 'name')


}

const generateReports = () =>{
    employees = ajaxGetRequest('/reportdataemployee?status='+JSON.parse(selectEStatus1.value).id+'&designation='+JSON.parse(selectDesignation1.value).id)
    refreshEmployeeTable()
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
    if (rowObject.designation_id.name == "Manager") {
        return "<p class = 'resign-status'>" + rowObject.employeestatus_id.name + "</p>"
    }
    if (rowObject.designation_id.name == "Store-Manager") {
        return "<p class = 'working-status'>" + rowObject.employeestatus_id.name + "</p>"
    }
    if (rowObject.designation_id.name == "Cashier") {
        return "<p class = 'deleted-status'>" + rowObject.employeestatus_id.name + "</p>"
    } else {
        return "<p class = 'deleted-status'>" + rowObject.employeestatus_id.name + "</p>"

    }
}









const buttonEmpUpdate = () => {
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



const saveDetails = () => {

    // let serverResponse = ajaxRequestBodyMethod("/employee", "POST", employee);

    // if (new RegExp('^[0-9]{8}$').test(serverResponse)) {
    //     alert("Save successfully...!" + serverResponse)
    // } else {
    //     alert("Save not successfully...!" + serverResponse)

    // }
    inputFullName1.value = ""
    inputCallingName.value = ""
    inputLand.value = ""
    inputEmail.value = ""
    inputAddress.value = ""
    selectEStatus.value = ""

    refreshEmployeeTable()
    refreshEmployeeForm()

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
const addedEmployeeDetails = (employeename, nic, mobile, email, designation, civilstatus, employeestatus) => {
    const emplyoeeDetails1 = `<b>
    Employee name: ${employeename}<br>
    Employee nic: ${nic}<br>
    Employee mobile: ${mobile}<br>
    Employee email: ${email}<br>
    Designation: ${designation}<br>
    Employeestatus: ${employeestatus}<br>
    civilstatus: ${civilstatus}
    <b>`;

    Swal.fire({
        title: "Do you want to save?",
        html: emplyoeeDetails1,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
        customClass: {
            title: 'custom-title', // Apply custom CSS class to title
            html: 'custom-html', // Apply custom CSS class to HTML container
        },
    }).then((result) => {
        if (result.isConfirmed) {
            let serverResponse = ajaxRequestBodyMethod("/employee", "POST", employee);
            console.log(serverResponse);
            if (new RegExp('^[0-9]{8}$').test(serverResponse)) {
                // alert("Save successfully...!" + serverResponse)
                Swal.fire("Saved!", "", "success");
                saveDetails();
            } else {
                Swal.fire("Not saved" + serverResponse, "", "info");
                // alert("Save not successfully...!" + serverResponse)

            }

        } else if (result.isDenied) {
            Swal.fire("Not saved", "", "info");
        }
    });
}


const buttonEmpAdd = () => {
    console.log(employee);
    addedEmployeeDetails(employee.fullname, employee.nic, employee.mobile, employee.email, employee.designation_id.name, employee.civilstatus, employee.employeestatus_id.name)
}