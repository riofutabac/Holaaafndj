# Trabajando con Arreglos y Manipulación del DOM en JavaScript

## Tabla de Contenidos

- [Trabajar con Arreglos](#trabajar-con-arreglos)
- [Mezclar los Valores de los Arreglos](#mezclar-los-valores-de-los-arreglos)
- [Introducción a la Manipulación del DOM](#introducción-a-la-manipulación-del-dom)
- [Eventos](#eventos)
- [Crear Imágenes en la Página](#crear-imágenes-en-la-página)
- [Competidor de Cartas](#competidor-de-cartas)
- [Código Completo del Juego de Blackjack](#código-completo-del-juego-de-blackjack)

## Trabajar con Arreglos

Los arreglos en JavaScript son colecciones ordenadas de elementos. Se pueden manipular de muchas formas utilizando métodos como `push`, `pop`, `shift`, `unshift`, `splice`, y más.

### Ejemplo de Arreglo

```javascript
const carros = ['Ford', 'Chevrolet', 'Toyota', 'Nissan', 'Honda'];
```

## Mezclar los Valores de los Arreglos

Podemos usar bibliotecas como `underscore.js` para mezclar los valores de un arreglo de manera aleatoria.

```javascript
const mezclarArreglo = (arreglo) => _.shuffle(arreglo);
```

## Introducción a la Manipulación del DOM

El DOM (Document Object Model) representa la estructura de un documento HTML como un árbol de nodos. Podemos manipular estos nodos para cambiar dinámicamente el contenido y la estructura de la página.

### Acceso Dinámico a Elementos HTML

Usamos `querySelector` para seleccionar elementos del DOM de manera eficiente.

```javascript
const header = document.querySelector('header h1');
header.innerText = "Nuevo Título";
```

### Crear y Manipular Elementos

Podemos crear nuevos elementos y agregarlos al DOM utilizando métodos como `createElement` y `append`.

```javascript
const botonNuevo = document.createElement('button');
botonNuevo.innerText = "Nuevo Botón";
document.body.append(botonNuevo);
```

### Agregar Clases e ID

```javascript
botonNuevo.classList.add('mi-clase');
botonNuevo.id = 'mi-id';
```

## Eventos

Los eventos permiten ejecutar código en respuesta a acciones del usuario, como clics o teclas presionadas.

```javascript
const boton = document.querySelector('#mi-boton');
boton.addEventListener('click', () => {
    console.log('Botón clickeado');
});
```

## Crear Imágenes en la Página

Podemos crear elementos de imagen y añadirlos al DOM.

```javascript
const img = document.createElement('img');
img.src = 'ruta/a/tu/imagen.png';
img.alt = 'Descripción de la imagen';
document.body.append(img);
```

## Competidor de Cartas

Implementaremos la lógica para un juego de Blackjack, creando cartas dinámicamente y manejando los puntos de los jugadores.

### Crear un Deck de Cartas

```javascript
const tiposCartas = ['C', 'D', 'H', 'S'];
const cartasMayor = ['J', 'Q', 'K', 'A'];
let deck = [];

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tiposCartas) {
            deck.push(i + tipo);
        }
    }
    for (let cartaMayor of cartasMayor) {
        for (let tipo of tiposCartas) {
            deck.push(cartaMayor + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
};

deck = crearDeck();
console.log(deck);
```

### Pedir una Carta

```javascript
const pedirCarta = () => {
    if (deck.length === 0) {
        console.log('¡Se han agotado las cartas en el mazo!');
        return null; 
    }
    return deck.pop();
};
```

### Valor de la Carta

```javascript
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
           (valor === 'A') ? 11 : 10
           : valor * 1;
};
```

### Turno del Crupier

```javascript
const turnoCrupier = (puntosJugador) => {
    let puntosCrupier = 0;
    const totalCrupier = document.querySelector('#total-crupier');
    const divsCartasCrupier = document.querySelector('#cartas-crupier');

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
        determinarGanador(puntosJugador, puntosCrupier);
    }, 100);
};
```

### Mostrar Resultado

```javascript
const mostrarResultado = (mensaje) => {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = mensaje;
    resultadoDiv.style.display = 'block';
};

const determinarGanador = (puntosJugador, puntosCrupier) => {
    let mensaje;
    if (puntosJugador > 21) {
        mensaje = '¡Te has pasado! Crupier gana.';
    } else if (puntosCrupier > 21) {
        mensaje = '¡Crupier se ha pasado! ¡Ganaste!';
    } else if (puntosJugador > puntosCrupier) {
        mensaje = '¡Felicidades! Has ganado.';
    } else if (puntosJugador < puntosCrupier) {
        mensaje = 'Crupier gana. ¡Mejor suerte la próxima!';
    } else {
        mensaje = '¡Empate!';
    }
    mostrarResultado(mensaje);
};
```

## Código Completo del Juego de Blackjack

Aquí tienes el código completo para implementar el juego de Blackjack en tu página web.

### HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blackjack Moderno</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/04-BlackJack/css/styles.css">
    <script src="https://cdn.jsdelivr.net/npm/underscore@1.13.6/underscore-umd-min.js"></script>
</head>
<body>
    <header>
        <h1>Blackjack</h1>
    </header>
    <main>
        <section class="controls">
            <button id="pedir-carta" class="btn" aria-label="Pedir carta">Pedir Carta</button>
            <button id="plantarse" class="btn" aria-label="Plantarse">Plantarse</button>
            <button id="nueva-partida" class="btn btn-new" aria-label="Iniciar nueva partida">Nueva Partida</button>
        </section>
        <div class="game-area">
            <section class="dealer-section">
                <h2>Mano del Crupier</h2>
                <div id="cartas-crupier" class="cards-container"></div>
                <p class="total">Total: <span id="total-crupier">0</span></p>
            </section>
            <section class="player-section">
                <h2>Tu Mano</h2>
                <div id="cartas-jugador" class="cards-container"></div>
                <p class="total">Total: <span id="total-jugador">0</span></p>
            </section>
        </div>
        <div id="resultado" class="resultado"></div>
    </main>
    <footer>
        <p>whoisalel</p>
    </footer>
    <script src="/04-BlackJack/js/juego.js"></script>
</body>
</html>
```

### CSS

```css
:root {
    --primary-color: #1a1a2e;
    --secondary-color: #16213e;
    --accent-color: #0f3460;
    --text-color: #ff4b5c;
    --button-text: #ffffff;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--primary-color);
    color: #fff;
    line-height: 1.6;
}

header {
    background-color: var(--secondary-color);
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h1 {
    font-size: 2.5rem;
    color: var(--text-color);
}

main {
    max

-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.game-area {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 2rem;
}

.dealer-section, .player-section {
    flex: 1;
    min-width: 300px;
    background-color: var(--secondary-color);
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

h2 {
    color: var(--text-color);
    margin-bottom: 1rem;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.carta {
    width: 100px;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
    animation: aparecerCarta 0.5s ease-out;
}

@keyframes aparecerCarta {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.resultado {
    background-color: var(--accent-color);
    color: white;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    margin-top: 1rem;
    display: none;
    animation: aparecer 0.3s ease-out;
}

@keyframes aparecer {
    from { opacity: 0; }
    to { opacity: 1; }
}

.carta:hover {
    transform: translateY(-5px);
}

.total {
    font-size: 1.2rem;
    font-weight: 600;
}

.controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem;
}

.btn {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;
}

.btn:hover {
    transform: translateY(-2px);
}

#pedir-carta {
    background-color: #4CAF50;
    color: var(--button-text);
}

#plantarse {
    background-color: #f44336;
    color: var(--button-text);
}

.btn-new {
    background-color: #3498db;
    color: var(--button-text);
}

footer {
    text-align: center;
    padding: 1rem;
    background-color: var(--secondary-color);
    color: #888;
    bottom: 0;
    width: 100%;
}

@media (max-width: 768px) {
    .game-area {
        flex-direction: column;
    }
    
    .controls {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 100%;
        max-width: 300px;
        margin-bottom: 0.5rem;
    }

    .carta {
        width: 80px; 
    }
}
```

### JavaScript

```javascript
/**
 * Juego de BlackJack
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const tiposCartas = ['C', 'D', 'H', 'S'];
const cartasMayor = ['J', 'Q', 'K', 'A'];
let puntosJugador = 0, puntosCrupier = 0;

const totalJugador = document.querySelector('#total-jugador');
const divsCartasJugador = document.querySelector('#cartas-jugador');
const totalCrupier = document.querySelector('#total-crupier');
const divsCartasCrupier = document.querySelector('#cartas-crupier');

const btnPedir = document.querySelector('#pedir-carta');
const btnPlantarse = document.querySelector('#plantarse');
const btnNuevaPartida = document.querySelector('#nueva-partida');

const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tiposCartas) {
            deck.push(i + tipo);
        }
    }
    for (let cartaMayor of cartasMayor) {
        for (let tipo of tiposCartas) {
            deck.push(cartaMayor + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
};

const pedirCarta = () => {
    if (deck.length === 0) {
        console.log('¡Se han agotado las cartas en el mazo!');
        return null; 
    }
    return deck.pop();
};

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
           (valor === 'A') ? 11 : 10
           : valor * 1;
};

const turnoCrupier = (puntosJugador) => {
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
        determinarGanador(puntosJugador, puntosCrupier);
    }, 100);
};

const mostrarResultado = (mensaje) => {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = mensaje;
    resultadoDiv.style.display = 'block';
};

const determinarGanador = (puntosJugador, puntosCrupier) => {
    let mensaje;
    if (puntosJugador > 21) {
        mensaje = '¡Te has pasado! Crupier gana.';
    } else if (puntosCrupier > 21) {
        mensaje = '¡Crupier se ha pasado! ¡Ganaste!';
    } else if (puntosJugador > puntosCrupier) {
        mensaje = '¡Felicidades! Has ganado.';
    } else if (puntosJugador < puntosCrupier) {
        mensaje = 'Crupier gana. ¡Mejor suerte la próxima!';
    } else {
        mensaje = '¡Empate!';
    }
    mostrarResultado(mensaje);
};

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    totalJugador.innerText = puntosJugador;

    const img = document.createElement('img');
    img.classList.add('carta');
    img.src = `/04-BlackJack/assets/cartas/${carta}.png`;
    divsCartasJugador.append(img);

    if (puntosJugador > 21) {
        console.log('Perdiste');
        btnPedir.disabled = true;
        btnPlantarse.disabled = true;
        turnoCrupier(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('Llegaste a 21');
        btnPedir.disabled = true;
        turnoCrupier(puntosJugador);
    }
});

btnPlantarse.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnPlantarse.disabled = true;
    turnoCrupier(puntosJugador);
});

btnNuevaPartida.addEventListener('click', () => {
    console.clear();
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

// Inicializar el juego
deck = crearDeck();
```
