// ======================================================= //
//           Coração do Site v2.0 - Agora com mais IA?     //
// ======================================================= //

document.addEventListener('DOMContentLoaded', () => {

    // --- BANCO DE DADOS DO QUIZ (Continua o mesmo, sólido) --- //
    const bancoDePerguntas = {
        facil: [
            { pergunta: "Qual processo as plantas usam para converter luz solar em energia?", opcoes: ["Respiração", "Fotossíntese", "Transpiração", "Absorção"], resposta: "Fotossíntese" },
            { pergunta: "Qual é a parte da planta responsável pela absorção de água e nutrientes do solo?", opcoes: ["Folha", "Caule", "Flor", "Raiz"], resposta: "Raiz" },
            { pergunta: "O que dá a cor verde às folhas das plantas?", opcoes: ["Xantofila", "Caroteno", "Clorofila", "Antocianina"], resposta: "Clorofila" },
            { pergunta: "Qual é a flor nacional do Brasil?", opcoes: ["Orquídea", "Rosa", "Margarida", "Ipê-amarelo"], resposta: "Ipê-amarelo" },
            { pergunta: "Como se chama o processo de transporte de água das raízes até as folhas?", opcoes: ["Fototropismo", "Gutação", "Transpiração", "Osmose"], resposta: "Transpiração" },
            { pergunta: "Qual destes não é um tipo de fruto, botanicamente falando?", opcoes: ["Tomate", "Abobrinha", "Batata", "Pepino"], resposta: "Batata" },
            { pergunta: "As samambaias se reproduzem através de...?", opcoes: ["Sementes", "Esporos", "Mudas", "Bulbos"], resposta: "Esporos" },
            { pergunta: "O que as abelhas coletam das flores, além do néctar?", opcoes: ["Água", "Seiva", "Pólen", "Resina"], resposta: "Pólen" },
            { pergunta: "Qual gás as plantas liberam durante a fotossíntese?", opcoes: ["Gás Carbônico", "Nitrogênio", "Oxigênio", "Metano"], resposta: "Oxigênio" },
            { pergunta: "Uma planta que vive por mais de dois anos é chamada de...?", opcoes: ["Anual", "Bienal", "Perene", "Sazonal"], resposta: "Perene" }
        ],
        dificil: [
            { pergunta: "Qual hormônio vegetal é responsável pelo amadurecimento dos frutos?", opcoes: ["Auxina", "Giberelina", "Etileno", "Citocinina"], resposta: "Etileno" },
            { pergunta: "O movimento de uma planta em resposta ao toque é chamado de...?", opcoes: ["Fototropismo", "Gravitropismo", "Tigmotropismo", "Hidrotropismo"], resposta: "Tigmotropismo" },
            { pergunta: "Qual é o nome da estrutura que protege o broto de uma flor antes de desabrochar?", opcoes: ["Pétala", "Estame", "Sépala", "Pistilo"], resposta: "Sépala" },
            { pergunta: "Em botânica, o morango não é uma fruta, mas sim um...", opcoes: ["Pseudofruto", "Infrutescência", "Fruto agregado", "Fruto múltiplo"], resposta: "Pseudofruto" },
            { pergunta: "Plantas que crescem sobre outras plantas sem parasitá-las, como as orquídeas, são chamadas de?", opcoes: ["Parasitas", "Hemiparasitas", "Epífitas", "Simbiontes"], resposta: "Epífitas" },
            { pergunta: "Qual destes é um exemplo de planta carnívora que usa 'jarros' para capturar presas?", opcoes: ["Dioneia", "Drosera", "Sarracenia", "Nepenthes"], resposta: "Nepenthes" },
            { pergunta: "A perda de água na forma de vapor através dos estômatos das folhas é conhecida como?", opcoes: ["Exsudação", "Gutação", "Evapotranspiração", "Condensação"], resposta: "Evapotranspiração" },
            { pergunta: "A Sequóia-gigante é famosa por ser a árvore mais... do mundo?", opcoes: ["Alta", "Antiga", "Larga", "Volumosa"], resposta: "Volumosa" },
            { pergunta: "O Ginkgo Biloba é considerado um 'fóssil vivo' por quê?", opcoes: ["Petrificou e voltou à vida", "É o único representante de uma divisão antiga", "Data da época dos dinossauros", "Nunca evoluiu"], resposta: "É o único representante de uma divisão antiga" },
            { pergunta: "Como se chama a associação simbiótica entre fungos e raízes de plantas?", opcoes: ["Liquens", "Micorriza", "Nódulos", "Biorremediação"], resposta: "Micorriza" }
        ]
    };

    // --- GERADOR DE MENSAGENS DINÂMICAS --- //
    const partesDeFrases = {
        inicios: ["Prepare-se,", "Atenção, futuro botânico:", "Que comece o desafio!", "Vamos ver do que você é feito,", "Ok, vamos lá."],
        desafios: ["o bot já está na sua frente.", "as samambaias estão torcendo por você.", "não me decepcione.", "a floresta está de olho.", "mostre seu conhecimento sobre clorofila!"],
        elogios: ["Brilhante!", "Genial!", "Impressionante!", "Você é um mestre das plantas!", "Conhecimento de raiz!", "Essa foi na mosca!", "Perfeito!"],
        comentariosAcerto: ["Parece que temos um expert aqui.", "Fácil demais, né?", "Essa nem o bot acertava.", "Continua assim!", "Direto ao ponto!"],
        lamentos: ["Ops!", "Quase!", "Não foi dessa vez.", "Eita!", "Uma pena."],
        conselhosErro: ["mas a próxima você acerta.", "continue tentando, o conhecimento floresce.", "até as sequoias começaram pequenas.", "reflita e tente de novo.", "não desanime, a fotossíntese continua."],
        pontuacaoBaixa: ["Parece que você e as plantas ainda estão se conhecendo.", "Foi por pouco! Que tal regar um pouco mais os estudos?", "Acontece! Nem toda semente vinga de primeira."],
        pontuacaoMedia: ["Um resultado sólido! Você já não é mais um brotinho no assunto.", "Mandou bem! Já pode cuidar de uma samambaia sem medo.", "Bom trabalho! Você está no caminho certo para ter um dedo verde."],
        pontuacaoAlta: ["Incrível! Você tem o toque de Midas verde!", "Performance de mestre! O jardim botânico te espera.", "Uau! Seu conhecimento é tão vasto quanto a Amazônia."]
    };

    const gerarMensagemDinamica = (tipo, pontuacaoInfo = {}) => {
        const pegarAleatorio = (arr) => arr[Math.floor(Math.random() * arr.length)];

        switch (tipo) {
            case 'inicioQuiz':
                return `${pegarAleatorio(partesDeFrases.inicios)} ${pegarAleatorio(partesDeFrases.desafios)}`;
            case 'acerto':
                return `${pegarAleatorio(partesDeFrases.elogios)} ${pegarAleatorio(partesDeFrases.comentariosAcerto)}`;
            case 'erro':
                return `${pegarAleatorio(partesDeFrases.lamentos)} ${pegarAleatorio(partesDeFrases.conselhosErro)}`;
            case 'pontuacao':
                const { porcentagem } = pontuacaoInfo;
                if (porcentagem < 40) return pegarAleatorio(partesDeFrases.pontuacaoBaixa);
                if (porcentagem < 80) return pegarAleatorio(partesDeFrases.pontuacaoMedia);
                return pegarAleatorio(partesDeFrases.pontuacaoAlta);
            default:
                return "Vamos para a próxima!";
        }
    };
    
    // --- Variáveis de estado do jogo --- //
    let perguntasAtuais = [];
    let indicePerguntaAtual = 0;
    let pontuacao = 0;
    let dificuldadeAtual = '';

    // --- FUNÇÕES AUXILIARES --- //
    const mostrarToast = (mensagem) => {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = mensagem;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    const atualizarPlacar = () => {
        const placar = document.getElementById('placar-atual');
        if (placar) {
            placar.textContent = `Pontos: ${pontuacao}`;
        }
    };

    // --- LÓGICA PRINCIPAL DO QUIZ --- //
    window.iniciarQuiz = (dificuldade) => {
        localStorage.setItem('dificuldadeQuiz', dificuldade);
        mostrarToast(gerarMensagemDinamica('inicioQuiz'));
        setTimeout(() => {
            window.location.href = 'perguntas.html';
        }, 1500);
    };
    
    const carregarPergunta = () => {
        if(indicePerguntaAtual >= perguntasAtuais.length) {
            finalizarQuiz();
            return;
        }
        
        atualizarPlacar(); // Atualiza o placar no início de cada pergunta
        const pergunta = perguntasAtuais[indicePerguntaAtual];
        document.getElementById('numero-pergunta').textContent = `Pergunta ${indicePerguntaAtual + 1} de ${perguntasAtuais.length}`;
        document.getElementById('texto-pergunta').textContent = pergunta.pergunta;
        
        const opcoesContainer = document.getElementById('opcoes-resposta');
        opcoesContainer.innerHTML = '';

        pergunta.opcoes.forEach(opcao => {
            const radioId = `opcao-${opcao.replace(/\s+/g, '-')}`;
            const elementoOpcao = `
                <div>
                    <input type="radio" id="${radioId}" name="resposta" value="${opcao}" class="opcao-radio">
                    <label for="${radioId}" class="opcao-label">${opcao}</label>
                </div>
            `;
            opcoesContainer.innerHTML += elementoOpcao;
        });
        
        document.querySelectorAll('.opcao-label').forEach(label => {
            label.addEventListener('click', () => {
                document.getElementById('btn-responder').disabled = false;
            });
        });

        document.getElementById('btn-responder').disabled = true;
    };

    const verificarResposta = () => {
        const respostaSelecionada = document.querySelector('input[name="resposta"]:checked');
        if (!respostaSelecionada) return;

        const respostaCorreta = perguntasAtuais[indicePerguntaAtual].resposta;
        const labels = document.querySelectorAll('.opcao-label');
        document.querySelectorAll('.opcao-radio').forEach(radio => radio.disabled = true); // Bloqueia outras respostas
        
        document.getElementById('btn-responder').disabled = true;

        if(respostaSelecionada.value === respostaCorreta) {
            pontuacao++;
            mostrarToast(gerarMensagemDinamica('acerto'));
            respostaSelecionada.nextElementSibling.classList.add('correta');
            atualizarPlacar(); // Atualiza o placar imediatamente após o acerto
        } else {
            mostrarToast(gerarMensagemDinamica('erro'));
            respostaSelecionada.nextElementSibling.classList.add('errada');
            labels.forEach(label => {
                if (label.textContent === respostaCorreta) {
                    label.classList.add('correta');
                }
            });
        }
        
        setTimeout(() => {
            indicePerguntaAtual++;
            carregarPergunta();
        }, 2000);
    };
    
    const finalizarQuiz = () => {
        localStorage.setItem('pontuacaoFinal', pontuacao);
        window.location.href = 'pontuacao.html';
    };

    const exibirResultadoFinal = () => {
        const pontuacaoFinal = localStorage.getItem('pontuacaoFinal');
        const dificuldade = localStorage.getItem('dificuldadeQuiz');
        const totalPerguntas = bancoDePerguntas[dificuldade].length;

        document.getElementById('texto-pontuacao').textContent = `Sua pontuação final: ${pontuacaoFinal} de ${totalPerguntas}!`;

        const porcentagemAcertos = (pontuacaoFinal / totalPerguntas) * 100;
        const mensagemFinal = gerarMensagemDinamica('pontuacao', { porcentagem: porcentagemAcertos });
        
        document.getElementById('mensagem-final').textContent = mensagemFinal;
    };
    
    // --- LÓGICA DE PÁGINA E TEMA --- //
    const paginaAtual = window.location.pathname.split('/').pop();

    if (paginaAtual === 'perguntas.html') {
        dificuldadeAtual = localStorage.getItem('dificuldadeQuiz') || 'facil';
        perguntasAtuais = bancoDePerguntas[dificuldadeAtual];
        perguntasAtuais.sort(() => Math.random() - 0.5); 
        carregarPergunta();
        
        const btnResponder = document.getElementById('btn-responder');
        if(btnResponder) {
            btnResponder.addEventListener('click', verificarResposta);
        }
    }

    if (paginaAtual === 'pontuacao.html') {
        exibirResultadoFinal();
    }
    
    const themeToggle = document.getElementById('theme-toggle');
    const parallaxBg = document.querySelector('.parallax-bg');

    const temaSalvo = localStorage.getItem('theme');
    if (temaSalvo) {
        document.documentElement.setAttribute('data-theme', temaSalvo);
    }
    
    themeToggle.addEventListener('click', () => {
        const temaAtual = document.documentElement.getAttribute('data-theme');
        if (temaAtual === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.removeItem('theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!parallaxBg) return;
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        parallaxBg.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});