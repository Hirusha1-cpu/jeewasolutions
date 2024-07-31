//create text feild validation function
$(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
});
const textValidation = (fieldId, Pattern, object, property) => {

    const fieldValue = fieldId.value;
    const regPattern = new RegExp(Pattern);

    if (fieldValue !== '') {
        if (regPattern.test(fieldValue)) {
            fieldId.style.border = '2px solid green';
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
const textValidation2 = (fieldId, errorId, Pattern, object, property) => {

    const fieldValue = fieldId.value;
    const regPattern = new RegExp(Pattern);

    if (fieldValue !== '') {
        if (regPattern.test(fieldValue)) {
            fieldId.style.border = '2px solid green';

            errorId.classList.add("is-valid");
            errorId.style = 'display: none';
            // console.log(window['employee']);
            window[object][property] = fieldValue;
        } else {
            //need to bind null

            fieldId.style.border = '2px solid red';
            errorId.classList.add("is-invalid");
            // errorId.innerText = ""
            errorId.style = "color: red; display: inline-block"

            window[object][property] = null;
        }
    } else {
        //need to bind null
        window[object][property] = null;
        if (fieldId.required) {
            fieldId.style.border = '2px solid red';
            errorId.innerText = ""
        } else {
            fieldId.style.border = '2px solid #ced4da';
            errorId.innerText = ""
        }
    }
}

const textValidation3 = (fieldId, Pattern, object, property, tooltipTitle, tooltipPlacement) => {
    const fieldValue = fieldId.value;
    const regPattern = new RegExp(Pattern);

    if (fieldValue !== '') {
        if (regPattern.test(fieldValue)) {
            fieldId.style.border = '2px solid green';
            if (tooltip) { // Check if tooltip object exists
                tooltip.hide(); // Hide the tooltip
                tooltip = null; // Destroy the tooltip object
            }
            window[object][property] = fieldValue;
        } else {
            fieldId.style.border = '2px solid red';
            // Create tooltip only if it doesn't exist
            fieldId.setAttribute("data-bs-toggle", "tooltip")
            tooltip = new bootstrap.Tooltip(fieldId, {
                placement: tooltipPlacement,
                title: tooltipTitle
            });

            tooltip.show();

            window[object][property] = null;
            return tooltip;
        }
    } else {
        window[object][property] = null;
        if (fieldId.required) {
            fieldId.style.border = '2px solid red';
        } else {
            fieldId.style.border = '2px solid #ced4da';
        }
    }
}
//create text feild validation function
const textDValidation = (fieldId, Pattern, object, property) => {

    const fieldValue = fieldId.value;
    const regPattern = new RegExp(Pattern);

    if (fieldValue !== '') {
        if (regPattern.test(fieldValue)) {
            fieldId.style.border = '2px solid green';
            //object property value binding
            // console.log(window['employee']);
            window[object][property] = JSON.parse(fieldValue);
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
// data list validation
const selectDataListValidation = (fieldId, dataListName, object, property, oldObject, propertyone, propertyTwo,property3) => {
    const fieldValue = fieldId.value;


    if (fieldValue !== '') {
        let dataList = window[dataListName];
        let existingIndex = -1
        // mekedi fieldValue.split(" ")[0] meken space wilin wen karama ena palaweni value eka gnnw, 
        //eka check karanwa data[displayProperty] ehekata samanada kiyla dataList.map eken, ita passe
        // e index eka return krnwa

        // let existingIndex = dataList.map(data => data[displayProperty]).indexOf(fieldValue.split(" ")[0])

        // me list eke thyenwda kiyla existingIndex != -1 meken check wenwa
        // for (const data of dataList) {
        for (const index in dataList) {
            console.log(fieldValue);
            if (property3 == "") {
                // if (fieldValue == data[index][propertyone] + " " + data[index][propertyTwo]) {
                if (fieldValue == dataList[index][propertyone] + " " + dataList[index][propertyTwo]) {
                    // existingIndex = true
                    existingIndex = index
                    break;
                }
                
            } else {
                     // if (fieldValue == data[index][propertyone] + " " + data[index][propertyTwo]) {
                        if (fieldValue == dataList[index][propertyone] + " " + dataList[index][propertyTwo] + " " + dataList[index][property3] ) {
                            // existingIndex = true
                            existingIndex = index
                            break;
                        }
            }
        }
        if (existingIndex != -1) {

            fieldId.style.border = '2px solid green';
            if (property != '') {
                
                window[object][property] = dataList[existingIndex];
            }
        } else {
            fieldId.style.border = '2px solid green';
            if (property != '') {

                window[object][property] = null;
            }
        }

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
const radioFieldValidator = (fieldId, pattern, object, property) => {
    const fieldValue = fieldId.value;
    if (fieldId.checked) {
        window[object][property] = fieldValue;
    } else {
        window[object][property] = null;
    }
}

//create function for check box validator
const checkBoxValidator = (fieldId, pattern, object, property, trueValue, falseValue, labelId, labelTrueValue, labelFalseValue) => {
    if (fieldId.checked) {
        window[object][property] = trueValue;
        labelId.innerText = labelTrueValue;
    }
    else {
        window[object][property] = falseValue;
        labelId.innerText = labelFalseValue;
    }

    // let initialCheckedState = fieldId.checked; // Store initial checkbox state

    // fieldId.addEventListener('change', function () {
    //     if (fieldId.checked) {
    //         window[object][property] = trueValue;
    //         labelId.innerText = labelTrueValue;
    //     } else {
    //         window[object][property] = falseValue;
    //         labelId.innerText = labelFalseValue;
    //     }
    // });

    // // Set default values based on initial state (optional)
    // if (!initialCheckedState) {
    //     window[object][property] = someDefaultValue;
    //     labelId.innerText = someDefaultLabel;
    // }
}

const validateFileield = (fileElement, object, imageProperty, imageNameProperty, priviewObject, priviewText) => {
    if (fileElement.files != null) {
        console.log(fileElement.files);
        let file = fileElement.files[0]
        window[object][imageNameProperty] = file.name;

        let fileReader = new FileReader()
        fileReader.onload = (e) => {
            priviewObject.src = e.target.result
            window[object][imageProperty] = btoa(e.target.result);
        }


        fileReader.readAsDataURL(file);



    }
}

const sweetalert = () => {
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
}

