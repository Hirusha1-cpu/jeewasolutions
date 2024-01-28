//create function for fill data intop table

const fillDataIntoTable = (tableId, dataList, propertyList, editButtonFunction, deleteButtonFunction, printButtonFunction,
    buttonVisibility = true, privilegeOb = null) => {
    //create variable for store body
    const tableBody = tableId.children[1];
    tableBody.innerHTML = '';

    dataList.forEach((item, index) => {
        console.log('Element: ' + index + '=>' + item);
        const tr = document.createElement('tr');
        tr.innerHTML = '';
        const tdIndex = document.createElement('td');
        tdIndex.innerText = parseInt(index) + 1;
        tr.appendChild(tdIndex);

        for (const itemOb of propertyList) {
            const td = document.createElement('td');
            //  td.innerText = item.number;
            if (itemOb.dataType == 'string') {
                if (dataList[index][itemOb.property] == null) {
                    td.innerText = "-"
                } else {
                    td.innerHTML = dataList[index][itemOb.property]

                }
            }
            if (itemOb.dataType == 'function') {
                td.innerHTML = itemOb.property(dataList[index]);
            }
            if (itemOb.dataType == 'boolean') {
                td.innerHTML = dataList[index][itemOb.property]
                if (td.innerHTML == 'true') {
                    td.innerHTML = 'grant'
                } else {
                    td.innerHTML = 'not-grant'
                }
            }
            tr.appendChild(td);
        }


        const tdButton = document.createElement('td')

        const btnEdit = document.createElement('button');
        btnEdit.className = 'btn btn-warning'
        btnEdit.innerHTML = '<i class="fa-solid fa-edit "></i>Edit'
        btnEdit.onclick = () => {
            console.log('edit', item.id, index);
            editButtonFunction(item, index)


        }

        const btnDelete = document.createElement('button');
        btnDelete.className = 'btn btn-danger ms-1 me-1'
        btnDelete.innerHTML = '<i class="fa-solid fa-broom "></i>Delete'
        btnDelete.onclick = (index) => {
            // console.log('delete',item.id);
            // deleteEmp(index);
            deleteButtonFunction(item, index);
        }

        const deleteEmp = (rowindex) => {
            const userConfirm = confirm('Are you sure you want to delete' + employees[rowindex].fullname);
            if (userConfirm) {
                alert('Employee delete succefully');
                // employees[rowindex].employeeStatus_id = {id:3, name:'Delete'};

                refreshEmployeeTable()

            } else {

            }

        }

        const buttonPrint = document.createElement('button');
        buttonPrint.className = 'btn btn-info';
        buttonPrint.innerHTML = '<i class="fa-solid fa-print "></i>Print';
        buttonPrint.onclick = (index) => {
            console.log('print', item.id);
            printButtonFunction(item, index);

        }
        if (buttonVisibility) {

            if (privilegeOb != null && privilegeOb.update) {
                tdButton.appendChild(btnEdit);
            }
            if (privilegeOb != null && privilegeOb.delete) {
                tdButton.appendChild(btnDelete);
            }

            tdButton.appendChild(buttonPrint);
            tr.appendChild(tdButton);

        }
        tableBody.appendChild(tr);
    })

}