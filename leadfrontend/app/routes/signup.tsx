'use client'

import { motion } from 'framer-motion'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/ui/card'
import { Form, useActionData, json, redirect } from '@remix-run/react'

import UserService from '~/services/UserService'
type ActionData = {
  fieldErrors?: {
    username?: string;
    password?: string;
  };
  fields?: {
    username?: string;
    password?: string;
  };
  message?:string
};

export async function action({ request }: { request: Request }) {
  const formData = new URLSearchParams(await request.text());
  const username = formData.get("username")?.trim();
  const password = formData.get("password")?.trim();

  const fieldErrors = {
    username: !username || username.length < 3 ? "Username must be at least 3 characters long" : undefined,
    password: !password || password.length < 8 ? "Password must be at least 8 characters long" : undefined,
  };

  if (fieldErrors.username || fieldErrors.password) {
    return json({ fieldErrors, fields: { username, password } });
  }
  const status=await UserService.RegisterUser({username,password} as {username:string,password:string})
  if(status){
    console.info('User Inserted')
  }else{
    return json({message:"Failed To create user try again"})
  }
  return redirect('/login');
}

export default function SignupForm() {
  const actionData = useActionData<ActionData>();

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-white-100 to-gray-100">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              <motion.h1
                className="text-3xl font-bold text-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="text-blue-600">SIGNUP</span>
              </motion.h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4 sm:w-48 lg:w-96 lg:h-96 sm:h-96">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  required
                  defaultValue={actionData?.fields?.username}
                />
                {actionData?.fieldErrors?.username && (
                  <p className="text-red-500 text-sm">{actionData.fieldErrors.username}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  defaultValue={actionData?.fields?.password}
                />
                {actionData?.fieldErrors?.password && (
                  <p className="text-red-500 text-sm">{actionData.fieldErrors.password}</p>
                )}
              </div>
              <CardFooter className="flex flex-col justify-end pt-4">
                <Button type="submit" className="w-full mt-10">
                  Create Your Account
                </Button>
                <p className='text-xs text-red-600 mt-10' > {actionData?.message}</p>
              </CardFooter>
            </Form>
          </CardContent>
          
        </Card>
      </motion.div>
    </div>
  );
}
