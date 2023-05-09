import { type } from "os";
import React from "react";

type PageProps = {
  params: {
    searchTerm: string;
  };
};
type SearchResult = {
  organic_results: [
    {
      position: number;
      title: string;
      link: string;
      thumbnail: string;
      snipped: string;
    }
  ];
};
const Search = async (searchTerm: string) => {
  const res = await fetch(
    `https://serpapi.com/search.json?q=${searchTerm}&api_key=${process.env.API_KEY}`
  );
  const searchData: SearchResult = await res.json();
  return searchData;
};
async function SearchResults({ params: { searchTerm } }: PageProps) {
  const SearchResults = await Search(searchTerm);
  return (
    <div>
      {SearchResults.organic_results.map((result) => (
        <li key={result.position}>
          <p>{result.title}</p>
          <p>{result.snipped}</p>
        </li>
      ))}
    </div>
  );
}

export default SearchResults;
