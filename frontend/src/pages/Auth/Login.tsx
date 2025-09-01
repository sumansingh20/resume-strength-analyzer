"use client"

import { useForm } from "react-hook-form"
import { login as apiLogin } from "../../lib/api"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

type FormData = { email: string; password: string }

export default function Login() {
  const { register, handleSubmit } = useForm<FormData>()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const onSubmit = async (data: FormData) => {
    setError(null)
    try {
      await apiLogin(data.email, data.password)
      navigate("/dashboard")
    } catch (e: any) {
      setError(e?.response?.data?.error || "Login failed")
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl font-semibold mb-4 text-balance">Sign in</h1>
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
        <button className="bg-blue-600 text-white rounded px-3 py-2">Sign in</button>
      </form>
      <p className="text-sm mt-3">
        No account?{" "}
        <Link className="underline" to="/register">
          Create one
        </Link>
      </p>
    </div>
  )
}
