window.addEventListener('load', () => {
    refreshSupplyForm();
    // refreshSupplyTable();
})

const refreshSupplyForm =() =>{
    supplierhascategory = new Object();

    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectCategory,"Select Category", categories, 'name' )

    brands = ajaxGetRequest("/brand/getlist")
    fillDataIntoSelect(selectBrand,"Select Brand", brands, 'name' )

}

const filterByCategory = () =>{
    listCategoryViseBrandNames = ajaxGetRequest("/brand/listbycategory/" + JSON.parse(selectCategory.value).id) // meken check box generate wenna one
    console.log("json value",JSON.parse(selectCategory.value).id);
    console.log("listBrandViseCategoryNames==>",listCategoryViseBrandNames);
    brandByCategory.innerHTML = ""
    listCategoryViseBrandNames.forEach(element => {
        console.log(element);
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element

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
const filterByBrand = () =>{
    listBrandViseCategories = ajaxGetRequest("/category/listbybrand/" + JSON.parse(selectBrand.value).id) // meken check box generate wenna one
    console.log("json value",JSON.parse(selectBrand.value).id);
    console.log("listCategoryViseBrand==>",listBrandViseCategories);
    categoryByBrand.innerHTML = ""
    listBrandViseCategories.forEach(element => {
        console.log(element);
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element

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

