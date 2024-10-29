import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
prisma
  .$connect()
  .then(() => console.log("Connected to database"))
  .catch((e) => {
    if (e.errorCode === "P1001") {
      console.error("Unable to connect to the database:");
      console.error(
        "Make sure your server is running and your database is set up correctly."
      );
      console.error("Exiting...");
      process.exit(1);
    } else {
      console.error("Failed to connect to database", e);
      process.exit(1);
    }
  });
