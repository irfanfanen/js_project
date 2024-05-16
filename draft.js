let apiUrl = 'http://localhost:3000/users';
let userList = document.getElementById('userList');
userList.innerHTML = '';

function getUsers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => {
            console.log(users)

            users.forEach(user => {
                const listItem = document.createElement('tr');

                listItem.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="deleteUser('${user.id}')" class="btn btn-danger btn-sm">Delete</button>
                        <button onclick="editUser('${user.id}', '${user.name}', '${user.email}')" class="btn btn-success btn-sm">Edit</button>
                    </td>
                `;

                userList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error', error);
        });
}

function createUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, email})
    })
    .then(res => res.json())
    .then(() => {
        while (userList.firstChild) {
            userList.removeChild(userList.firstChild);
        }
        document.getElementById('closeButton').click();
        getUsers()
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
    });
}

function deleteUser(id) {
    console.log(id);
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(() => {
        while (userList.firstChild) {
            userList.removeChild(userList.firstChild);
        }
        getUsers()
    });  
}

function editUser(id, name, email) {
    const newName = prompt('Enter new name', name);
    const newEmail = prompt('Enter new email', email);

    if(newName && newEmail) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: newName, email: newEmail})
        })
        .then(() => {
            while (userList.firstChild) {
                userList.removeChild(userList.firstChild);
            }
            getUsers()
        });
    }
}

document.getElementById('createUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    createUser();
    console.log('click');
})

getUsers();