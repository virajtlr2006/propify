'use client'
import { deletePropertyAcion, UserAllPropertyAction } from '@/Actions/PropertyAction'
import { property } from '@/db/schema'
import { useCurrentUser } from '@/hook/hook'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const page = () => {

  const router = useRouter()

  const { email } = useCurrentUser()

  const { id } = useParams()

  const [showuserproperties, setShowuserproperties] = useState<property[] | null>(null)

  useEffect(() => {
    if (email) userallProperties(email)
  }, [email])

  const userallProperties = async (email: string) => {
    const userall: property[] = await UserAllPropertyAction(email)
    setShowuserproperties(userall || null)
  }
  
  const deleteProperty = async (id: Number) => {
    await deletePropertyAcion(Number(id))
    router.push("/all")    
  }
  return (
    <div>
      {showuserproperties && showuserproperties.map((u) =>
        <div key={u.id}>
          <a key={u.id} href={`/single/${u.id}`}>
            <img src={u.image} alt="Property Image" />
            <p>{u.pname}</p>
            <p>By : {u.email}</p>
          </a>
          <Dialog>
            <DialogTrigger>Delete</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your property
                  and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <Button onClick={()=> deleteProperty(u.id)} variant="outline">Delete</Button>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

export default page
