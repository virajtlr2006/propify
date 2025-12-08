'use client'

import { deletePropertyAcion, SinglePropertyAction } from '@/Actions/PropertyAction'
import { property } from '@/db/schema'
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
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hook/hook'

const Page = () => {
    // state to hold the property details
    const [showSingleProperty, setShowSingleProperty] = useState<property | null>(null)
    // flag to check if current user is the owner
    const [isOwner, setIsOwner] = useState(false)

    const router = useRouter()
    const { id } = useParams() // get property id from URL
    const { email } = useCurrentUser() // get logged-in user's email

    // fetch property whenever id or email changes
    useEffect(() => {
        if (id && email) getSingleProp(Number(id))
    }, [id, email])

    // function to fetch single property by id
    const getSingleProp = async (id: number) => {
        const single: property = await SinglePropertyAction(id)
        if (email && single) {
            // check if logged-in user owns this property
            setIsOwner(email === single.email)
        }
        // store property details in state
        setShowSingleProperty(single)
    }

    // function to delete property if owner
    const deleteProperty = async (id: number) => {
        if (isOwner) {
            await deletePropertyAcion(Number(id))
            router.push("/all") // redirect after delete
        }
    }

    // function to go to update page if owner
    const goToUpdate = (id: number) => {
        if (isOwner) {
            router.push(`/update/${id}`) // navigate to update form page
        }
    }

    return (
        <div>
            {showSingleProperty && (
                <div>
                    {/* property details */}
                    <img src={showSingleProperty.image || "Property Image"} />
                    <p>{showSingleProperty.pname}</p>
                    <p>{showSingleProperty.ptype}</p>
                    <p>{showSingleProperty.pdesc}</p>
                    <p>{showSingleProperty.paddress}</p>
                    <p>{showSingleProperty.city}</p>
                    <p>{showSingleProperty.sqft}</p>
                    <p>{showSingleProperty.bhk}</p>
                    <p>{showSingleProperty.price}</p>
                    <p>{showSingleProperty.email}</p>

                    {/* Delete Dialog - only visible if owner */}
                    <Dialog>
                        {isOwner && <DialogTrigger>Delete</DialogTrigger>}
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will permanently delete your property
                                    and remove your data from our servers.
                                </DialogDescription>
                            </DialogHeader>

                            {isOwner && (
                                <Button
                                    onClick={() => deleteProperty(showSingleProperty.id)}
                                    variant="outline"
                                >
                                    Delete
                                </Button>
                            )}
                        </DialogContent>
                    </Dialog>

                    {/* Update Button - only visible if owner */}
                    {isOwner && (
                        <Button
                            onClick={() => goToUpdate(showSingleProperty.id)}
                            variant="default"
                            className="mt-4"
                        >
                            Update
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Page