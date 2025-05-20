"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const FormRest = () => {
  const reset = () => {
    const form = document.querySelector(".searchForm") as HTMLFormElement;
    if (form) form.reset();
  };
  return (
    <Button type="reset" onClick={reset} className="ml-2 px-2 py-1 ">
      <Link href={"/"}>Reset</Link>
    </Button>
  );
};

export default FormRest;
