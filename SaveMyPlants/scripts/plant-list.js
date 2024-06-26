// Frontend JavaScript
const apiEndpoint = 'http://localhost:3001/api/plants'; // Replace with your server's API endpoint

const cards = document.querySelector('#cards');

async function getDirectoryData() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    console.table(data); // Log retrieved data to console
    displayDirectory(data); // Display the retrieved data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getDirectoryData();

const displayDirectory = (data) => {
  data.forEach((plant) => {
    let card = document.createElement('section');
    let icon = document.createElement('img');
    let name = document.createElement('h2');
    let type = document.createElement('p');
    let water = document.createElement('p');
    let light = document.createElement('p');
    let group = document.createElement('p');

    name.textContent = `${plant.name}`;
    type.innerHTML = `<strong>Type: </strong>: ${plant.type}`;
    water.innerHTML = `<strong>Water: </strong>: ${plant.water}`;
    light.innerHTML = `<strong>Light: </strong>: ${plant.light}`;
    group.innerHTML = `<strong>Group: </strong>: ${plant.group}`;

    icon.setAttribute('src', plant.imageUrl);
    icon.setAttribute('alt', `logo ${plant.name}`);
    icon.setAttribute('loading', 'lazy');
    icon.setAttribute('width', '200');
    icon.setAttribute('height', '200');

    card.appendChild(icon);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(water);
    card.appendChild(light);
    card.appendChild(group);

    cards.appendChild(card);
  });

  const gridButton = document.querySelector("#grid");
  const listButton = document.querySelector("#list");
  const displayContainer = document.querySelector("article");

  gridButton.addEventListener("click", () => {
    displayContainer.classList.add("grid");
    displayContainer.classList.remove("list");
  });

  listButton.addEventListener("click", showList);
  function showList() {
    displayContainer.classList.add("list");
    displayContainer.classList.remove("grid");
  }
};
