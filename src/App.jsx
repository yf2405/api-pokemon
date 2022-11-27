import { useState, useEffect } from 'react'
import { Button } from './components/Button'
import './sass/App.scss'
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import {Card} from "./components/Card"; 

function App() {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvolution, setPokemonEvolution] = useState ([])
 
useEffect(()=>{
  getEvolution(pokemonId); 
  
},[pokemonId])
async function getEvolution (id) {
  const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
  const data = await response.json()
 

 let pokemonEvoArray = [] 
 let pokemonName = (data.chain.species.name)
 let pokemonlvImg = await getPokemonImgs(pokemonName)
 pokemonEvoArray.push([pokemonName, pokemonlvImg])

 // primer if
if(data.chain.evolves_to.length !==0){
  let pakemonLv2 = data.chain.evolves_to[0].species.name;
  let  pokemonlv2Img = await getPokemonImgs( pakemonLv2)
  pokemonEvoArray.push([pakemonLv2, pokemonlv2Img])
 

 // segundo if para validar si hay mas evoluciones

 if(data.chain.evolves_to[0].evolves_to.length !==0){
  let pakemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
  let  pokemonlv3Img = await getPokemonImgs( pakemonLv3)
  pokemonEvoArray.push([pakemonLv3, pokemonlv3Img])

}}
  setPokemonEvolution( pokemonEvoArray)
}

async function getPokemonImgs (name) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  const data = await response.json()
  return data.sprites.other['official-artwork'].front_default; 

 
}
  function prevClick(){
    pokemonId === 1 ? 
    setPokemonId(1)
    :setPokemonId(pokemonId -1)
  }
  function nextClick(){
    setPokemonId(pokemonId+1)
  }
  
  return (
    <>
    <div className='app'>
      
    <div className='card-container'>
      {pokemonEvolution.map(pokemon => 
      
      <Card 
      key = {pokemon [0]}
      name={pokemon[0]}
      img= {pokemon[1]}
      />)}
      
    </div>
    <div className="buttons-container">
     <Button  icon = {<TiArrowLeftOutline />} 
     handleClick={prevClick}/>
     
     <Button  icon = {<TiArrowRightOutline/>} 
     handleClick={nextClick}/>
    </div>
    </div>
    </>
  )
}

export default App
