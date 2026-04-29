const mqtt = require('mqtt');

// Conectar ao broker MQTT HiveMQ com Last Will and Testament (LWT)
const client = mqtt.connect({
  host: '8498a3d2c00c4a09bdffbdeaa399f6de.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts', // MQTT over TLS
  username: 'Aulanavarro1',
  password: 'Aulanavarro1',
  will: {
    topic: 'cliente/offline',
    payload: 'Cliente desconectado inesperadamente',
    qos: 1,
    retain: false
  }
});

// Quando conectado
client.on('connect', () => {
  console.log('Conectado ao broker MQTT');

  // Publicar status online com Retain Flag
  client.publish('cliente/status', 'Cliente online', { retain: true });
  console.log('Publicado status online com retain');

  // Inscrever-se nos tópicos de saída para monitoramento
  client.subscribe('ventilador', (err) => {
    if (!err) console.log('Inscrito em ventilador');
  });
  client.subscribe('alarme', (err) => {
    if (!err) console.log('Inscrito em alarme');
  });
  client.subscribe('status', (err) => {
    if (!err) console.log('Inscrito em status');
  });
  client.subscribe('cliente/offline', (err) => {
    if (!err) console.log('Inscrito em cliente/offline para LWT');
  });

  // Simular envio de temperaturas
  setInterval(() => {
    const temperatura = Math.floor(Math.random() * 80) + 20; // 20-100°C
    const payload = JSON.stringify({ temperatura });
    client.publish('temperatura', payload);
    console.log(`Publicado temperatura: ${temperatura}°C`);
  }, 5000); // A cada 5 segundos
});

// Quando receber mensagens
client.on('message', (topic, message) => {
  console.log(`Recebido de ${topic}: ${message.toString()}`);
});

// Tratamento de erros
client.on('error', (err) => {
  console.error('Erro MQTT:', err);
});