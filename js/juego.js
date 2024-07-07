/**
 * Juego de BlackJack
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];

let cartaJugador;

const tiposCartas = ['C', 'D', 'H', 'S'];

const cartasMayor = ['J', 'Q', 'K', 'A'];

let puntosJugador=0, puentosMaquina=0;

let puntosCrupier = 0;
const totalCrupier = document.querySelector('#total-crupier');
const divsCartasCrupier = document.querySelector('#cartas-crupier');

//Referencias de html /id="pedir-carta"/ id="plantarse"/  id="nueva-partida"/ id="total-jugador" / id="cartas-jugador"
const btnPedir = document.querySelector('#pedir-carta');
const btnPlantarse = document.querySelector('#plantarse');
const btnNuevaPartida = document.querySelector('#nueva-partida');
const totalJugador = document.querySelector('#total-jugador');
const divsCartasJugador =  document.querySelector('#cartas-jugador');


const crearDeck = () => {
    for(i = 2; i <= 10; i++){
        for(tipo of tiposCartas){
            deck.push(i + tipo);
        }

    }
    for(cartaMayor of cartasMayor){
        for(tipo of tiposCartas){
            deck.push(cartaMayor+tipo)
        }
    }
    deck = _.shuffle(deck); //crea nuestro deck barajeado
    return deck;
};


const pedirCarta = () => {
    if (deck.length === 0) {
        console.log('¡Se han agotado las cartas en el mazo!');
        return null; 
    }

    let cartasTotales = deck.length;
    let numeroAleatorio = _.random(0, cartasTotales - 1);
    
    // Extraemos la carta del deck
    const carta = deck.splice(numeroAleatorio, 1)[0]; 
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;
}


const turnoCrupier = () => {
    do {
        const carta = pedirCarta();
        puntosCrupier += valorCarta(carta);
        totalCrupier.innerText = puntosCrupier;

        const imgCrupier = document.createElement('img');
        imgCrupier.classList.add('carta');
        imgCrupier.src = `/04-BlackJack/assets/cartas/${carta}.png`;
        divsCartasCrupier.append(imgCrupier);

        if (puntosJugador > 21) break;

    } while (puntosCrupier < 17 && puntosCrupier < puntosJugador);

    setTimeout(() => {
        determinarGanador();
    }, 100);
};


const mostrarResultado = (mensaje) => {
    const resultadoDiv = document.getElementById('resultado');
    if (resultadoDiv) {
        resultadoDiv.textContent = mensaje;
        resultadoDiv.style.display = 'block';
    } else {
        console.error('Elemento de resultado no encontrado');
    }
};
const determinarGanador = () => {
    const mensaje = (puntosJugador > 21) ? '¡Te has pasado! Crupier gana.' :
                    (puntosCrupier > 21) ? '¡Crupier se ha pasado! ¡Ganaste!' :
                    (puntosJugador > puntosCrupier) ? '¡Felicidades! Has ganado.' :
                    (puntosJugador < puntosCrupier) ? 'Crupier gana. ¡Mejor suerte la próxima!' :
                    '¡Empate!';

    mostrarResultado(mensaje);
};

// Crea la baraja 
deck = crearDeck();
console.log(deck);
console.log('Cartas totales:',deck.length);



//Eventos 
btnPedir.addEventListener('click', function(){
    const carta = pedirCarta();
    puntosJugador= puntosJugador + valorCarta(carta);
    console.log({puntosJugador});
    totalJugador.innerText = puntosJugador;

    //Crear este elemento 
    //img class="carta" src="/04-BlackJack/assets/cartas/2C.png" alt="Tu carta"\
    const img = document.createElement('img'); //creamos el <img>
    img.classList.add('carta');// <img class='carta'>
    let srcImg = `/04-BlackJack/assets/cartas/${carta}.png`;
    img.src = srcImg;// img class="carta" src="/04-BlackJack/assets/cartas/2C.png"
    divsCartasJugador.append(img);

    if(puntosJugador > 21){
        console.log('Perdiste');
        btnPedir.disabled = true;
        btnPlantarse.disabled =  true;

        turnoCrupier();
    } else if (puntosJugador === 21) {
        console.warn('Llegaste a 21');
        btnPedir.disabled = true;
    }
});

btnPlantarse.addEventListener('click', function(){
    btnPedir.disabled = true;
    btnPlantarse.disabled =  true;
    turnoCrupier();
});

btnNuevaPartida.addEventListener('click', () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosCrupier = 0;
    totalJugador.innerText = 0;
    totalCrupier.innerText = 0;
    divsCartasJugador.innerHTML = '';
    divsCartasCrupier.innerHTML = '';
    btnPedir.disabled = false;
    btnPlantarse.disabled = false;
});



