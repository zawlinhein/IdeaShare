import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "username", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "image", type: "url" }),
    defineField({ name: "bio", type: "text" }),
  ],
});
