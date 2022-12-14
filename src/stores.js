import { readable, writable } from 'svelte/store';

export const gameStatus = writable({
    turn: 0,
    enemy: {
        currentCharacter: 0,
        characters: [
            {
                id: 0,
                hp: 15,
                energy: 1
            }
        ]
    },
    player: {
        currentCharacter: 0,
        characters: [
            {
                id: 0,
                hp: 15,
                energy: 0
            },
            {
              id: 1,
              hp: 15,
              energy: 0
          }
        ]
    }
});

export const charactersData = readable([
    {
      name: "Ringo",
      cardImg: "assets/CharacterCards_01a_Ringo.png",
      ultimateCost: 3,
      skills: [
        {
          name: "1",
          img: "assets/Skills_01a_Ringo.png",
          dmg: 2,
          heal: 0,
          shield: 0
        },
        {
          name: "2",
          img: "assets/Skills_02a_Ringo.png",
          dmg: 3,
          heal: 0,
          shield: 0
        },
        {
          name: "3",
          img: "assets/Skills_03a_Ringo.png",
          dmg: 5,
          heal: 0,
          shield: 0
        }
      ]
    },
    {
      name: "Adagio",
      cardImg: "assets/CharacterCards_01a_Adagio.png",
      ultimateCost: 3,
      skills: [
        {
          name: "1",
          img: "assets/Skills_01a_Adagio.png",
          dmg: 2,
          heal: 0,
          shield: 0
        },
        {
          name: "2",
          img: "assets/Skills_02a_Adagio.png",
          dmg: 3,
          heal: 0,
          shield: 0
        },
        {
          name: "3",
          img: "assets/Skills_03a_Adagio.png",
          dmg: 5,
          heal: 0,
          shield: 0
        }
      ]
    }
  ])