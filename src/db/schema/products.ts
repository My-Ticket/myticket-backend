import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { InferModel, eq } from "drizzle-orm";
export const products = pgTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status").notNull(),
})

export type Product = InferModel<typeof products>
export type NewProduct = InferModel<typeof products, "insert">


export async function insertProduct(product: NewProduct): Promise<Product> {
  const res = db.insert(products).values(product).returning();
  return (await res)[0];
}

export async function getProductById(id: string): Promise<Product> {
  const res = db.select().from(products).where(eq(products.id, id)).execute();
  return (await res)[0];
}

export async function updateProduct(id: string, product: Product): Promise<Product> {
  const res = db.update(products).set({name: product.name}).where(eq(products.id, id)).returning();
  return (await res)[0];
}

export async function getAllProducts(): Promise<Product[]> {
  return await db.select().from(products).execute();
}

type ProductQueryOpts = {
  id?: string;
  name?: string;
  status?: string;
}

export async function queryProducts(queryOpts: ProductQueryOpts){
  const query = db.select().from(products);
  if (queryOpts.id) query.where(eq(products.id, queryOpts.id));
  if (queryOpts.name) query.where(eq(products.name, queryOpts.name));
  if (queryOpts.status) query.where(eq(products.status, queryOpts.status));
  return await query.execute();
}