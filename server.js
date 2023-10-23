import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgresql.js";
import 'dotenv/config.js'
const server = fastify();

// GET, POST, PUT, DELETE, PATCH

const database = new DatabasePostgres();

server.get("/videos", async (request) => {
  const search = request.query.search;

  const videos = await database.list(search);

  return videos;
});

// request body

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;

  await database.create({
    title,
    description,
    duration,
  });

  return reply.status(201).send;
});

// route parameter
server.put("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  await database.update(videoId, {
    title,
    description,
    duration,
  });
  return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);

  return reply.status(204).send();
});

server.get("/", () => {
  return "Hello World";
});

server.get("/node", () => {
  return "Hello Node.js";
});

server.listen({
  port: process.env.PORT ?? 3333,
});
