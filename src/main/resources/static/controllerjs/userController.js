window.addEventListener('load', () => {
    refreshUserTable();
    refreshUserForm();
})

const refreshUserTable = () =>{
    users = ajaxGetRequest('/user/getlist')
    const displayUserProperties = [
        {property:getEmployeeFullName, dataType:'function'},
        {property:"username", dataType:'string'},
        {property:"email", dataType:'string'},
        {property:getStatus, dataType:'function'},
    ]

    fillDataIntoTable(userTab, users, displayUserProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn,true)

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

const getEmployeeFullName = (rowOb) =>{
  return rowOb.employee.fullname;
}
const getStatus = (rowOb) =>{
    if (rowOb.status) {
        return "<p class='working-status'>"+"true"+"</p>"
    }else{
        return "<p class='deleted-status'>"+"false"+"</p>"
    }
  
}

const refreshUserForm = () =>{
    //create empty object
    user = new Object();
    user.roles = new Array();
     //employee list without user account
     employeeListWithoutUserAccount = ajaxGetRequest("/employee/listwithoutuseraccount")
     fillDataIntoSelect(selectEmployee, "Select Employee", employeeListWithoutUserAccount, 'fullname')

     
 

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
