document.addEventListener('DOMContentLoaded', function () {
  const myTabsEl = document.getElementById('myTabs');
  const firstTab = new bootstrap.Tab(myTabsEl.querySelector('.nav-tabs .nav-link.active'));
  firstTab.show();
  const myTabsEl2 = document.getElementById('myTabs2');
  const firstTab2 = new bootstrap.Tab(myTabsEl2.querySelector('.nav-tabs .nav-link.active'));
  firstTab2.show();

});

window.addEventListener('load', () => {
  refreshRepairForm();
})

const refreshRepairForm = ()=>{
  const repairs = ajaxGetRequest("/repair/getlist")
  console.log(repairs);
  fillDataIntoSelect2(selectUrgentRepairs, "Select Uregent Repairs", repairs, 'fault')


}

const getSelectedRepair = () =>{
  repair = JSON.parse(selectUrgentRepairs.value)
  console.log(repair);
}

