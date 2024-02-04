window.addEventListener('load', () => {
    refreshEmployeeTable();
    refreshEmployeeForm();
})

const refreshEmployeeTable = () =>{
    privileges = ajaxGetRequest('/privilege/getlist')

    const displayProperty = [
        { property: getEmpRole, dataType: 'function' },
        { property: getModule, dataType: 'function' },
        { property: getSelect, dataType: 'function' },
        { property: getInsert, dataType: 'function' },
        { property: getUpdate, dataType: 'function' },
        { property: getDelete, dataType: 'function' },
        { property: getStatus, dataType: 'function' },
    ]

    //call fill data into table function
    // fillDataIntoTable(tableId,dataList, display property List, refillFunctionName, deleteFunctionName, printFunctionName,buttonVisibility)
    fillDataIntoTable(privTab, privileges, displayProperty, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn,true)
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



const getSelect = (rowOb) => {
    if (rowOb.sel) {
        return '<p class="working-status">' + "True" + '</p>';
    } else {
        return '<p class="deleted-status">' + "False" + '</p>';
    }
}

const getInsert = (rowOb) => {
    if (rowOb.inst) {
        return '<p class="working-status">' + "True" + '</p>';
    } else {
        return '<p class="deleted-status">' + "False" + '</p>';
    }
}

const getUpdate = (rowOb) => {
    if (rowOb.upd) {
        return '<p class="working-status">' + "True" + '</p>';
    } else {
        return '<p class="deleted-status">' + "False" + '</p>';
    }
}
const getDelete = (rowOb) => {
    if (rowOb.del) {
        return '<p class="working-status">' + "True" + '</p>';
    } else {
        return '<p class="deleted-status">' + "False" + '</p>';
    }
}

const getStatus = (rowOb) => {
    if (rowOb.status) {
        return '<p class="working-status">' + "True" + '</p>';
    } else {
        return '<p class="deleted-status">' + "False" + '</p>';
    }
}

const getModule = (rowOb) => {
    // console.log(rowOb.employee_id.designation_id.name);
    if (rowOb.module_id.name == 'purchase') {
        return '<p class="working-status">' + rowOb.module_id.name + '</p>';
    }
    if (rowOb.module_id.name == 'item') {
        return '<p class="resign-status">' + rowOb.module_id.name + '</p>';
    }
    if (rowOb.module_id.name == 'employee') {
        return '<p class="deleted-status">' + rowOb.module_id.name + '</p>';
    }
    if (rowOb.module_id.name == 'purchase') {
        return '<p class="resign-status">' + rowOb.module_id.name + '</p>';
    }

}

const getEmpRole = (rowOb) => {
    // console.log(rowOb.employee_id.designation_id.name);
    if (rowOb.role_id.name == 'Store-Manager') {
        return '<p class="working-status">' + rowOb.role_id.name + '</p>';
    }
    if (rowOb.role_id.name == 'Technician') {
        return '<p class="resign-status">' + rowOb.role_id.name + '</p>';
    }
    if (rowOb.role_id.name == 'Cashier') {
        return '<p class="resign-status">' + rowOb.role_id.name + '</p>';
    }
    if (rowOb.role_id.name == 'Manager') {
        return '<p class="deleted-status">' + rowOb.role_id.name + '</p>';
    }
    // let userRoles = '';
    // rowOb.roles.forEach(element => {
    //     userRoles = userRoles + element.name + ","
    // })
    // return userRoles;
}

const refreshEmployeeForm = () =>{
    privilege = new Object();
    roles = ajaxGetRequest("/role/getlist")
    fillDataIntoSelect(selectRole,"Select Role", roles, 'name' )
    selectRole.disabled = false;

    modules = ajaxGetRequest("/module/getlist")
    fillDataIntoSelect(selectModule,"Select Modules", modules, 'name' )
    selectModule.disabled = true;

      //set auto binding
    inputDelete.checked = false;
    inputSelect.checked = false;
    inputInsert.checked = false;
    inputUpdate.checked = false;    
}

const buttonEmpAdd = () => {
    console.log(privilege);
    let serverUserResponse = ajaxRequestBodyMethod("/privilege", "POST", privilege);
    if (serverUserResponse == "OK") {
        alert("Save successfully")
    } else {
        alert("Error: " + serverUserResponse);
    }
}

const generateModuleList = () =>{

    moduleList = ajaxGetRequest("/module/listbyrole?roleid=" + JSON.parse(selectRole.value).id)
    fillDataIntoSelect(selectModule, "Select Module" , moduleList, 'name')
    selectModule.disabled = false;

}