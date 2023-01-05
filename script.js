let allpokeurl = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
fetch(allpokeurl)
    .then(response => response.json())
    .then((data) => {
        localStorage.setItem("all pokemons", JSON.stringify(data))
        if(!localStorage.getItem("favs")) {
            localStorage.setItem("favs", "[]")
        }
    })
let allPokesObj = JSON.parse(localStorage.getItem("all pokemons"));
let allPokesArr  = Array.from(allPokesObj.results);
let favs = JSON.parse(localStorage.getItem("favs"));
let favPokeUrl;
let out = document.querySelector(".out");
document.getElementById("new-pokemon-submit").addEventListener("click", event => {
    event.preventDefault();
    let url = `https://pokeapi.co/api/v2/pokemon/`
    let str = document.getElementById("new-pokemon-input").value.trim().toLowerCase()
    url = url.concat(str)
    out.innerHTML = "";
    fetch(url)
    .then(response => response.json())
    .then((content) => {
        let abilityArr = []
        content.abilities.forEach(e => abilityArr.push(e.ability.name))
        out.innerHTML += `
        <div class="pokemon-container">
            <img src="${content.sprites.front_default}" alt="${content.name}" class ="pokemon-img">
            <h3 class = "pokemon-name">${content.name}</h3>
            <input type="image" src = "img/emptyheart.png" id="fav-btn" >
            <div class = "info-container">
                <p class = "abilities">${"Abilities: " + abilityArr}</p>
                <p class="id">${"ID: " + content.id}</p>
            </div>
        </div>
        `
    let favBtn = document.getElementById("fav-btn");
    favBtn.addEventListener("click", () => {
            let pokemonName= allPokesArr.find((pokemon)=> {
                return pokemon.name == content.name
            })
            if(favBtn.src.match("img/emptyheart.png")) {
                favBtn.src = "img/fullheart.png"
                if (favs.length == 0) {
                    favs.push(pokemonName.name)
                } else {
                    let res = favs.find(element => element == pokemonName.name)
                        if (res === undefined) {
                            favs.push(pokemonName.name);
                    }
                }
                localStorage.setItem("favs", JSON.stringify(favs))
            }  else if (favBtn.src.match("img/fullheart.png")) {
                    favBtn.src = "img/emptyheart.png"
                    let temp = favs.filter(item => item != pokemonName.name)
                    localStorage.setItem("favs", JSON.stringify(temp))
                    }
        })
    })
    .catch((error) => {
        alert("Something went wrong...")
    })
})
let favurl = `https://pokeapi.co/api/v2/pokemon/`;
let viewFav = document.getElementById("view");
viewFav.addEventListener("click", () => {
    out.innerHTML = ""
    favs.map((element) => {
        favPokeUrl = favurl + element
        fetch(favPokeUrl)
        .then(response => response.json())
        .then((content) => {
            let abilityArr = []
            content.abilities.forEach(e => abilityArr.push(e.ability.name))
            out.innerHTML += `
                <div class="pokemon-container">
                    <img src="${content.sprites.front_default}" alt="${content.name}" class ="pokemon-img">
                    <h3 class = "pokemon-name" data-poke-name="poke-name">${content.name}</h3>
                    <input type="image" src = "img/fullheart.png" data-fav-btn="fav-btn-two" data-content-name="${content.name}"class="lala">
                    <div class = "info-container">
                        <p class = "abilities">${"Abilities: " + abilityArr}</p>
                        <p class="id">${"ID: " + content.id}</p>
                    </div>
                </div>
                `
            let favBtnTwo = document.querySelectorAll('[data-fav-btn="fav-btn-two"]');
            let favBtnTwoArr = Array.from(favBtnTwo);
            for(let i = 0; i < favs.length; i++) {
                favBtnTwoArr[i].addEventListener("click", () => {
                    if(favBtnTwoArr[i].src.match("img/emptyheart.png")) {
                        favBtnTwoArr[i].src = "img/fullheart.png"
                        if(favs.length == 0) {
                            favs.push(favBtnTwoArr[i].attributes[3].nodeValue)
                            localStorage.setItem("favs", JSON.stringify(favs))
                        } else {
                            let res = favs.find(element => element == favBtnTwoArr[i].attributes[3].nodeValue)
                            if (res === undefined) {
                                favs.push(favBtnTwoArr[i].attributes[3].nodeValue)
                            }
                            localStorage.setItem("favs", JSON.stringify(favs))
                        }
                    } else if(favBtnTwoArr[i].src.match("img/fullheart.png")) {
                        favBtnTwoArr[i].src = "img/emptyheart.png";
                        let index = favs.indexOf(favBtnTwoArr[i].attributes[3].nodeValue)
                        if(index > -1) {
                            favs.splice(index, 1)
                        }
                        localStorage.setItem("favs", JSON.stringify(favs))
                    }
                })
            }
        })
    })
})