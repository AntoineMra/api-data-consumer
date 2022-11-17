# API Data Consumer - Documentation 

Ce document vise à décrire le fonctionnement de l'API développée par Antoine Marionneau, Antonin Girard et Guillaume GOUY.  
Dans le but de conseiller les directions d'entreprise, cette API propose d'obtenir et de mettre à jour une liste de procès,  
dans lesquels des entreprises ont été condamnées pour manquement à la protection des données personnelles. 

## Les technologies utilisées

La majorité des traitements de cette API repose sur NodeJs.
Afin de gérér les communications HTTP, le framework ExpressJs est utilisé.
En terme de persistance, un simple fichier JSON est utilisé. Même si un accès à une base de données Mongo est en cours de développement. 

## Accès

Avant d'aller, plus loin, je donne une exemple de Get afin d'accéder aux ressources:

```
https://ws-data-consuming.herokuapp.com/api/v1/fines
```


## Les Features et les controllers associés

### GET

Concrètement, cette API permet de récupérer une liste totale des procès.

```
GET - https://ws-data-consuming.herokuapp.com/api/v1/fines
```

### Post
 ```
 POST - https://ws-data-consuming.herokuapp.com/api/v1/fines/
```

### Get One

L'accès à cette ressource vous permettra de ne récupérer les données d'un seul projet.

 ```
 GET - https://ws-data-consuming.herokuapp.com/api/v1/fines/:id
```

### UPDATE

Cette ressource remplacera le procès précisé avec celui dans le corps de la requête.

```
Update - https://ws-data-consuming.herokuapp.com/api/v1/fines/:id
```

### DELETE

```
Delte - https://ws-data-consuming.herokuapp.com/api/v1/fines/:id
```

## Format des données

Les procès respectent ce descriptif:

```json
{
  "": 0,
  "ID": 1340,
  "Country": "GERMANY",
  "Date": 2021,
  "Amount": 1000000,
  "Controller_Processor": "Private individual",
  "Quoted_Art": 5,
  "Type": "Non-compliance with general data, processing principles",
  "polled artcile": 0,
  "VIOLATED_ARTICLES":  1
}

```
Vous disposerez du pays où s'est déroulé le procès, sa date, le montant des peines, le thême des poursuites et le nombre d'zrtciles enfreints.
