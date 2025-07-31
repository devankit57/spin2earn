import { Button } from "@/components/ui/button"
import db from "../lib/db"
export default async function Home() {
  const newUser = await db.user.create({
    data: {
      email: "user@example.com",
      passwordHash: "$2a$10$hashedpassword", // Store hashed passwords only!
      dailySpins: 1,
      xpPoints: 0,
      level: 1,
    },
  });
  console.log("Created user:", newUser);
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}