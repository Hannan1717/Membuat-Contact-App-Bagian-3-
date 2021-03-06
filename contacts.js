const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// membuat folder data
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
   fs.mkdirSync(dirPath);
}

// membuat file contacts.json
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
   fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
   const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
   const contacts = JSON.parse(fileBuffer);
   return contacts;
};

const simpanContacts = (nama, email, noHp) => {
   const contact = { nama, email, noHp };
   const contacts = loadContact();

   // cek duplikat
   const duplikat = contacts.find((contact) => contact.nama == nama);
   if (duplikat) {
      console.log(chalk.red.inverse.bold("kontak sudah terdaftar, gunakan nama lain!!"));
      return false;
   }

   //  cek email
   if (email) {
      if (!validator.isEmail(email)) {
         console.log(chalk.red.inverse.bold("Email tidak valid!!"));
         return false;
      }
   }

   // cek no Hp
   if (!validator.isMobilePhone(noHp, "id-ID")) {
      console.log(chalk.red.inverse.bold("NO Hp tidak valid!!"));
      return false;
   }

   contacts.push(contact);

   fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

   console.log(chalk.green.inverse.bold("data anda tersimpan"));
};

const listContact = () => {
   const contacts = loadContact();
   console.log(chalk.cyanBright.inverse.bold("Daftar Kontak :"));
   contacts.forEach((contact, i) => {
      console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
   });
};

const detailContact = (nama) => {
   const contacts = loadContact();

   const contact = contacts.find((contact) => contact.nama.toLowerCase() == nama.toLowerCase());
   if (!contact) {
      console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
      return false;
   }

   console.log(chalk.cyanBright.inverse.bold(contact.nama));
   console.log(contact.noHp);
   if (contact.email) {
      console.log(contact.email);
   }
};

const deleteContact = (nama) => {
   const contacts = loadContact();

   const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
   if (newContact.length == contacts.length) {
      console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
      return false;
   }

   fs.writeFileSync("data/contacts.json", JSON.stringify(newContact));
   console.log(chalk.green.inverse.bold(`data kontak ${nama} dihapus!`));
};

module.exports = { simpanContacts, listContact, detailContact, deleteContact };
