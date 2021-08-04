# CEP API Microservice

## Intro

Esse microserviço serve de middleware para a api via cep, onde você envia o query param "cep" e recebe as informações daquele cep respectivamente.

## Dependencies

```
npm install -g serverless
```

## Deploy

```
npm run deploy
```

## Test local

```
npm run invoke-local-valid
npm run invoke-local-invalid
```

## Test on cloud

```
npm run invoke-local-valid
npm run invoke-local-invalid
```

## Deployed url

<https://2nmln45jfj.execute-api.us-east-1.amazonaws.com/cep?cep=30575210>
