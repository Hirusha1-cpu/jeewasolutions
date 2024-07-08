window.addEventListener('load', () => {
    refreshPrivilegeTable();
    refreshPrivilegeForm();
})

const refreshPrivilegeTable = () => {
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
    fillDataIntoTable(privTab, privileges, displayProperty, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)
}

const editEmployeeBtn = (item) => {
    console.log("edit");

    privilege = JSON.parse(JSON.stringify(item));
    oldprivilege = JSON.parse(JSON.stringify(item));

    console.log(privilege);

    //employee list without user account
    roles = ajaxGetRequest("/role/getlist")
    fillDataIntoSelect(selectRole, "Select Role", roles, 'name', privilege.role_id.name)
    selectRole.disabled = true;

    modules = ajaxGetRequest("/module/getlist")
    fillDataIntoSelect(selectModule, "Select Module", modules, 'name', privilege.module_id.name)
    selectModule.disabled = true;

    inputDelete.checked = false;
    inputSelect.checked = false;
    inputInsert.checked = false;
    inputUpdate.checked = false;

    if (privilege.sel) {
        inputSelect.checked = true;
    }
    if (privilege.inst) {
        inputInsert.checked = true;
    }
    if (privilege.upd) {
        inputUpdate.checked = true;
    }
    if (privilege.del) {
        inputDelete.checked = true;
    }


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
const updateEmployeeBtn = ()=>{
    console.log("delete");
}
const checkErrors = () => {
    let errors = '';
    if (privilege.role_id == null) {
        errors = errors + "role not setted"
    }
    if (privilege.module_id == null) {
        errors = errors + "module not setted"
    }
    return errors;
}

const checkUpdate = () => {
    let updates = "";
    const sel = privilege.sel
    const inst = privilege.inst
    const upd = privilege.upd
    const del = privilege.del

    if (sel != oldprivilege.sel) {
        updates = updates + "Select Privilege is changed"
    }
    if (inst != oldprivilege.inst) {
        updates = updates + "Insert Privilege is changed"
    }
    if (upd != oldprivilege.upd) {
        updates = updates + "Update Privilege is changed"
    }
    if (del != oldprivilege.del) {
        updates = updates + "Delete Privilege is changed"
    }
    return updates;


}
const updatePrivilegeBtn = () => {
    console.log("update");
    let updates = checkUpdate();
    if (updates != "") {
        let userConfirmation = confirm("are u sure to update following changes...?" + updates)
        if (userConfirmation) {
            let updateServiceResponse = ajaxRequestBodyMethod("/privilege", "PUT", privilege)
            if (updateServiceResponse == "OK") {
                alert("Update successfully...!")
                refreshPrivilegeTable();
                formPrivilege.reset();
                refreshPrivilegeForm();
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
    }


}

const deleteEmployeeBtn = () => {
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
    // if (rowOb.module_id.name == 'purchase') {
        return '<p class="yellow-status">' + rowOb.module_id.name + '</p>';
    // }
    // if (rowOb.module_id.name == 'item') {
    //     return '<p class="resign-status">' + rowOb.module_id.name + '</p>';
    // }
    // if (rowOb.module_id.name == 'employee') {
    //     return '<p class="deleted-status">' + rowOb.module_id.name + '</p>';
    // }
    // if (rowOb.module_id.name == 'purchase') {
    //     return '<p class="resign-status">' + rowOb.module_id.name + '</p>';
    // }

}

const getEmpRole = (rowOb) => {
    // console.log(rowOb.employee_id.designation_id.name);
    // if (rowOb.role_id.name == 'Store-Manager') {
        return '<p class="blue-status">' + rowOb.role_id.name + '</p>';
    // }
    // if (rowOb.role_id.name == 'Technician') {
    //     return '<p class="resign-status">' + rowOb.role_id.name + '</p>';
    // }
    // if (rowOb.role_id.name == 'Cashier') {
    //     return '<p class="resign-status">' + rowOb.role_id.name + '</p>';
    // }
    // if (rowOb.role_id.name == 'Manager') {
    //     return '<p class="deleted-status">' + rowOb.role_id.name + '</p>';
    // }
    // if (rowOb.role_id.name == 'Admin') {
    //     return '<p class="working-status">' + rowOb.role_id.name + '</p>';
    // }
    // let userRoles = '';
    // rowOb.roles.forEach(element => {
    //     userRoles = userRoles + element.name + ","
    // })
    // return userRoles;
}

const refreshPrivilegeForm = () => {
    privilege = new Object();
    roles = ajaxGetRequest("/role/getlist")
    fillDataIntoSelect(selectRole, "Select Role", roles, 'name')
    selectRole.disabled = false;

    modules = ajaxGetRequest("/module/getlist")
    fillDataIntoSelect(selectModule, "Select Modules", modules, 'name')
    selectModule.disabled = true;

    //set auto binding
    inputDelete.checked = false;
    inputSelect.checked = false;
    inputInsert.checked = false;
    inputUpdate.checked = false;

    privilege.sel = false
    privilege.inst = false
    privilege.del = false
    privilege.upd = false
}

const buttonPrivilegeAdd = () => {


    console.log(privilege);
    let errorsprivilege = checkErrors();
    if (errorsprivilege == "") {

        let serverUserResponse = ajaxRequestBodyMethod("/privilege", "POST", privilege);
        if (serverUserResponse == "OK") {
            alert("Save successfully")
            refreshPrivilegeTable();
            formPrivilege.reset();
            refreshPrivilegeForm();
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
            alert("Error: " + serverUserResponse);
        }
    } else {
        alert("Error: " + errorsprivilege);
    }
}

const generateModuleList = () => {

    //me role eka select karama ekata adala modules tika enwa, role id eka pass krnwa , dao ekata pass unama eken module tika generate wenaw
    //mekedi enne apita danata assign karala nathi modules det eka mokada mekedi update ekak wen nane ape thyena module ehekata
    moduleList = ajaxGetRequest("/module/listbyrole?roleid=" + JSON.parse(selectRole.value).id)
    fillDataIntoSelect(selectModule, "Select Module", moduleList, 'name')
    selectModule.disabled = false;

}