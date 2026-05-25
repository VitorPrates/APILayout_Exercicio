//https://script.google.com/macros/s/AKfycbxTd4-v2GV2i5Tsk9ZiNwFzp1D80ND4qtX1UDzU4B3zXKEaPZFDgZYzdWwnXtUTwLo/exec?text=""
// https://script.google.com/macros/s/AKfycbxTd4-v2GV2i5Tsk9ZiNwFzp1D80ND4qtX1UDzU4B3zXKEaPZFDgZYzdWwnXtUTwLo/exec?text=hello%20world%0Aeasy%0Aitalian%20cuisine

//tags da api
// https://dummyjson.com/recipes/tags

//buscar por tag
//https://dummyjson.com/recipes/tag/tag


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
    let url = ""
    try {
        url = await(await fetch(`https://script.google.com/macros/s/AKfycbxTd4-v2GV2i5Tsk9ZiNwFzp1D80ND4qtX1UDzU4B3zXKEaPZFDgZYzdWwnXtUTwLo/exec?text=${texto}`)).json()
        if(url.erro)
        {
            throw new Error("Falha na api de tradução")
        }
    } catch (error) {
        console.log(error.message);
        url = {texto: texto.split("%0A").map(t => t.trim()).filter(t => t !== "")}
    }   
    // url = {texto: texto.split("%0A").map(t => t.trim()).filter(t => t !== "")}

    // console.log(url);

    return url.texto
}
// testarTraducao("Text in english")

