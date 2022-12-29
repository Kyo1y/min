document.addEventListener("DOMContentLoaded", init);
let items = [];
let allpokeurl = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
        fetch(allpokeurl)
        .then(response => response.json())
        .then((data) => {
            localStorage.setItem("all pokemons", JSON.stringify(data))
            if(!localStorage.getItem("favs")) {
                localStorage.setItem("favs", "[]")
            }
        })
let allPokes = JSON.parse(localStorage.getItem("all pokemons"));
let favs = JSON.parse(localStorage.getItem("favs"));
let favPokeUrl;
function init() {
        console.log(favs)
        document.getElementById("new-pokemon-submit").addEventListener("click", event => {
        event.preventDefault();
        let url = `https://pokeapi.co/api/v2/pokemon/`
        let str = document.getElementById("new-pokemon-input").value.trim()
        url = url.concat(str)
        let out = document.querySelector(".out");
        out.innerHTML = "";
        
        fetch(url)
        .then(response => response.json())
        .then((content) => {
            let pokemon_id = {
                id : content.id,
            }

            out.innerHTML = `
            <div class="pokemon-container">
                <img src="${content.sprites.front_default}" alt="${content.name}" class ="pokemon-img">
                <h3 class = "pokemon-name">${content.name}</h3>
                <input type="image" src = "img/emptyheart.png" id="fav-btn" >
                <div class = "info-container">
                    <p class = "abilities">${"Abilities: " + content.abilities[0].ability.name + ", " + content.abilities[1].ability.name}</p>
                    <p class="id">${"ID: " + content.id}</p>
                </div>
            </div>
            `
            let favurl = `https://pokeapi.co/api/v2/pokemon/`;
            let viewFav = document.getElementById("view");
            let favBtn = document.getElementById("fav-btn");
            favBtn.addEventListener("click", () => {
                if(favBtn.src.match("img/emptyheart.png")) {
                    favBtn.src = "img/fullheart.png"
                    if (favs.length == 0) {
                        favs.push(pokemon_id)
                    } else {
                        let res = favs.find(element => element.id == pokemon_id.id)
                            if (res === undefined) {
                                favs.push(pokemon_id);
                            }
                    }
                    localStorage.setItem("favs", JSON.stringify(favs))
            }   else if (favBtn.src.match("img/fullheart.png")) {
                    favBtn.src = "img/emptyheart.png"
                    let temp = favs.filter(item => item.id != pokemon_id.id)
                    localStorage.setItem("favs", JSON.stringify(temp))
            }
        })
        let newArr = [];
        for(let i = 0; i < favs.length; i++) {
            newArr.push(favs[i].id)
        }
        console.log("test", newArr)
            viewFav.addEventListener("click", () => {
                out.innerHTML = ""
                newArr.map((element) => {
                    favPokeUrl = favurl + element + "/"
                    fetch(favPokeUrl)
                    .then(response => response.json())
                    .then((content) => {
                        out.innerHTML += `
                            <div class="pokemon-container">
                                <img src="${content.sprites.front_default}" alt="${content.name}" class ="pokemon-img">
                                <h3 class = "pokemon-name">${content.name}</h3>
                                <input type="image" src = "img/fullheart.png" class="lala">
                                <div class = "info-container">
                                    <p class = "abilities">${"Abilities: " + content.abilities[0].ability.name}</p>
                                    <p class="id">${"ID: " + content.id}</p>
                                </div>
                            </div>
                            `
                    })
                    let favBtnTwo = document.querySelectorAll(".lala");
                    favBtnTwo.forEach( (e) => {
                        e.addEventListener("click", () => {
                            if (e.src.match("img/emptyheart.png")) {
                                e.src = "img/fullheart.png"
                                if (favs.length == 0) {
                                    favs.push(pokemon_id)
                            } else {
                                let res = favs.find(element => element.id == pokemon_id.id)
                                    if (res === undefined) {
                                        favs.push(pokemon_id);
                                    }
                                }
                                localStorage.setItem("favs", JSON.stringify(favs))
                            } else if (e.src.match("img/fullheart.png")) {
                                e.src = "img/emptyheart.png"
                                let temp = favs.filter(item => item.id != pokemon_id.id)
                                localStorage.setItem("favs", JSON.stringify(temp))
                            }
                        })
                    })
                })
            })
        })
    })
}
