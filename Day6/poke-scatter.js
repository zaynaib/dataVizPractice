async function pokeScatter(){

 //1. Access the data
 const data = await d3.csv('./pokemon.csv');
 console.log(data)
}

pokeScatter()