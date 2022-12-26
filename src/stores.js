import { readable, writable } from 'svelte/store';

export const gameStatus = writable({
	turn: 0,
	enemy: {
		currentCharacter: 0,
		buffs: [],
		debuffs: [],
		characters: [
			{
				id: 0,
				hp: 10,
				energy: 1
			},
			{
				id: 1,
				hp: 10,
				energy: 0,
				stack: 0
			},
			{
				id: 2,
				hp: 10,
				energy: 0,
				stack: 0
			}
		]
	},
	player: {
		canSwitch: false,
		currentCharacter: 0,
		buffs: [],
		debuffs: [],
		summons: [],
		characters: [
			{
				id: 0,
				hp: 10,
				energy: 2,
				stack: 0
			},
			{
				id: 1,
				hp: 10,
				energy: 0,
				stack: 0
			},
			{
				id: 2,
				hp: 10,
				energy: 0,
				stack: 0
			}
		]
	}
});

export const charactersData = readable([
	{
		id: 0,
		name: "Ringo",
		cardImg: "assets/CharacterCards_01a_Ringo.png",
		ultimateCost: 3,
		stack: 0,
		maxHp: 10,
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
				dmg: 8,
				heal: 0,
				shield: 0
			}
		]
	},
	{
		id: 1,
		name: "Adagio",
		cardImg: "assets/CharacterCards_01a_Adagio.png",
		ultimateCost: 3,
		stack: 0,
		maxHp: 10,
		skills: [
			{
				name: "1",
				img: "assets/Skills_01a_Adagio.png",
				dmg: 1,
				heal: 1,
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
	},
	{
		id: 2,
		name: "Joule",
		cardImg: "assets/CharacterCards_01a_Joule.png",
		ultimateCost: 3,
		stack: 0,
		maxHp: 10,
		skills: [
			{
				name: "1",
				img: "assets/Skills_01a_Joule.png",
				dmg: 1,
				heal: 1,
				shield: 0
			},
			{
				name: "2",
				img: "assets/Skills_02a_Joule.png",
				dmg: 3,
				heal: 0,
				shield: 0
			},
			{
				name: "3",
				img: "assets/Skills_03a_Joule.png",
				dmg: 5,
				heal: 0,
				shield: 0
			}
		]
	}
])

export const summonsData = readable([
	{
		id: 0,
		name: "Gift of Fire",
		img: "assets/Summons_01b_Adagio.png",
		usage: 1,
		dmg: 1,
		heal: 2,
		shield: 0
	}
])

export const buffsData = readable([
	
])

export const debuffsData = readable([
	{
		name: "buff",
		img: ""
	}
])