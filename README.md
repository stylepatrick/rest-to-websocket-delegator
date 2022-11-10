# rest-to-websocket-delegator
Rest to websocket delegator. Spring Boot backend will consume rest requests and delegate them to the Angular frontend.

POST request to http://localhost:8080/api/consumer will send a websocket message to all available clients, if the userId matches with the logged in user the message will be displayed:

POST body:
`{
    "userId": "tt",
    "message": "Hallo 123!"
}`
