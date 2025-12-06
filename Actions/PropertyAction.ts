'use server';

import { eq } from "drizzle-orm";
import { db } from "..";
import { newProperty, PropertyTable } from "@/db/schema";

// New Property Action
export const newPropertyAction = async (data: newProperty) => {
  // console.log(data)
  const result = await db.insert(PropertyTable).values(data);
  return result;
};

// Single Property Action
export const SinglePropertyAction = async (id:Number) => {
  // console.log(id)
  const single = await db.select().from(PropertyTable).where(eq(PropertyTable.id,Number(id)))
  return single[0]
}

// All Property Action
export const AllPropertyAction =  async () => {
  const all = await db.select().from(PropertyTable)
  // console.log(all)
  return all
}