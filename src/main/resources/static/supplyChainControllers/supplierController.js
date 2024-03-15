window.addEventListener('load', () => {
    refreshSupplyForm();
    // refreshSupplyTable();
    bankDetails();
})

const refreshSupplyForm = () => {
    supplier = new Object();
    supplierhascategory = new Object();

    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectCategory, "Select Category", categories, 'name')

    brands = ajaxGetRequest("/brand/getlist")
    fillDataIntoSelect(selectBrand, "Select Brand", brands, 'name')

    brandByCategory.innerHTML = ""
    categoryByBrand.innerHTML = ""

}

const filterByCategory = () => {
    // supplier = new Object();
    supplier.categoriesBrandsWithSuppliers = []
    listCategoryViseBrandNames = ajaxGetRequest("/brand/listbycategory/" + JSON.parse(selectCategory.value).id) // meken check box generate wenna one
    console.log("json value", JSON.parse(selectCategory.value).id);
    console.log("listBrandViseCategoryNames==>", listCategoryViseBrandNames);
    brandByCategory.innerHTML = ""
    listCategoryViseBrandNames.forEach(element => {
        console.log(element);
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element

        input.onchange = function () {
            if (this.checked) {
                // supplier.categoriesBrandsWithSuppliers.brand_id.name.push(element)
                const newBrand = {
                    brand_id: { name: element }, // Assuming you want only brand name for now
                    // Add category_id if needed based on your data structure
                };
                supplier.categoriesBrandsWithSuppliers.push(newBrand)
            }
        }

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

        const label = document.createElement("label")
        label.className = "form-check-label"
        label.innerText = element

        div.appendChild(label)
        div.appendChild(input)

        brandByCategory.appendChild(div)
    });

}
const filterByBrand = () => {
    // supplier = new Object();
    supplier.categoriesBrandsWithSuppliers = []
    listBrandViseCategories = ajaxGetRequest("/category/listbybrand/" + JSON.parse(selectBrand.value).id) // meken check box generate wenna one
    console.log("json value", JSON.parse(selectBrand.value).id);
    console.log("listCategoryViseBrand==>", listBrandViseCategories);
    categoryByBrand.innerHTML = ""
    listBrandViseCategories.forEach(element => {
        console.log(element);
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element

        input.onchange = function () {
            if (this.checked) {
                const newCategory = {
                    category_id: { name: element }, // Assuming you want only brand name for now
                    // Add category_id if needed based on your data structure
                };
                supplier.categoriesBrandsWithSuppliers.push(newCategory)
            }
        }
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

        const label = document.createElement("label")
        label.className = "form-check-label"
        label.innerText = element

        div.appendChild(label)
        div.appendChild(input)

        categoryByBrand.appendChild(div)
    });

}

const refreshSupplyTable = () => {
    suppliers = ajaxGetRequest('/supplier/getlist')
    const displayProperties = [
        { property: 'name', dataType: 'string' },
        { property: 'memory', dataType: 'string' },
        { property: 'power_spply', dataType: 'string' },
        { property: 'sales_price', dataType: 'string' },
        { property: 'purchase_price', dataType: 'string' },
        { property: 'min_discount_price', dataType: 'string' },
        { property: 'max_discount_price', dataType: 'string' },
        { property: getBrand, dataType: 'function' },
        { property: getCategory, dataType: 'function' },
        { property: getPcpartstatus, dataType: 'function' },
    ]

    fillDataIntoTable(graphicTab, graphic_Cards, displayProperties, editEmployeeBtn, updateEmployeeBtn, deleteEmployeeBtn, true)


}
const getBrand = (rowObject) => {
    return "<p class = 'working-status'>" + rowObject.brand_id.name + "</p>"
}

const getCategory = (rowObject) => {
    return "<p class = 'working-status'>" + rowObject.category_id.name + "</p>"
}

const getPcpartstatus = (rowObject) => {
    return "<p class = 'working-status'>" + rowObject.pc_part_status_id.status + "</p>"
}

const editEmployeeBtn = () => {
    console.log("edit");
}
const updateEmployeeBtn = () => {
    console.log("update");
}
const deleteEmployeeBtn = () => {
    console.log("delete");
}

const bankDetails = () =>{

    supplier.bankDetailsOfSuppliers = []
    
    const input1 = document.getElementById("inputBankName")
    const input2 = document.getElementById("inputBankBranch")
    const input3 = document.getElementById("inputAccName")
    const input4 = document.getElementById("inputAccHolderName")

    const saveBankDetailsButton = document.querySelector(".suppAdd");
  saveBankDetailsButton.addEventListener("click", () => {
    const newBankDetails = {
      bankname: input1.value,
      branchname: input2.value,
      accno: input3.value,
      accholdername: input4.value,
    };

    supplier.bankDetailsOfSuppliers.push(newBankDetails);
    console.log(supplier.bankDetailsOfSuppliers); // For verification

    // 3. (Optional) Clear input fields or update UI to reflect changes
  });

}

const supplierAdd = () => {

    let serverResponse = ajaxRequestBodyMethod("/supplier", "POST", supplier);
    // let serverResponse2 = ajaxRequestBodyMethod("/supplier", "POST", supplierbankdetails);
    console.log(serverResponse);

    console.log("supplier", supplier);
}