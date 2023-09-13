import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const exercisesRouter = createTRPCRouter({
  getByContains: publicProcedure
    .input(z.object({ inputName: z.string() }))
    .query(async ({ ctx, input }) => {
      const workoutTypes = await ctx.prisma.exercises.findMany({
        take: 40,
        orderBy: { name: "asc" },
        where: {
          name: {
            contains: input.inputName,
          },
        },
      });
      return workoutTypes;
    }),

  getTags: publicProcedure.query(async ({ ctx }) => {
    const tags = await ctx.prisma.exercises_Tags_Default.findMany({
      take: 100,
    });
    return tags;
  }),

  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        isPublic: z.boolean(),
        user: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const workout = ctx.prisma.predefined_Workout.create({
        data: {
          name: input.name,
          description: input.description,
          isPublic: input.isPublic,
          user: ctx.userId,
        },
      });
      return workout;
    }),
});
