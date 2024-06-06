const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc'); // Make sure this line is added

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const borrowRoutes = require('./routes/borrow');
const authRoutes = require('./routes/auth');

app.use('/api', bookRoutes);
app.use('/api', userRoutes);
app.use('/api', borrowRoutes);
app.use('/api', authRoutes);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Library Management API",
            version: "1.0.0",
            description: "API for managing a library's inventory and user borrowings",
        },
        servers: [{ url: "http://localhost:3000" }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ["./routes/*.js"], // Make sure this points to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Library management system running on http://localhost:${port}`);
});
