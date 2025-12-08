"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { property, newProperty } from "@/db/schema";
import { updatePropertyAction, SinglePropertyAction } from "@/Actions/PropertyAction";
import { useCurrentUser } from "@/hook/hook";

export default function UpdatePropertyForm() {
  const { id } = useParams(); // get property id from URL
  const router = useRouter(); // router for navigation
  const { email } = useCurrentUser(); // get logged-in user's email

  const [oldProperty, setOldProperty] = useState<property | null>(null); // store property details
  const [canUpdate, setCanUpdate] = useState(false); // flag to check if user can update

  // setup react-hook-form with default values
  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<Omit<newProperty, "email">>({
      defaultValues: {
        pname: "",
        paddress: "",
        ptype: "Bungalow",
        pdesc: "",
        image: "",
        city: "",
        sqft: 500,
        bhk: 1,
        price: 0,
      },
    });

  // Fetch property client-side when id changes
  useEffect(() => {
    const fetchProperty = async () => {
      const prop = await SinglePropertyAction(Number(id)); // fetch property by id
      if (prop) {
        setOldProperty(prop); // store property in state
        // pre-fill form with property values
        reset({
          pname: prop.pname,
          paddress: prop.paddress,
          ptype: prop.ptype,
          pdesc: prop.pdesc ?? "",
          image: prop.image,
          city: prop.city,
          sqft: prop.sqft ?? 500,
          bhk: prop.bhk,
          price: prop.price ?? 0,
        });
      }
    };
    if (id) fetchProperty();
  }, [id, reset]);

  // recompute canUpdate whenever email or oldProperty changes
  useEffect(() => {
    if (oldProperty && email) {
      setCanUpdate(email === oldProperty.email); // only owner can update
    }
  }, [oldProperty, email]);

  // handle form submit
  const onSubmit: SubmitHandler<Omit<newProperty, "email">> = async (data) => {
    if (!oldProperty) return; // guard if property not loaded

    // attach property email (not editable in form)
    const payload: newProperty = { ...data, email: oldProperty.email };

    // check if user is authorized
    if (!canUpdate) {
      alert("You are not authorized to update this property.");
      return;
    }

    // call update action
    const res = await updatePropertyAction(Number(id), payload);
    if (res.success) {
      alert("Updated successfully!");
      reset(res.updated); // reset form with updated values
      router.push("/all"); // redirect to all properties
    } else {
      alert("Update failed.");
    }
  };

  // show loading until property is fetched
  if (!oldProperty) return <div className="p-6 text-center">Loading property...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 max-w-xl mx-auto">
      {/* property name input */}
      <input {...register("pname", { required: true })} />
      {errors.pname && <span>This field is required</span>}

      {/* property address input */}
      <input {...register("paddress", { required: true })} />
      {errors.paddress && <span>This field is required</span>}

      {/* property type dropdown */}
      <select {...register("ptype", { required: true })}>
        <option value="Bungalow">Bungalow</option>
        <option value="Villa">Villa</option>
        <option value="Row House">Row House</option>
        <option value="Apartment">Apartment</option>
        <option value="Pent House">Pent House</option>
      </select>
      {errors.ptype && <span>This field is required</span>}

      {/* property description */}
      <input {...register("pdesc")} />

      {/* property image */}
      <input {...register("image", { required: true })} />
      {errors.image && <span>This field is required</span>}

      {/* property city */}
      <input {...register("city", { required: true })} />
      {errors.city && <span>This field is required</span>}

      {/* property sqft */}
      <input type="number" {...register("sqft", { required: true, valueAsNumber: true })} />
      {errors.sqft && <span>This field is required</span>}

      {/* property bhk */}
      <input type="number" {...register("bhk", { required: true, valueAsNumber: true })} />
      {errors.bhk && <span>This field is required</span>}

      {/* property price */}
      <input type="number" {...register("price", { required: true, valueAsNumber: true })} />
      {errors.price && <span>This field is required</span>}

      {/* Update button only shown if canUpdate is true */}
      {canUpdate && <button type="submit">Update</button>}
    </form>
  );
}