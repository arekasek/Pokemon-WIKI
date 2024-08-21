"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function HomePage() {
  const [searchName, setSearchName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (searchName.trim()) {
      const fetchSuggestions = async () => {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=1000`;
        try {
          const response = await axios.get(apiUrl);
          const allPokemon = response.data.results.map(
            (pokemon) => pokemon.name
          );
          const filteredSuggestions = allPokemon
            .filter((name) =>
              name.toLowerCase().startsWith(searchName.toLowerCase())
            )
            .slice(0, 5);
          setSuggestions(filteredSuggestions);
        } catch (err) {
          console.error("Error fetching Pokémon data:", err);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchName]);

  const handleSearch = async () => {
    if (searchName.trim()) {
      const pokemonName = searchName.toLowerCase();
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

      try {
        await axios.get(apiUrl);
        setError(null);
        router.push(`/pokemon/${pokemonName}`);
      } catch (err) {
        setError("Pokémon not found");
      }
    }
  };

  const handleChange = (e) => {
    setSearchName(e.target.value);
    if (e.target.value.trim() !== "") {
      setError(null);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchName(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4 bg-gray-100">
      <Image
        src="/img/pokemon-logo.png"
        alt="Pokémon Logo"
        width={400}
        height={150}
        className="-mt-8 mb-4"
      />
      <div className="flex flex-col items-center w-full max-w-md relative">
        <div className="flex items-center w-full">
          <input
            className="border border-gray-300 rounded py-2 px-4 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            value={searchName}
            onChange={handleChange}
            placeholder="Enter Pokémon name"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 mt-1 w-full border border-gray-300 rounded bg-white shadow-lg z-10">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="mt-6 text-red-600">{error}</p>}
    </div>
  );
}
