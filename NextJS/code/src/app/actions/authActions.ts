'use server';

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from 'bcryptjs';

export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = registerSchema.safeParse(data);

    if(!validated.success){
        return {status:'error', error: validated.error.errors}
    }
    const {name, email, password} = validated.data;

    const hashPassword = await bcrypt.hash(password,10)

    const existingUser = await prisma.user.findUnique({
        where: {email}
    })
    
    if(existingUser) return {status:'error', error: "User already exists"}
    

    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashPassword
        }
    })
    return {status:'success',data: user}
        
    } catch (error) {
        console.log(error)
        return {status:'error', error: "Something went wrong"}
    }
    
}
export async function getUserByEmail(email: string){
    return prisma.user.findUnique({
        where: {email}
    })
}
export async function getUserById(id:string){
    return prisma.user.findUnique({
        where: {id}
    })
}
