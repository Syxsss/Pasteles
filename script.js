document.addEventListener('DOMContentLoaded', function () {
    // Llamada a la API de ipify para obtener la IP del usuario
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIp = data.ip;
            const timestamp = new Date().toLocaleString();

            console.log('IP del usuario:', userIp);
            console.log('Fecha y hora:', timestamp);

            // Llamar al servidor Flask para guardar la IP
            saveIpToServer(userIp, timestamp);

            // Mostrar la IP en el frontend
            displayLastLog(userIp, timestamp);
        })
        .catch(error => {
            console.error('Error al obtener la IP:', error);
        });
});

// Función para guardar la IP en el servidor Flask
function saveIpToServer(ip, timestamp) {
    fetch('http://properties-pork.gl.at.ply.gg:23101/save_ip', {  // Aquí la URL del túnel
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: ip, timestamp: timestamp })
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Error al guardar IP:', error));
}

// Función para mostrar el último registro de IP en la página
function displayLastLog(ip, timestamp) {
    const logContainer = document.getElementById('ip-logs');
    const newLog = document.createElement('div');
    newLog.textContent = `IP: ${ip} - Hora: ${timestamp}`;
    logContainer.appendChild(newLog);
}
