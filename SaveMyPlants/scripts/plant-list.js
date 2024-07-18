document.addEventListener('DOMContentLoaded', () => {
const apiEndpoint = 'http://localhost:3000/api/plants'; // Adjust this to your server's actual API endpoint
const cards = document.querySelector('#cards');
const editPlantModal = document.getElementById('editPlantModal');
const editPlantForm = document.getElementById('editPlantForm');
const closeModal = document.querySelector('.close');
const addPlantButton = document.getElementById('addPlant');
const modalTitle = document.getElementById('modalTitle');

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
  modalTitle.textContent = 'Edit Plant';
  // Populate the form with the plant's current data
  document.getElementById('editName').value = plant.name;
  document.getElementById('editType').value = plant.type;
  document.getElementById('editWater').value = plant.water;
  document.getElementById('editLight').value = plant.light;
  document.getElementById('editGroup').value = plant.group;
  document.getElementById('editImageUrl').value = plant.imageUrl;
  document.getElementById('editPlantId').value = plant._id;

  // Display the modal
  editPlantModal.style.display = "block";
}

function addPlant() {
  modalTitle.textContent = 'Add Plant';
  // Clear the form fields
  document.getElementById('editName').value = '';
  document.getElementById('editType').value = '';
  document.getElementById('editWater').value = '';
  document.getElementById('editLight').value = '';
  document.getElementById('editGroup').value = '';
  document.getElementById('editImageUrl').value = '';
  document.getElementById('editPlantId').value = '';

  // Display the modal
  editPlantModal.style.display = "block";
}

// Close the modal when the user clicks on <span> (x)
closeModal.onclick = function() {
  editPlantModal.style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
  if (event.target == editPlantModal) {
    editPlantModal.style.display = "none";
  }
}

// Handle form submission
editPlantForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const plantData = {
    name: document.getElementById('editName').value,
    type: document.getElementById('editType').value,
    water: document.getElementById('editWater').value,
    light: document.getElementById('editLight').value,
    group: document.getElementById('editGroup').value,
    imageUrl: document.getElementById('editImageUrl').value,
  };

  const plantId = document.getElementById('editPlantId').value;

  const method = plantId ? 'PUT' : 'POST';
  const endpoint = plantId ? `${apiEndpoint}/${plantId}` : apiEndpoint;

  try {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plantData),
    });
    const data = await response.json();
    console.log(`Plant ${plantId ? 'updated' : 'added'}:`, data);
    editPlantModal.style.display = "none"; // Close the modal
    getDirectoryData(); // Refresh the directory after updating/adding
  } catch (error) {
    console.error(`Error ${plantId ? 'updating' : 'adding'} plant:`, error);
  }
});

// Add event listener to the "Add Plant" button
addPlantButton.addEventListener('click', addPlant);
});
