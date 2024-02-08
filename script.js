const nameInput = document.querySelector("input[name=name]");
const priceInput = document.querySelector("input[name=price]");
const btn = document.querySelector(".btn");
const container = document.querySelector(".container");

const handleDelete = async (id) => {
  // await fetch(`http://localhost:4000/menu?id=${id}`, {
  //   method: "DELETE",
  // });
  console.log(id);
};

const createMenu = async () => {
  container.innerHTML = "";
  const menu = {
    name: nameInput.value,
    price: priceInput.value,
  };
  const res = await fetch("http://localhost:4000/menu", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(menu),
  });
  const data = await res.json();
  const div = document.createElement("div");
  const ul = document.createElement("ul");
  data.forEach((menu) => {
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.style.marginBottom = "10px";
    deleteBtn.addEventListener("click", handleDelete(menu.id));
    li.innerHTML = menu.name;
    ul.append(li);
    ul.append(deleteBtn);
  });
  div.append(ul);
  container.append(div);
  nameInput.value = "";
  priceInput.value = "";
};

btn.addEventListener("click", createMenu);
