window.addEventListener('load', () => {
    // refresh the purchase form
    refreshPurchaseForm();
    // refresh the purchase table 
    refreshPurchaseTable();

})

//refresh the purchase form eka
const refreshPurchaseForm = () => {
    purchase = new Object();
    purchase.purchaseHasCategory = []
    supplierArray = [];
    itemCodeCounter = 1;

    // purchase.supplier_id = [];
    //select ekata dann one category eka 
    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectPurchCategory, "Select Category", categories, 'name')

    supplierlistByCategory.innerHTML = " "
    categoryItemCheckBoxes.innerHTML = " "
    purchaseQty.value = ""
    purchaseItemPrice.value = ""
}

//refresh the purchase table
const refreshPurchaseTable = () => {

    purchases = ajaxGetRequest('/purchase/getlist')
    const displayProperties = [
        { property: getPurchaseCode, dataType: 'function' },
        { property: getPurchCategoryName, dataType: 'function' },
        { property: getPurchItemName, dataType: 'function' },
        { property: getPurchItemQty, dataType: 'function' },
        { property: getPurchItemSupplier, dataType: 'function' },
    ]


    fillDataIntoTable(purchaseTab, purchases, displayProperties, refillPurchBtn, updateEmployeeBtn, deleteEmployeeBtn, true, null)

}


