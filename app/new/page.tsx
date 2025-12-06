'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { newPropertyAction } from "@/Actions/PropertyAction"
import { useCurrentUser } from "@/hook/hook"
import { newProperty } from "@/db/schema"

const Page = () => {

  const {email} = useCurrentUser()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newProperty>()

const onSubmit = async (data:newProperty) => {
  // console.log(data)
  if(!email) return
  const newdata = {...data , email:email || ""}
  await newPropertyAction(newdata)
}
  return (
    <div className="p-6 max-w-xl mx-auto">
      <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input placeholder="Property Name" {...register("pname", { required: true })} />
        {errors.pname && <span>This field is required</span>}

        <input placeholder="Property Address" {...register("paddress", { required: true })} />
        {errors.paddress && <span>This field is required</span>}

        <label>Type of property:</label>
        <select {...register("ptype", { required: true })}>
          <option>Bungalows</option>
          <option>Villas</option>
          <option>Row Houses</option>
          <option>Apartments</option>
          <option>Pent Houses</option>
        </select>
        {errors.ptype && <span>This field is required</span>}

        <input placeholder="Property Description" {...register("pdesc")} />

        <input placeholder="Property Image URL" {...register("image", { required: true })} />
        {errors.image && <span>This field is required</span>}

        <input placeholder="City" {...register("city", { required: true })} />
        {errors.city && <span>This field is required</span>}

        <input
          type="number"
          placeholder="Size (sqft)"
          {...register("sqft", { required: true, valueAsNumber: true })}
        />
        {errors.sqft && <span>This field is required</span>}

        <label>BHK:</label>
        <select {...register("bhk", { required: true, valueAsNumber: true })}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        {errors.bhk && <span>This field is required</span>}

        <input
          type="number"
          placeholder="Property Price"
          {...register("price", { required: true, valueAsNumber: true })}
        />
        {errors.price && <span>This field is required</span>}

        <input type="submit"/>
      </form>
    </div>
    </div>
  )
}

export default Page