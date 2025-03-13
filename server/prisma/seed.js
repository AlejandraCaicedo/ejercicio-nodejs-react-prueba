const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'usuario1@example.com' },
    update: {},
    create: {
      name: 'Usuario Uno',
      email: 'usuario1@example.com',
      password: passwordHash,
      posts: {
        create: [
          { content: 'Mi primer post en la red social' },
          { content: 'Otro día, otra publicación.' },
        ],
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'usuario2@example.com' },
    update: {},
    create: {
      name: 'Usuario Dos',
      email: 'usuario2@example.com',
      password: passwordHash,
      posts: {
        create: [{ content: 'Nueva publicación de Usuario Dos' }],
      },
    },
  });

  console.log('Usuarios de prueba creados:', user1, user2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
