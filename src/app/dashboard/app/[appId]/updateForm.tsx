'use client'
import { createNewApp, deleteAppAction, updateAppAction } from '@/actions/dao/app'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { data_app } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  app_description: z.string().max(200, {
    message: "Description must be at most 200 characters.",
  }).min(2, {
    message: "Description must be at least 2 characters.",
  }),
  homepage_url: z.string().url({ message: 'Please enter a valid url' }),
  authorization_callback_url: z.string().url({ message: 'Please enter a valid url' })
})
export default function UpdateForm({
    app
}:{
    app:data_app
}) {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: app.name ?? '',
      app_description: app.app_description ?? '',
      homepage_url:  app.homepage_url ?? '',
      authorization_callback_url: app.authorization_callback_url ??''
    }
  })

  const deleteApp = () => {
    deleteAppAction(app.id).then(res => {
      router.push('/dashboard')
    })
  }
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // TODO UPDATE
    console.log(values)
    updateAppAction(app.id, values).then(res => {
      
    })
  }
  return (
    <>
      <div className=" py-16 flex justify-center container mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-96">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>App Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="app_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="homepage_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home URL</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorization_callback_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authorization callbackURL</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={'sm'} variant={'outline'} type="submit">Save</Button>
          </form>
        </Form>
      </div>
      <div>
        <Button variant={'destructive'} onClick={() => {deleteApp()}}>Delete App</Button>
      </div>
    </>
  );
}