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

const page = () => {

    const [showSingleProperty, setshowSingleProperty] = useState<property | null>(null)

    const router = useRouter()

    const { id } = useParams()

    useEffect(() => {
        if (id) getSingleProp(Number(id))
    }, [id])


    const getSingleProp = async (id: number) => {
        const single: property = await SinglePropertyAction(id)
        setshowSingleProperty(single)
    }

    const deleteProperty = async (id: Number) => {
        await deletePropertyAcion(Number(id))
        router.push("/all")
    }

    return (
        <div>
            {showSingleProperty &&
                <div>
                    <img src={showSingleProperty.image || "Propert Image"} />
                    <p>{showSingleProperty.pname}</p>
                    <p>{showSingleProperty.ptype}</p>
                    <p>{showSingleProperty.pdesc}</p>
                    <p>{showSingleProperty.paddress}</p>
                    <p>{showSingleProperty.city}</p>
                    <p>{showSingleProperty.sqft}</p>
                    <p>{showSingleProperty.bhk}</p>
                    <p>{showSingleProperty.price}</p>
                    <p>{showSingleProperty.email}</p>

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
                            <Button onClick={() => deleteProperty(showSingleProperty.id)} variant="outline">Delete</Button>
                        </DialogContent>
                    </Dialog>
                </div>
            }
        </div>
    )
}

export default page
