# nodered-navarro

Este projeto configura um ambiente para testar fluxos do Node-RED com MQTT usando HiveMQ.

## Pré-requisitos

- Node.js e npm instalados
- Conta no HiveMQ (credenciais fornecidas)

## Configuração

1. **Instalar dependências do Node.js:**
   ```bash
   npm install
   ```

2. **Executar o script de teste:**
   ```bash
   npm start
   ```

## Fluxos do Node-RED

O arquivo `flows.json` contém os fluxos para controle de temperatura, incluindo:
- Validação de temperatura
- Controle de ventilador
- Alarme de incêndio
- Dashboard com gráficos e alertas

Para importar no Node-RED:
- Abra o Node-RED
- Vá em Menu > Import > Clipboard
- Cole o conteúdo do `flows.json`
- Configure os nós MQTT para usar o broker HiveMQ:
  - Server: 8498a3d2c00c4a09bdffbdeaa399f6de.s1.eu.hivemq.cloud
  - Port: 8883
  - Username: Aulanavarro1
  - Password: Aulanavarro1
  - Use TLS: Sim

## Teste

O script `test.js` simula o envio de temperaturas aleatórias para o tópico `temperatura` e monitora as respostas nos tópicos `ventilador`, `alarme` e `status`.

Certifique-se de que o Node-RED esteja conectado ao HiveMQ com as credenciais fornecidas.