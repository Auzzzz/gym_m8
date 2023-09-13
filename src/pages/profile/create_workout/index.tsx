import React, { useId, useState } from "react";
import { Layout } from "~/components/layout";
import { workoutComponentsValidationSchema } from "~/utils/validations/workout";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import Search_Exercises_Result from "~/components/Profile/workouts/Search_Exercises_Results";
import { api } from "~/utils/api";
import { Exercises, Predefined_Workout_Exercise } from "@prisma/client";
import { GridColDef } from "@mui/x-data-grid";
import Workout_DataGrid from "~/components/Profile/workouts/Workout_DataGrid";
import type { Exercises_Tags_Default } from "@prisma/client";
import { v4 } from "uuid";
type ValidationSchema = z.infer<typeof workoutComponentsValidationSchema>;

type SubmitExercises = {
  fail: boolean;
  data: any;
};

export type AddedExercise = {
  isNew: boolean;
  name: string;
  id: string;
  exerciseId: string;
  sets: number;
  reps: number;
  rest: number;
  time: number;
  weight: number;
  notes: string;
  target: string;
};

function CreateWorkout() {
  const [inputName, setInput] = useState("");
  const { data, isLoading: componentsLoading } =
    api.exercises.getByContains.useQuery({ inputName });
  const [exercises, setExercises] = useState<AddedExercise[]>([]);
  const [tagList, setTag] = useState<Exercises_Tags_Default[]>([]);
  const [error, setError] = useState([]);
  const alltags = api.exercises.getTags.useQuery();
  const [isPublic, setIsPublic] = useState(false);
  var isPosting = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(workoutComponentsValidationSchema),
  });

  const { mutate } = api.predefinedWorkouts.nestedCreate.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    // Lock the inputs & modify exercises to remove display data
    isPosting = true;
    var submitData = exercises.map(
      ({ isNew, name, target, id, ...keep }) => keep
    );

    mutate({
      name: data.name,
      description: data.description,
      Predefined_Workout_Exercise: submitData,
    });
  };

  // dodgy way of limiting api calls
  const awaitTimeout = (delay: number) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const handleExercisesOnChange = async (e: any) => {
    e.preventDefault();
    await awaitTimeout(3000);
    setInput(e.target.value);
  };

  // Set Column Definitions excluding actions column this is set in the Workout_DataGrid component
  const columns: GridColDef[] = [
    { field: "name", headerName: "Exercise Name", width: 180, editable: false },
    { field: "target", headerName: "Target", width: 80, editable: false },
    { field: "sets", headerName: "Sets", editable: true },
    { field: "reps", headerName: "Reps", editable: true },
    { field: "weight", headerName: "Weight", editable: true },
    { field: "rest", headerName: "Rest", editable: true },
    { field: "time", headerName: "Time", editable: true },
    { field: "notes", headerName: "Notes", editable: true },
  ];

  // Addding a new exercise to the workout this is then replicated as a row in the data grid
  const handleExercisesOnSubmit = (addExercises: Exercises) => {
    const newExercise: AddedExercise = {
      id: v4(),
      exerciseId: addExercises.id,
      name: addExercises.name,
      sets: 1,
      reps: 1,
      weight: 0,
      rest: 0,
      time: 5,
      notes: "",
      target: addExercises.target,
      isNew: true,
    };
    setExercises((current) => [...current, newExercise]);
  };

  const handleExercisesOnUpdate = async (update: AddedExercise) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === update.id ? { ...exercise, ...update } : exercise
      )
    );
  };

  // Remove set tags
  const handleChipOnClick = (tag: Exercises_Tags_Default) => {
    setTag(tagList.filter((current) => current !== tag));
    alltags.data?.push(tag);
  };

  // Add set tags
  const handleChipOnDelete = (tag: any, index: number) => {
    setTag((current) => [...current, tag]);

    alltags.data?.splice(index, 1);
  };

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
              disabled={isPosting}
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
              disabled={isPosting}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description?.message}</p>
            )}
          </Grid>
          <Grid item sm={6} xs={12}>
            {/* <Switch checked={isPublic} onChange={() => setIsPublic(!isPublic)} label=""/> */}
            <FormControlLabel
              control={
                <Switch
                  checked={isPublic}
                  //   TODO: fix onchange/register for is public switch set to false in preWorkout router
                  //   onChange={() => setIsPublic(!isPublic)}
                  //   {...register("isPublic")}
                />
              }
              label="Make workout public"
            />
          </Grid>
          {/* TODO: Make Labels easier to read */}
          <Grid item xs={12}>
            <p>
              {tagList.map((tag) => (
                <Chip
                  label={tag.tag}
                  variant="outlined"
                  onClick={(e) => handleChipOnClick(tag)}
                  disabled={isPosting}
                />
              ))}
            </p>
            <p>
              {alltags.data?.map((tag, index) => (
                <Chip
                  label={tag.tag}
                  variant="outlined"
                  onClick={(e) => handleChipOnDelete(tag, index)}
                  disabled={isPosting}
                />
              ))}
            </p>
            {/* <Chip
              {...alltags.data?.map((tags: { id: string; tag: string }) =>
                tag_list(tags)
              )}
            /> */}
          </Grid>
          <Grid item xs={12}>
            {exercises.length > 0 ? (
              <Workout_DataGrid
                rows={exercises}
                column={columns}
                setExercises={setExercises}
                updateExercise={handleExercisesOnUpdate}
                isPosting={isPosting}
              />
            ) : (
              <p> Add an exercise below </p>
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
                    isPosting={isPosting}
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
