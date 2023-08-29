import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
});
