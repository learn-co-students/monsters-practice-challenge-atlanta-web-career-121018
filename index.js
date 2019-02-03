document.addEventListener("DOMContentLoaded", () => {
  url = 'http://localhost:3000/monsters';
  page = 1;

  fetchMonsters();
  setUpListeners();
})

function fetchMonsters(){
  const container = document.querySelector('#monster-container')

  while (container.firstChild){
    container.removeChild(container.firstChild)
  }

  let limit = 50;
  const pageUrl = url + `/?_limit=${limit}&_page=${page}`;

  fetch(pageUrl)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      res.forEach(renderMonster)
    })
}

function renderMonster(monster){
  const container = document.querySelector('#monster-container');
  let element = document.createElement('div');
  let name = document.createElement('h3');
  let age = document.createElement('p');
  let description = document.createElement('p');

  name.textContent = monster.name;
  age.textContent = monster.age;
  description.textContent = monster.description;

  container.appendChild(element);
  element.appendChild(name);
  element.appendChild(age);
  element.appendChild(description);
}

function addMonster(){
  event.preventDefault();
  let name = event.target.name.value;
  let age = event.target.age.value;
  let description = event.target.description.value;
  createMonster(name, age, description)
    .then(renderMonster)
}

function createMonster(name, age, description){
  return fetch((url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      name: name,
      age: age,
      description: description
    })
  }).then(function(response){
    return response.json()
  })
}

function setUpListeners(){
  let form = document.querySelector('form');
  form.addEventListener('submit', addMonster);

  let next = document.querySelector('#forward')
  next.addEventListener('click', () => {
    page += 1;
    fetchMonsters();
  })

  let back = document.querySelector('#back')
  if (page < 2){
    back.style.visibility = 'hidden'
  }
  back.addEventListener('click', () => {
    page -= 1;
    fetchMonsters();
  })
}
