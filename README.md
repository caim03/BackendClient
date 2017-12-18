# Installazione

Installare: `npm`, `nodejs`

## Configurazione

Accedere alla cartella principale del progetto e digitare: `npm install`

Configurare i parametri del backend client tramite il file: `config/config.js`

## Parametri di configurazione

  - `ipGateway`: indica l'indirizzo IP del gateway
  - `portGateway`: indica la porta di ascolto del gateway
  - `portMaster`: indica la porta di ascolto del nodo master
  - `delayPing`: indica la frequenza con il quale il backend client chiede l'indirizzo del master al gateway. 
  In questo modo, se il master subisce un fallimento, il backend recupera l'indirizzo del nuovo master al più dopo
  delayPing millisecondi
  
## Start backend client

Digitare: `node app.js`
  
