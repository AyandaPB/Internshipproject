const API_URL = "http://localhost:3000/users";

// Fetch and display users
async function getUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();

  const list = document.getElementById("userList");
  list.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${user.name}
      <button onclick="deleteUser('${user.id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Add user
async function addUser() {
  const name = document.getElementById("nameInput").value;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name })
  });

  document.getElementById("nameInput").value = "";
  getUsers();
}

// Delete user
async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  getUsers();
}

// Load users on page start
getUsers();