## Authorization in NodeJs using Cerbos

### Steps to run the project

1. `docker run --rm --name cerbos -v $(pwd)/cerbos/policies:/policies -p 3592:3592 -p 3593:3593 ghcr.io/cerbos/cerbos:latest` in the root folder
2. Run `npm install`
3. Run `npm start`

### Test

Run `npm test`
