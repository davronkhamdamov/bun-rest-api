import { Elysia, t } from "elysia";
import { plugin } from "./plugin";
import { users } from "./data";
import { registerDTO } from "./module";

// application
const app = new Elysia();
// .use(plugin)
// .get("/", () => "Hello Elysia")
// .state("version", 1)
// .decorate("getDate", () => Date.now())
// .get("/page/:id", ({ params: { id } }) => id)
// .post("/post", (res) => {
//   res.set.status = 201;
//   return res.body;
// })
// .post("/product/*", (body) => {
//   return body;
// })
// .get("/json", ({ store, getDate }) => {
//   // return new Response(
//   //   JSON.stringify({
//   //     tracks: ["Dancing Feat", "John Doe"],
//   //   }),
//   //   {
//   //     headers: {
//   //       "Content-type": "application/json",
//   //     },
//   //   }
//   // );
//   return { tracks: ["Dancing Feat", "John Doe", store, getDate()] };
// });

app.group("/user", (app) =>
  app
    .get("/list", () => users)
    .get(
      "/:id",
      ({ params: { id } }) => {
        return users.filter((e) => e.id == +id);
      },
      {
        params: t.Object({ id: t.Numeric() }),
      }
    )
    .post("/register", ({ body }) => body, {
      body: registerDTO,
      response: registerDTO,
    })
);

app.listen(3000);
console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
