document.querySelector('button').addEventListener('click', getFetch);
const unorderedList = document.querySelector('ul');

async function getFetch() {
	const poke1 = document.querySelector('#poke1').value;
	const url = 'https://pokeapi.co/api/v2/pokemon/' + poke1;
	try {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		const pokemon = new Pokemon(
			data.name,
			data.types,
			data.sprites.other['official-artwork'].front_default
		);
		document.querySelector('h2').textContent = pokemon._name;
		document.querySelector('#pokeImg1').src = pokemon._image;
		pokemon.removePreviousTypes();
		pokemon.getTypes();
		pokemon.displayTypes();
	} catch (error) {
		console.log(error);
	}
}

class Pokemon {
	constructor(name, types, image) {
		this._name = name;
		this._types = types;
		this._image = image;
		this._typeList = [];
	}

	removePreviousTypes() {
		while (unorderedList.firstChild) {
			unorderedList.removeChild(unorderedList.firstChild);
		}
	}

	getTypes() {
		for (const property of this._types) {
			this._typeList.push(property.type.name);
		}
	}

	displayTypes() {
		this._typeList.forEach(type => {
			const listItem = document.createElement('li');
			listItem.textContent = type;
			unorderedList.appendChild(listItem);
		});
	}
}
