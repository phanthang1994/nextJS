'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import React from 'react'

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
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import authApiRequest from "@/apiRequests/auth"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"


export default function RegisterForm() {

  const { toast } = useToast()
  const router = useRouter()

  
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyType) {
    try {
      // console.log('API', envConfig.NEXT_PUBLIC_API_ENDPOINT)
      const result = await authApiRequest.register(values)
      toast({
        description: result.payload.message
      });
      await authApiRequest.auth({ sessionToken: result.payload.data.token })
      router.push('/me')
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>confirmPassword</FormLabel>
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
