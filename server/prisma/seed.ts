import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = "password";
  const hashedPassword = await bcrypt.hash(password, 10);

  // Default user
  const defaultUser = await prisma.user.create({
    data: {
      username: "john@example.com",
      password: hashedPassword,
    },
  });

  // 4 random users
  const users = [defaultUser];
  for (let i = 0; i < 4; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.email(),
        password: hashedPassword,
      },
    });
    users.push(user);
  }

  // 10 posts, each with random authors
  for (let i = 0; i < 10; i++) {
    const randomAuthors = faker.helpers.arrayElements(
      users,
      faker.number.int({ min: 1, max: 3 })
    );
    await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        authors: {
          connect: randomAuthors.map((user) => ({ id: user.id })),
        },
      },
    });
  }

  console.log("Seeding is completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
