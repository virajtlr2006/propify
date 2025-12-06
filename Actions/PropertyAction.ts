'use server';

import { db } from "..";
import { newProperty, PropertyTable } from "@/db/schema";

export const newPropertyAction = async (data: newProperty) => {

  console.log(data)
  // const {...insertData } = data;
  // console.log("Insert Data:", insertData);

  const result = await db.insert(PropertyTable).values(data);
  return result;
};