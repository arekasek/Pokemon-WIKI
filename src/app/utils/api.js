import axios from "axios";

export const fetchEvolutionChain = async (speciesUrl) => {
  try {
    const response = await axios.get(speciesUrl);
    const evolutionChainUrl = response.data.evolution_chain.url;
    const evolutionChainResponse = await axios.get(evolutionChainUrl);
    const chain = evolutionChainResponse.data.chain;

    return extractEvolutions(chain);
  } catch (error) {
    console.error("Evolution chain fetch error:", error);
    return [];
  }
};

const extractEvolutions = (chain) => {
  let evolutions = [];
  while (chain) {
    evolutions.push(chain.species.name);
    chain = chain.evolves_to[0];
  }
  return evolutions;
};
