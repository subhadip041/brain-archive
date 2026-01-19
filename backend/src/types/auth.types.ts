import z from "zod"

export const signupType = z.object({

  fullname: z.string(),

  email: z.string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),


  password: z.string()
    .min(8, { message: 'password must be at least 8 characters long' })
    .max(20, { message: 'password must be at most 20 characters long' })
});


export const signinType = z.object({

  email: z.string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),


  password: z.string()
    .min(8, { message: 'Username must be at least 3 characters long' })
    .max(20, { message: 'Username must be at most 20 characters long' })
});