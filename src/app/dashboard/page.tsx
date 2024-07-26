"use client";
import { useState } from "react";
import Searchbar from "./_components/Searchbar";
import TemplateList from "./_components/TemplateList";

const DashboardPage = () => {
  const [searchInput, setSearchInput] = useState<string>();

  return (
    <div>
      <Searchbar onSearchInput={setSearchInput} />
      <TemplateList searchInput = {searchInput as string} />
    </div>
  );
};

export default DashboardPage;
