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

    searchInSupplyTable()
}

const searchInSupplyTable = ()=>{
    const searchInput = document.getElementById('searchInput');
    const table = document.getElementById('supplyTab');
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = tbody.getElementsByTagName('tr');

    searchInput.addEventListener('keyup', function() {
        const filter = searchInput.value.toLowerCase();
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            let rowContainsFilter = false;

            for (let j = 0; j < cells.length; j++) {
                if (cells[j].innerText.toLowerCase().includes(filter)) {
                    rowContainsFilter = true;
                    break;
                }
            }
            rows[i].style.display = rowContainsFilter ? '' : 'none';
        }
    });
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
    fillDataIntoTable(supplyTab, suppliers, displayProperties, editEmployeeBtn, updateEmployeeBtn, printEmployeeBtn, true)
}

const printEmployeeBtn = () =>{
    console.log("ss");
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
//print
const printEmployeeBtn1 = (rowOb, rowIndex) => {

    console.log("print");
    // const table1 = document.getElementById("tableSupplier")
    const table1 = document.getElementById("printingModal")
    // table1.classList.remove("d-none")
    const tableHtml = table1.outerHTML;
    // const printWindow = window.open();
    // printWindow.document.write(tableHtml);
    let newWindow = window.open()
    newWindow.document.write(
        // "<title>" + rowOb.supplier_code + "</title>" +
        "<title>" + 1000 + "</title>" +
        "<link rel='stylesheet' href='resourcesT/bootstrap_5.3.1/css/bootstrap.min.css'>" + "</link>" +
        "<body>" + tableHtml + "</body>"

        //"<script>tableHtml.classList.remove('d-none');</script>"
    )
    setTimeout(() => { //data load wena eka krnne 500 kin
        newWindow.stop();//load wena eka nwattanwa
        newWindow.print();
        newWindow.close();

    }, 500)

    // printWindow.document.close();
    //id.outerhtml 
    // let newWindow = window.open()
    // newWindow.document.write(
    //     "<title>"+rowOb.supplier_code+"</title>"+
    //     "<link rel='stylesheet' href='resourcesT/bootstrap_5.3.1/css/bootstrap.min.css'>"+"</link>"+
    //     "<table class = table table-dark table-bordered table-striped> "+
    //     "<tr>"+
    //     "<td>"+"code"+"</td>"+
    //     "<td>"+"name"+"</td>"+
    //     "</tr>"+
    //     "<tr>"+
    //     "<td>"+rowOb.supplier_code+"</td>"+
    //     "<td>"+rowOb.name+"</td>"+
    //     "</tr>"


    //     +"</table>"
    //     )

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

const saveDetails = () => {
    bankDetails();

    let serverResponse = ajaxRequestBodyMethod("/supplier", "POST", supplier);
    // alert(serverResponse);
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

}

const addedSupplierDetails = (suppliername, suppliernumber, supplieremail, category, brand) => {
    const supplierDetails1 = `<b>
    Supplier name: ${suppliername}<br>
    Supplier number: ${suppliernumber}<br>
    Supplier email: ${supplieremail}<br>
    Category: ${category}<br>
    Brand: ${brand}
    <b>`;

    Swal.fire({
        title: "Do you want to save?",
        html: supplierDetails1,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
        customClass: {
            title: 'custom-title', // Apply custom CSS class to title
            html: 'custom-html', // Apply custom CSS class to HTML container
        },
    }).then((result) => {
        if (result.isConfirmed) {

            saveDetails()
            Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Not saved", "", "info");
        }
    });
}

// add button eken post krnw data tika controller ekata
const supplierAdd = () => {
    console.log(supplier);
    const getCategoryNameFromObject = () => {
        let userCategory = '';
        supplier.categoriesBrandsWithSuppliers.forEach(element => {
            if (supplier.categoriesBrandsWithSuppliers.length > 1) {

                userCategory = userCategory + element.category_id.name + ","
            } else {
                userCategory = userCategory + element.category_id.name
            }
        })
        return userCategory
    }

    const getBrandNameFromObject = () => {
        let userBrand = '';
        supplier.categoriesBrandsWithSuppliers.forEach(element => {
            if (supplier.categoriesBrandsWithSuppliers.length > 1) {

                userBrand = userBrand + element.brand_id.name + ","
            } else {
                userBrand = userBrand + element.brand_id.name
            }
        })
        return userBrand
    }
    if (supplier.name != null &&
        supplier.contactnumber != null &&
        supplier.email != null &&
        getCategoryNameFromObject() != "" &&
        getBrandNameFromObject() != ""
    ) {

        addedSupplierDetails(supplier.name, supplier.contactnumber, supplier.email, getCategoryNameFromObject(), getBrandNameFromObject())
    } else {
        const alert = Swal.fire({
            title: "Required Details Are Missing",
            text: "Plase check the details and retry",
            icon: "error"
        });
        return alert
    }
    // console.log();
    //bank details tika supplier object ekata set wenawa
    // bankDetails();
    /* let serverResponse = ajaxRequestBodyMethod("/supplier", "POST", supplier);
    let serverResponse1 = ajaxRequestBodyMethod("/supplierbankdetails", "POST", supplierbankdetails);
    let serverResponse2 = ajaxRequestBodyMethod("/supplierhascategory", "POST", supplierhascategory);
    // let serverResponse2 = ajaxRequestBodyMethod("/supplier", "POST", supplierbankdetails);
    console.log(serverResponse);
    console.log(serverResponse1);
    console.log("serverResponse2=====>", serverResponse2);
    alert(serverResponse)

  */

    // Swal.fire({
    //     title: "Do you want to save the changes?",
    //     text: ""+s+"",
    //     showDenyButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: "Save",
    //     denyButtonText: `Don't save`
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         bankDetails();

    //         let serverResponse = ajaxRequestBodyMethod("/supplier", "POST", supplier);
    //         // alert(serverResponse);
    //         refreshSupplyTable();

    //         console.log("serverResponse==>", serverResponse);
    //         console.log("supplier===>", supplier);

    //         // close the form and table 
    //         const table = document.getElementById("empTable");
    //         const form = document.getElementById("empForm");

    //         // Animate table disappearance
    //         form.style.opacity = 1; // Ensure opacity is initially 1
    //         form.style.transition = "opacity 1.5s ease-out";
    //         form.style.display = "none"; // Trigger the animation

    //         // Delay form appearance slightly
    //         setTimeout(function () {
    //             table.style.opacity = 0;
    //             table.style.display = "block";
    //             table.style.transition = "opacity 1.5s ease-in";
    //             table.style.opacity = 1; // Gradually fade in
    //         }, 100); // Adjust the delay as needed

    //         Swal.fire("Saved!", "", "success");
    //     } else if (result.isDenied) {
    //         Swal.fire("Changes are not saved", "", "info");
    //     }
    // });
    // let serverResponse = ajaxRequestBodyMethod("/supplier", "POST", supplier);
    // alert(serverResponse)
    // refreshSupplyTable();

    // console.log("serverResponse==>", serverResponse);
    // console.log("supplier===>", supplier);

    // // close the form and table 
    // const table = document.getElementById("empTable");
    // const form = document.getElementById("empForm");

    // // Animate table disappearance
    // form.style.opacity = 1; // Ensure opacity is initially 1
    // form.style.transition = "opacity 1.5s ease-out";
    // form.style.display = "none"; // Trigger the animation

    // // Delay form appearance slightly
    // setTimeout(function () {
    //     table.style.opacity = 0;
    //     table.style.display = "block";
    //     table.style.transition = "opacity 1.5s ease-in";
    //     table.style.opacity = 1; // Gradually fade in
    // }, 100); // Adjust the delay as needed

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
    refreshSupplyForm();
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