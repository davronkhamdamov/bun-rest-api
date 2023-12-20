import { Elysia } from "elysia";

// define plugin
const plugin = new Elysia()
  .state("plugin-version", 1)
  .get("/form-plugin", () => "Hi")
  .get("/greet", () => "Hello");

// application
const app = new Elysia()
  .use(plugin)
  .get("/", () => "Hello Elysia")
  .state("version", 1)
  .decorate("getDate", () => Date.now())
  .get("/page/:id", ({ params: { id } }) => id)
  .post("/post", (res) => {
    res.set.status = 201;
    return res.body;
  })
  .post("/product/*", (body) => {
    return body;
  })
  .get("/json", ({ store, getDate }) => {
    // return new Response(
    //   JSON.stringify({
    //     tracks: ["Dancing Feat", "John Doe"],
    //   }),
    //   {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   }
    // );
    return { tracks: ["Dancing Feat", "John Doe", store, getDate()] };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
