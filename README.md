# Decentralized Drive

This is a demo application built on top of maze framework.

## Requirements

You need to have following softwares installed in your system.

- Maze framework running
- Node.js

## How to run

Clone the repository and switch to it using the terminal.

Install the node dependencies.

```
npm install
```

Change the config.json file according to your system configuration.

```
{
  "backendURL": "http://localhost:3000/api/v1/m",
  "port": 4000,
  "tokenSecret": "some-secret-hash-or-something",
  "env": "development"
}
```

Then run the application using the following command.

```
node app.js
```

Navigate your browser to `localhost:3000` to view the app.
