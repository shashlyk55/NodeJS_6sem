document.querySelectorAll(".contact_button").forEach((button) => {
  button.addEventListener("click", function () {
    const buttonText = this.textContent;
    
    const name = buttonText.split(" - ")[0].trim();
    const phone = buttonText.split(" - ")[1].trim();

    const params = new URLSearchParams({ name, phone }).toString();

    window.location.href = `/Update?${params}`;
  });
});

const updateButton = document.getElementById("update_button");
if (updateButton) {
  updateButton.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if(!name){
      alert('Заполните поля!')
      return
    }

    const data = {
      name: name,
      phone: phone,
    };

    fetch("/Update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Сетевая ошибка");

        window.location.href = `/`;
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  });
}

const addButton = document.getElementById("add_button");
if (addButton) {
  addButton.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if(!name || !phone){
      alert('Заполните поля!')
      return
    }

    const data = {
      name: name,
      phone: phone,
    };

    fetch("/Add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Сетевая ошибка");

        window.location.href = `/`;
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  });
}

const removeButton = document.getElementById("remove_button");
if (removeButton) {
  removeButton.addEventListener("click", function () {
    const phone = document.getElementById("phone").value;

    const data = {
      phone: phone,
    };

    fetch("/Delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Сетевая ошибка");

        window.location.href = `/`;
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  });
}

const nameInput = document.getElementById("name");
if (nameInput && removeButton) {
  nameInput.addEventListener("input", function () {
    removeButton.disabled = true;
  });
}
