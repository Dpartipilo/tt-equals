import { rest } from "msw";
import { baseURL } from "../Providers/Contactsprovider";

export const handlers = [
  rest.get(baseURL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([{ name: "test" }]));
  }),
];
