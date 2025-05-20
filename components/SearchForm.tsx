import React from "react";
import Form from "next/form";
import FormRest from "./FormRest";
import { Button } from "./ui/button";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action={"/"} className="searchForm">
      <input
        name="query"
        defaultValue={query}
        placeholder="Search"
        className="text-gray-800 w-full rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition px-2"
      />
      {query && <FormRest />}
      <Button type="submit" className="ml-2 px-2 py-1">
        Submit
      </Button>
    </Form>
  );
};

export default SearchForm;
