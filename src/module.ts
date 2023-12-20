import { t } from "elysia";

export const registerDTO = t.Object({
  username: t.String(),
  email: t.String(),
  password: t.String(),
});
