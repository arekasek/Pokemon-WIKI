# Pokémon Information App

This is a Pokémon information app built using **Next.js** that allows users to search for their favorite Pokémon and view detailed information about them, including stats, abilities, evolutions, and more. The app fetches data from the [PokéAPI](https://pokeapi.co/).

## Screenshots
![image](https://github.com/user-attachments/assets/cf14d9e2-2529-4be7-a092-b680f053e812)
![pikachu](https://github.com/user-attachments/assets/2f70bd54-7097-42ac-ad1e-b8cdb6fde352)

## Features

- **Pokémon Search**: Users can search for Pokémon by name, with autocomplete suggestions as they type.
- **Detailed Pokémon Stats**: View stats like HP, attack, defense, special attack, special defense, speed, and abilities.
- **Evolution Chain**: See the evolution chain of the Pokémon.
- **Dynamic Backgrounds**: The background color of the Pokémon details page changes based on its primary type.
- **Loading Screen**: A custom loading animation is displayed while fetching data from the API.

## Tech Stack

- **Next.js**: For building the frontend and handling routing.
- **React**: For creating components and managing state.
- **Axios**: For fetching data from the PokéAPI.
- **PokéAPI**: Public API for retrieving Pokémon data.
- **Tailwind CSS**: For responsive and modern UI design.
- **@ramonak/react-progress-bar**: For displaying stats with a progress bar.
- **TypeScript** (optional): If you wish to extend with type safety.

## Installation

1. Clone the repository:

   ```bash
   [git clone https://github.com/arekasek/Pokemon-WIKI]
2. Navigate to the project directory:
   ```bash
   cd pokemon-app
3. Install dependencies:
   ```bash
   npm install
4. Run the development server:
   ```bash
   npm run dev
5. Open your browser and visit http://localhost:3000

## API

The app uses the PokéAPI to fetch Pokémon data. The following requests are made:

- **Pokémon Data**: Fetch basic information such as stats, abilities, and moves.
- **Species Data**: Fetch species information, including the evolution chain.
- **Evolution Chain**: Fetch evolution chain data from the species to display Pokémon evolutions.

## Future Improvements

- **TypeScript Support**: Add type definitions for better maintainability.
- **More Stats**: Add additional details such as Pokémon height, weight, and moveset.
- **Responsive UI Enhancements**: Improve the layout on smaller screen sizes.
- **Error Handling**: Improve error handling for edge cases like network issues or missing data.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
