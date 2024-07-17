const apiEndpoint = 'http://localhost:3000/api/plants/name-group';
const plantList = document.querySelector('#plantList');

async function getPlantNamesAndGroups() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    displayPlantNamesAndGroups(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayPlantNamesAndGroups(plants) {
  plantList.innerHTML = ''; // Clear existing list items
  plants.forEach((plant) => {
    let listItem = document.createElement('li');
    listItem.innerHTML = `<strong>Name:</strong> ${plant.name} <br> 
                          <strong>Group:</strong> ${plant.group}`;
    plantList.appendChild(listItem);
  });
}

getPlantNamesAndGroups();
