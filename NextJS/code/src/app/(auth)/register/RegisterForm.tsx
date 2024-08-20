'use client'

import { registerUser } from "@/app/actions/authActions";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const RegisterForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid,isSubmitting },
  } = useForm<RegisterSchema>({
    // resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data)
    if(result.status === "success"){
      console.log("User registered successfully!")
      router.push('/login')
    }else{
        if(Array.isArray(result.error)) {
          result.error.forEach((e) => {
            const fieldName = e.path.join(".")as 'email'|'name'|'password';
            setError(fieldName, {message: e.message})
          })
        }else{
          setError('root.serverError', {message: result.error})
        }
    }
  };

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row gap-3 items-center">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">Welcome back to the NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              type="text"
              label="name"
              placeholder="Enter your name"
              variant="bordered"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message as string}
            />
            <Input
              defaultValue=""
              type="email"
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message as string}
            />
            <Input
              defaultValue=""
              label="password"
              variant="bordered"
              placeholder="Enter your password"
              {...register("password")}
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
            {errors.root?.serverError && (
              <p className="text-danger text-sm">{errors.root.serverError.message}</p>
            )}
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              color="secondary"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;
