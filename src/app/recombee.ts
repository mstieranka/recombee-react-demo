import { ApiClient } from "recombee-js-api-client";

if (!process.env.NEXT_PUBLIC_RECOMBEE_DATABASE_ID) {
  throw new Error("Missing NEXT_PUBLIC_RECOMBEE_DATABASE_ID env var");
}
if (!process.env.NEXT_PUBLIC_RECOMBEE_PUBLIC_TOKEN) {
  throw new Error("Missing NEXT_PUBLIC_RECOMBEE_PUBLIC_TOKEN env var");
}
if (!process.env.NEXT_PUBLIC_RECOMBEE_REGION) {
  throw new Error("Missing NEXT_PUBLIC_RECOMBEE_REGION env var");
}

export const apiClient = new ApiClient(
  process.env.NEXT_PUBLIC_RECOMBEE_DATABASE_ID,
  process.env.NEXT_PUBLIC_RECOMBEE_PUBLIC_TOKEN,
  {
    region: process.env.NEXT_PUBLIC_RECOMBEE_REGION,
  },
);
