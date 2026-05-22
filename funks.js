//https://script.google.com/macros/s/AKfycbxTd4-v2GV2i5Tsk9ZiNwFzp1D80ND4qtX1UDzU4B3zXKEaPZFDgZYzdWwnXtUTwLo/exec?text=""
// https://script.google.com/macros/s/AKfycbxTd4-v2GV2i5Tsk9ZiNwFzp1D80ND4qtX1UDzU4B3zXKEaPZFDgZYzdWwnXtUTwLo/exec?text=hello%20world%0Aeasy%0Aitalian%20cuisine

const pesquisador = document.getElementById("pesquisador")
const pesquisa = document.getElementById("pesquisa")
const nome_receita = document.getElementById("nome_receita")

const resultado_dificudade = document.getElementById("result_dificult")
const resultado_culinaria = document.getElementById("result_culinaria")
const resultado_tempoprep = document.getElementById("result_tempoprep")

const n_resultados = document.getElementById("n_resultados") 
const vendo_n_resultados = document.getElementById("vendo_n_resultado") 
const btns_navegando = document.querySelectorAll(".btn_navegando")



const form_resultado_ver = document.getElementById("selecionar_leitura")
const slct_img = document.querySelector(".result_img")
const slct_ins = document.querySelector(".result_instrucoes")
const slct_ing = document.querySelector(".result_ingredientes")
slct_img.style.top = "0%"
slct_ins.style.top = "100%"
slct_ing.style.top = "100%"


let receitas = []
let indice_receita = 0

async function testarTraducao(texto)
{  
            //  await(await fetch(`https://dummyjson.com/recipes/${pesquisa}`)).json()
    console.log("traduzindo...");
    const url = await(await fetch(`https://script.google.com/macros/s/AKfycbxTd4-v2GV2i5Tsk9ZiNwFzp1D80ND4qtX1UDzU4B3zXKEaPZFDgZYzdWwnXtUTwLo/exec?text=${texto}`)).json()
    // console.log(url.texto);
    return url.texto
}
// testarTraducao("Text in english")

window.addEventListener("load", () => {
    pesquisar_receita(1)
})
btns_navegando[0].addEventListener("click", ()=>{
    console.log("esq")
    console.log(receitas.length);
    console.log(indice_receita);
    if(receitas.length > 0)
    {
        if(indice_receita == 0)
        {
            return
        }
        indice_receita > 0 ? indice_receita -= 1 : 0
        navegar_receitas(indice_receita)
    }
    
})
btns_navegando[1].addEventListener("click", ()=>{
    console.log("dir")
    console.log(receitas.length);
    console.log(indice_receita);
    if(receitas.length > 0)
    {
        if(indice_receita == receitas.length-1)
        {
            return
        }
        indice_receita < receitas.length-1 ? indice_receita += 1  : receitas.length-1
        navegar_receitas(indice_receita)
    }
    console.log(indice_receita);
})


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
    slct_img.src = "gifcarregando.gif"
    pesquisar_receita(pesquisa.value)
    console.log();
})

