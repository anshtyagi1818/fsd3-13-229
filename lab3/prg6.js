import http from "http";

import {
    getAllProducts,
    addProduct,
    deleteProduct,
    getProductById,
    updateProduct
} from "./product.js";

const server = http.createServer((req, res) => {

    // GET ALL PRODUCTS
    if (req.url === "/api/v1/products" && req.method === "GET") {

        res.statusCode = 200;

        const data = getAllProducts();

        res.setHeader("Content-Type", "application/json");

        res.end(
            JSON.stringify({
                count: data.length,
                data: data
            })
        );

    }

    // ADD PRODUCT
    else if (req.url === "/api/v1/products" && req.method === "POST") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            const product = JSON.parse(body);

            const item = addProduct(product);

            res.statusCode = 201;

            res.setHeader("Content-Type", "application/json");

            res.end(
                JSON.stringify({
                    msg: "product added",
                    data: item
                })
            );
        });

    }

    // UPDATE PRODUCT
    else if (
        req.url.startsWith("/api/v1/products/") &&
        req.method === "PUT"
    ) {

        const productID = Number(req.url.split("/").pop());

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {

            const product = JSON.parse(body);

            const updatedPrd = updateProduct(productID, product);

            if (updatedPrd) {

                res.statusCode = 200;

                res.setHeader("Content-Type", "application/json");

                res.end(
                    JSON.stringify({
                        msg: "product updated",
                        data: updatedPrd
                    })
                );

            } else {

                res.statusCode = 404;

                res.end(
                    JSON.stringify({
                        msg: `id ${productID} not found`
                    })
                );
            }
        });

    }

    // DELETE PRODUCT
    else if (
        req.url.startsWith("/api/v1/products/") &&
        req.method === "DELETE"
    ) {

        const pid = Number(req.url.split("/").pop());

        const deleted = deleteProduct(pid);

        if (deleted) {

            res.statusCode = 200;

            res.end(
                JSON.stringify({
                    msg: "item deleted"
                })
            );

        } else {

            res.statusCode = 404;

            res.end(
                JSON.stringify({
                    msg: `product with id ${pid} not found`
                })
            );
        }

    }

    // GET PRODUCT BY ID
    else if (
        req.url.startsWith("/api/v1/products/") &&
        req.method === "GET"
    ) {

        const pid = Number(req.url.split("/").pop());

        const product = getProductById(pid);

        if (product) {

            res.statusCode = 200;

            res.setHeader("Content-Type", "application/json");

            res.end(
                JSON.stringify({
                    data: product
                })
            );

        } else {

            res.statusCode = 404;

            res.end(
                JSON.stringify({
                    msg: `product with id ${pid} not found`
                })
            );
        }

    }

    // ROUTE NOT FOUND
    else {

        res.statusCode = 404;

        res.end("Request not found");
    }
});

server.listen(5000, () => {
    console.log("prg6 is running on port 5000");
});