"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { property, newProperty } from "@/db/schema";
import {
  updatePropertyAction,
  SinglePropertyAction,
} from "@/Actions/PropertyAction";
import { useCurrentUser } from "@/hook/hook";
import BackgroundElements from "@/components/ui/background-elements";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";

export default function UpdatePropertyForm() {
  const { id } = useParams();
  const router = useRouter();
  const { email } = useCurrentUser();

  const [oldProperty, setOldProperty] = useState<property | null>(null);
  const [canUpdate, setCanUpdate] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<newProperty, "email">>({
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

  useEffect(() => {
    const fetchProperty = async () => {
      const prop = await SinglePropertyAction(Number(id));
      if (prop) {
        setOldProperty(prop);
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

  useEffect(() => {
    if (oldProperty && email) {
      setCanUpdate(email === oldProperty.email);
    }
  }, [oldProperty, email]);

  const onSubmit: SubmitHandler<Omit<newProperty, "email">> = async (data) => {
    if (!oldProperty) return;

    const payload: newProperty = { ...data, email: oldProperty.email };

    if (!canUpdate) {
      alert("You are not authorized to update this property.");
      return;
    }

    const res = await updatePropertyAction(Number(id), payload);

    if (res.success) {
      alert("Updated successfully!");
      router.push("/all");
    } else {
      alert("Update failed.");
    }
  };

  if (!oldProperty)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading property...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#040b16] via-[#071224] to-[#01070f] text-white">
      <Navigation />
      <BackgroundElements />

      <div className="px-6 pt-36 pb-24 max-w-3xl mx-auto">
        {/* BACK TO EXPLORE BUTTON */}
        <div className="mb-6">
          <button
            onClick={() => router.push(`/single/${id}`)}
            className="
              px-6 py-3 rounded-xl font-semibold text-sm
              bg-gradient-to-r from-blue-700/20 to-cyan-500/20
              border border-blue-500/40 text-blue-300
              hover:bg-blue-500/40 hover:border-blue-500/80
              transition-all duration-300 shadow-lg shadow-cyan-500/10
            "
          >
            ← Back to Property
          </button>
        </div>

        {/* TITLE */}
        <h1
          className="
            text-5xl font-extrabold text-center mb-16
            bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400
            bg-clip-text text-transparent tracking-tight
          "
        >
          Update Property
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            bg-[#0e1b2d]/70 p-10 rounded-2xl 
            border border-white/10 backdrop-blur-xl 
            shadow-lg shadow-cyan-500/10 space-y-8
          "
        >
          <FormInput
            label="Property Name"
            error={errors.pname}
            register={{ ...register("pname", { required: true }) }}
          />

          <FormInput
            label="Property Address"
            error={errors.paddress}
            register={{ ...register("paddress", { required: true }) }}
          />

          <FormSelect
            label="Type of Property"
            error={errors.ptype}
            register={{ ...register("ptype", { required: true }) }}
            options={[
              "Bungalow",
              "Villa",
              "Row House",
              "Apartment",
              "Pent House",
            ]}
          />

          <FormInput label="Property Description" register={{ ...register("pdesc") }} />

          <FormInput
            label="Property Image URL"
            error={errors.image}
            register={{ ...register("image", { required: true }) }}
          />

          <FormInput
            label="City"
            error={errors.city}
            register={{ ...register("city", { required: true }) }}
          />

          <FormInput
            label="Size (sqft)"
            type="number"
            error={errors.sqft}
            register={{
              ...register("sqft", { required: true, valueAsNumber: true }),
            }}
          />

          <FormSelect
            label="BHK"
            error={errors.bhk}
            register={{
              ...register("bhk", { required: true, valueAsNumber: true }),
            }}
            options={[1, 2, 3, 4, 5]}
          />

          <FormInput
            label="Price"
            type="number"
            error={errors.price}
            register={{
              ...register("price", { required: true, valueAsNumber: true }),
            }}
          />

          {canUpdate ? (
            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold text-lg
                bg-gradient-to-r from-cyan-500/20 to-blue-500/20
                border border-cyan-500/40 text-cyan-300
                hover:bg-cyan-500/40 hover:border-cyan-500/80
                transition-all duration-300
              "
            >
              Update Property
            </button>
          ) : (
            <p className="text-center text-red-400 text-lg font-semibold">
              You are not allowed to edit this property.
            </p>
          )}
        </form>

        {/* ✨ EXTRA CONTENT SECTION AFTER THE FORM */}
        <div
          className="
            mt-16 p-10 rounded-2xl 
            bg-[#0b1626]/60 backdrop-blur-lg
            border border-white/10 
            shadow-xl shadow-blue-500/10
            text-center space-y-6
          "
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 text-transparent bg-clip-text">
            Make Your Property Stand Out!
          </h2>

          <p className="text-slate-300 leading-relaxed text-lg">
            High-quality images, accurate descriptions, and realistic pricing
            help buyers discover your property faster. Updating details
            regularly keeps your listing at the top and attracts more customers.
          </p>

          <button
            onClick={() => router.push("/add")}
            className="
              px-8 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-cyan-500/20 to-teal-500/20
              border border-cyan-500/40 text-cyan-300
              hover:bg-cyan-500/40 hover:border-cyan-500/80
              transition-all duration-300
            "
          >
            + Add New Property
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ---------------------------------
   Form Input Component
-----------------------------------*/
const FormInput = ({ label, register, error, type = "text" }: any) => (
  <div className="space-y-3">
    <label className="text-slate-300 font-medium tracking-wide text-[15px]">
      {label}
    </label>

    <input
      type={type}
      {...register}
      className="
        w-full px-4 py-3 rounded-lg bg-[#091526] text-white
        border border-white/10 focus:border-cyan-400
        focus:ring-2 focus:ring-cyan-500/40 outline-none
        transition-all duration-300
      "
    />

    {error && <p className="text-red-400 text-sm">This field is required</p>}
  </div>
);

/* ---------------------------------
   Form Select Component
-----------------------------------*/
const FormSelect = ({ label, register, error, options }: any) => (
  <div className="space-y-3">
    <label className="text-slate-300 font-medium tracking-wide text-[15px]">
      {label}
    </label>

    <select
      {...register}
      className="
        w-full px-4 py-3 rounded-lg bg-[#091526] text-white 
        border border-white/10 focus:border-cyan-400
        focus:ring-2 focus:ring-cyan-500/40 outline-none
        transition-all duration-300
      "
    >
      {options.map((op: any) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>

    {error && <p className="text-red-400 text-sm">This field is required</p>}
  </div>
);
