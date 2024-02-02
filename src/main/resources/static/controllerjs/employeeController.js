window.addEventListener('load', () => {
    refreshEmployeeTable();
    refreshEmployeeForm();
})

const refreshEmployeeTable = () =>{
    employees = ajaxGetRequest('/employee/getlist')
    const displayProperties = [
        {property:'empno', dataType:'string'},
        {property:'fullname', dataType:'string'},
        {property:'nic', dataType:'string'},
        {property:'mobile', dataType:'string'},
        {property:'email', dataType:'string'},
        {property:getEmployeeStatus, dataType:'function'},
        {property:getEmployeeDesignation, dataType:'function'},
    ]

    fillDataIntoTable(empTab, employees, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn,true)


}
const getEmployeeStatus = (rowObject) =>{
    if (rowObject.employeestatus_id.name == "Resign") {
        return "<p class = 'resign-status'>"+rowObject.employeestatus_id.name+"</p>"
    }
    if (rowObject.employeestatus_id.name == "Working") {
        return "<p class = 'working-status'>"+rowObject.employeestatus_id.name+"</p>"
    }
    if (rowObject.employeestatus_id.name == "Deleted") {
        return "<p class = 'deleted-status'>"+rowObject.employeestatus_id.name+"</p>"
    }
}
const getEmployeeDesignation = (rowObject) =>{
    if (rowObject.designation_id.name == "Manager") {
        return "<p class = 'resign-status'>"+rowObject.employeestatus_id.name+"</p>"
    }
    if (rowObject.designation_id.name == "Store-Manager") {
        return "<p class = 'working-status'>"+rowObject.employeestatus_id.name+"</p>"
    }
    if (rowObject.designation_id.name == "Cashier") {
        return "<p class = 'deleted-status'>"+rowObject.employeestatus_id.name+"</p>"
    }
}

const editEmployeeBtn = () =>{
    console.log("edit");
    
}
const updateEmployeeBtn = () =>{
    console.log("update");
}
const deleteEmployeeBtn = () =>{
    console.log("delete");
}


const refreshEmployeeForm = () =>{
      employee = {}; 
    //fillDataIntoSelect = (fieldId,message, dataList, property, selectedValue)

    designations = ajaxGetRequest("/designation/getlist")
    fillDataIntoSelect(selectDesignation,"Select Designation", designations, 'name' )

    empstatus = ajaxGetRequest("empstatus/getlist")
    fillDataIntoSelect(selectEStatus,"Select Emp status", empstatus, 'name' )

    inputDob.min = '2023-09-01';
    inputDob.max = '2023-09-30';

    //need to set default color
    inputNIC.classList.remove("is-valid");
    inputNIC.style.border = '1px solid #ced4da'
    inputDob.classList.remove("is-valid");
    inputDob.style.border = '1px solid #ced4da'

 }

 const generateCallingNameValues = () =>{
    const callingNames = document.querySelector("#dtaList");
    callingNames.innerHTML = "";

    callingNamePartList = inputFullName1.value.split(' ');
    callingNamePartList.forEach(namePart => {
        const option = document.createElement('option');
        option.value = namePart;

        callingNames.appendChild(option);
    });
 }

 const txtCallingNameValidator = (fieldId) =>{
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
        employee.callingname = "callingNames"
    } else {
        //invalid
        fieldId.style.border = '2px solid red'
        employee.callingname = "null"
    }
 }

 const buttonEmpAdd = () =>{
    let serverResponse = ajaxRequestBodyMethod("/employee", "POST", employee);

    if (serverResponse == "OK") {
        alert("Save successfully...!" + serverResponse)
    }else{
        alert("Save not successfully...!" + serverResponse)

    }
 }