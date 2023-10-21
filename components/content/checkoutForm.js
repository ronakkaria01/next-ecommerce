"use client"
import { useForm } from "react-hook-form"

export default function CheckoutForm({ user }) {
    const { id } = user
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const checkout = async (e) => {
        const updateUser = {
            fields: {
                first_name: e.first_name,
                last_name: e.last_name
            },
            meta_data: {
                street_address_1: e.street_address_1,
                street_address_2: e.street_address_2,
                country: e.country,
                postcode: e.postcode,
                city: e.city,
                phone: e.phone
            }
        }
        const user = await fetch(`/api/user/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updateUser)
        })
    }

    return (
        <>
            <p>Checkout</p>
            <form onSubmit={handleSubmit(checkout)}>
                <div className="flex gap-8">
                    <div className="w-1/2">
                        <input type="text" placeholder="First Name" defaultValue={user.first_name} {...register("first_name", { required: true })} />
                        {errors.first_name && <span>This value is required</span>}
                    </div>
                    <div className="w-1/2">
                        <input type="text" placeholder="Last Name" defaultValue={user.last_name} {...register("last_name", { required: true })} />
                        {errors.last_name && <span>This value is required</span>}
                    </div>
                </div>
                <div>
                    <input type="text" placeholder="Street Address" defaultValue={user.street_address_1} {...register("street_address_1", { required: true })} />
                    {errors.street_address_1 && <span>This value is required</span>}
                </div>
                <div>
                    <input type="text" placeholder="Apartment, suite, unit, etc." defaultValue={user.street_address_2} {...register("street_address_2")} />
                </div>
                <div>
                    <input type="text" placeholder="Country" defaultValue={user.country} {...register("country", { required: true })} />
                    {errors.country && <span>This value is required</span>}
                </div>
                <div>
                    <input type="text" placeholder="Postcode" defaultValue={user.postcode} {...register("postcode", { required: true })} />
                    {errors.postcode && <span>This value is required</span>}
                </div>
                <div>
                    <input type="text" placeholder="City" defaultValue={user.city} {...register("city", { required: true })} />
                    {errors.city && <span>This value is required</span>}
                </div>
                <div>
                    <input type="text" placeholder="Phone" defaultValue={user.phone} {...register("phone", { required: true })} />
                    {errors.phone && <span>This value is required</span>}
                </div>
                <div>
                    <input type="email" placeholder="Enter Email Address" defaultValue={`${user.email}`}  {...register("email", { required: true })} />
                    {errors.email && <span>This value is required</span>}
                </div>
                <div>
                    <button>Continue to shipping</button>
                </div>
            </form>
        </>
    )
}