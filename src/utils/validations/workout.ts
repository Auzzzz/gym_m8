
import * as z from 'zod'

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
    name: z.string().min(1, {message: "Name is required"}).max(50, {message: "Name is too long"}),
    description: z.string().min(1).max(255),

})



// import React from "react";
// import { Layout } from "~/components/layout";
// import { workoutComponentsValidationSchema } from "~/utils/validations/workout";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Button, TextField } from "@mui/material";

// type ValidationSchema = z.infer<typeof workoutComponentsValidationSchema>;

// function CreateWorkout() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<ValidationSchema>({
//     resolver: zodResolver(workoutComponentsValidationSchema),
//   });

//   const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

//   return (
//     <Layout header="Create a Workout">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           id="name"
//           label="Required"
//           placeholder="name"
//           {...register("name")}
//         />
//         {errors.name && <p>{errors.name?.message}</p>}

//         <TextField
//           id="description"
//           label="Required"
//           placeholder="description"
//           {...register("description")}
//         />
//         {errors.description && <p>{errors.description?.message}</p>}

//         <Button type="submit">Submit</Button>

//       </form>
//     </Layout>
//   );
// }

// export default CreateWorkout;
