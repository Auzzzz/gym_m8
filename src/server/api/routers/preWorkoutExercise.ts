import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const preWorkoutExerciseRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        id: z.string(),
        sets: z.number(),
        reps: z.number(),
        rest: z.number(),
        time: z.number(),
        notes: z.string(),
        weight: z.number(),
        preWorkoutId: z.string(),
        exerciseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const preWorkoutExercise =
        await ctx.prisma.predefined_Workout_Exercise.upsert({
          where: {
            id: input.id,
          },
          update: {
            sets: input.sets,
            reps: input.reps,
            rest: input.rest,
            time: input.time,
            notes: input.notes,
            weight: input.weight,
            predefinedWorkoutId: input.preWorkoutId,
            exerciseId: input.exerciseId,
          },
          create: {
            sets: input.sets,
            reps: input.reps,
            rest: input.rest,
            time: input.time,
            notes: input.notes,
            weight: input.weight,
            predefinedWorkoutId: input.preWorkoutId,
            exerciseId: input.exerciseId,
          },
        });

      return preWorkoutExercise;
    }),

  createMulti: privateProcedure
    .input(
      z.array(
        z.object({
          exerciseId: z.string(),
          sets: z.number(),
          reps: z.number(),
          rest: z.number(),
          time: z.number(),
          notes: z.string(),
          weight: z.number(),
          predefinedWorkoutId: z.string(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      const preWorkoutExercise =
        await ctx.prisma.predefined_Workout_Exercise.createMany({
          data: input,
          skipDuplicates: true,
        });

      return preWorkoutExercise;
    }),



    
});

