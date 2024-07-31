//define function for ajax get request
const ajaxGetRequest = (url) =>{
    let serverResponse;
    $.ajax(url, {
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function (data, status, ahr) {
            console.log("success" + status + " " + ahr);
            serverResponse = data;
        },
        error: function (ahr, status, errormsg) {
            console.log("Fail" + errormsg + " " + status);
            serverResponse = [];
        }
    })
    return serverResponse;
}
const ajaxGetRequest1 = (url) =>{
    let serverResponse;
    $.ajax(url, {
        async: false,
        type: 'GET',
        dataType: 'text',
        success: function (data, status, ahr) {
            console.log("success" + status + " " + ahr);
            serverResponse = data;
        },
        error: function (ahr, status, errormsg) {
            console.log("Fail" + errormsg + " " + status);
            serverResponse = [];
        }
    })
    return serverResponse;
}
//common ajax function(post,put,delete)
const ajaxRequestBodyMethod = (url, method, object)=>{
    let serverResponse;
    $.ajax(url,{
    async: false,
    type: method,
    data:JSON.stringify(object),
    contentType:'application/json',
    success:function(data, status, ahr){
        console.log(url+" \n" +"success"+status + " " + ahr);
        serverResponse =data;
    },
    error:function(ahr, status, errormsg){
        console.log(url+" \n" +"Fail"+ errormsg+" "+ status +" "+ahr);
        serverResponse = [];
    }
})

return serverResponse;

}


const ajaxRequestBodyMethod2 = (url, method, object1, object2) => {
    let serverResponse;
  
    $.ajax(url,{
      async: false, // Consider using async: true for better user experience
      type: method,
  
      data: JSON.stringify({ object1, object2 }), // Combine objects into a single object
      contentType: 'application/json',
      success: function(data, status, xhr) {
        console.log(url + " \n" + "success" + status + " " + xhr);
        serverResponse = data;
      },
      error: function(xhr, status, errormsg) {
        console.log(url + " \n" + "Fail" + errormsg + " " + status + " " + xhr);
        serverResponse = [];
      }
    });
  
    return serverResponse;
  };
// define function for fill data into select element
const fillDataIntoSelect = (fieldId,message, dataList, property, selectedValue)=>{
    fieldId.innerHTML = '';
    const optionMsg = document.createElement('option');
    optionMsg.value = ""
    optionMsg.classList = "cc"
    optionMsg.innerText = message;
    optionMsg.selected = 'selected';
    optionMsg.disabled = 'disabled';
    fieldId.appendChild(optionMsg)
    
    dataList.forEach(element => {
        let option = document.createElement('option');
        option.value = JSON.stringify(element);
        option.innerText = element[property];
        if (selectedValue == element[property]) {
            option.selected = 'selected';
        }
        fieldId.appendChild(option);
    })

}
const fillDataIntoSelect2 = (fieldId,message, dataList, property, selectedValue)=>{
    fieldId.innerHTML = '';
    const optionMsg = document.createElement('option');
    optionMsg.value = ""
    optionMsg.classList = "cc"
    optionMsg.innerText = message;
    optionMsg.selected = 'selected';
    optionMsg.disabled = 'disabled';
    fieldId.appendChild(optionMsg)
    
    dataList.forEach(element => {
        
        element.duetoRepair.forEach(data=>{
            data.customer_id = element.customer_id.name
            let option = document.createElement('option');
            option.value = JSON.stringify(element);
            option.innerText = data[property];
            if (selectedValue == data[property]) {
                option.selected = 'selected';
            }
            fieldId.appendChild(option);
        })
    })

}
const fillDataIntoSelectMulProp = (fieldId,message, dataList, property,property2,property3, selectedValue)=>{
    fieldId.innerHTML = '';
    const optionMsg = document.createElement('option');
    optionMsg.value = ""
    optionMsg.classList = "cc"
    optionMsg.innerText = message;
    optionMsg.selected = 'selected';
    optionMsg.disabled = 'disabled';
    fieldId.appendChild(optionMsg)
    
    dataList.forEach(element => {
        let option = document.createElement('option');
        option.value = JSON.stringify(element);
        option.innerText = element[property]+" "+element[property2][property3];
        if (selectedValue == element[property]) {
            option.selected = 'selected';
        }
        fieldId.appendChild(option);
    })

}

const fillDataIntoDataList = (fieldId, dataList, property, propertyTwo, property3)=>{
    fieldId.innerHTML = '';
    for(const ob of dataList){
        let option = document.createElement('option');
        if (propertyTwo != null && property3 == null) {
            option.value =`${ob[property]} ${ob[propertyTwo]}`
            
        }else if(property3 != null){
            option.value =`${ob[property]} ${ob[propertyTwo]} ${ob[property3]}`
        }
        else{
            option.value =`${ob[property]}`

        }
        fieldId.appendChild(option)
    }
   
}