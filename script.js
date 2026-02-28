let button = document.querySelector('.botao-gerar')
// Adicione sua chave API da Groq aqui: https://console.groq.com
const API_KEY = "SUA_CHAVE_AQUI"
let api = "https://api.groq.com/openai/v1/chat/completions"


async function codigo() {

    let textUser = document.querySelector('.caixa-texto').value.trim()
    let B_codigo = document.querySelector('.bloco-codigo')
    let result = document.querySelector('.resultado')

    if(textUser == ""){
        alert('Por favor descreva sua informação!')
        return
    }

    let response = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model:
                "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                {
                    role: "system",
                    content: "Voçê é um gerador de código HTML e CSS, Por favor Responda somente com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga Exatamente o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate."
                }
                , {
                    role: "user",
                    content: textUser
                }
            ]
        })
    })

    let dados = await response.json()
    let visualization = dados.choices[0].message.content

    B_codigo.textContent = visualization
    result.srcdoc
        = visualization
}

button.addEventListener('click', codigo)

