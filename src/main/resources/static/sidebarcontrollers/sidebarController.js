window.addEventListener('load', () => {
    refreshSideBar();

})
const refreshSideBar = () =>{
    console.log("sidebar");
    let userPrivilegeforemployee = ajaxGetRequest("/privilege/bylogedusermodule/employee")
    console.log(userPrivilegeforemployee);
    console.log(userPrivilegeforemployee.insert);
    if (!userPrivilegeforemployee.insert) {
        systemUserId.classList.add("d-none");
        systemPriviId.classList.add("d-none");
    } else{
        systemUserId.classList.remove("d-none");
        systemPriviId.classList.remove("d-none");
    }

}