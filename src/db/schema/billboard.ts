import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { InferModel, eq } from "drizzle-orm";
export const billboards = pgTable("billboard", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  image: text("image").notNull(),
})

export type Billboard = InferModel<typeof billboards>
export type NewBillboard = InferModel<typeof billboards, "insert">

export async function insertBillboard(billboard: NewBillboard): Promise<Billboard> {
  const res = db.insert(billboards).values(billboard).returning();
  return (await res)[0];
}

export async function getBillboardById(id: number): Promise<Billboard> {
  const res = db.select().from(billboards).where(eq(billboards.id, id)).execute();
  return (await res)[0];
}

export async function updateBillboard(id: number, billboard: Billboard): Promise<Billboard> {
  const res = db.update(billboards).set({title: billboard.title}).where(eq(billboards.id, id)).returning();
  return (await res)[0];
}

export async function getAllMovies(): Promise<Billboard[]> {
  return await db.select().from(billboards).execute();
}
