"use server";

import { auth } from "@/auth";
import { parseServerActionRes } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/writeClient";

export const createStartup = async (state: any, form: FormData) => {
  const session = await auth();
  if (!session)
    return parseServerActionRes({ error: "Not Signed in", status: "ERROR" });
  const { title, description, category, link, pitch } =
    Object.fromEntries(form);
  const slug = slugify(title as string, { lower: true, strict: true });
  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      pitch,
      slug: {
        _type: "slug",
        current: slug,
      },
      views: 0,
      author: {
        _type: "reference",
        _ref: session?.id,
      },
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionRes({ ...result, error: "", status: "SUCCESS" });
  } catch (error) {
    return parseServerActionRes({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
