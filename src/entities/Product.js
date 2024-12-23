const { EntitySchema } = require("typeorm");

const Product = new EntitySchema({
  name: "Product",
  tableName: "products", // optional: specify table name
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
    },
    author: {
      type: "varchar",
    },
    price: {
      type: "float",
    },
    imgUrl: {
      type: "varchar",
    },
  },
});

module.exports = Product;
