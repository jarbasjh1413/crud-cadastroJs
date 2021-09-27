'use strict'

const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem('db_client', JSON.stringify(dbClient))

// CRUD - CREATE
const createClient = (client) => {
    const db_client = getLocalStorage()
    db_client.push(client)
    setLocalStorage(db_client)

}
//CRUD - READ
const readCliente = () => getLocalStorage()


// CRUD - UPDATE
const updateClient = (index, client) => {
    const dbClient = readCliente()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

// CRUD - DELETE
const deleteCliente = (index) => {
    const dbClient = readCliente()
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
}

// interação com o usuário
const saveCliente = () => {
    if (isValidFields()) {

    }
}
const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}
// interagindo com a interface 
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '')
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index
        if (index == 'new') {
            createClient(client)
            updateTable()
            closeModal()
        } else {
            updateClient(index, client)
            updateTable()
            closeModal()
        }
    }
}

const cancelAction = () => {
    closeModal()
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
        <button type="button" class="button green" id='edit-${index}'>Editar</button>

        <button type="button" class="button red" id='delete-${index}'>Excluir</button>
    </td>
    `

    document.querySelector('#tableClient > tbody').appendChild(newRow)
}
const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}
const updateTable = () => {
    const dbClient = readCliente()
    clearTable()
    dbClient.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.index = client.index

}

const editClient = (index) => {
    const client = readCliente()[index]
    client.index = index
    fillFields(client)
    openModal()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readCliente()[index]
            const response = confirm(`Deseja ralmente excluir ${client.nome}`)
            if (response) {
                deleteCliente(index)
                updateTable()
            }
            deleteCliente(index)
            updateTable()
        }

    }

}
updateTable()


//events
document.getElementById('cadastrarCliente').addEventListener('click', openModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener("click", saveClient)

document.getElementById('cancelar').addEventListener("click", cancelAction)

document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)