const getPurchaseCode = (rowOb) => {
    return rowOb.purchase_code;
}
const getPurchCategoryName = (rowOb) => {
    // return rowOb.purchaseHasCategory;
    // array ekk hinda forEach ekk danwa
    let purchCategory = '';
    rowOb.purchaseHasCategory.forEach(element => {
        purchCategory = purchCategory + "<p class = 'working-status'>" + element.category_id.name + "</p>"
    })
    return purchCategory

}
const getPurchItemName = (rowOb) => {
    // return rowOb.purchaseHasCategory;
    let purchItemName = '';
    rowOb.purchaseHasCategory.forEach(element => {
        purchItemName = purchItemName + "<p class = 'working-status'>" + element.itemname + "</p>"
    })
    return purchItemName

}
const getPurchItemQty = (rowOb) => {
    // return rowOb.purchaseHasCategory;
    let purchQty = '';
    rowOb.purchaseHasCategory.forEach(element => {
        purchQty = purchQty + "<p class = 'working-status'>" + element.qty + "</p>"
    })
    return purchQty

}
const getPurchItemSupplier = (rowOb) => {
    // return rowOb.supplier_id.name
    return rowOb.supplier_id.name
}
//refill the purchase order form 
const refillPurchBtn = (item) => {

    //empty the supplierlistByCategory,categoryItemCheckBoxes
    supplierlistByCategory.innerHTML = " "
    categoryItemCheckBoxes.innerHTML = " "
    //object eka json object ekk kranwa
    purchase = JSON.parse(JSON.stringify(item));
    oldpurchase = JSON.parse(JSON.stringify(item));

    console.log("edit");
    //purchase.purchaseHasCategory.length eka 1 ta wadi nm prompt ekk call wenwa
    if (purchase.purchaseHasCategory.length > 1) {
        const inputNo = prompt("Enter a value for purchase.purchaseHasCategory[0]:");
        const inputValue = parseInt(inputNo)
        console.log(inputValue);
        //meken input value eka aragena eka set karanwa purchase.purchaseHasCategory[] ekat dagnna 
        if (!isNaN(inputValue)) {
           // Fill data into select and input fields
            fillDataIntoSelect(selectPurchCategory, "Select Category", categories, 'name', purchase.purchaseHasCategory[inputValue].category_id.name);
            purchaseQty.value = purchase.purchaseHasCategory[inputValue].qty;
            purchaseItemPrice.value = purchase.purchaseHasCategory[inputValue].itemprice;            
        } 
    }
    //category length eka 1ta samana nm array[0] set wenw
    else {
        // Fill data into select and input fields
        fillDataIntoSelect(selectPurchCategory, "Select Category", categories, 'name', purchase.purchaseHasCategory[0].category_id.name);
        purchaseQty.value = purchase.purchaseHasCategory[0].qty;
        purchaseItemPrice.value = purchase.purchaseHasCategory[0].itemprice;
      
    }
    
    // fillDataIntoSelect(selectPurchCategory, "Select Category", categories, 'name', purchase.purchaseHasCategory[1].category_id.name)
    // purchaseQty.value = purchase.purchaseHasCategory[1].qty
    // purchaseItemPrice.value = purchase.purchaseHasCategory[1].itemprice

    categoriesItemsList = purchase.purchaseHasCategory
    console.log(categoriesItemsList);
    console.log(purchase.supplier_id);

    categoriesItemsList.forEach(element => {
        console.log(element.name);
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element.itemname

        input.checked = true
        // input.onchange = function () {
        //     if (this.checked) {
        //         console.log("ss clicked", element.id);
        //         categoryId.itemname = element.itemname
        //         console.log(categoryId);
        //     }

        // }

        const label = document.createElement("label")
        label.id = "lbl" + element.itemname
        label.className = "form-check-label"
        label.innerText = element.itemname

        div.appendChild(label)
        div.appendChild(input)

        categoryItemCheckBoxes.appendChild(div)
    });


    const div1 = document.createElement("div")
    div1.className = "col-lg-4 form-check"

    const input1 = document.createElement("input")
    input1.type = "checkbox"
    input1.className = "form-check-input"
    input1.id = "chk" + purchase.supplier_id.name

    input1.checked = true
    // input.onchange = function () {
    //     if (this.checked) {
    //         console.log("ss clicked", element.id);
    //         categoryId.itemname = element.itemname
    //         console.log(categoryId);
    //     }

    // }

    const label1 = document.createElement("label")
    label1.id = "lbl" + purchase.supplier_id.name
    label1.className = "form-check-label"
    label1.innerText = purchase.supplier_id.name

    div1.appendChild(label1)
    div1.appendChild(input1)

    supplierlistByCategory.appendChild(div1)

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

//category eka select karama ekata adala category eke findall ekk call krla item names tika laba gnnwa
const filterCategoryItems = () => {
    categoryId = new Object();
    // supplierId = new Object();
    supplierId = null; // Reset supplierId on category change

    // itemnames = new Object();

    supplierlistByCategory.innerHTML = " "
    categoryItemCheckBoxes.innerHTML = " "

    // purchase.purchaseHasCategory.category_id = []
    console.log("Hello I clicked category", JSON.parse(selectPurchCategory.value).id,
        (JSON.parse(selectPurchCategory.value).name).replace(/\s/g, '').toLowerCase()
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
//siyalu supplierla tika genna gnnwa
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

const purchaseQtyy = () => {
    const purchaseQty = document.querySelector(".purchaseQty")

    console.log(purchaseQty.value);

    categoryId.qty = purchaseQty.value

    // purchase.purchaseHasCategory.push(categoryId)

}

const purchaseItemQty = () => {
    const purchaseItemPrice = document.querySelector(".purchaseItemPrice")

    console.log(purchaseItemPrice.value);

    categoryId.itemprice = purchaseItemPrice.value

    const lineprice = (purchaseQty.value) * (purchaseItemPrice.value)

    categoryId.lineprice = lineprice

    // purchase.purchaseHasCategory.push(categoryId)

}


const itemTable = () => {
    displayProperties = [
        { property: getCode, dataType: 'function' },
        { property: getItemCategory, dataType: 'function' },
        { property: getItemName, dataType: 'function' },
        { property: getItemQty, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(ItemPurchTable, purchase.purchaseHasCategory, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

}
const purchaseOrderBtn = (rowObject) => {
    console.log("clicked purchase order");
}
const deletePurchBtn = (rowObject) => {
    console.log("clicked delete purchase order");
}
const sendPurchBtn = (rowObject) => {
    console.log("clicked send purchase order");
}

const getItemCategory = (rowOb) => { return rowOb.category_id.name }
const getCode = (rowOb) => { return rowOb.itemcode }
const getItemName = (rowOb) => { return rowOb.itemname }
const getItemQty = (rowOb) => { return rowOb.qty }

const supplierTable = () => {

    // Push the supplier_id object into the array
    supplierArray.push(purchase.supplier_id);
    displayProperties = [
        { property: getItemCode, dataType: 'function' },
        { property: getSupplierName, dataType: 'function' },
        { property: getSupplierStatus, dataType: 'function' },
        { property: getSupplierContact, dataType: 'function' },
    ]
    fillDataIntoPurcahseTable(ItemSuppTable, supplierArray, displayProperties, purchaseOrderBtn, deletePurchBtn, sendPurchBtn, true)

}

const getItemCode = (rowOb) => { return rowOb.supplier_code }
const getSupplierName = (rowOb) => { return rowOb.name }
const getSupplierStatus = (rowOb) => { return rowOb.supplierstatus_id ?? "_" }
const getSupplierContact = (rowOb) => { return rowOb.email }

const generateItemCode = () => {
    const itemCode = "ITEM" + itemCodeCounter.toString().padStart(3, '0'); // Construct item code
    itemCodeCounter++; // Increment counter for next item
    return itemCode;
}

const addItemSuppTable = () => {

    console.log("purchase", purchase);
    purchase.supplier_id = supplierId; // Set supplier_id in the purchase object
    categoryId.itemcode = generateItemCode()
    // purchase.purchaseHasCategory[0].itemcode = generateItemCode()
    purchase.supplier_id.supplier_code = categoryId.itemcode
    purchase.purchaseHasCategory.push(categoryId)
    // purchase.purchaseHasCategory.itemcode = 
    itemTable();
    supplierTable();
    categories = ajaxGetRequest("/category/getlist")
    fillDataIntoSelect(selectPurchCategory, "Select Category", categories, 'name')

    supplierlistByCategory.innerHTML = " "
    categoryItemCheckBoxes.innerHTML = " "
    purchaseQty.value = ""
    purchaseItemPrice.value = ""
}



const addItemSupp = () => {
    console.log("hii");
    // purchase.purchaseHasCategory = []    

    let serverResponse = ajaxRequestBodyMethod("/purchase", "POST", purchase);
    // alert(serverResponse)
    refreshPurchaseTable()
    console.log("serverResponse==>", serverResponse);
    // Get the table element by its ID
    const itemtable = document.getElementById("ItemSuppTable");
    const tbody = itemtable.querySelector("tbody");
    tbody.innerHTML = "";
    const table1 = document.getElementById("ItemPurchTable");
    const tbody1 = table1.querySelector("tbody");
    tbody1.innerHTML = "";

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









