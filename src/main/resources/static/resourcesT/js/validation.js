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
            fieldId.setAttribute("data-bs-toggle","tooltip")
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