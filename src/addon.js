"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import "../../public/fonts/pokemon-font.css";
import { useRouter } from "next/router";
export default function Home() {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [attack, setAttack] = useState(null);
  const [specialAttack, setSpecialAttack] = useState(null);
  const [specialDefense, setSpecialDefense] = useState(null);
  const [defense, setDefense] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [hp, setHp] = useState(null);
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);
  const [evolutions, setEvolutions] = useState([]);
  const typeColorMapping = {
    bug: "bg-bug",
    dark: "bg-dark",
    dragon: "bg-dragon",
    electric: "bg-electric",
    fairy: "bg-fairy",
    fighting: "bg-fighting",
    fire: "bg-fire",
    flying: "bg-flying",
    ghost: "bg-ghost",
    grass: "bg-grass",
    ground: "bg-ground",
    ice: "bg-ice",
    normal: "bg-normal",
    poison: "bg-poison",
    psychic: "bg-psychic",
    rock: "bg-rock",
    steel: "bg-steel",
    water: "bg-water",
  };

  const handleSearch = () => {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`;
    console.log("Fetching data from URL:", apiUrl);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API response:", response.data);
        setData(response.data);
        setName(response.data.name);

        const hpStat = response.data.stats.find(
          (stat) => stat.stat.name === "hp"
        );
        const attackStat = response.data.stats.find(
          (stat) => stat.stat.name === "attack"
        );
        const defenseStat = response.data.stats.find(
          (stat) => stat.stat.name === "defense"
        );
        const speedStat = response.data.stats.find(
          (stat) => stat.stat.name === "speed"
        );
        const specialAttackStat = response.data.stats.find(
          (stat) => stat.stat.name === "special-attack"
        );
        const specialDefenseStat = response.data.stats.find(
          (stat) => stat.stat.name === "special-defense"
        );
        setHp(hpStat ? hpStat.base_stat : "N/A");
        setAttack(attackStat ? attackStat.base_stat : "N/A");
        setSpecialAttack(
          specialAttackStat ? specialAttackStat.base_stat : "N/A"
        );
        setDefense(defenseStat ? defenseStat.base_stat : "N/A");
        setSpecialDefense(
          specialDefenseStat ? specialDefenseStat.base_stat : "N/A"
        );
        setSpeed(speedStat ? speedStat.base_stat : "N/A");

        const pokemonTypes = response.data.types.map(
          (typeInfo) => typeInfo.type.name
        );
        setTypes(pokemonTypes);

        const pokemonAbilities = response.data.abilities.map(
          (abilityInfo) => abilityInfo.ability.name
        );
        setAbilities(pokemonAbilities);

        const pokemonMoves = response.data.moves.map(
          (moveInfo) => moveInfo.move.name
        );
        setMoves(pokemonMoves);

        fetchEvolutionChain(response.data.species.url);
        setSearchExecuted(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData(null);
        setName("");
        setHp(null);
        setAttack(null);
        setDefense(null);
        setSpeed(null);
        setTypes([]);
        setAbilities([]);
        setEvolutions([]);
        setSearchExecuted(true);
      });
  };

  const fetchEvolutionChain = (speciesUrl) => {
    axios
      .get(speciesUrl)
      .then((response) => {
        const evolutionChainUrl = response.data.evolution_chain.url;
        return axios.get(evolutionChainUrl);
      })
      .then((response) => {
        const chain = response.data.chain;
        const evolutions = extractEvolutions(chain);
        Promise.all(
          evolutions.map((evolution) =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`)
          )
        )
          .then((responses) => {
            const evolutionsData = responses.map((res) => res.data);
            setEvolutions(evolutionsData);
          })
          .catch((error) => {
            console.error("Error fetching evolution data:", error);
            setEvolutions([]);
          });
      })
      .catch((error) => {
        console.error("Error fetching evolution chain:", error);
        setEvolutions([]);
      });
  };

  const extractEvolutions = (chain) => {
    let evolutions = [];
    while (chain) {
      evolutions.push(chain.species.name);
      chain = chain.evolves_to[0];
    }
    return evolutions;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4 bg-gray-100">
      <Image
        src="/img/pokemon-logo.png"
        alt="Pokeball"
        width={400}
        height={150}
        className="-mt-8 mb-4"
      />
      <input
        className="border border-gray-300 rounded py-2 px-4 w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      <button
        onClick={handleSearch}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>

      {searchExecuted && !name && (
        <p className="mt-4 text-red-500">No Pokémon found.</p>
      )}
      {name && (
        <div
          className={`text-center h-full w-full fixed top-0 ${
            typeColorMapping[types[0]] || "bg-gray-200"
          } flex ... justify-center items-center`}
        >
          <div className="basis-1/2 flex flex-auto items-center justify-center">
            <div className="flex flex-col-reverse relative">
              <div className="flex relative justify-center items-center p-4 mb-4">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute z-0 scale-125"
                >
                  <path
                    fill="#F2F4F8"
                    d="M38.1,-68.1C49.9,-59.1,60.3,-50,69.4,-38.6C78.5,-27.3,86.1,-13.6,86.7,0.3C87.2,14.2,80.5,28.4,71.3,39.5C62,50.5,50.1,58.4,37.8,65.9C25.5,73.4,12.8,80.5,-1.5,83.2C-15.8,85.8,-31.5,83.9,-46,77.6C-60.4,71.3,-73.4,60.6,-81.3,47C-89.2,33.3,-91.9,16.6,-91,0.5C-90,-15.6,-85.4,-31.1,-76,-42.1C-66.6,-53.1,-52.3,-59.5,-38.9,-67.6C-25.4,-75.7,-12.7,-85.5,0.2,-85.8C13.1,-86.2,26.2,-77.2,38.1,-68.1Z"
                    transform="translate(100 100)"
                  />
                </svg>
                <img
                  src={data.sprites.other.home.front_default}
                  alt={`${name} image`}
                  width={600}
                  className="z-10"
                />
              </div>
            </div>
          </div>
          <div className="basis-1/2 flex-auto">
            <h1 className="text-[5vw] text-[#ffcb05] font-semibold pokemon font-outline-4">
              {name.toUpperCase()}
            </h1>
            <p>HP: {hp}</p>
            <p>Attack: {attack}</p>
            <p>Special attack: {specialAttack}</p>
            <p>Defense: {defense}</p>
            <p>Special defense: {specialDefense}</p>
            <p>Speed: {speed}</p>
            <p>Types: {types.join(", ")}</p>
            <p>Abilities: {abilities.join(", ")}</p>
            <div>
              <p>Evolutions:</p>
              <div className="flex flex-wrap justify-center">
                {evolutions.map((evolution) => (
                  <div
                    key={evolution.id}
                    className="m-2 p-4 bg-slate-400 rounded-2xl border-[0.3rem] border-black"
                  >
                    <img
                      src={
                        evolution.sprites.other["official-artwork"]
                          .front_default
                      }
                      alt={`${evolution.name} image`}
                      width={100}
                      height={100}
                      className="mb-2"
                    />
                    <p>{evolution.name.toUpperCase()}</p>
                  </div>
                ))}
              </div>
              <p>Moves: {moves.join(", ")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
