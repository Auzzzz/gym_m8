import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Chip,
} from "@mui/material";
import React, { useEffect } from "react";
import { Layout } from "~/components/layout";
import { api } from "~/utils/api";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GridColDef } from "@mui/x-data-grid";
import Workout_DataGrid from "~/components/Profile/workouts/Workout_DataGrid";
import { AddedExercise } from "../create_workout";

function CreatedWorkouts() {
  const { data, isLoading } = api.predefinedWorkouts.get.useQuery();
  console.log( data)

  const handleExercisesOnUpdate = async (update: AddedExercise) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === update.id ? { ...exercise, ...update } : exercise
      )
    );
  };





  
  const IndAccordion = () => {
    return (
      <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{fontSize: 20}}>Workout Name</Typography> <Chip sx={{p: 0}} label="Public" />
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Workout Description

          {exercises.length > 0 ? (
          <Workout_DataGrid
            rows={exercises}
            column={columns}
            // setExercises={setExercises}
            // updateExercise={handleExercisesOnUpdate}
            isPosting={false}
          />
        ) : (
          <p> Add an exercise to your workout </p>
        )}
        </Typography>
      </AccordionDetails>
    </Accordion>
    );
  };

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


  // console.log(data)
  return (
    <Layout header="Created Workouts">
      <div>
<IndAccordion />

      </div>
    </Layout>
  );
}

export default CreatedWorkouts;
