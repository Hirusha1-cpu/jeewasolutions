window.addEventListener('load', () => {
    refreshUsersTable();
    refreshUsersForm();
})

const refreshUsersTable = () => {
    users = ajaxGetRequest('/user/getlist')
    console.log(users);
    const displayUserProperties = [
        { property: getEmployeeFullName, dataType: 'function' },
        { property: "username", dataType: 'string' },
        { property: "email", dataType: 'string' },
        { property: getRole, dataType: 'function' },
        { property: getStatus, dataType: 'function' },
    ]
    fillDataIntoTable(userTab, users, displayUserProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)

}


const updateEmployeeBtn = () => {
    console.log("update");
}
const deleteEmployeeBtn = (rowOb) => {
    console.log("delete");
    setTimeout(function () {

        const userConfirm = confirm('Are you sure you want to delete' + rowOb.employee.fullname);
        if (userConfirm) {
            // employees[rowindex].employeeStatus_id = {id:3, name:'Delete'};

            let serverResponse = ajaxRequestBodyMethod("/user", "DELETE", rowOb)
            if (serverResponse == "OK") {
                alert("Delete successfully...!")
                refreshUserTable();
                formUser.reset();
                refreshUserForm();


            } else {
                alert("Delete not succefully  .." + serverResponse)
            }

            // alert('Employee delete succefully');
            // refreshEmployeeTable()

        }
    }, 500)
}

const getEmployeeFullName = (rowOb) => {
    console.log(rowOb);
    return rowOb.employee?.fullname ? rowOb.employee?.fullname : "-";
}
const getStatus = (rowOb) => {
    if (rowOb.status) {
        return "<p class='working-status'>" + "true" + "</p>"
    } else {
        return "<p class='deleted-status'>" + "false" + "</p>"
    }

}
const getRole = (rowOb) => {
    let role = '';
    rowOb.roles.forEach(element => {
        role = role + "<p class = 'working-status'>" + element?.name ? element?.name : "-" + "</p>"
    })
    return role
 

}

const refreshUsersForm = () => {
    console.log("hiiii");
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

const editEmployeeBtn = (item) => {
    console.log("edit");
    console.log(item);
    user = JSON.parse(JSON.stringify(item));
    olduser = JSON.parse(JSON.stringify(item));

    console.log(user);
    employeeListWithoutUserAccount.push(user.employee);
    console.log(user);
    // console.log(user.employee_id.fullname);
    console.log(employeeListWithoutUserAccount);

    fillDataIntoSelect(selectEmployee, "Select Employee", employeeListWithoutUserAccount, 'fullname', user.employee.fullname)

    inputUsername.value = user.username
    inputEmail.value = user.email

    //set user status
    if (user.status) {
        inputStatus.checked = true;
        inputStatusLbl.innerText = "User Account is active"
    } else {
        inputStatus.checked = false;
        inputStatusLbl.innerText = "User Account is not active"
    }


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
        let extURoleExist = user.roles.map(item => item.name).indexOf(element.name)
        if (extURoleExist != -1) {
            input.checked = true;
        }

        const label = document.createElement("label")
        label.className = "form-check-label"
        label.innerText = element.name

        div.appendChild(label)
        div.appendChild(input)

        inputRole.appendChild(div)
    });

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

const checkError = () => {
    let errors = '';
    console.log(user);
    // if (inputFullName1.value == "")
    if (user.employee == null) {
        errors = errors + "Please select employee"
    }
    if (user.username == null) {
        errors = errors + "Please enter a valid fullname";
        // inputFullName1.style.border = '2px solid red';
        inputUsername.classList.add("is-invalid");
    } else {
        inputUsername.classList.remove("is-invalid");
        inputUsername.classList.add("is-valid");
    }
    if (user.password == null) {
        errors = errors + "Please enter a password";
        // inputFullName1.style.border = '2px solid red';
        inputPassword.classList.add("is-invalid");
    }
    if (user.email == null) {
        errors = errors + "Please enter a email";
        // inputFullName1.style.border = '2px solid red';
        inputEmail.classList.add("is-invalid");
    }
    if (olduser == null) {
        if (inputRePassword.value == "") {
            errors = errors + "Please retype Passsword"
            inputRePassword.classList.add("is-invalid");
        }
    }

    return errors;
}

//define method for check updates
const checkUpdate = () => {
    let updates = "";

    // Comparing both arrays using stringify method
    // if (JSON.stringify(user.roles) != JSON.stringify(olduser.roles)) {
    //     updates = updates + "Roles is changed"
    // }
    if (JSON.stringify(user.roles) != JSON.stringify(olduser.roles)) {

        if (user.roles.length != olduser.roles.length) {
            updates = updates + "Roles are changed"
        } else if (user.roles.length == olduser.roles.length) (

            user.roles.forEach(element => {

                let extRoleCount = 0;
                olduser.roles.forEach(element1 => {
                    if (element.id != element1.id) {
                        // updates = updates + element.name," are changed"
                        extRoleCount++
                    }
                })
                if (extRoleCount == olduser.roles.length) {
                    updates = updates + element.name, "roles are changed"
                }
            })
        )
    }

    if (user.username != olduser.username) {
        updates = updates + "Username is changed"
    }
    if (user.email != olduser.email) {
        updates = updates + "email is changed into" + user.email
    }
    if (user.status != olduser.status) {
        updates = updates + "Status is changed"
    }
    if (user.employee.id != olduser.employee.id) {
        updates = updates + "Employee is changed"
    }

    return updates;
}

const buttonUserUpdate = () => {
    console.log(user);
    console.log(olduser);
    //check error
    let error = checkError();
    if (error == "") {
        //check form update
        let updates = checkUpdate();
        if (updates != "") {
            //call put service
            let userConfirmation = confirm("are u sure to update following changes...?" + updates)
            if (userConfirmation) {
                let updateServiceResponse = ajaxRequestBodyMethod("/user", "PUT", user)
                //check backend response
                if (updateServiceResponse == "OK") {
                    alert("Update successfully...!")
                    refreshUserTable();
                    formUser.reset();
                    refreshUserForm();
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

const buttonUserAdd = () => {

    let serverUserResponse = ajaxRequestBodyMethod("/user", "POST", user)
    if (serverUserResponse == 'OK') {
        alert("Save successfully" + serverUserResponse)
    } else {
        alert("Save failed" + serverUserResponse)
    }
    refreshUserTable();
    refreshUserForm();

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
