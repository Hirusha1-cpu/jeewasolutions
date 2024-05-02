window.addEventListener('load', () => {
    refreshSupplyForm();
    refreshSupplyTable();

})

const refreshSupplyForm = () => {
    supplier = new Object();
    supplierbankdetails = new Object();
    supplierhascategory = new Object();
    supplierhascategory = []
    supplier.categoriesBrandsWithSuppliers = []
    
    //category ekata data enter krnna 
    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectCategory, "Select Category", categories, 'name')

    // brands = ajaxGetRequest("/brand/getlist")
    // fillDataIntoSelect(selectBrand, "Select Brand", brands, 'name')

    //category 
    brandByCategory.innerHTML = ""
    // categoryByBrand.innerHTML = ""


}

//category ekk select krama meka call wela item tika check boxes awilla eka add krnn option eka enwa
const filterByCategory = () => {

    categoryBrand = new Object();
    // categoryBrand.category_id = JSON.parse(selectCategory.value);
    console.log(categoryBrand.category_id);

    // category eka click krama brands tika enw me query eken
    listCategoryViseBrandNames = ajaxGetRequest("/brand/listbrandbycategory/" + JSON.parse(selectCategory.value).id) // meken check box generate wenna one
    console.log("json value", JSON.parse(selectCategory.value).id);
    console.log("listBrandViseCategoryNames==>", listCategoryViseBrandNames);
    //check boxes generate wenwa
    brandByCategory.innerHTML = ""
    listCategoryViseBrandNames.forEach(element => {
        console.log(element);
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element.name

        input.onchange = function () {
            if (this.checked) {
                console.log("ss clicked", element.id);
                // selectedCategoryBrand me object ekata set wenw category id ekai brand id ekai
                const selectedCategoryBrand = {};
                selectedCategoryBrand.category_id = JSON.parse(selectCategory.value);
                selectedCategoryBrand.brand_id = element

                // categoryBrand.brand_id = element;
                // supplier.categoriesBrandsWithSuppliers.push(categoryBrand)
                supplier.categoriesBrandsWithSuppliers.push(selectedCategoryBrand)
            } else {
                //uncheck ewa handle krnw
                supplier.categoriesBrandsWithSuppliers.forEach((ele, ind) => {
                    if (ele.category_id.id == JSON.parse(selectCategory.value).id && ele.brand_id.id == element.id) {
                        supplier.categoriesBrandsWithSuppliers.splice(ind, 1);
                    }
                })

            }
        }

        const label = document.createElement("label")
        label.id = "lbl" + element.name
        label.className = "form-check-label"
        label.innerText = element.name

        div.appendChild(label)
        div.appendChild(input)

        brandByCategory.appendChild(div)


        // input.onchange = function () {
        //     if (this.checked) {
        //         user.roles.push(element)

        //     } else {
        //         console.log(this.id);
        //         console.log(this.id.substring(3));
        //         console.log("unchecked element: " + element);
        //         let extIndex = user.roles.map(item => item.name).indexOf(element.name)
        //         if (extIndex != -1) {
        //             user.roles.splice(extIndex, 1);
        //         }
        //     }
        // }


    });

}
const filterByBrand = () => {
    console.log("hello");
}
// const filterByBrand = () => {
//     // supplier = new Object();
//     supplier.categoriesBrandsWithSuppliers = []
//     listBrandViseCategories = ajaxGetRequest("/category/listbybrand/" + JSON.parse(selectBrand.value).id) // meken check box generate wenna one
//     console.log("json value", JSON.parse(selectBrand.value).id);
//     console.log("listCategoryViseBrand==>", listBrandViseCategories);
//     categoryByBrand.innerHTML = ""
//     listBrandViseCategories.forEach(element => {
//         console.log(element);
//         const div = document.createElement("div")
//         div.className = "col-lg-4 form-check"

