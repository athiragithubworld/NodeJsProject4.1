// const fs = require("fs");
// const path = require("path");

const db = require("../util/database");
const cart = require("./cart");

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "products.json"
// );

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title,imageUrl,description,price) VALUES (?,?,?,?)",
      [this.title, this.imageUrl, this.description, this.price]
    );

    //  use file to save data
    // getProductsFromFile((products) => {
    //   if (this.id) {
    //     const existingProductIndex = products.findIndex(
    //       (prod) => prod.id === this.id
    //     );
    //     const updatedProducts = [...products];
    //     updatedProducts[existingProductIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //       console.log(err);
    //     });
    //   } else {
    //     console.log("666");
    //     this.id = Math.random().toString();
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), (err) => {
    //       console.log(err);
    //     });
    //   }
    // });
  }

  static deleteById(id) {
    return db.execute("DELETE FROM products WHERE products.id = ?", [id]);

    // getProductsFromFile((products) => {
    //   const updatedProducts = products.filter((prod) => prod.id !== id); // Filters out the product with the matching id
    //   fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //     if (err) {
    //       console.log(err);
    //     }
    //   });
    // });
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id, cb) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);

    // getProductsFromFile((products) => {
    //   const product = products.find((p) => p.id === id);
    //   cb(product);
    // });
  }
};
