
const userNumberElement = document.querySelector('#userNumber'),
    sendButton = document.querySelector('#sendButton'), //btn Advinhar
    resetButton = document.querySelector('#resetButton'), //btn Reiniciar
    minNumberElement = document.querySelector('#minNumber'),//valor min.
    maxNumberElement = document.querySelector('#maxNumber'),// valor max.
    tipElement = document.querySelector('#tip'), //elemnto da dica
    guessesRemainingElement = document.querySelector('#guessesRemaining'); //tentativas rest.

userNumberElement.addEventListener('input', handleNumberInput);//tratar o n. da entrada de dado
sendButton.addEventListener('click', guessNumber);
resetButton.addEventListener('click', start);

//valores fixos que vão gerenciar a parte principal do jogo:
const minNumber = 1, //constante para número mín.
    maxNumber = 3, //constante para número máx.
    totalGuesses = 3;  //constante para total de tentativas.

//valores para variáveis (vão se alterando):
let currentNumber, //número que o jogador está tentanto advinhar.
    userNumber, //número que o usuário escreveu.
    guessesRemaining; // quantas tentativas ainda restam para o usuário.

//funções para o jogo:
//start - para iniciar o jogo
function start() {
    currentNumber = generateNumber();
    userNumber = minNumber; //colocado minNumber para não ficar vazio
    guessesRemaining = totalGuesses; //no início do jogo é o n. total 

    //agora vamos iniciar os elementos do html
    //o id #userNumber é o input no html
    userNumberElement.value = userNumber;
    //span do minNumber do html
    minNumberElement.innerText = minNumber;
    //span do maxNumber do html
    maxNumberElement.innerText = maxNumber;
    //apagar o elemento tip com a função start
    tipElement.innerText = '';
    //com o start inicia-se com o valor total de tentativas
    guessesRemainingElement.innerText = guessesRemaining;
    // qnd o jogo iniciair não faz sentido ter o reset btn
    userNumberElement.classList.remove('hidden');
    sendButton.classList.remove('hidden');
    resetButton.classList.add('hidden');
}

//generateNumber - vai gerar um número currentNumber aleatório dentro do min e max.
function generateNumber() {
    return Math.floor(Math.random() * (maxNumber + 1 - minNumber)) + minNumber;
    /* explicação: Para gera um número aleatório usa-se o Math.random().
    Essa função retorna um número entre 0 e 1, só que o 1 não entra!. Ex: 0.135, 0.98
    Então se quero um n. entre zero e 10, basta multiplicar por 10 (o maxNumber)
    Porém o 10 não está incluso, por isso deve-se fazer: maxNumber + 1
    O Math.floor serve para remover a casa decimal!
    Se quiser começar de um número min diferente de zero deve-se adicionar o minNumber no final
    Porém é preciso retirar do maxNumber: (maxNumber +1 - minNumber)*/
}
function handleNumberInput(event) { //evitar que se coloque dados que não façam sentido
    //event tem as propriedades referentes ao evento que está ocorrendo
    let value = parseInt(event.target.value || userNumber || 0); //parseInt pq permite só inteiros e já converte string em n.
    value = handleMinMax(minNumber, value, maxNumber); /*Se o valor do usuário for muito pequeno - vai retornar o valor min.
    Se o valor for muito grande - vai retornar o n. max */
    userNumber = value; //o value (após tratado) pode ser salvo no userNumber
    event.target.value = value; // atualização do input para dar display do value tratado
}

function handleMinMax(min, number, max) {//vai definir qual o valor min e max possíveis e qual o number sendo tratado
    return Math.min(Math.max(number, min), max);
}

function guessNumber() {
    guessesRemaining--;
    guessesRemainingElement.innerText = guessesRemaining;
    if (currentNumber === userNumber) {
        tipElement.innerText = `Acertou! O número é ${currentNumber}`;
        gameOver();
    } else {
        if (guessesRemaining > 0) {
            tipElement.innerText = `O número é ${currentNumber < userNumber ? 'menor' : 'maior'}`;
        } else {
            tipElement.innerText = `Acabaram suas tentativas! O número era ${currentNumber}`;
            gameOver();
        }
    }
}

function gameOver() {
    userNumberElement.classList.add('hidden');
    sendButton.classList.add('hidden');
    resetButton.classList.remove('hidden');
}


start();