//         const input = document.createElement("input")
//         input.type = "checkbox"
//         input.className = "form-check-input"
//         input.id = "chk" + element

//         input.onchange = function () {
//             if (this.checked) {
//                 const newCategory = {
//                     category_id: { name: element }, // Assuming you want only brand name for now
//                     // Add category_id if needed based on your data structure
//                 };
//                 supplier.categoriesBrandsWithSuppliers.push(newCategory)
//                 supplierhascategory.push(newCategory)


//             }
//         }
//         // input.onchange = function () {
//         //     if (this.checked) {
//         //         user.roles.push(element)

//         //     } else {
//         //         console.log(this.id);
//         //         console.log(this.id.substring(3));
//         //         console.log("unchecked element: " + element);
//         //         let extIndex = user.roles.map(item => item.name).indexOf(element.name)
//         //         if (extIndex != -1) {
//         //             user.roles.splice(extIndex, 1);
//         //         }
//         //     }
//         // }

//         const label = document.createElement("label")
//         label.className = "form-check-label"
//         label.innerText = element

//         div.appendChild(label)
//         div.appendChild(input)

//         categoryByBrand.appendChild(div)
//     });

// }



//main table eka
const refreshSupplyTable = () => {
    suppliers = ajaxGetRequest('/supplier/getlist')
    const displayProperties = [
        { property: 'name', dataType: 'string' },
        { property: 'supplier_code', dataType: 'string' },
        { property: 'contactnumber', dataType: 'string' },
        { property: getCategoryName, dataType: 'function' },
        { property: getBrandName, dataType: 'function' },
        { property: getBankDetails, dataType: 'function' },
    ]
    //main supply table eka
    fillDataIntoTable(supplyTab, suppliers, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)
}

const getCategoryName = (rowObject) => {
    let userCategory = '';
    rowObject.categoriesBrandsWithSuppliers.forEach(element => {
        userCategory = userCategory + "<p class = 'working-status'>" + element.category_id.name + "</p>"
    })
    return userCategory
}

const getBrandName = (rowObject) => {
    let userBrand = '';
    rowObject.categoriesBrandsWithSuppliers.forEach(element => {
        userBrand = userBrand + "<p class = 'working-status'>" + element.brand_id.name + "</p>"
    })
    return userBrand
}

const getBankDetails = (rowObject) => {
    let bank = '';
    rowObject.bankDetailsOfSuppliers.forEach(element => {
        bank = bank + "<p class = 'working-status'>" + element.bankname + "</p>"
    })
    return bank

}

