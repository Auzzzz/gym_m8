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
import React from "react";

const Search_Exercises_Result = (props: any) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={props.gifUrl}
          alt="workout gif"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Chip label={"Target: " + props.target} />{" "}
          <Chip label={"Equipment: " + props.equipment} />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => onUpdate({ props })}
        >
          Add to Workout
        </Button>
      </CardActions>
    </Card>
  );
};

export default Search_Exercises_Result;
