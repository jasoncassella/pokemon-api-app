document.querySelector('button').addEventListener('click', getFetch);

async function getFetch() {
	const poke1 = document.querySelector('#poke1').value;
	const url = 'https://pokeapi.co/api/v2/pokemon/' + poke1;
	const types = [];
	const unorderedList = document.querySelector('ul');
	try {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		document.querySelector('h2').textContent = data.name;
		document.querySelector('#pokeImg1').src = data.sprites.front_default;
		while (unorderedList.firstChild) {
			unorderedList.removeChild(unorderedList.firstChild);
		}
		data.types.forEach(type => types.push(type.type.name));
		types.forEach(type => {
			const listItem = document.createElement('li');
			listItem.textContent = type;
			unorderedList.appendChild(listItem);
		});
	} catch (error) {
		console.log(error);
	}
}
