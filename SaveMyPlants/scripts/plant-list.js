const url = "data/members.json"
const cards = document.querySelector('#cards');

async function getDirectoryData() {
  const response = await fetch(url);
  const data = await response.json();
  console.table(data.members);
  displayDirectory(data.members);
  }

getDirectoryData();

const displayDirectory = (members) => {
 
  members.forEach((members) => {

    let card = document.createElement('section');
    let icon = document.createElement('img');
    let name = document.createElement('h2'); 
    let address = document.createElement('p');
    let phone = document.createElement('p');
    let web = document.createElement('p');
    let level = document.createElement('p');

    name.textContent = `${members.name}`;
    address.innerHTML = `<strong>Address</strong>: ${members.address}`;
    phone.innerHTML = `<strong>Phone #</strong>: ${members.phone}`;
    web.innerHTML = `<strong>Website </strong>: ${members.website}`;
    level.innerHTML = `<strong>Membership Level </strong>: ${members.membershiplevel}`;

    icon.setAttribute('src', members.image);
    icon.setAttribute('alt', `logo ${members.name}`); 
    icon.setAttribute('loading', 'lazy');
    icon.setAttribute('width', '200');
    icon.setAttribute('height', '100');

    card.appendChild(icon);
    card.appendChild(name); 
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(web);
    card.appendChild(level);

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