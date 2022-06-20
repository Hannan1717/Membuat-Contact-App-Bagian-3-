const yargs = require("yargs");
const { simpanContacts, listContact, detailContact, deleteContact } = require("./contacts");

yargs
   .command({
      command: "add",
      describe: "Tambah Contact",
      builder: {
         nama: {
            describe: "nama lengkap",
            demandOption: true,
            type: "string",
         },
         email: {
            describe: "email",
            demandOption: false,
            type: "string",
         },
         noHp: {
            describe: "Nomor ponsel",
            demandOption: true,
            type: "string",
         },
      },
      handler(argv) {
         simpanContacts(argv.nama, argv.email, argv.noHp);
      },
   })
   .demandCommand();

// Menampilkan semua nama dan no Hp contacts
yargs.command({
   command: "list",
   describe: "Menampilkan semua nama dan no Hp contacts",
   handler() {
      listContact();
   },
});

yargs.command({
   command: "detail",
   describe: "Menampilkan detail sebuah contact",
   builder: {
      nama: {
         describe: "nama lengkap",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      detailContact(argv.nama);
   },
});

yargs.command({
   command: "delete",
   describe: "Menghapus sebuah contact",
   builder: {
      nama: {
         describe: "nama lengkap",
         demandOption: true,
         type: "string",
      },
   },
   handler(argv) {
      deleteContact(argv.nama);
   },
});

yargs.parse();
