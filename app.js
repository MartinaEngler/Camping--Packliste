document.addEventListener("DOMContentLoaded", () => {

    console.log("Camping mit Tina & Stefan gestartet 🚐");

});
const container = document.getElementById("categories");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function createChecklist() {
  container.innerHTML = "";

  categories.forEach((category) => {

    const section = document.createElement("section");
    section.className = "category";

    const title = document.createElement("h3");
    title.textContent = category.name;

    section.appendChild(title);

    category.items.forEach((item) => {

      const row = document.createElement("div");
      row.className = "item";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      const key = category.name + "-" + item;
      checkbox.checked = localStorage.getItem(key) === "true";

      checkbox.addEventListener("change", () => {
        localStorage.setItem(key, checkbox.checked);
        updateProgress();
      });

      const label = document.createElement("label");
      label.textContent = item;

      row.appendChild(checkbox);
      row.appendChild(label);

      section.appendChild(row);

    });

    container.appendChild(section);

  });
