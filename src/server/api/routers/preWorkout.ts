import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const preWorkoutRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const workout = ctx.prisma.predefined_Workout.create({
        data: {
          name: input.name,
          description: input.description,
          isPublic: false,
          user: ctx.userId,
        },
      });
      return workout;
    }),

  get: privateProcedure
    .input(z.string().min(32).max(32))
    .mutation(async ({ ctx, input }) => {
      const pre_workouts = await ctx.prisma.predefined_Workout.findMany({
        where: {
          user: ctx.userId,
        },
      });
      return pre_workouts;
    }),
  
  update: privateProcedure
    .input(
      z.object({
        id: z.string().max(25),
        name: z.string(),
        description: z.string(),
        isPublic: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const workout = await ctx.prisma.predefined_Workout.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          isPublic: input.isPublic,
        },
      });
      return workout;
    }),


  delete: privateProcedure
    .input(z.string().max(25))
    .mutation(async ({ ctx, input }) => {
      const workout = await ctx.prisma.predefined_Workout.delete({
        where: {
          id: input,
        },
      });
      return workout;
    }),


    // PreWorkout_Exercises

    
  nestedCreate: privateProcedure
  .input(
    z.object({
      name: z.string(),
      description: z.string(),
      Predefined_Workout_Exercise: z.array(
        z.object({
          sets: z.number(),
          reps: z.number(),
          rest: z.number(),
          time: z.number(),
          notes: z.string(),
          weight: z.number(),
          exerciseId: z.string(),
        })
      ),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const result = await ctx.prisma.predefined_Workout.create({
      data: {
        name: input.name,
        description: input.description,
        isPublic: false,
        user: ctx.userId,
        Predefined_Workout_Exercise: {
          create: input.Predefined_Workout_Exercise
            // {sets: 3, reps: 1, rest: 1, time: 3, notes: "test3", weight: -1, exerciseId: "0003", Predefined_Workout: {connect: {id: "0003"}}},
          
        }
    }});
    console.log("input", input);
    console.log(result);
    return result;
  }),

});