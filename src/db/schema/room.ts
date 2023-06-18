import { InferModel, eq } from "drizzle-orm";
import { pgTable, serial, text, jsonb } from "drizzle-orm/pg-core"

export interface RoomStatus {
  width: number;
  height: number;
  atlas: number[][];
}

export const rooms = pgTable("rooms", {
  id: serial("id").primaryKey(),
  name: text("name"),
  room_status: jsonb("room_status").$type<RoomStatus>(), 
})

export type Room = InferModel<typeof rooms>
export type NewRoom = InferModel<typeof rooms, "insert">

export async function insertRoom(room: NewRoom): Promise<Room> {
  const res = db.insert(rooms).values(room).returning();
  return (await res)[0];
}

export async function getRoomById(id: number): Promise<Room> {
  const res = db.select().from(rooms).where(eq(rooms.id, id)).execute();
  return (await res)[0];
}

export async function updateRoom(id: number, room: Room): Promise<Room> {
  const res = db.update(rooms).set({room_status: room.room_status}).where(eq(rooms.id, id)).returning();
  return (await res)[0];
}

export async function getAllRooms(): Promise<Room[]> {
  return await db.select().from(rooms).execute();
}