import * as z from "zod";

// export const workoutComponentsValidationSchema = z.object({
//     name: z.string().min(1).max(255),
//     description: z.string().min(1).max(255),
//     exercises: z.array(
//         z.object({
//             name: z.string().min(1).max(255),
//             description: z.string().min(1).max(255),
//             sets: z.array(
//                 z.object({
//                     reps: z.number().min(1).max(1000),
//                     weight: z.number().min(1).max(1000),
//                 })
//             ),
//         })
//     ),
// })

export const workoutComponentsValidationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name is too long" }),
  description: z.string().min(0).max(255, {message: "Description is too long"}),
//   isPublic: z.boolean(),
});
