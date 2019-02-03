
console.log('%cWelcome To The Monster Creator', 'color: firebrick')
document.addEventListener("DOMContentLoaded", setupPage)



//============================================================================================//
//============================================================================================//
// ============= Renders the newly created monster ============= //
function renderMonster(monster){
    let div = document.querySelector('#monster-container')

    let monsDiv = document.createElement('div')
    monsDiv.id = monster.id
    monsDiv.className = "monster-info"

    let monsH3 = document.createElement('h3')
    monsH3.textContent = monster.name

    let monsH4 = document.createElement('h4')
    monsH4.textContent = `Age: ${monster.age}`

    let monsPara = document.createElement('p')
    monsPara.textContent = monster.description

    monsDiv.appendChild(monsH3)
    monsDiv.appendChild(monsH4)
    monsDiv.appendChild(monsPara)
    div.appendChild(monsDiv)

    console.log('%cNew Monster been rendered', 'color: green')
    return div
}
// ============= Takes Data and POSTS to DataBase ============= //
function createMonster (event){
    let name = event.target.name.value;
    let age = event.target.age.value;
    let description = event.target.description.value;
    return fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description
        })
    })
    .then(res => res.json())
    .then(res => renderMonster(res))
}
// ============= Listens To Create Monster ============= //
function setNewMonsterHandler (){
    let form = document.querySelector('#new-monster-form')
    form.addEventListener('submit', createMonster)
}
//============================================================================================//
//============================================================================================//





//============================================================================================//
//============================================================================================//
// ============= Renders Monsters ============= //
function renderMonsters(monsters){
    let div = document.querySelector('#monster-container')
    monsters.forEach(function (monster){
        let monsDiv = document.createElement('div')
        monsDiv.id = monster.id
        monsDiv.className = "monster-info"

        let monsH3 = document.createElement('h3')
        monsH3.textContent = monster.name

        let monsH4 = document.createElement('h4')
        monsH4.textContent = `Age: ${monster.age}`

        let monsPara = document.createElement('p')
        monsPara.textContent = monster.description

        monsDiv.appendChild(monsH3)
        monsDiv.appendChild(monsH4)
        monsDiv.appendChild(monsPara)
        div.appendChild(monsDiv)
    });
    console.log('%cMonster div has been returned and rendered', 'color: green')
    return div
}

// ============= Fetches Monsters from DataBase ============= //
let currentPage = 1;

function getMonsters(){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
    .then(res => res.json())
    .then(res => renderMonsters(res))
}
//============================================================================================//
//============================================================================================//









//============================================================================================//
//============================================================================================//
// ============= Handles Pagnation Buttons ============= //
function pageHandler (){
    let back = document.querySelector('#back')
    let forward = document.querySelector('#forward')
    forward.addEventListener('click', function(e){
        currentPage +=1
        getMonsters()
        console.log(`%cRendered 50 More Monsters, and on page ${currentPage}`, `color: green`);
    })
    back.addEventListener('click', function(e){
        if (currentPage === 1){
            currentPage = 2
        } else {
            currentPage -=1
        }
        getMonsters()
        console.log(`%cRendered 50 Less Monsters, and went back to page ${currentPage}`, `color: firebrick`);
    })
}
//============================================================================================//
//============================================================================================//









//============================================================================================//
//============================================================================================//
// ============= Main Page Setup Handler ============= //
function setupPage() {
    getMonsters()
    setNewMonsterHandler()
    pageHandler()
    console.log('%cRan all setup functions', 'color: green')
}
//============================================================================================//
//============================================================================================//
