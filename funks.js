// const url = await(await fetch(`https://pokeapi.co/api/v2/pokemon/charmander`)).json()

const pesquisador = document.getElementById("pesquisador")
const pesquisa = document.getElementById("pesquisa")
const nome_receita = document.getElementById("nome_receita")

const resultado_dificudade = document.getElementById("result_dificult")
const resultado_culinaria = document.getElementById("result_culinaria")
const resultado_tempoprep = document.getElementById("result_tempoprep")

const form_resultado_ver = document.getElementById("selecionar_leitura")
const slct_img = document.querySelector(".result_img")
const slct_ins = document.querySelector(".result_instrucoes")
const slct_ing = document.querySelector(".result_ingredientes")
slct_img.style.top = "0%"
slct_ins.style.top = "100%"
slct_ing.style.top = "100%"

form_resultado_ver.addEventListener("change", (eve) =>{
    eve.preventDefault()
    const data = new FormData(form_resultado_ver);
    let output = "";
    for (const entry of data) {
        // output = `${output}${entry[0]}=${entry[1]}\r`;
        output = entry[1]
        // console.log(entry[1]);
    }
    // console.log(output);
    
    switch (output) {
        case "img":
            slct_img.style.top = "0%"
            slct_ins.style.top = "100%"
            slct_ing.style.top = "100%"
            break;
        case "ing":
            slct_img.style.top = "1000%"
            slct_ins.style.top = "100%"
            slct_ing.style.top = "0%"
            break;
        case "ins":
            slct_img.style.top = "100%"
            slct_ins.style.top = "0%"
            slct_ing.style.top = "100%"
            break;
    
        default:
            break;
    }
    
})

pesquisador.addEventListener('submit',(eve)=>{
    eve.preventDefault()
    pesquisar_receita(pesquisa.value)
    console.log();
})

async function pesquisar_receita(pesquisa) {
    slct_ins.innerHTML = "<p>Instruções</p>"
    slct_ing.innerHTML = "<p>Ingredientes</p>"

    let url = ""
    if(!isNaN(pesquisa))
    {
        url = await ( await fetch(`https://dummyjson.com/recipes/${pesquisa}`)).json()
    }
    else
    {
        
        url = await(await fetch(`https://dummyjson.com/recipes/search?q=${pesquisa}`)).json()
    }
    
    nome_receita.innerHTML = url.name
    resultado_dificudade.innerHTML = url.difficulty
    resultado_culinaria.innerHTML = url.cuisine
    resultado_tempoprep.innerHTML = `${url.prepTimeMinutes}m`
    slct_img.src = url.image

    slct_ins.innerHTML += "<ul>"
    url.instructions.forEach((ins) => {
        slct_ins.innerHTML += `<li>> ${ins}</li>`
    })
    slct_ins.innerHTML += "</ul>"

    slct_ing.innerHTML += "<ul>"
    url.ingredients.forEach((ins) => {
        slct_ing.innerHTML += `<li>> ${ins}</li>`
    })
    slct_ing.innerHTML += "</ul>"
    
    
}