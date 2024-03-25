import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactsJSON = JSON.parse(contacts.toString());
    return contactsJSON;
  } catch (er) {
    console.log(er);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((contact) => {
      contact.id === contactId;
      if (currentIndex === -1) return null;
      return contactById;
    });
  } catch (er) {
    console.log(er);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newArray = contacts.filter((contact) => contact.id !== contactId);
    const deletedContact = await getContactById(contactId);

    await fs.writeFile(contactsPath, JSON.stringify(newArray));

    return deletedContact !== undefined ? deletedContact : null;
  } catch (er) {
    console.log(er);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (er) {
    console.log(er);
  }
}
module.exports = { listContacts, getContactById, removeContact, addContact };
