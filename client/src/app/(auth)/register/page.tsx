"use client"

import RegisterForm from "./regiser-form"

 


export default function RegisterPage() {
   return (
    <div>
      <h1 className="text-xl font-bold underline text-center">Đăng Ký</h1>
      <div className="flex justify-center">
      <RegisterForm/>

      </div>
    </div>
  )
}