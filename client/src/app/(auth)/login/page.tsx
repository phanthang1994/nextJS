'use client'
import React from 'react'

export default function LoginPage() {
  const[email, setEmail] = React.useState('phanxuanthang20@gmail.com')
  return (
    <div>
      LoginPage
      <br/>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
    </div>
  )
}
