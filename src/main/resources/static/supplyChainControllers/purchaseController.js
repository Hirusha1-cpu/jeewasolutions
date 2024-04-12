window.addEventListener('load', () => {
    refreshPurchaseForm();
    // refreshSupplyTable();

})

const refreshPurchaseForm = () => {
    purchase = new Object();
    purchase.purchaseHasCategory = []
    // purchase.supplier_id = [];
    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectPurchCategory,"Select Category",categories, 'name')
}

const filterCategoryItems = () => {
    categoryId = new Object();
    // supplierId = new Object();
    supplierId = null; // Reset supplierId on category change

    // itemnames = new Object();


    supplierlistByCategory.innerHTML = " "
    categoryItemCheckBoxes.innerHTML = " "

    // purchase.purchaseHasCategory.category_id = []
    console.log("Hello I clicked category", JSON.parse(selectPurchCategory.value).id,
        (JSON.parse(selectPurchCategory.value).name).replace(/\s/g,'').toLowerCase()        
    );
    
    // replace(/\s/g, ''): This part replaces all occurrences of whitespace characters (\s) with an empty string ('') using a regular expression (/g flag ensures global replacement).
    const categoryname = (JSON.parse(selectPurchCategory.value).name).replace(/\s/g, '').toLowerCase()
    categoriesItems = ajaxGetRequest(`/${categoryname}/getlist`, categoryname)

    categoryId.category_id = JSON.parse(selectPurchCategory.value)
    // purchase.purchaseHasCategory.push(categoryId)

    const supplierList = ajaxGetRequest('/supplier/namebycategory/' + JSON.parse(selectPurchCategory.value).id)

    supplierList.forEach(element => {
        console.log(element);
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element.id


        input.onchange = function () {
            if (this.checked) {
                console.log("ss clicked", element.name);

                // supplierId.supplier_id =  element
                // purchase.push(supplierId)
                // purchase.supplier_id = element;
                supplierId = element; // Set supplier_id to the selected supplier's ID
            }

        }

        const label = document.createElement("label")
        label.id = "lbl" + element.id
        label.className = "form-check-label"
        label.innerText = element.name

        div.appendChild(label)
        div.appendChild(input)

        supplierlistByCategory.appendChild(div)
    });

    categoriesItems.forEach(element => {
        console.log(element.name);
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element.name


        input.onchange = function () {
            if (this.checked) {
                console.log("ss clicked", element.id);

                // const itemname1 = {
                //     itemname: element.name
                // }
                
                categoryId.itemname = element.name

                console.log(categoryId);

                // purchase.purchaseHasCategory.push(categoryId)
                // categoryBrand.brand_id = element;
                // supplier.categoriesBrandsWithSuppliers.push(categoryBrand)
                // return categoryId
            }
            // else{
            //     supplier.categoriesBrandsWithSuppliers.forEach( (ele , ind)=>{
            //         if (ele.category_id.id == JSON.parse(selectCategory.value).id && ele.brand_id.id == element.id) {
            //            supplier.categoriesBrandsWithSuppliers.splice(ind, 1); 
            //         }
            //     })

            // }
        }

        const label = document.createElement("label")
        label.id = "lbl" + element.name
        label.className = "form-check-label"
        label.innerText = element.name

        div.appendChild(label)
        div.appendChild(input)

        categoryItemCheckBoxes.appendChild(div)
    });

}

const allSuppliers = () => {
   
    console.log("jjjj");
    supplierlistByCategory.innerHTML = " "
    const allName = ajaxGetRequest("/supplier/getlist")
    allName.forEach(element => {
        console.log(element.name);
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element.name

        const label = document.createElement("label")
        label.id = "lbl" + element.name
        label.className = "form-check-label"
        label.innerText = element.name

        div.appendChild(label)
        div.appendChild(input)

        supplierlistByCategory.appendChild(div)
    });

}

const purchaseQtyy = () =>{
    const purchaseQty = document.querySelector(".purchaseQty")

    console.log(purchaseQty.value);

    categoryId.qty = purchaseQty.value

    // purchase.purchaseHasCategory.push(categoryId)

}

const purchaseItemQty = () =>{
    const purchaseItemPrice = document.querySelector(".purchaseItemPrice")

    console.log(purchaseItemPrice.value);

    categoryId.itemprice = purchaseItemPrice.value

    const lineprice = (purchaseQty.value)*(purchaseItemPrice.value)

    categoryId.lineprice = lineprice

    purchase.purchaseHasCategory.push(categoryId)

}

const addItemSupp = () => {
    console.log("hii");
    // purchase.purchaseHasCategory = []

    console.log("purchase", purchase);
    purchase.supplier_id = supplierId; // Set supplier_id in the purchase object


    let serverResponse = ajaxRequestBodyMethod("/purchase", "POST", purchase);
    alert(serverResponse)
    console.log("serverResponse==>", serverResponse);

}







