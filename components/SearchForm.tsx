import React from "react";
import Form from "next/form";
import FormRest from "./FormRest";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action={"/"}
      className="flex items-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-gray-500 focus-within:border-gray-500"
    >
      <Search className="h-5 w-5 text-gray-400" />
      <input
        name="query"
        defaultValue={query}
        placeholder="Search"
        className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:border-none focus:ring-0"
      />
      {query && <FormRest />}
      <Button variant="ghost" size="sm">
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
