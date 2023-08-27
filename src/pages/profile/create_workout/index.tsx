import React from "react";
import { Layout } from "~/components/layout";
import { workoutComponentsValidationSchema } from "~/utils/validations/workout";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, TextField } from "@mui/material";

type ValidationSchema = z.infer<typeof workoutComponentsValidationSchema>;

function CreateWorkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(workoutComponentsValidationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <Layout header="Create a Workout">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="name"
          label="Required"
          placeholder="name"
          {...register("name")}
        />
        {errors.name && <p>{errors.name?.message}</p>}

        <TextField
          id="description"
          label="Required"
          placeholder="description"
          {...register("description")}
        />
        {errors.description && <p>{errors.description?.message}</p>}

        <Button type="submit">Submit</Button>

      </form>
    </Layout>
  );
}

export default CreateWorkout;
