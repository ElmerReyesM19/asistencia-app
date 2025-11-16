const bcrypt = require("bcryptjs");
const db = require('../src/config/db'); 

const usuarios = [
  {
    nombre: "Admin",
    email: "administrador@gmail.com",
    password: "admin008",
    rol: "admin",
  },
  {
    nombre: "Luis Torres",
    email: "luistorrest001@gmail.com",
    password: "trabajador001",
    rol: "trabajador",
  },
  {
    nombre: "Maria Gómez",
    email: "mariagomezt002@gmail.com",
    password: "trabajador002",
    rol: "trabajador",
  },
  {
    nombre: "Jorge Díaz",
    email: "jorgediaz@gmail.com",
    password: "trabajador003",
    rol: "trabajador",
  },
   {
    nombre: "supervisor",
    email: "supervisor@gmail.com",
    password: "super004",
    rol: "supervisor",
  },
  
];

async function seed() {
  for (const user of usuarios) {
    const hashed = await bcrypt.hash(user.password, 10);
    console.log("Conectado a la base de datos:", process.env.PGDATABASE);

    await db.query(
      `INSERT INTO usuarios (nombre, email, password, rol)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING`,
      [user.nombre, user.email, hashed, user.rol]
    );
    console.log(`Usuario creado o existente: ${user.email}`);
  }

  console.log("Seed completo");
  process.exit();
}

seed().catch((err) => {
  console.error("Error al hacer seed:", err);
  process.exit(1);
});
