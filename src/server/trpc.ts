import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { mockApplications } from './mock/data';
import { pokemon } from './mock/pokemondata';

export const t = initTRPC.create();

const batchSample = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello, ${input.name}!` };
    }),

  getTime: t.procedure.query(async () => {
    //const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    //await sleep(10000);
    return { time: new Date().toISOString() };
  }),


  getRandomNumber: t.procedure.query(() => {
    return { number: Math.floor(Math.random() * 100) };
  }),
});

const mentorRouter = t.router({
  submitApplication: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
        age: z.number().min(18),
        email: z.string().email(),
        description: z.string().min(10),
      })
    )
    .mutation(async ({ input }) => {
      console.log('Received mentor application:', input);
      return { success: true, message: 'Mentor application received!' };
    }),

  listApplications: t.procedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(5),
      }).optional()
    )
    .query(({ input }) => {
      const { page = 1, limit = 5 } = input ?? {};
      const start = (page - 1) * limit;
      const end = start + limit;

      const paginated = mockApplications.slice(start, end);
      const total = mockApplications.length;

      return {
        data: paginated,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      };
    }),

  getApplicationById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const application = mockApplications.find((app) => app.id === input.id);

      if (!application) {
        throw new Error('Application not found');
      }

      return application;
    }),
});

const pokemonRouter = t.router({
  getPokemon: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      console.log("request :", input)

      return pokemon;
    }),
});


// Root router: combine routers
export const appRouter = t.router({
  mentor: mentorRouter,
  batchSample: batchSample,
  pokemon: pokemonRouter,

  helloworld: t.procedure
  .input(z.object({ name: z.string() }))
  .query(({ input }) => {
    return {
      greeting: `Hello, ${input.name}!`,
    };
  }),
});

export type AppRouter = typeof appRouter;

