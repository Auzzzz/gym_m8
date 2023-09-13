import { exercisesRouter } from "~/server/api/routers/exercisesRouter";
import { createTRPCRouter } from "~/server/api/trpc";
import { preWorkoutRouter } from "./routers/preWorkout";
import { preWorkoutExerciseRouter } from "./routers/preWorkoutExercise";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // example: exampleRouter,
  exercises: exercisesRouter,
  predefinedWorkouts: preWorkoutRouter,
  preWorkoutExerciseRouter: preWorkoutExerciseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
