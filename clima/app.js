const claveAPI = 'dea0d0b7c8beca7e4d8c525779ab2905';

document.getElementById('formularioClima').addEventListener('submit', async function(evento) {
    evento.preventDefault();

    const ciudad = document.getElementById('entradaCiudad').value.trim();
    const divResultado = document.getElementById('resultadoClima');
    const divError = document.getElementById('mensajeError');

    // Limpiar mensajes previos
    divResultado.innerHTML = '';
    divError.innerHTML = '';

    if (ciudad === '') {
        divError.textContent = 'Por favor, ingresa el nombre de una ciudad.';
        return;
    }

    try {
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${claveAPI}&units=metric&lang=es`);
        if (!respuesta.ok) {
            throw new Error('Ciudad no encontrada');
        }
        const datosClima = await respuesta.json();

        // Mostrar resultados
        const { name, main, weather } = datosClima;
        divResultado.innerHTML = `
            <h2>${name}</h2>
            <p>Temperatura: ${main.temp}°C</p>
            <p>Condición: ${weather[0].description}</p>
            <p>Humedad: ${main.humidity}%</p>
        `;
    } catch (error) {
        divError.textContent = 'Error: ' + error.message;
    }
});
