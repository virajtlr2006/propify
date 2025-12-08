'use server';

import { asc, eq, SQL } from "drizzle-orm";
import { db } from "..";
import { newProperty, PropertyTable } from "@/db/schema";
import { strict } from "assert";

// New Property Action
export const newPropertyAction = async (data: newProperty) => {
  // console.log(data)
  const result = await db.insert(PropertyTable).values(data);
  console.log(result)
  // return true;
};

// Single Property Action
export const SinglePropertyAction = async (id: Number) => {
  // console.log(id)
  const single = await db.select().from(PropertyTable).where(eq(PropertyTable.id, Number(id)))
  return single[0]
}

// All Property Action
export const AllPropertyAction = async () => {
  const all = await db.select().from(PropertyTable).orderBy(asc(PropertyTable.pname))
  // console.log(all)
  return all
}

// User All roperty Action
export const UserAllPropertyAction = async (email: string) => {
  const userall = await db.select().from(PropertyTable).where(eq(PropertyTable.email, email)).orderBy(asc(PropertyTable.pname))
  return userall
}

// Delete Property Action
export const deletePropertyAcion = async (id: Number) => {
  const deleteProperty = await db.delete(PropertyTable).where(eq(PropertyTable.id, Number(id)))
  return true
}

// Update Property Action
export async function updatePropertyAction(id: number, data: newProperty) {
  try {
    const updated = await db
      .update(PropertyTable)
      .set(data)
      .where(eq(PropertyTable.id, id))
      .returning();

    return { success: true, updated: updated[0] };
  } catch (error) {
    console.error("Update failed:", error);
    return { success: false, error };
  }
}