async function pesquisar_receita(pesquisa) {
    slct_ins.innerHTML = "<p>Instruções</p>"
    slct_ing.innerHTML = "<p>Ingredientes</p>"
    let por_nome = false
    let resultados = 0
    let url = ""
    if(pesquisa == "")
    {
        alert("Insira um valor válido")
        return
    }
   
    if(!isNaN(pesquisa))
    {
        url = await ( await fetch(`https://dummyjson.com/recipes/${pesquisa}`)).json()
        // if(!url.ok)
        // {
        //     alert("Deu ruim :(")
        //     return
        // }
        // console.log(url);
        
        receitas = []
        n_resultados.innerHTML = `Resultados: 1`
        
    }
    else
    {
        url = await(await fetch(`https://dummyjson.com/recipes/search?q=${pesquisa}`)).json()
        console.log(url);
        resultados = url.total
        n_resultados.innerHTML = `Resultados: ${resultados}`
        receitas = []
        indice_receita = 0
        vendo_n_resultados.innerHTML = `Exibindo: ${indice_receita+1}°`
        url.recipes.forEach((rec,index) => {
            receitas[index] = rec
        })
        por_nome = true
    }
    if(por_nome == false)
    { 
        nome_receita.innerHTML = "Perai..."
        resultado_dificudade.innerHTML = "Perai..."
        resultado_culinaria.innerHTML = "Perai..."
        resultado_tempoprep.innerHTML = "Perai..."
        slct_ins.innerHTML = `<p>Instruções</p><p>>Buscando...</p>`
        slct_ing.innerHTML = `<p>Ingredientes</p><p>>Buscando...</p>`
        slct_img.src = url.image
        const textos = [
        url.name,
        url.difficulty,
        url.cuisine,
        ].join("%0A");

        const infos_resultado = await testarTraducao(textos);

        nome_receita.innerHTML = infos_resultado[0]
        resultado_dificudade.innerHTML = infos_resultado[1]
        resultado_culinaria.innerHTML = infos_resultado[2]
        resultado_tempoprep.innerHTML = `${url.prepTimeMinutes}m`
        
        const instrucoes_traduzidas = await testarTraducao(url.instructions.join("%0A"))
        const ingredientes_traduzidos = await testarTraducao(url.ingredients.join("%0A"))
        slct_ins.innerHTML = `<p>Instruções</p>`
        slct_ing.innerHTML = `<p>Ingredientes</p>`


        slct_ins.innerHTML += "<ul>"
        instrucoes_traduzidas.forEach((ins) => {
            slct_ins.innerHTML += `<li>> ${ins}</li>`
        })
        slct_ins.innerHTML += "</ul>"

        slct_ing.innerHTML += "<ul>"
        ingredientes_traduzidos.forEach((ins) => {
            slct_ing.innerHTML += `<li>> ${ins}</li>`
        })
        slct_ing.innerHTML += "</ul>"
    }
    else
    {
        navegar_receitas(indice_receita)
    }
}
async function navegar_receitas(indice)
{
    slct_img.src = "gifcarregando.gif"
    if(receitas.length > 0)
    {
        slct_ins.innerHTML = `<p>Instruções</p><p>>Buscando...</p>`
        slct_ing.innerHTML = `<p>Ingredientes</p><p>>Buscando...</p>`
        
        const textos = [
        receitas[indice].name,
        receitas[indice].difficulty,
        receitas[indice].cuisine,
        ].join("%0A");

        slct_img.src = receitas[indice].image
        const infos_resultado = await testarTraducao(textos);

        nome_receita.innerHTML = infos_resultado[0]
        resultado_dificudade.innerHTML = infos_resultado[1]
        resultado_culinaria.innerHTML = infos_resultado[2]
        resultado_tempoprep.innerHTML = `${receitas[indice].prepTimeMinutes}m`

        const instrucoes_traduzidas = await testarTraducao(receitas[indice].instructions.join("%0A"))
        console.log(instrucoes_traduzidas);
        const ingredientes_traduzidos = await testarTraducao(receitas[indice].ingredients.join("%0A"))

        slct_ins.innerHTML = "<p>Instruções</p>"
        slct_ing.innerHTML = "<p>Ingredientes</p>"

        slct_ins.innerHTML += "<ul>"
        instrucoes_traduzidas.forEach((ins) => {
            slct_ins.innerHTML += `<li>> ${ins}</li>`
        })
        slct_ins.innerHTML += "</ul>"

        slct_ing.innerHTML += "<ul>"
        ingredientes_traduzidos.forEach((ins) => {
            slct_ing.innerHTML += `<li>> ${ins}</li>`
        })
        slct_ing.innerHTML += "</ul>"

        vendo_n_resultados.innerHTML = `Exibindo: ${indice_receita+1}°`
    }
}