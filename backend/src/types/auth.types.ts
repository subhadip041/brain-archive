import z from "zod"

export const signupSchema = z.object({
  username: z.string()
    .min(3, { message: 'Username must be at least 3 characters long' }) 
    .max(10, { message: 'Username must be at most 10 characters long' }), 
  
  email: z.string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }), 


  password: z.string()
    .min(8, { message: 'Username must be at least 3 characters long' }) 
    .max(20, { message: 'Username must be at most 20 characters long' })
});


export const signinSchema = z.object({
  
  email: z.string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }), 


  password: z.string()
    .min(8, { message: 'Username must be at least 3 characters long' }) 
    .max(20, { message: 'Username must be at most 20 characters long' })
});