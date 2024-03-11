const toggler = document.querySelector(".btn");

toggler.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.toggle("collapsed");
});

const sidebarItems = document.querySelectorAll(".sidebar-sublink");

sidebarItems.forEach(function (item) {
    item.addEventListener("click", function () {
        document.querySelector("#sidebar").classList.toggle("collapsed");
    });
});

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#sidebar").classList.toggle("collapsed");

})

const sidebarItems1 = document.querySelectorAll(".sidebar-item");

sidebarItems1.forEach(function (item) {
    const link = item.querySelector(".sidebar-link");

    link.addEventListener("click", function () {
        sidebarItems1.forEach(function (otherItem) {
            otherItem.classList.remove("active"); // Remove "active" from other items
        });
        item.classList.add("active"); // Add "active" to the clicked item
    });
});


