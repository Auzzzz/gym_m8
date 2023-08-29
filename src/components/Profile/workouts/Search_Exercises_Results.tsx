import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Exercises } from "@prisma/client";
import React from "react";

type Props = {
  exercise: Exercises;
  handleExercisesOnSubmit: (selected: Exercises) => void;
};

function Search_Exercises_Result({ exercise, handleExercisesOnSubmit }: Props) {
  const onSelect = (selected: Exercises) => {
    console.log(selected);
    console.log(typeof selected);
  };

  return (
    <Card sx={{ maxWidth: 345, m: 3 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={exercise.gifUrl}
          alt="workout gif"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textTransform: "capitalize" }}
          >
            {exercise.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {exercise.description}
          </Typography>
          <Chip
            sx={{ textTransform: "capitalize" }}
            label={"Target: " + exercise.target}
          />{" "}
          <Chip
            sx={{ textTransform: "capitalize" }}
            label={"Equipment: " + exercise.equipment}
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => handleExercisesOnSubmit({ ...exercise })}
        >
          Add to Workout
        </Button>
      </CardActions>
    </Card>
  );
}

export default Search_Exercises_Result;
