const container = document.getElementById("categories");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const departureInput = document.getElementById("departure");
const countdown = document.getElementById("countdown");

function createChecklist() {
  container.innerHTML = "";

  categories.forEach(category => {
    const section = document.createElement("section");
    section.className = "category";

    const title = document.createElement("h3");
    title.textContent = category.name;
    section.appendChild(title);

    category.items.forEach(item => {
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

  updateProgress();
}

function updateProgress() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');

  const total = checkboxes.length;
  const done = checked.length;
  const percent = total === 0 ? 0 : Math.round(done / total * 100);

  progressBar.style.width = percent + "%";
  progressText.textContent = ${done} von ${total} eingepackt (${percent}%);
}

function updateCountdown() {
  if (!departureInput.value) {
    countdown.textContent = "";
    return;
  }

  const today = new Date();
  const departure = new Date(departureInput.value);

  today.setHours(0, 0, 0, 0);
  departure.setHours(0, 0, 0, 0);

  const diff = Math.ceil((departure - today) / (1000 * 60 * 60 * 24));

  if (diff > 0) {
    countdown.textContent = ⏳ Noch ${diff} Tage bis zur Abreise;
  } else if (diff === 0) {
    countdown.textContent = "🎉 Heute geht's los!";
  } else {
    countdown.textContent = "";
  }
}

departureInput.addEventListener("change", updateCountdown);

createChecklist();
updateCountdown();
