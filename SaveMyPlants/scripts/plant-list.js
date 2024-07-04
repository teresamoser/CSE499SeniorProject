// Frontend JavaScript
const apiEndpoint = 'http://localhost:3005/api/routes/plants'; // Replace with your server's API endpoint

const cards = document.querySelector('#cards');

// Function to fetch all plants from API
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

// Function to display directory data
const displayDirectory = (plantData) => {
  cards.innerHTML = ''; // Clear existing cards

  plantData.forEach((plant) => {
    const card = createCardElement(plant);
    cards.appendChild(card);
  });

  setupEventListeners();
};

// Function to create a new plant
async function createPlant(plant) {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plant),
    });
    const data = await response.json();
    console.log('Plant created:', data);
    getDirectoryData(); // Refresh the directory after creating
  } catch (error) {
    console.error('Error creating plant:', error);
  }
}

// Function to update an existing plant
async function updatePlant(plantId, updatedPlant) {
  try {
    const response = await fetch(`${apiEndpoint}/${plantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlant),
    });
    const data = await response.json();
    console.log('Plant updated:', data);
    getDirectoryData(); // Refresh the directory after updating
  } catch (error) {
    console.error('Error updating plant:', error);
  }
}

// Function to delete a plant
async function deletePlant(plantId) {
  try {
    const response = await fetch(`${apiEndpoint}/${plantId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log('Plant deleted:', data);
    getDirectoryData(); // Refresh the directory after deleting
  } catch (error) {
    console.error('Error deleting plant:', error);
  }
}

// Helper function to create a card element for a plant
function createCardElement(plant) {
  const card = document.createElement('section');
  const icon = document.createElement('img');
  const name = document.createElement('h2');
  const type = document.createElement('p');
  const water = document.createElement('p');
  const light = document.createElement('p');
  const group = document.createElement('p');
  const deleteButton = document.createElement('button');
  const editButton = document.createElement('button');
  const updateButton = document.createElement('button');

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

  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deletePlant(plant._id); // Call deletePlant function with plant ID
  });

  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    // Example: Open a modal or form to edit plant details
    console.log(`Editing plant: ${plant._id}`);
  });

  updateButton.textContent = 'Update';
  updateButton.addEventListener('click', () => {
    // Example: Implement functionality to update plant details
    const updatedPlant = {
      ...plant, // Assuming you have a way to edit fields
      name: 'Updated Plant Name', // Example: Update fields as needed
      type: 'Updated Type',
    };
    updatePlant(plant._id, updatedPlant);
  });

  card.appendChild(icon);
  card.appendChild(name);
  card.appendChild(type);
  card.appendChild(water);
  card.appendChild(light);
  card.appendChild(group);
  card.appendChild(deleteButton);
  card.appendChild(editButton);
  card.appendChild(updateButton);

  return card;
}

// Function to setup event listeners for grid/list view buttons
function setupEventListeners() {
  const gridButton = document.querySelector('#grid');
  const listButton = document.querySelector('#list');
  const displayContainer = document.querySelector('article');

  gridButton.addEventListener('click', () => {
    displayContainer.classList.add('grid');
    displayContainer.classList.remove('list');
  });

  listButton.addEventListener('click', showList);
  function showList() {
    displayContainer.classList.add('list');
    displayContainer.classList.remove('grid');
  }
}

// // Example of creating a new plant (You can call this function wherever you need to create a new plant)
// const newPlant = {
//   name: 'New Plant',
//   type: 'Indoor',
//   water: 'Regular',
//   light: 'Medium',
//   group: 'Ferns',
//   imageUrl: 'https://example.com/newplant.jpg',
// };

// createPlant(newPlant); // Example of creating a new plant

// Initial fetch to get and display directory data
getDirectoryData();
