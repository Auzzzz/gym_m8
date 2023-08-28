import React, { useState } from "react";
import { Layout } from "~/components/layout";
import { workoutComponentsValidationSchema } from "~/utils/validations/workout";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Label, Search } from "@mui/icons-material";
import Search_Exercises_Result from "~/components/Profile/workouts/Search_Exercises_Results";

type ValidationSchema = z.infer<typeof workoutComponentsValidationSchema>;

export type AddedExercise = {
  id: String;
  name: String;
  sets: Number;
  reps: Number;
  weight: Number;
  rest: Number;
  time: Number;
  notes: String;
};

function CreateWorkout() {
  const [search, setSearch] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(workoutComponentsValidationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  const awaitTimeout = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const handleExercisesOnChange = async (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
    await awaitTimeout(500);
  };


//   const {data, isLoading: componentsLoading }} = api.workoutType.getByContains.useQuery({ search });

  return (
    <Layout header="Create a Workout">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Workout Name"
              placeholder="Nightmare Workout"
              {...register("name")}
              fullWidth
              sx={{ mt: 2 }}
            />
            {errors.name && (
              <p style={{ color: "red" }}>{errors.name?.message}</p>
            )}
          </Grid>
          <Grid item sm={6} xs={12}>
            {" "}
            <TextField
              id="description"
              label="Workout Description"
              placeholder="Don't have workout nightmares anymore!"
              {...register("description")}
              fullWidth
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description?.message}</p>
            )}
          </Grid>
          {/* TODO: Make Labels for workouts */}
          <Grid item sm={6} xs={12}>
            <p> TODO: MAKE WORKOUT LABELS </p>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Search for Exercises"
              placeholder="Bench Press"
              fullWidth
              onChange={handleExercisesOnChange}
              sx={{ mt: 2 }}
            />

            <Grid item xs={12}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Search_Exercises_Result Search={search} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
}

export default CreateWorkout;
