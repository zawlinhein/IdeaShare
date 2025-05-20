import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_BY_ID } from "@/sanity/lib/query";
import React from "react";
import Ping from "./Ping";
import { writeClient } from "@/sanity/lib/writeClient";
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const data = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_BY_ID, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: data.views + 1 })
        .commit()
  );

  return (
    <div className="view-container bg-pink-200 rounded-md border-pink-400 px-2 py-1 ">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p>{`${data.views} views`}</p>
    </div>
  );
};

export default View;
