const apiEndpoint = 'http://localhost:3000/api/plants'; // Adjust this to your server's actual API endpoint
const cards = document.querySelector('#cards');

async function getDirectoryData() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    console.table(data);
    displayDirectory(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

getDirectoryData();

const displayDirectory = (PlantData) => {
  cards.innerHTML = ''; // Clear existing cards
  PlantData.forEach((plant) => {
    let card = document.createElement('section');
    let icon = document.createElement('img');
    let name = document.createElement('h2');
    let type = document.createElement('p');
    let water = document.createElement('p');
    let light = document.createElement('p');
    let group = document.createElement('p');
    let deleteButton = document.createElement('button');
    let editButton = document.createElement('button');

    name.textContent = `${plant.name}`;
    type.innerHTML = `<strong>Type</strong>: ${plant.type}`;
    water.innerHTML = `<strong>Water</strong>: ${plant.water}`;
    light.innerHTML = `<strong>Light</strong>: ${plant.light}`;
    group.innerHTML = `<strong>Group</strong>: ${plant.group}`;

    icon.setAttribute('src', plant.imageUrl);
    icon.setAttribute('alt', `logo ${plant.name}`);
    icon.setAttribute('loading', 'lazy');
    icon.setAttribute('width', '200');
    icon.setAttribute('height', '100');

    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deletePlant(plant._id));

    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editPlant(plant));

    card.appendChild(icon);
    card.appendChild(name);
    card.appendChild(type);
    card.appendChild(water);
    card.appendChild(light);
    card.appendChild(group);
    card.appendChild(deleteButton);
    card.appendChild(editButton);

    cards.appendChild(card);
  });

  const gridbutton = document.querySelector("#grid");
  const listbutton = document.querySelector("#list");
  const display = document.querySelector("article");

  gridbutton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
  });

  listbutton.addEventListener("click", showList);
  function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
  }
}

async function deletePlant(id) {
  try {
    const response = await fetch(`${apiEndpoint}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Plant deleted:', data);
    getDirectoryData(); // Refresh the directory after deleting
  } catch (error) {
    console.error('Error deleting plant:', error);
  }
}

function editPlant(plant) {
  // Implement the logic to open a form/modal for editing
  // For example, populate a form with the plant's current data and allow the user to submit changes
  console.log('Editing plant:', plant);
}
