window.addEventListener('load', () => {
    refreshSideBar();

})
const refreshSideBar = () =>{
    console.log("sidebar");
    let userPrivilegeforemployee = ajaxGetRequest("/privilege/bylogedusermodule/employee")
    let userPrivilegeforuser = ajaxGetRequest("/privilege/bylogedusermodule/user")
    let userPrivilegeforprivilege = ajaxGetRequest("/privilege/bylogedusermodule/privilege")
    console.log(userPrivilegeforemployee);
    console.log(userPrivilegeforemployee.insert);
    if (!userPrivilegeforuser.select && !userPrivilegeforprivilege.select) {
        systemUserId.classList.add("d-none");
        systemPriviId.classList.add("d-none");
    } else{
        systemUserId.classList.remove("d-none");
        systemPriviId.classList.remove("d-none");
    }

}