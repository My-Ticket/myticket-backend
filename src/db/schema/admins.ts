import { InferModel, eq } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const admins = pgTable("admins",{
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),
})

export type Admin = InferModel<typeof admins>
export type NewAdmin = InferModel<typeof admins, "insert">

export async function insertAdmin(admin: NewAdmin): Promise<Admin> {
  const res = db.insert(admins).values(admin).returning();
  return (await res)[0];
}

export async function getAdminById(id: number): Promise<Admin> {
  const res = db.select().from(admins).where(eq(admins.id, id)).execute();
  return (await res)[0];
}

export async function updateAdmin(id: number, admin: Admin): Promise<Admin> {
  const res = db.update(admins).set({username: admin.username}).where(eq(admins.id, id)).returning();
  return (await res)[0];
}

export async function getAllAdmins(): Promise<Admin[]> {
  return await db.select().from(admins).execute();
}



