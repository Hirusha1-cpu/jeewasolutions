window.addEventListener('load', () => {
    refreshEmployeeTable();
    refreshEmployeeForm();
})

const refreshEmployeeTable = () => {
    employees = ajaxGetRequest('/employee/getlist')
    const displayProperties = [
        { property: 'empno', dataType: 'string' },
        { property: 'fullname', dataType: 'string' },
        { property: 'nic', dataType: 'string' },
        { property: 'mobile', dataType: 'string' },
        { property: 'email', dataType: 'string' },
        { property: getEmployeeStatus, dataType: 'function' },
        { property: getEmployeeDesignation, dataType: 'function' },
    ]

    fillDataIntoTable(empTab, employees, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)

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
    }
}


const refreshEmployeeForm = () => {
    employee = {};
    //fillDataIntoSelect = (fieldId,message, dataList, property, selectedValue)

    designations = ajaxGetRequest("/designation/getlist")
    fillDataIntoSelect(selectDesignation, "Select Designation", designations, 'name')

    empstatus = ajaxGetRequest("empstatus/getlist")
    fillDataIntoSelect(selectEStatus, "Select Emp status", empstatus, 'name')

    inputDob.min = '2023-09-01';
    inputDob.max = '2023-09-30';

    //need to set default color
    inputNIC.classList.remove("is-valid");
    inputNIC.style.border = '1px solid #ced4da'
    inputDob.classList.remove("is-valid");
    inputDob.style.border = '1px solid #ced4da'

}

const checkError = () => {
    let errors = '';
    console.log(employee);
    // if (inputFullName1.value == "") 
    if (employee.fullname == null) {
        errors = errors + "Please enter a valid fullname";
        // inputFullName1.style.border = '2px solid red';
        inputFullName1.classList.add("is-invalid");
    } else {
        inputFullName1.classList.remove("is-invalid");
        inputFullName1.classList.add("is-valid");
    }
    if (employee.callingname == null) {
        errors = errors + "Please enter a valid callingnames";
        // inputFullName1.style.border = '2px solid red';
        inputEmail.classList.add("is-invalid");
    }
    if (employee.nic == null) {
        errors = errors + "Please enter a valid nic";
        // inputFullName1.style.border = '2px solid red';
        inputNIC.classList.add("is-invalid");
    }
    if (employee.mobile == null) {
        errors = errors + "Please enter a valid mobile";
        // inputFullName1.style.border = '2px solid red';
        inputMobNo.classList.add("is-invalid");
    }
    if (employee.landno == null) {
        errors = errors + "Please enter a valid land";
        // inputFullName1.style.border = '2px solid red';
        inputLandNo.classList.add("is-invalid");
    }
    if (employee.email == null) {
        errors = errors + "Please enter a valid email";
        // inputFullName1.style.border = '2px solid red';
        inputEmail.classList.add("is-invalid");
    }

    return errors;
}


const editEmployeeBtn = (item, index) => {
    console.log("edit");
    console.log(item);
    employee = JSON.parse(JSON.stringify(item));
    oldemployee = JSON.parse(JSON.stringify(item));

    console.log(employee);

    console.log(employee);
    inputFullName1.value = employee.fullname
    inputCallingName.value = employee.callingname
    inputNIC.value = employee.nic
    inputMobNo.value = employee.mobile
    inputLand.value = employee.landno
    inputEmail.value = employee.email
    inputAddress.value = employee.address

    fillDataIntoSelect(selectDesignation, "Select Designation", designations, 'name', employee.designation_id.name)

    //select emp status
    fillDataIntoSelect(selectEStatus, "Select Status", empstatus, 'name', employee.employeestatus_id.name)

    const table = document.getElementById("empTable");
    const form = document.getElementById("empForm");

    // Animate table disappearance
    table.style.opacity = 1; // Ensure opacity is initially 1
    table.style.transition = "opacity 1.5s ease-out";
    table.style.display = "none"; // Trigger the animation

    // Delay form appearance slightly
    setTimeout(function () {
        form.style.opacity = 0;
        form.style.display = "block";
        form.style.transition = "opacity 1.5s ease-in";
        form.style.opacity = 1; // Gradually fade in
    }, 100); // Adjust the delay as needed


}

//define method for check updates
const checkUpdate = () => {
    let updates = "";
    if (employee.nic != oldemployee.nic) {
        updates = updates + "NIC is changed"
    }
    if (employee.mobile != oldemployee.mobile) {
        updates = updates + "mobile is changed into" + employee.mobile
    }
    if (employee.designation_id.name != oldemployee.designation_id.name) {
        updates = updates + "designation is changed"

    }
    if (employee.employeestatus_id.name != oldemployee.employeestatus_id.name) {
        updates = updates + "Emp status is changed"

    }
    return updates;
}

const buttonEmpUpdate = () => {
    console.log("update");
    //check error
    let error = checkError();
    if (error == "") {
        //check form update
        let updates = checkUpdate();
        if (updates != "") {
            //call put service
            let userConfirmation = confirm("are u sure to update following changes...?" + updates)
            if (userConfirmation) {
                let updateServiceResponse = ajaxRequestBodyMethod("/employee", "PUT", employee)
                //check backend response
                if (updateServiceResponse == "OK") {
                    alert("Update successfully...!")
                    refreshEmployeeTable();
                    formEmployee.reset();
                    refreshEmployeeForm();
                    //need hide modal
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

                } else {
                    alert("Update not succefully  .." + updateServiceResponse)
                }

            }
        } else {
            alert("Form has no any changes");
        }

    } else {
        alert("Form has following errors \n" + error)
    }
}
const updateEmployeeBtn = () => {
    console.log("update");
}
const deleteEmployeeBtn = () => {
    console.log("delete");
}

const generateCallingNameValues = () => {
    const callingNames = document.querySelector("#dtaList");
    callingNames.innerHTML = "";

    callingNamePartList = inputFullName1.value.split(' ');
    callingNamePartList.forEach(namePart => {
        const option = document.createElement('option');
        option.value = namePart;

        callingNames.appendChild(option);
    });
}

const txtCallingNameValidator = (fieldId) => {
    const callingNames = fieldId.value;
    let existingNames = false;
    for (let element of callingNamePartList) {
        if (element == callingNames) {
            existingNames = true;
            break;
        }
    };

    if (existingNames) {
        //valid
        fieldId.style.border = '2px solid green'
        employee.callingname = fieldId.value
    } else {
        //invalid
        fieldId.style.border = '2px solid red'
        employee.callingname = "null"
    }
}

const buttonEmpAdd = () => {
    let serverResponse = ajaxRequestBodyMethod("/employee", "POST", employee);

    if (new RegExp('^[0-9]{8}$').test(serverResponse)) {
        alert("Save successfully...!" + serverResponse)
    } else {
        alert("Save not successfully...!" + serverResponse)

    }
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