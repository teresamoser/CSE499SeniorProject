const url = "data/PlantData.json";
const cards = document.querySelector('#cards');

async function getDirectoryData() {
  const response = await fetch(url);
  const data = await response.json();
  console.table(data.PlantData);
  displayDirectory(data.PlantData);
  };

getDirectoryData();

const displayDirectory = (PlantData) => {
 
  PlantData.forEach((PlantData) => {

    let card = document.createElement('section');
    let icon = document.createElement('img');
    let name = document.createElement('h2'); 
    let type= document.createElement('p');
    let water = document.createElement('p');
    let light= document.createElement('p');
    let group = document.createElement('p');

    name.textContent = `${PlantData.name}`;
    type.innerHTML = `<strong>Type: </strong>: ${PlantData.type}`;
    water.innerHTML = `<strong>Water: </strong>: ${PlantData.water}`;
    light.innerHTML = `<strong>Light: </strong>: ${PlantData.light}`;
    group.innerHTML = `<strong>Group: </strong>: ${PlantData.group}`;

    icon.setAttribute('src', PlantData.imageUrl);
    icon.setAttribute('alt', `logo ${PlantData.name}`); 
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

  console.log([PlantData]);

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