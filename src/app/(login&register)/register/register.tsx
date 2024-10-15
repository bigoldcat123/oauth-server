'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import { z } from 'zod'
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
import { Card, CardContent } from "@/components/ui/card"
import { LoginAction, RegisterAction, sendCodeAction } from "@/actions/auth"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
  rePassword: z.string().min(2, {
    message: "Re-entered password must be at least 2 characters.",
  }),
  code: z.string().min(6).max(6)
  // code: z.string().min(4)
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"], // 错误消息会显示在 rePassword 字段上
  message: "Passwords do not match",
});
const useTimeout = (initialValue = 60) => {
  const [state, setState] = useState(initialValue - initialValue)
  let timer: any = null
  function startTimmer() {
    let init = initialValue
    setState(init)
    timer = setInterval(() => {
      init--
      setState(init)
      if (init == 0) {
        clearInterval(timer)
      }
    }, 1000);
  }
  return [state, startTimmer] as const
}
export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const callbackUrl = useSearchParams().get('callbackUrl')
  const [time, startTimmer] = useTimeout(60)
  const sendCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    startTimmer()
    const email = form.getValues('email')
    if (email)
      sendCodeAction(form.getValues('email'))
  }
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    setIsLoading(true)
    RegisterAction({
      email: values.email,
      password: values.password,
      code: values.code
    }, callbackUrl).then(res => {
      console.log(res);

      setIsLoading(false)
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="please enter email" {...field} />
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
                <Input type="password" placeholder="please enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>rePassword</FormLabel>
              <FormControl>
                <Input type="password" placeholder="please enter rePassword" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex flex-row items-center gap-x-2">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>code</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="please enter code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={time > 0} className=" self-end" onClick={sendCode}>get code{time > 0 ? ` waiting (${time})` : ''}</Button>
        </div>

        <Button disabled={isLoading} type="submit">Submit</Button>
      </form>
    </Form>
  )

}