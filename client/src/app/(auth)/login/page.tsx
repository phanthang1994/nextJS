'use client'
import React from 'react'
import LoginForm from './login-form'

export default function LoginPage() {
  const[email, setEmail] = React.useState('phanxuanthang20@gmail.com')
  return (
    <div>
      <h1 className="text-xl font-bold underline text-center">Đăng Nhập</h1>
      <div className="flex justify-center">
      <LoginForm/>

      </div>
    </div>
  )
}
