'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { newPropertyAction } from "@/Actions/PropertyAction"
import { useCurrentUser } from "@/hook/hook"
import { newProperty } from "@/db/schema"
import { useRouter } from "next/navigation"
import BackgroundElements from "@/components/ui/background-elements"
import Navigation from "@/components/ui/navigation"
import Footer from "@/components/ui/footer"

const Page = () => {

  const router = useRouter()
  const { email } = useCurrentUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<newProperty>()

  const onSubmit: SubmitHandler<newProperty> = async (data) => {
    if (!email) return
    const newdata = { ...data, email: email || "" }
    await newPropertyAction(newdata)
    router.push("/all")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#040b16] via-[#071224] to-[#01070f] text-white">
      <BackgroundElements />
      <Navigation />

      <div className="px-6 pt-36 pb-24 max-w-3xl mx-auto">

        {/* Back Button */}
        <div className="mb-10">
          <a
            href="/all"
            className="
              inline-block px-6 py-2 rounded-xl text-sm font-semibold
              bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
              border border-cyan-500/40 text-cyan-300
              hover:bg-cyan-500/30 hover:border-cyan-500/60 
              transition-all duration-300
            "
          >
            ← Back to Explore
          </a>
        </div>

        {/* TITLE */}
        <h1
          className="
            text-5xl font-extrabold text-center mb-6
            bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400
            bg-clip-text text-transparent tracking-tight
          "
        >
          Add New Property
        </h1>

        {/* Subtitle / Description */}
        <p className="text-center text-slate-400 max-w-xl mx-auto mb-16">
          Fill in the details below to publish your property.  
          Make sure all information is accurate to attract the right buyers.
        </p>

        {/* FORM CARD */}
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
              "Pent House"
            ]}
          />

          <FormInput
            label="Property Description"
            register={{ ...register("pdesc") }}
          />

          <FormInput
            label="Image URL"
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
            register={{ ...register("sqft", { required: true, valueAsNumber: true }) }}
          />

          <FormSelect
            label="BHK"
            error={errors.bhk}
            register={{ ...register("bhk", { required: true, valueAsNumber: true }) }}
            options={[1, 2, 3, 4, 5]}
          />

          <FormInput
            label="Price"
            type="number"
            error={errors.price}
            register={{ ...register("price", { required: true, valueAsNumber: true }) }}
          />

          {/* SUBMIT BUTTON */}
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
            Publish Property
          </button>

        </form>

        {/* Extra Footer Content */}
        <div className="mt-16 text-center text-slate-400 text-sm">
          Your listing will be visible to buyers instantly.<br />
          Make sure the images and details represent your property well.
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Page

// ----------------------
// COMPONENTS
// ----------------------

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
)

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
        <option key={op} value={op}>{op}</option>
      ))}
    </select>

    {error && <p className="text-red-400 text-sm">This field is required</p>}
  </div>
)
