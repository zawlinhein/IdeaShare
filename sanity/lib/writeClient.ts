import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_API_TOKEN,
});

/* if (!process.env.SANITY_WRITE_API_TOKEN) {
  throw new Error(process.env.SANITY_WRITE_API_TOKEN);
}
 */
