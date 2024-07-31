"use client";

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const LoginForm = () => {
  const onSubmit = (data: any) => {
    console.log(data);
  }
  const {register,handleSubmit, formState: {errors,isValid}} = useForm()

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row gap-3 items-center">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-neutral-500">Welcome back to the NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              type="email"
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              {...register('email',{required: 'Email is required'})}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Input
              defaultValue=""
              label="password"
              variant="bordered"
              placeholder="Enter your password"
              {...register('password',{required: 'Password is required'})}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message as string}
              endContent={
                <Button
                  className="bg-transparent"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoIosEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </Button>
              }
              type={isVisible ? "text" : "password"}
            />
            <Button isDisabled={!isValid} fullWidth color="secondary" type="submit">
              Login
            </Button>
          </div>
        </form>
        <Link href='/hfhfhf' className="text-secondary p-4">Forget Password</Link>
      </CardBody>
    </Card>
  );
};

export default LoginForm;
