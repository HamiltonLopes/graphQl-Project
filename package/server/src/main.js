// import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
const app = express();

const server = new ApolloServer({
    typeDefs: gql`
        type Client{
            id: ID!
            name: String!
        }

        type Demand{
            id: ID!
            name: String
            client: Client!
            deadline: String
        }

        type Query {
            demands: [Demand]!
        }
    
    `,

    resolvers: {
        Query : {
            demands: () => [],
        }
    },
});

server.start().then(_ =>{
    server.applyMiddleware({
        app,
        cors: {
            origin: '*',
        },
    })
});



// const enableCors = cors({ origin: 'http://localhost:3000'});


// app.get('/status', (_,res) =>{
//     res.send({
//         status: 'Okay',
//     });
// });

// app.options('/authenticate', enableCors).post('/authenticate', enableCors, express.json(), (req,res) => {
//     console.log(req.body);
//     res.send({
//         Okay: true,
//     });
// });


// const server = createServer((request, response) => {
//     switch (request.url) {

//         case '/status': {
//             response.writeHead(200, {
//                 'Content-Type': 'application/json',
//             });
//             response.write(JSON.stringify({
//                 status: 'Okay',
//             }));
//             response.end();
//             break;
//         }

//         case '/authenticate': {
//             let data = '';
//             request.on('data', (chunk) => {
//                 data += chunk;
//             });
//             request.on('end', () => {
//                 response.end(data);
//             });
//             break;
//         }

//         default: {
//             response.writeHead(404, 'Service not found');
//             response.end();
//             break;
//         }
//     }
// });

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = 
// process.env.HOSTNAME || 
'127.0.0.1';

app.listen(PORT, HOSTNAME, () => {
    console.log(`server is listening at http://${HOSTNAME}:${PORT}`)
});