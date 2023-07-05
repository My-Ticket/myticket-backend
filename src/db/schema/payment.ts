import { pgTable, text } from "drizzle-orm/pg-core";
import { InferModel, eq } from "drizzle-orm";
import e from "express";

export const payments = pgTable("payments", {
  user_id: text("user_id").primaryKey(),
  status: text("status").notNull(),
  amount: text("amount").notNull(),
  pay_id : text('payid').notNull()
})

export type Payment = InferModel<typeof payments>
export type NewPayment = InferModel<typeof payments, "insert">

export async function insertPayment(payment: NewPayment): Promise<Payment> {
  const res = db.insert(payments).values(payment).returning();
  return (await res)[0];
}

export async function getPaymentById(id: string): Promise<Payment> {
  const res = db.select().from(payments).where(eq(payments.user_id, id)).execute();
  return (await res)[0];
}

export async function updatePayment(id: string, payment: Payment): Promise<Payment> {
  const res = db.update(payments).set({status: payment.status}).where(eq(payments.user_id, id)).returning();
  return (await res)[0];
}

export async function getAllPayments(): Promise<Payment[]> {
  return await db.select().from(payments).execute();
}

type PaymentQueryOpts = {
  user_id?: string;
  status?: string;
  amount?: string;
  pay_id?: string;
}

export async function queryPayments(queryOpts: PaymentQueryOpts){
  const query = db.select().from(payments);
  if (queryOpts.user_id) query.where(eq(payments.user_id, queryOpts.user_id));
  if (queryOpts.status) query.where(eq(payments.status, queryOpts.status));
  if (queryOpts.amount) query.where(eq(payments.amount, queryOpts.amount));
  if (queryOpts.pay_id) query.where(eq(payments.pay_id, queryOpts.pay_id));
  return await query.execute();
}