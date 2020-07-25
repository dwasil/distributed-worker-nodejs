# Distributed Worker NodeJS

Distributed NodeJS worker using a database table. The worker requests each URL inside the table and stores the resulting response code.

## Install

* Copy config.distr.json to config.json and fill data.
* Create Job table 

```bash
$ mysql -u USER -pPASSWORD DATABASE < job.sql
```

* Install app
```bash
$ npm install
```

## Run

```bash
$ node index.js
```