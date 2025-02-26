# ダンジョンハック (Dungeon Hack)

A React-based roguelike dungeon crawler game built with React Router v7 and Tailwind CSS.

## Features

- Turn-based combat system
- Character development and leveling
- Multiple enemy types and treasures
- Randomly generated dungeon rooms
- Skill and stat-based gameplay
- Responsive design for both desktop and mobile devices

## Game Overview

In Dungeon Hack, you take on the role of an adventurer exploring a mysterious dungeon. Battle monsters, avoid traps, find treasures, and try to reach as deep into the dungeon as possible.

Each level of the dungeon becomes progressively more difficult, with stronger enemies and more dangerous traps. As you gain experience, your character will level up, allowing you to improve their stats and skills.

## Gameplay Elements

### Character Stats

- **筋力 (STR)**: Affects physical attack power and defense
- **敏捷 (DEX)**: Affects evasion and trap detection/disarming
- **知力 (INT)**: Affects magic power and maximum MP
- **精神 (MND)**: Affects magic defense, healing effects, and negotiation

### Character Skills

- **剣術**: Affects physical attack accuracy and power
- **魔法**: Affects magic attack power and MP efficiency
- **罠回避**: Affects trap detection and evasion
- **探索**: Affects treasure discovery rate and quality
- **交渉**: Affects negotiation success rate with monsters

### Actions

- **探索**: Move to a new room
- **休憩**: Recover HP and MP (with risk of enemy ambush)
- **攻撃**: Physical attack against enemies
- **魔法**: Magical attack against enemies (costs MP)
- **交渉**: Attempt to resolve an encounter peacefully
- **次の階層へ**: Proceed to the next dungeon level

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/dungeon-hack.git
cd dungeon-hack
```

2. Install dependencies:
```
npm install
```
or
```
yarn install
```

3. Start the development server:
```
npm start
```
or
```
yarn start
```

4. Open your browser and navigate to http://localhost:3000

## Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [React Router](https://reactrouter.com/) - Routing library for React
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## License

This project is available under the MIT License.

## Acknowledgments

- Original game concept inspired by classic roguelike games
- Game redesigned from an HTML/JavaScript version to a modern React application
