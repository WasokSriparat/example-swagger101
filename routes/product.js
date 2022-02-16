const express = require("express");
const router = express.Router();

const products = require("../util/data2");

/**
 *@swagger
 *	components:
 *	  schemas:
 *	   Product:
 *	    type: object
 *	    required:
 *	     - name
 *	     - price
 *	    properties:
 *	     id:
 *	       type: integer
 *	       description: The auto-generated id of the product.
 *	     name:
 *	       type: string
 *	       description: name of product.
 *	     price:
 *	       type: integer
 *	       description: price of product.
 *	     createdAt:
 *	       type: string
 *	       format: date
 *	       description: The date of the record creation.
 *	    example:
 *	     name: Candy
 *	     price: 200
 */

/**
 * @swagger
 * 	tags:
 *    name: Products
 *    description: API to manage your products.
 */

/**
 * @swagger
 * paht:
 * /products/:
 *    get:
 *       summary: Lists all the product.
 *       tags: [Products]
 *       responses:
 *         "200":
 *           description: The lists of product.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 *    post:
 *       summary: Creates a new product.
 *       tags: [Products]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       responses:
 *         "200":
 *           description: The created product.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Product'
 */

/**
 * @swagger
 * path:
 * /products/{id}:
 *   get:
 *    summary: Gets a product by id.
 *    tags: [Products]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The product id
 *    responses:
 *      "200":
 *        description: The list of product.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      "404":
 *        description: Product not found.
 */

router.get("/", function (req, res) {
	res.status(200).json(products);
});

router.get("/:id", function (req, res) {
	let product = products.find(function (item) {
		return item.id == req.params.id;
	});

	product ? res.status(200).json(product) : res.sendStatus(404);
});

router.post("/", function (req, res) {
	const { name, price } = req.body;

	let product = {
		id: products.length + 1,
		name: name,
		price: price,
		createdAt: new Date(),
	};

	products.push(product);

	res.status(201).json(product);
});

router.put("/:id", function (req, res) {
	let product = products.find(function (item) {
		return item.id == req.params.id;
	});

	if (product) {
		const { name, price } = req.body;

		let updated = {
			id: book.id,
			name: name !== undefined ? name : product.name,
			price: price !== undefined ? price : product.price,
			createdAt: book.createdAt,
		};

		products.splice(products.indexOf(product), 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/:id", function (req, res) {
	let product = products.find(function (item) {
		return item.id == req.params.id;
	});

	if (product) {
		products.splice(books.indexOf(product), 1);
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;
