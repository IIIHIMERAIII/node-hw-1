const fs = require('fs/promises');
const path = require('path')
const contactsPath = path.resolve('./db/contacts.json');
const { nanoid } = require('nanoid');


async function listContacts()  {
        const data = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(data);
};

async function getContactById(contactId) {
    const data = await listContacts();
    const results = data.find(item => item.id == contactId);
    return results || null;
};

async function removeContact(contactId) {
    const data = await listContacts();
    const index = data.findIndex(item => item.id == contactId);
    if (index === -1) {
        return null;
    }
    const [results] = data.splice(index, 1)  
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return results;
}; 

async function addContact(name, email, phone) {
    const data = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};