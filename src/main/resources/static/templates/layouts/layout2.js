const btn = document.getElementById("empaddbtn");
btn.addEventListener("click", function () {
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
});

const Formbtn = document.getElementById("empFormToTable")
Formbtn.addEventListener("click", function () {
    const table = document.getElementById("empTable")
    table.style.display = "block";
    const form = document.getElementById("empForm")
    form.style.display = "none"
})
const tableBtn = document.getElementById("empTable1")
tableBtn.addEventListener("click", function () {
    const table = document.getElementById("empTable")
    table.style.display = "block";
    const form = document.getElementById("empForm")
    form.style.display = "none"
})
