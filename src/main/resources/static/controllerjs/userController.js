window.addEventListener('load', () => {
    refreshUserTable();
    refreshUserForm();
})

const refreshUserTable = () => {
    users = ajaxGetRequest('/user/getlist')
    const displayUserProperties = [
        { property: getEmployeeFullName, dataType: 'function' },
        { property: "username", dataType: 'string' },
        { property: "email", dataType: 'string' },
        { property: getStatus, dataType: 'function' },
    ]

    fillDataIntoTable(userTab, users, displayUserProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)

}

const editEmployeeBtn = () => {
    console.log("edit");

}
const updateEmployeeBtn = () => {
    console.log("update");
}
const deleteEmployeeBtn = () => {
    console.log("delete");
}

const getEmployeeFullName = (rowOb) => {
    return rowOb.employee.fullname;
}
const getStatus = (rowOb) => {
    if (rowOb.status) {
        return "<p class='working-status'>" + "true" + "</p>"
    } else {
        return "<p class='deleted-status'>" + "false" + "</p>"
    }

}

const refreshUserForm = () => {
    //create empty object
    user = new Object();
    user.roles = new Array();
    //employee list without user account
    employeeListWithoutUserAccount = ajaxGetRequest("/employee/listwithoutuseraccount")
    fillDataIntoSelect(selectEmployee, "Select Employee", employeeListWithoutUserAccount, 'fullname')

    //set auto binding
    user.status = true;

    //need to get role list
    roles = ajaxGetRequest("/role/getlist") // meken check box generate wenna one
    inputRole.innerHTML = ""
    roles.forEach(element => {
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element.name

        input.onchange = function () {
            if (this.checked) {
                user.roles.push(element)

            } else {
                console.log(this.id);
                console.log(this.id.substring(3));
                console.log("unchecked element: " + element);
                let extIndex = user.roles.map(item => item.name).indexOf(element.name)
                if (extIndex != -1) {
                    user.roles.splice(extIndex, 1);
                }
            }
        }

        const label = document.createElement("label")
        label.className = "form-check-label"
        label.innerText = element.name

        div.appendChild(label)
        div.appendChild(input)

        inputRole.appendChild(div)
    });



}

const buttonUserAdd = () =>{

        let serverUserResponse = ajaxRequestBodyMethod("/user", "POST", user)
        if (serverUserResponse == 'OK') {
            alert("Save successfully"+ serverUserResponse)
        }else{
            alert("Save failed"+ serverUserResponse)
        }
  
}

//define function for password retype
const passwordValidation = () => {
    if (inputPassword.value != "") {
        if (inputPassword.value == inputRePassword.value) {
            inputPassword.style.border = "2px solid green";
            inputRePassword.style.border = "2px solid green";
            user.password = inputPassword.value;
        } else {
            inputPassword.style.border = "2px solid red";
            inputRePassword.style.border = "2px solid red";
            user.password = null;
        }

    } else {
        alert("Please fill password")
        inputPassword.style.border = "2px solid red";
        inputRePassword.style.border = "2px solid red";
        user.password = null;
    }
}


const generateUserEmail = () => {
    inputEmail.value = JSON.parse(selectEmployee.value).email; //set value
    user.email = inputEmail.value; //bind value
    inputEmail.style.border = "2px solid green"
}
