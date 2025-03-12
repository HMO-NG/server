import swaggerJsDoc from "swagger-jsdoc"
import path from 'path';

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - published
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           description: Name of the author of the book
 *         published:
 *           type: boolean
 *           description: If the book is published or not
 *       example:
 *         title: A great book
 *         author: John
 *         published: true
 *     BookUpdate:
 *       type: object
 *       optional:
 *         - title
 *         - author
 *         - published
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           description: Name of the author of the book
 *         published:
 *           type: boolean
 *           description: If the book is published or not
 *       example:
 *         title: An updated book title
 *         author: A new author
 *         published: true
 *
 */

const __dirname = path.resolve()

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HCI Healthcare API Documentation",
      version: "v1",
      description: "The APIs for HCI Healthcare that powers the NHIA Mobile app and ERP",
    },
  },
  apis: [
    `${__dirname}/src/controller/*.js`,
    `${__dirname}/dist/controller/*.js`,
    `${__dirname}/src/swagger.js`,
  ],
})


export default swaggerSpec
