# How to use POST and GET functions to interact with an API
## File structure
Your file structure should look like this:
```
[PROJECT ROOT]
    app
        api
            [descriptive name of what the POST and GET functions will be POSTing/GETting]
                route.ts
```
## Inside route.ts
The first thing you will want to do is create a new `Prisma instance`, which is usually done like this:
```typescript
const db = new PrismaClient(); 
```
This `db` variable will be used again throughout the file

### POST
POST functions are used to post information to the API

Declare a POST function like this:
```typescript
export async function POST (req: NextRequest) {
```

Inside of a POST function, there are a few things that are required, but other than that, you are free to add to the function if you wish (such as adding console.logs for debugging)

Here's a list of everything you need to do in a POST function: 
* Declare a `body` variable by adding `let body:any = {}`

* Create a `try/catch` with `body = await req.json()` inside the try and some sort of error in the catch

## STATUS CODES
### 2xx - Success 
- 200 OK: GET, PUT, PATCH that return content
- 201 Created: successful POST that creates a resource
- 204 No content: successful DELETE, or PUT/PATCH with no body returned 

### 4xx - Client Errors 
- 400 Bad Request: malformed syntax (e.g. invalid json), missing required fields or invalid query parameters
- 401 Unauthorized: request lacks valid authentication 
- 403 Forbidden: authenticated but not allowed to perform this action 
- 404 Not Found: the request resource or endpoint doesn't exist
- 409 Conflict e.g. trying to create a resource that already exists
- 422 Unprocessable Entity: well-formed JSON but semantic validation failed (e.g. email format invalid)

### 5xx - Server Errors 
- 500 Internal Server Error: a catch-all for unexpected exceptions
- 502 Bad Gateway 
- 503 Service Unavailble 
- 504 Gateway Timeout

## Client VS. Server 
### Client
Role: The client initiates requests
Examples: 
- A web browser when you navigate to a page or run a fetch() call 
- A mobile app making an HTTP request
Responsibilities: 
- Assemble the HTTP request (method, URL, headers, body)
- Send it to the network
- Receive and interpret the HTTP response

### Server
Role: The server listens for incoming request, proceeses them, and responds
Examples: 
- /api/createPerson handler running on Node.js.
- a backend service that exposes endpoints
- a database server responding to SQL queries 

## How the client and server interact 
1. client sends a request to a specific URL (e.g. POST /api/createPerson)
