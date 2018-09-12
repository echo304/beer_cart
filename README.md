# Toss Homework
Client for Toss Homework!

## Development
### Requirements
- node v8.11.2
```bash
npm install
```

### Prerequisite
To test the client, Mock API server must be prepared.
This project uses `json-server` as Mock API server.
```bash
npm start server
```

### Run with Dev server
```bash
npm start
```

### Run Test Suite
```base
npm run test
```

### Testing UI
While dev server is running, open chrome with `http://localhost:3000` </br>
Open chrome Dev tool and make sure to set mobile device mode </br>
<img width="470" alt="2018-09-12 12 23 03" src="https://user-images.githubusercontent.com/16456651/45400367-c8784c00-b686-11e8-9424-c5215e084535.png">

### Things to improve (Need more time!!!)
- Politely display unexpected Error with Modal
- Refactor code for more readability and maintainability
- Add unit test with Jest
- Add E2E test with cypress
