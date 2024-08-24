'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ModeToggle } from '@/components/model-toggle'
import React from 'react'



import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginBodyType, LoginBody } from "@/schemaValidations/auth.schema"
import envConfig from '@/config'
import { useToast } from "@/components/ui/use-toast"
import { useAppContext } from "@/app/AppProvider"



export default function LoginForm() {
  const {setSessionToken} = useAppContext()
  // 1. Define your form.
  const { toast } = useToast()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    try {
      // console.log('API', envConfig.NEXT_PUBLIC_API_ENDPOINT)
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(async (neo) => {
          const payload = await neo.json()
          const data = {
            status: neo.status,
            payload
          }
          if (!neo.ok) {
            throw data
          }
          return data
        })
      toast({
        description: result.payload.message
      });
      const resultFromNextServer = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      setSessionToken(resultFromNextServer.payload.data.tokem)
    } catch (error: any) {
      const errors = error.payload.errors as {
        field: string;
        message: string;
      }[]
      const status = error.status as number;
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as 'email' | 'password', {
            type: 'server',
            message: error.message
          });
        });
      }
      else {
        toast({
          title: 'Lỗi',
          description: error.payload.message,
          variant: 'destructive',
        })
      }
    }
  }
  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit, (error) => console.log('error', error))} className="space-y-2 max-w-[600px] flex-shrink-0 w-full">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="!mt-8 w-full">Submit</Button>
      </form>
    </Form>
  )
}
