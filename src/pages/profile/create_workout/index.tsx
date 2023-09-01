import React, { useState } from "react";
import { Layout } from "~/components/layout";
import { workoutComponentsValidationSchema } from "~/utils/validations/workout";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Label, Search } from "@mui/icons-material";
import Search_Exercises_Result from "~/components/Profile/workouts/Search_Exercises_Results";
import { api } from "~/utils/api";
import { Exercises } from "@prisma/client";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowModes,
  GridRowModesModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Workout_DataGrid from "~/components/Profile/workouts/Workout_DataGrid";

type ValidationSchema = z.infer<typeof workoutComponentsValidationSchema>;

export type AddedExercise = {
  isNew: boolean;
  id: String;
  name: String;
  sets: Number;
  reps: Number;
  weight: Number;
  rest: Number;
  time: Number;
  notes: String;
  target: String;
};

function CreateWorkout() {
  const [inputName, setInput] = useState("");
  const { data, isLoading: componentsLoading } =
    api.exercises.getByContains.useQuery({ inputName });
  const [exercises, setExercises] = useState<AddedExercise[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

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
    await awaitTimeout(1500);
    setInput(e.target.value);
  };

  // Set Column Definitions excluding actions column this is set in the Workout_DataGrid component
  const columns: GridColDef[] = [
    { field: "name", headerName: "Exercise Name", width: 180, editable: false },
    { field: "target", headerName: "Target", width: 80, editable: false },
    { field: "sets", headerName: "Sets", editable: true, },
    { field: "reps", headerName: "Reps", editable: true, },
    { field: "weight", headerName: "Weight", editable: true, },
    { field: "rest", headerName: "Rest", editable: true, },
    { field: "time", headerName: "Time", editable: true, },
    { field: "notes", headerName: "Notes", editable: true, },
  ];

  // Addding a new exercise to the workout this is then replicated as a row in the data grid
  const handleExercisesOnSubmit = (addExercises: Exercises) => {
    const newExercise: AddedExercise = {
      id: addExercises.id,
      name: addExercises.name,
      sets: 0,
      reps: 0,
      weight: 0,
      rest: 0,
      time: 0,
      notes: "",
      target: addExercises.target,
      isNew: true,
    };

    setExercises((current) => [...current, newExercise]);
  };

  console.log("exercises", exercises);

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
            {exercises.length > 0 ? (
              <Workout_DataGrid
              rows={exercises}
              column={columns}
              setExercises={setExercises}
            />
            ) : (
              <p> Add exercises below </p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit">Submit</Button>
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
                {data?.map((exercise) => (
                  // <Search_Exercises_Result {...exercise} key={exercise.id} handleExercisesOnSubmit={handleExercisesOnSubmit}/>
                  <Search_Exercises_Result
                    exercise={{
                      id: exercise.id,
                      bodyPart: exercise.bodyPart,
                      equipment: exercise.equipment,
                      gifUrl: exercise.gifUrl,
                      name: exercise.name,
                      target: exercise.target,
                      description: exercise.description,
                      videoUrl: exercise.videoUrl,
                    }}
                    {...exercise}
                    key={exercise.id}
                    handleExercisesOnSubmit={handleExercisesOnSubmit}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Layout>
  );
}

export default CreateWorkout;
