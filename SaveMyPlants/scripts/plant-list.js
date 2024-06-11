const url = "mongodb+srv://dbuser:dbuser@cluster0.0grlm01.mongodb.net/"; 
const cards = document.querySelector('#cards');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://dbuser:dbuser@cluster0.0grlm01.mongodb.net/');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});



async function getListData() {
  const response = await fetch(url);
  const data = await response.json();
  console.table[PD.PlantData];
  displayList[PD.PlantData];
  };

getListData();

const displayList = ([PlantData]) => {
 
      PlantData.forEach(PlantData => {

          let card = document.createElement('section');
          let name = document.createElement('h2'); 
          let type= document.createElement('p');
          let water = document.createElement('p');
          let light = document.createElement('p');
          let imageUrl = document.createElement('img');
          let group = document.createElement('p');

          name.textContent = `${PlantData.name}`;
          type.innerHTML = `<strong>Type</strong>: ${PlantData.type}`;
          water.innerHTML = `<strong>Water</strong>: ${PlantData.water}`;
          light.innerHTML = `<strong>Light</strong>: ${PlantData.light}`;
          group.innerHTML = `<strong>Group</strong>: ${PlantData.group}`;

          imageUrl.setAttribute('src', PlantData.image);
          imageUrl.setAttribute('alt', `logo ${PlantData.name}`); 
          imageUrl.setAttribute('loading', 'lazy');
          imageUrl.setAttribute('width', '200');
          imageUrl.setAttribute('height', '100');

          card.appendChild(imageUrl);
          card.appendChild(name); 
          card.appendChild(type);
          card.appendChild(water);
          card.appendChild(light);
          card.appendChild(group);

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
        };
  };