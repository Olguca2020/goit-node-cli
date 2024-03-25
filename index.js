import { program } from "commander";
import "colors";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log("Contact List:".green, contacts);
      break;

    case "get":
      const contactById = await getContactById(id);
      console.log(`Contact with ID ${id}:`.cyan, contactById);
      break;

    case "add":
      const newContact = await addContact(id, name, email, phone);
      console.log("Added contact:".yellow, newContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      console.log(`Removed contact with ID ${id}:`.red, deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
