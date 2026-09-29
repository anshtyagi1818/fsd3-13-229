import express from "express";

const app = express();

// request goes here
app.get("/", (req, res) => {
  res.send("<h1>Hello Express</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h2>about page</h2>");
});

const products = [
  { id: 1, name: "marker", qty: 100, price: 15 },
  { id: 2, name: "pen", qty: 50, price: 10 },
];

app.get("/product", (req, res) => {
  res.status(200).send(products);
});


app.use((req, res) => {
  res.status(404)("<h1>page not found</h1>");
});

// always listen at last
app.listen(3333, () => console.log("prg1 is running at 3333"));

