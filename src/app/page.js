"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function HomePage() {
  const [searchName, setSearchName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

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

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4 bg-gray-100">
      <Image
        src="/img/pokemon-logo.png"
        alt="Pokémon Logo"
        width={400}
        height={150}
        className="-mt-8 mb-4"
      />
      <input
        className="border border-gray-300 rounded py-2 px-4 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        value={searchName}
        onChange={handleChange}
        placeholder="Enter Pokémon name"
      />
      <button
        onClick={handleSearch}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
      {error && <p className="mt-6 text-red-600">{error}</p>}
    </div>
  );
}
