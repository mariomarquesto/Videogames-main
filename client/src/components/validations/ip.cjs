const os = require('os');
console.log(os)
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  let localIP;

  for (const interfaceName in interfaces) {
    const networkInterface = interfaces[interfaceName];
    for (const iface of networkInterface) {
      // Filtramos las direcciones IPv4 y omitimos las direcciones '127.0.0.1' (localhost)
      if (iface.family === 'IPv4' && iface.address !== '127.0.0.1') {
        localIP = iface.address;
        break;
      }
    }
    if (localIP) break;
  }

  return localIP;
}

const localIP = getLocalIP();
console.log('Tu dirección IP local es:', localIP);