window.addEventListener("load", () => {
    pesquisar_receita(1)
})
btns_navegando[0].addEventListener("click", ()=>{
    if(receitas.length > 0)
    {
        if(indice_receita == 0)
        {
            return
        }
        indice_receita > 0 ? indice_receita -= 1 : 0
        vendo_n_resultados.innerHTML = `Exibindo: ${indice_receita+1}°`
        nome_receita.innerHTML = "Buscando..."
        resultado_dificudade.innerHTML = "Buscando..."
        resultado_culinaria.innerHTML = "Buscando..."
        resultado_tempoprep.innerHTML = "Buscando..."
        slct_ins.innerHTML = `<p>Instruções</p><p>>Buscando...</p>`
        slct_ing.innerHTML = `<p>Ingredientes</p><p>>Buscando...</p>`
        navegar_receitas(indice_receita)
    }
    else
    {
        if(!isNaN(pesquisa.value))
        {
            indice_receita = +pesquisa.value
            indice_receita > 1 ? indice_receita -= 1 : 1
            pesquisa.value = indice_receita
            pesquisar_receita(indice_receita)
        }
    }
    
})
btns_navegando[1].addEventListener("click", ()=>{
    if(receitas.length > 0)
    {
        if(indice_receita == receitas.length-1)
        {
            return
        }
        indice_receita < receitas.length-1 ? indice_receita += 1  : receitas.length-1
        vendo_n_resultados.innerHTML = `Exibindo: ${indice_receita+1}°`
        nome_receita.innerHTML = "Buscando..."
        resultado_dificudade.innerHTML = "Buscando..."
        resultado_culinaria.innerHTML = "Buscando..."
        resultado_tempoprep.innerHTML = "Buscando..."
        slct_ins.innerHTML = `<p>Instruções</p><p>>Buscando...</p>`
        slct_ing.innerHTML = `<p>Ingredientes</p><p>>Buscando...</p>`
        navegar_receitas(indice_receita)
    }
    else
    {
        if(!isNaN(pesquisa.value))
        {
            // console.log("n eh num");
            // console.log(pesquisa.value);
            indice_receita = +pesquisa.value
            // indice_receita < 50 ? indice_receita += 1  : 50
            indice_receita += 1
            pesquisa.value = indice_receita
            pesquisar_receita(indice_receita)
        }
    }
    // console.log(indice_receita);
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
    slct_img.src = "./assets/gifcarregando.gif"
    nome_receita.innerHTML = "Buscando..."
    resultado_dificudade.innerHTML = "Buscando..."
    resultado_culinaria.innerHTML = "Buscando..."
    resultado_tempoprep.innerHTML = "Buscando..."
    slct_ins.innerHTML = `<p>Instruções</p><p>>Buscando...</p>`
    slct_ing.innerHTML = `<p>Ingredientes</p><p>>Buscando...</p>`
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
        return
    }
   
    //se for uma pesquisa por ID
    if(!isNaN(pesquisa))
    {
        try {
            url = await ( await fetch(`https://dummyjson.com/recipes/${pesquisa}?limit=50`)).json()
            if(url.message)
            {
                throw new Error("Receita não encontrada")
            }
        } catch (error) {
            console.log(error.message);
            slct_img.src = "./assets/gifcarregando.gif"
            nome_receita.innerHTML = "Receita não encontrada"
            resultado_dificudade.innerHTML = "-"
            resultado_culinaria.innerHTML = "-"
            resultado_tempoprep.innerHTML = "-"
            return
        }
        receitas = []
        n_resultados.innerHTML = `Resultados: 1`
    }
    //se for uma pesquisa por nome
    else
    {
        try {
            url = await(await fetch(`https://dummyjson.com/recipes/search?q=${pesquisa}&delay=2500`)).json()
            resultados = url.total
            if (resultados == 0)
            {
                throw new Error("Nenhuma receita encontrada")
            }
        } catch (error) {
            console.log(error.message);
            nome_receita.innerHTML = `nenhuma receita com "${pesquisa}" encontrada`
            resultado_dificudade.innerHTML = "-"
            resultado_culinaria.innerHTML = "-"
            resultado_tempoprep.innerHTML = "-"
        }

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
        nome_receita.innerHTML = "Buscando..."
        resultado_dificudade.innerHTML = "Buscando..."
        resultado_culinaria.innerHTML = "Buscando..."
        resultado_tempoprep.innerHTML = "Buscando..."
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

        const lista_instrucoes = document.createElement("ul")
        const lista_ingredientes = document.createElement("ul")

        instrucoes_traduzidas.forEach((ins,num) => {
            // slct_ins.innerHTML += `<li>> ${ins}</li>`
            const item_lista_instrucoes = document.createElement("li")
            item_lista_instrucoes.innerHTML = `${num+1}. ${ins}`
            lista_instrucoes.appendChild(item_lista_instrucoes)
        })
        slct_ins.appendChild(lista_instrucoes)
        
        ingredientes_traduzidos.forEach((ing) => {
            const item_lista_ingredientes = document.createElement("li")
            item_lista_ingredientes.innerHTML = `> ${ing}`
            lista_ingredientes.appendChild(item_lista_ingredientes)
        })
        slct_ing.appendChild(lista_ingredientes)

    }
    else
    {
        navegar_receitas(indice_receita)
    }
}
async function navegar_receitas(indice)
{
    slct_img.src = "./assets/gifcarregando.gif"
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
        const ingredientes_traduzidos = await testarTraducao(receitas[indice].ingredients.join("%0A"))

        slct_ins.innerHTML = "<p>Instruções</p>"
        slct_ing.innerHTML = "<p>Ingredientes</p>"

        const lista_instrucoes = document.createElement("ul")
        const lista_ingredientes = document.createElement("ul")

        instrucoes_traduzidas.forEach((ins,num) => {
            // slct_ins.innerHTML += `<li>> ${ins}</li>`
            const item_lista_instrucoes = document.createElement("li")
            item_lista_instrucoes.innerHTML = `${num+1}. ${ins}`
            lista_instrucoes.appendChild(item_lista_instrucoes)
        })
        slct_ins.appendChild(lista_instrucoes)
        
        ingredientes_traduzidos.forEach((ing) => {
            const item_lista_ingredientes = document.createElement("li")
            item_lista_ingredientes.innerHTML = `> ${ing}`
            lista_ingredientes.appendChild(item_lista_ingredientes)
        })
        slct_ing.appendChild(lista_ingredientes)

        vendo_n_resultados.innerHTML = `Exibindo: ${indice_receita+1}°`
    }
}