"use client"

import { useForm } from "react-hook-form"
import { register as apiRegister } from "../../lib/api"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

type FormData = { email: string; password: string }

export default function Register() {
  const { register, handleSubmit } = useForm<FormData>()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      await apiRegister(data.email, data.password)
      navigate("/dashboard")
    } catch (e: any) {
      setError(e?.response?.data?.error || "Registration failed")
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl font-semibold mb-4 text-balance">Create an account</h1>
      {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
        <input
          className="border rounded px-3 py-2 bg-white dark:bg-gray-900"
          placeholder="Enter your email address"
          type="email"
          {...register("email", { required: true })}
        />
        <input
          className="border rounded px-3 py-2 bg-white dark:bg-gray-900"
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <button className="bg-blue-600 text-white rounded px-3 py-2">Create account</button>
      </form>
      <p className="text-sm mt-3">
        Already have an account?{" "}
        <Link className="underline" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  )
}
