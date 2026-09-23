import readline from "readline/promises";
import { writeFile, readFile } from "fs/promises";
import { stdin, stdout } from "process";

const FILE = "products.json";


const saveCart = async (cart) => {
  await writeFile(FILE, JSON.stringify(cart, null, 2));
};


const getCart = async () => {
  try {
    const data = await readFile(FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
   
    await saveCart([]);
    return [];
  }
};


const addToCart = async (item) => {
  const products = await getCart();
  const productFound = products.find((p) => p.id === item.id);
    if(productFound){
      productFound.qty += item.qty;
      console.log('Product in cart quantity updated');
    }

  products.push(item);

  await saveCart(products);

  console.log("Product added successfully! ✅");
};

const showCart = async () => {
  const products = await getCart();

  if (products.length === 0) {
    console.log("Cart is empty 🛒");
    return;
  }

  console.table(products);
};


const deleteFromCart = async (cin) => {
  const products = await getCart();

  if (products.length === 0) {
    console.log("Cart is empty 🛒");
    return;
  }

  console.table(products);

  const id = await cin.question("Enter product ID to remove: ");

  const newProducts = products.filter(
    (product) => product.id !== Number(id)
  );

  if (newProducts.length === products.length) {
    console.log("Product not found ❌");
    return;
  }

  await saveCart(newProducts);

  console.log("Product removed successfully! ✅");
};


const updateCart = async (cin) => {
  const products = await getCart();

  if (products.length === 0) {
    console.log("Cart is empty 🛒");
    return;
  }

  console.table(products);

  const id = await cin.question("Enter product ID: ");
  const qty = await cin.question("Enter new quantity: ");

  const product = products.find(
    (product) => product.id === Number(id)
  );

  if (!product) {
    console.log("Product not found ❌");
    return;
  }

  product.qty = Number(qty);

  await saveCart(products);

  console.log("Quantity updated successfully! ✅");
};


const checkout = async () => {
  const products = await getCart();

  if (products.length === 0) {
    console.log("Cart is empty 🛒");
    return;
  }

  let total = 0;

  products.forEach((product) => {
    total += product.price * product.qty;
  });

  console.table(products);

  console.log(Total Amount: ₹${total});
  console.log("Thank you for shopping! 🛍️");
};


const main = async () => {
  const cin = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  let choice;

  do {
    console.log("\n==============================");
    console.log("     Welcome to Shopping Cart 🛍️");
    console.log("==============================");
    console.log("1 ------- Add to cart");
    console.log("2 ------- Show Cart");
    console.log("3 ------- Remove Item");
    console.log("4 ------- Update Quantity");
    console.log("5 ------- Checkout");

    choice = await cin.question("Enter your choice: ");

    switch (Number(choice)) {
      case 1: {
        const data = await cin.question(
          "Enter id, name, price, qty: "
        );

        const p = data.split(",");

        const q = p.map((item) => item.trim());

        const [id, name, price, qty] = q;

        const product = {
          id: Number(id),
          name: name,
          price: Number(price),
          qty: Number(qty),
        };

        console.log(product);

        await addToCart(product);

        break;
      }

      case 2:
        await showCart();
        break;

      case 3:
        await deleteFromCart(cin);
        break;

      case 4:
        await updateCart(cin);
        break;

      case 5:
        await checkout();
        console.log("See you later... 😃");
        break;

      default:
        console.log("Invalid choice! Try again 🛑");
    }
  } while (Number(choice) !== 5);

  cin.close();
};

main();