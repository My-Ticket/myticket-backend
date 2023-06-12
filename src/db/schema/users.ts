import { InferModel, eq } from "drizzle-orm";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { z } from "zod"
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
});

export const userValidator = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
})

export type User = InferModel<typeof users>; // return type when queried
export type NewUser = InferModel<typeof users, 'insert'>; // insert type

export async function insertUser(user: NewUser): Promise<User> {
  const res = db.insert(users).values(user).returning();
  return (await res)[0];
}

export async function getUserById(id: number): Promise<User> {
  const res = db.select().from(users).where(eq(users.id, id)).execute();
  return (await res)[0];
}

export async function updateUser(id: number, user: User): Promise<User> {
  const res = db.update(users).set({password: user.password}).where(eq(users.id, id)).returning();
  return (await res)[0];
}

type UserQueryOpts = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
}

export async function queryUsers(queryOpts: UserQueryOpts){
  const query = db.select().from(users)
  if (queryOpts.id) query.where(eq(users.id, queryOpts.id))
  if (queryOpts.name) query.where(eq(users.name, queryOpts.name))
  if (queryOpts.email) query.where(eq(users.email, queryOpts.email))
  if (queryOpts.password) query.where(eq(users.password, queryOpts.password))
  return await query.execute();
}

export async function getAllUsers(): Promise<User[]> {
  return await db.select().from(users).execute();
}