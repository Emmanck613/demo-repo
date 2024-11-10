const defaultMemoria = Array.from({ length: 60}, () => ({data: '', next: ''}));
let memoria = [...defaultMemoria];

let palabras = []; //array de palabras a ingresar
const memoriaTabla = document.getElementById('memoriaTabla'); //tabla
const palabrasTable = document.getElementById('palabrasTable'); //tabla

const inputNumPalabras = document.getElementById('inputNumPalabras'); //form de numero de palabras a ingresar
const inputFormPalabras = document.getElementById('inputFormPalabras'); //form de palabras y posicion a ingresar
const contenedorPalabras = document.getElementById('contenedorPalabras'); //contenedor de inputs


inputNumPalabras.addEventListener('submit', (e) => {
    e.preventDefault();
    let numPalabras = parseInt(document.getElementById('numPalabras').value);//numero de palabras a ingresar
    
    contenedorPalabras.innerHTML = '';
    for (let i = 0; i < numPalabras; i++) {
        let palabraIndex = i + 1;
        const divPalabra = document.createElement('div');
        divPalabra.innerHTML = `
            <label>Cuál es la dirección inicial de la palabra (${palabraIndex}) </label>
            <input type="number" name="inicioPos" class="mb-3" min="0" max="59" required>

            <label>Cuál es el valor de la palabra (${palabraIndex})</label>
            <input type="text" name="palabra" class="mb-3" required>
        `;
        contenedorPalabras.appendChild(divPalabra);
    }

    inputFormPalabras.style.display = 'block';
    inputNumPalabras.style.display = 'none';

});

//mostrar memoria en tabla

function mostrarMemoria() {
    memoriaTabla.innerHTML = '';

    memoria.forEach((cell, i) =>  {
        const tr = document.createElement('tr'); //filla
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${cell.data}</td>
            <td>${cell.next}</td>
        `;
        memoriaTabla.appendChild(tr);
    })
}

function crearPalabras(datosPalabra) {

    palabras = datosPalabra.map((palabra) => {
        return {
            word: palabra.word,
            startPos: palabra.startPos,
            length: palabra.word.length
        }
    })

    palabras.sort((a, b) => a.startPos - b.startPos);

    tablaPalabras();
}

function tablaPalabras() {
    palabrasTable.innerHTML = '';

    palabras.forEach((cell, i) =>  {
        const tr = document.createElement('tr'); //filla
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${cell.word}</td>
            <td>${cell.startPos}</td>
            <td>${cell.length}</td>
        `;
        palabrasTable.appendChild(tr);
    })
}


//insertar palabra 
inputFormPalabras.addEventListener('submit', (e) => {

    e.preventDefault();
    
    let datosPalabra = Array.from(contenedorPalabras.children).map((div) => {
        return {
            word: div.querySelector('input[name="palabra"]').value,
            startPos: parseInt(div.querySelector('input[name="inicioPos"]').value)
        };
    });

    crearPalabras(datosPalabra);

    console.log(datosPalabra);

    //insertar palabra en memoria
    for (const { word, startPos } of datosPalabra) {

        let currentPos = startPos;

        for (let j = 0; j < word.length; j++) {
            //checar si la posicion esta ocupada
            while (currentPos < memoria.length && memoria[currentPos].data) {
                currentPos++;
            }

                    //posicion de palabra no valido
            if(currentPos >= memoria.length)  {
                alert(`Posición de palabra no válida o palabra supera el tamaño restante en la posicion ${startPos}`);
                break;
            } 

            memoria[currentPos].data = word[j];
            memoria[currentPos].next = (j === word.length - 1)? 'FIN' : currentPos + 1; //siguiente posicion

            currentPos++;

        }

        console.log(memoria);

    } //fin for insertar palabra

    mostrarMemoria();

    inputFormPalabras.reset();

    inputFormPalabras.style.display = 'none';
    inputNumPalabras.style.display = 'block';
    memoria.length = 0;
    memoria = [...defaultMemoria];


});
mostrarMemoria();
tablaPalabras();