//refill supply form
const editEmployeeBtn = (item) => {
    console.log("edit");

    supplier = JSON.parse(JSON.stringify(item));
    oldsupplier = JSON.parse(JSON.stringify(item));
    console.log(supplier);
    supplierName.value = supplier.name
    supplierContact.value = supplier.contactnumber
    supplierEmail.value = supplier.email
    // supplierAddress.value = supplier.email
    fillDataIntoSelect(selectCategory, "Select Category", categories, 'name', supplier.categoriesBrandsWithSuppliers[0].category_id.name)
    //open category table collapse model
    const collapseElement = document.getElementById("collapseCategory");

    // Remove the 'collapse' class to open the collapse
    collapseElement.classList.remove("collapse");

    // Optionally, you can also set aria-expanded attribute to 'true' for accessibility
    collapseElement.setAttribute("aria-expanded", "true");

    displayProperties = [
        { property: getCategorySupplier, dataType: 'function' },
        { property: getBrandSupplier, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(selectedCategoryTable, supplier.categoriesBrandsWithSuppliers, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

    //open bank collapse model
    const collapseBankElement = document.getElementById("collapseBankDetails");

    // Remove the 'collapse' class to open the collapse
    collapseBankElement.classList.remove("collapse");

    // Optionally, you can also set aria-expanded attribute to 'true' for accessibility
    collapseBankElement.setAttribute("aria-expanded", "true");

    inputBankName.value = supplier.bankDetailsOfSuppliers[0].bankname
    inputBankBranch.value = supplier.bankDetailsOfSuppliers[0].branchname
    inputAccName.value = supplier.bankDetailsOfSuppliers[0].accno
    inputAccHolderName.value = supplier.bankDetailsOfSuppliers[0].accholdername

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
const updateEmployeeBtn = () => {
    console.log("update");
}
const deleteEmployeeBtn = () => {
    console.log("delete");
}

// enter bank details
const bankDetails = () => {

    supplier.bankDetailsOfSuppliers = []

    const input1 = document.getElementById("inputBankName")
    const input2 = document.getElementById("inputBankBranch")
    const input3 = document.getElementById("inputAccName")
    const input4 = document.getElementById("inputAccHolderName")

    // input field values set eka bankdetail entity ekata set wen widhata set krnwa
    const newBankDetails = {
        bankname: input1.value,
        branchname: input2.value,
        accno: input3.value,
        accholdername: input4.value,
        // supplier_id:{id: 3}
    };

    //supplier object ekata supplier.bankDetailsOfSuppliers array ekat set wenwa
    supplier.bankDetailsOfSuppliers.push(newBankDetails);
    console.log(supplier.bankDetailsOfSuppliers);

}

//category collapse eke add button eka
const addToCateTable = () => {
    console.log(supplier);
    //fill data into category table
    categoryTable()
}

//fill data into category table
const categoryTable = () => {
    displayProperties = [
        { property: getCategorySupplier, dataType: 'function' },
        { property: getBrandSupplier, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(selectedCategoryTable, supplier.categoriesBrandsWithSuppliers, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

}

// const getSupplierName = (rowOb) => { return rowOb.name ?? "-"; }
const getCategorySupplier = (rowOb) => { return rowOb.category_id.name ?? "-"; }
const getBrandSupplier = (rowOb) => { return rowOb.brand_id.name ?? "-"; }

const purchaseOrderBtn = (rowObject) => {
    console.log("clicked purchase order");
}
const deletePurchBtn = (rowObject) => {
    console.log("clicked delete purchase order");
}
const sendPurchBtn = (rowObject) => {
    console.log("clicked send purchase order");
}

// add button eken post krnw data tika controller ekata
const supplierAdd = () => {
    // console.log();
    //bank details tika supplier object ekata set wenawa
    bankDetails();
    /* let serverResponse = ajaxRequestBodyMethod("/supplier", "POST", supplier);
    let serverResponse1 = ajaxRequestBodyMethod("/supplierbankdetails", "POST", supplierbankdetails);
    let serverResponse2 = ajaxRequestBodyMethod("/supplierhascategory", "POST", supplierhascategory);
    // let serverResponse2 = ajaxRequestBodyMethod("/supplier", "POST", supplierbankdetails);
    console.log(serverResponse);
    console.log(serverResponse1);
    console.log("serverResponse2=====>", serverResponse2);
    alert(serverResponse)

  */
    let serverResponse = ajaxRequestBodyMethod("/supplier", "POST", supplier);
    alert(serverResponse)
    refreshSupplyTable();

    console.log("serverResponse==>", serverResponse);
    console.log("supplier===>", supplier);

    // close the form and table 
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

    // console.log("supplier bank details===>", supplierbankdetails);
    // console.log("supplier category details===>", supplierhascategory);
}
//update button eken PUT krnw data tika controller ekata
const supplierUpdate = () => {
    // console.log();
    bankDetails();
    //
    let serverResponse = ajaxRequestBodyMethod("/supplier", "PUT", supplier);
    alert(serverResponse)
    refreshSupplyTable();
    console.log("serverResponse==>", serverResponse);
    console.log("supplier===>", supplier);

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

    //   console.log("supplier bank details===>", supplierbankdetails);
    // console.log("supplier category details===>", supplierhascategory);
}