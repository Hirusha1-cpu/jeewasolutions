//create text feild validation function
const textValidation = (fieldId, Pattern, object, property) => {

    const fieldValue = fieldId.value;
    const regPattern = new RegExp(Pattern);

    if (fieldValue !== '') {
        if (regPattern.test(fieldValue)) {
            fieldId.style.border = '2px solid green';
            //object property value binding
            // console.log(window['employee']);
            window[object][property] = fieldValue;
        } else {
            //need to bind null

            fieldId.style.border = '2px solid red';
            window[object][property] = null;

        }
    } else {
         //need to bind null
        window[object][property] = null;
        if (fieldId.required) {
            fieldId.style.border = '2px solid red';
        } else {
            fieldId.style.border = '2px solid #ced4da';
        }
    }
}

//create select field validation function
const selectFieldValidation = (fieldId, Pattern, object, property) => {
    const fieldValue = fieldId.value;


    if (fieldValue !== '') {

        fieldId.style.border = '2px solid green';
        window[object][property] = fieldValue;

    } else {

        if (fieldId.required) {
            fieldId.style.border = '2px solid red';
        } else {
            fieldId.style.border = '2px solid #ced4da';
        }
    }
}
//create select field validation function
const selectDFieldValidation = (fieldId, Pattern, object, property) => {
    const fieldValue = fieldId.value;


    if (fieldValue !== '') {

        fieldId.style.border = '2px solid green';
        window[object][property] = JSON.parse(fieldValue);

    } else {
        window[object][property] = null;
        if (fieldId.required) {
            fieldId.style.border = '2px solid red';
        } else {
            fieldId.style.border = '2px solid #ced4da';
        }
    }
}

//create date field validation function
const dateFieldValidation = (fieldId, Pattern, object, property) => {
    const fieldValue = fieldId.value;
    const regPattern = new RegExp(Pattern);

    if (fieldValue !== '') {
        if (regPattern.test(fieldValue)) {
            fieldId.style.border = '2px solid green';
            //object property value binding
            console.log(window['employee']);
            window[object][property] = fieldValue;
        } else {
            //need to bind null

            fieldId.style.border = '2px solid red';
            window[object][property] = null;

        }
    } else {
         //need to bind null
        window[object][property] = null;
        if (fieldId.required) {
            fieldId.style.border = '2px solid red';
        } else {
            fieldId.style.border = '2px solid #ced4da';
        }
    }
}

//create function for radio validator
const radioFieldValidator = (fieldId, pattern, object, property)=>{
    const fieldValue = fieldId.value;
    if(fieldId.checked) {
        window[object][property] = fieldValue;
    }else{
        window[object][property] = null;
    }
}

//create function for check box validator
const checkBoxValidator = (fieldId, pattern, object, property, trueValue,falseValue, labelId, labelTrueValue,labelFalseValue)=>{
    if(fieldId.checked){
        window[object][property] = trueValue;
        labelId.innerText = labelTrueValue;
    }
    else{
        window[object][property] = falseValue;
        labelId.innerText = labelFalseValue;
    }
}