"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { typeIcons, typeBackgroundClasses } from "../../utils/constants";
import "../../../../public/fonts/pokemon-font.css";
import "../../../../public/fonts/new-amsterdam-font.css";
import ProgressBar from "@ramonak/react-progress-bar";

export default function PokemonPage() {
  const { pokemon } = useParams();
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
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
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pokemon) {
      const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;
      axios
        .get(apiUrl)
        .then((response) => {
          const { data } = response;
          setData(data);
          setName(data.name);

          const hpStat = data.stats.find((stat) => stat.stat.name === "hp");
          const attackStat = data.stats.find(
            (stat) => stat.stat.name === "attack"
          );
          const defenseStat = data.stats.find(
            (stat) => stat.stat.name === "defense"
          );
          const speedStat = data.stats.find(
            (stat) => stat.stat.name === "speed"
          );
          const specialAttackStat = data.stats.find(
            (stat) => stat.stat.name === "special-attack"
          );
          const specialDefenseStat = data.stats.find(
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

          const pokemonTypes = data.types.map((typeInfo) => typeInfo.type.name);
          setTypes(pokemonTypes);

          const pokemonAbilities = data.abilities.map(
            (abilityInfo) => abilityInfo.ability.name
          );
          setAbilities(pokemonAbilities);

          const pokemonMoves = data.moves.map((moveInfo) => moveInfo.move.name);
          setMoves(pokemonMoves);

          fetchEvolutionChain(data.species.url);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Pokémon nie znaleziony");
          setData(null);
        });
    }
  }, [pokemon]);

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
            console.error("Error while fetching evolutions:", error);
            setEvolutions([]);
          });
      })
      .catch((error) => {
        console.error("Error while downloading evolutions:", error);
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

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
        <Image
          src="/img/pokeball-spining.gif"
          alt="Ładowanie..."
          width={300}
          height={300}
        />
      </div>
    );

  const getBackgroundClass = (type) =>
    typeBackgroundClasses[type] || "bg-gray-200";

  const backgroundClass =
    types.length > 0 ? getBackgroundClass(types[0]) : "bg-gray-200";

  return (
    <>
      <div
        className={`flex flex-col sm:flex-row min-h-screen w-screen ${backgroundClass}`}
      >
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="circle bg-[#ffffff1e] m-3 p-3 image-shadow">
            <img
              src={data.sprites.other.home.front_default}
              alt={name}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center p-8 overflow-y-auto rounded-t-[6rem] bg-[#ffffff5b] sm:rounded-none">
          <div className="flex flex-col min-h-0 gap-8 justify-center items-center">
            <h1 className="text-wrap text-[10vw] sm:text-[2rem] md:text-[2.2rem] lg:text-[3.5rem] xl:text-[4.2rem] 2xl:text-[5vw] font-bold text-center sm:text-left pokemon">
              {name.toUpperCase()}
            </h1>
            <div className="flex flex-col">
              <div className="flex gap-2">
                {types.map((type) => {
                  const iconSrc = typeIcons[type];
                  if (!iconSrc) {
                    console.error(`Icon "${type}" not found`);
                    return null;
                  }
                  return (
                    <div
                      key={type}
                      className={`flex items-center gap-2 ${getBackgroundClass(
                        type
                      )} p-2 rounded-lg shadow-md flex justify-center items-center`}
                    >
                      <img
                        src={iconSrc}
                        alt={`${type} icon`}
                        className="w-6 h-6"
                      />
                      <span className="miriam-libre-bold text-white font-extrabold">
                        {type.toUpperCase()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-4 new-amsterdam">
              <p className="text-3xl">
                HP: {hp}
                <ProgressBar
                  completed={hp}
                  maxCompleted={200}
                  customLabel=" "
                  width="100%"
                  height="10px"
                  bgColor="black"
                  baseBgColor="rgba(255, 255, 255, 0.5)"
                  animateOnRender={true}
                />
              </p>
              <p className="text-3xl">
                Attack: {attack}
                <ProgressBar
                  completed={attack}
                  maxCompleted={120}
                  customLabel=" "
                  width="100%"
                  height="10px"
                  bgColor="black"
                  baseBgColor="rgba(255, 255, 255, 0.5)"
                  animateOnRender={true}
                />
              </p>
              <p className="text-3xl">
                Special Attack: {specialAttack}
                <ProgressBar
                  completed={specialAttack}
                  maxCompleted={155}
                  customLabel=" "
                  width="100%"
                  height="10px"
                  bgColor="black"
                  baseBgColor="rgba(255, 255, 255, 0.5)"
                  animateOnRender={true}
                />
              </p>
              <p className="text-3xl">
                Defense: {defense}
                <ProgressBar
                  completed={defense}
                  maxCompleted={230}
                  customLabel=" "
                  width="100%"
                  height="10px"
                  bgColor="black"
                  baseBgColor="rgba(255, 255, 255, 0.5)"
                  animateOnRender={true}
                />
              </p>
              <p className="text-3xl">
                Special Defense: {specialDefense}{" "}
                <ProgressBar
                  completed={specialDefense}
                  maxCompleted={230}
                  customLabel=" "
                  width="100%"
                  height="10px"
                  bgColor="black"
                  baseBgColor="rgba(255, 255, 255, 0.5)"
                  animateOnRender={true}
                />
              </p>
              <p className="text-3xl">
                Speed: {speed}
                <ProgressBar
                  completed={speed}
                  maxCompleted={180}
                  customLabel=" "
                  width="100%"
                  height="10px"
                  bgColor="black"
                  baseBgColor="rgba(255, 255, 255, 0.5)"
                  animateOnRender={true}
                />
              </p>

              <p className="text-3xl">Abilities: {abilities.join(", ")}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Evolutions:</p>
              <div className="flex flex-wrap gap-4">
                {evolutions.map((evolution) => (
                  <div
                    key={evolution.id}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={
                        evolution.sprites.other["official-artwork"]
                          .front_default
                      }
                      alt={`${evolution.name} image`}
                      className="w-24 h-24 mb-2"
                    />
                    <p className="text-lg">{evolution.name.toUpperCase()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
