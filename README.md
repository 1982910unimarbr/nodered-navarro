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

## MQTT: Last Will and Testament (LWT) e Retain Flag

### Last Will and Testament (LWT)
O LWT é uma mensagem que o broker MQTT publica automaticamente quando um cliente desconecta de forma inesperada (sem enviar um DISCONNECT adequado). É como um "testamento" que garante que outros clientes sejam notificados sobre a desconexão.

**Quando usar:**
- Em sistemas IoT onde é crucial detectar falhas de conectividade, como dispositivos sensores que podem perder conexão devido a bateria fraca, interferência de sinal ou falhas de hardware.
- Para monitorar o status online/offline de dispositivos em tempo real.

**Impactos no sistema IoT real:**
- Melhora a confiabilidade: Permite que o sistema reaja rapidamente a desconexões, ativando alertas ou ações de recuperação.
- Reduz downtime: Facilita a detecção de problemas antes que afetem operações críticas.
- Exemplo: Um dispositivo de segurança pode enviar LWT com payload "offline", permitindo que o sistema central acione alarmes ou notificações.

### Retain Flag
A Retain Flag instrui o broker a armazenar a última mensagem publicada em um tópico e enviá-la automaticamente a qualquer novo cliente que se inscreva nesse tópico.

**Quando usar:**
- Para tópicos que representam estados atuais ou configurações persistentes, como status de dispositivos, configurações de sistema ou valores sensoriais que não mudam frequentemente.
- Em dashboards ou aplicações que precisam do estado mais recente imediatamente após conectar.

**Impactos no sistema IoT real:**
- Economiza largura de banda: Novos subscribers recebem o estado atual sem necessidade de polling ou mensagens adicionais.
- Garante consistência: Todos os clientes têm acesso ao último estado conhecido, evitando estados obsoletos.
- Exemplo: Um sensor de temperatura publica com retain, então um novo dashboard conectado recebe imediatamente a última leitura.

### Demonstração no Código
O script `test.js` demonstra ambos:
- **LWT**: Configurado na conexão (will topic: "cliente/offline", payload: "Cliente desconectado inesperadamente").
- **Retain**: Usado na publicação de mensagens de status (retain: true para tópicos como "status").

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
  - Username: Aulanavarro2
  - Password: Aulanavarro2
  - Use TLS: Sim

## Teste

O script `test.js` simula o envio de temperaturas aleatórias para o tópico `temperatura` e monitora as respostas nos tópicos `ventilador`, `alarme` e `status`.

Certifique-se de que o Node-RED esteja conectado ao HiveMQ com as credenciais fornecidas.