import { pokemonRequest } from "../API/request.js"
import { dexPokemon } from "./dex.js"
import { layoutFight } from "./fight.js"

const pokeNames = (app,data,zone,vista)=>{
    const div = document.createElement('div')
    div.classList.add('poke_list_element')
    div.setAttribute('url',data.url)
    div.draggable = true
    const name = document.createElement('p')
    name.textContent = data.name
    div.appendChild(name)
    app.appendChild(div)
    div.id = data.url
    div.ondragstart = (e)=>{
        e.dataTransfer.setData('url',data.url)
    }
    div.onclick = async (e)=>{
        zone.appendChild(div)
        await Actualizar(zone,vista,app,div)
    }
}

export {pokeNames}


const Actualizar =async(zoneSelectPokemon,vistaPokemon,listPokemons,div) => {
    const elemnts = zoneSelectPokemon.childNodes
    if(elemnts.item(0)) listPokemons.appendChild(elemnts.item(0))
    zoneSelectPokemon.innerHTML=''

    zoneSelectPokemon.appendChild(div)
    
    const urlP = div.getAttribute('url')
    const pokemon = await pokemonRequest(urlP)

    const elemntForView= await dexPokemon(pokemon)
    vistaPokemon.innerHTML =''
    vistaPokemon.appendChild(elemntForView)



    const pokedex = document.querySelector('.pokedex_layout')
    const prevFight = document.querySelector('.layout_fight')
    prevFight?.remove()
    
    // console.log(pokedex)
    // console.log(prevFight)
    const enemy = await pokemonRequest(RandomEnemys())
    const fight = layoutFight(pokemon,enemy)
    
    pokedex.appendChild(fight)

}

const RandomEnemys=()=>{
    const enemies={
        mewtwo:'https://pokeapi.co/api/v2/pokemon/mewtwo',
        mew:'https://pokeapi.co/api/v2/pokemon/mew',
        celebi:'https://pokeapi.co/api/v2/pokemon/celebi',
        zapdos :'https://pokeapi.co/api/v2/pokemon/zapdos',
        latios:'https://pokeapi.co/api/v2/pokemon/latios',
        latias:'https://pokeapi.co/api/v2/pokemon/latias',
    }
    return( enemies[Object.keys(enemies)[Math.floor(Math.random()*Object.keys(enemies).length)]] )
}