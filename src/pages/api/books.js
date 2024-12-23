const AppDataSource = require("@/data-source");
const Product = require("@/entities/Product");

let initialized = false;

export default async function handler(req, res) {
  if (!initialized) {
    await AppDataSource.initialize();
    initialized = true;
  }

  const productRepository = AppDataSource.getRepository(Product);

  if (req.method === "POST") {
    // Handle POST request: Create or Update a product
    const { id, name, author, price, imgUrl } = req.body;

    // Ensure all required fields are provided
    if (!name || !author || !price || !imgUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      if (id) {
        // Edit existing product
        const existingProduct = await productRepository.findOne({ where: { id } });

        if (!existingProduct) {
          return res.status(404).json({ message: "Product not found" });
        }

        // Update fields
        existingProduct.name = name;
        existingProduct.author = author;
        existingProduct.price = price;
        existingProduct.imgUrl = imgUrl;

        await productRepository.save(existingProduct);

        return res.status(200).json({ message: "Product updated successfully", product: existingProduct });
      } else {
        // Create a new product
        const newProduct = productRepository.create({ name, author, price, imgUrl });

        await productRepository.save(newProduct);

        return res.status(201).json({ message: "Product created successfully", product: newProduct });
      }
    } catch (error) {
      console.error("Error handling POST request:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "GET") {
    // Handle GET request: Fetch all products
    try {
      const products = await productRepository.find();
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Failed to fetch products" });
    }
  } else if (req.method === "DELETE") {
    // Handle DELETE request: Delete a product by id
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    try {
      const product = await productRepository.findOne({ where: { id } });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await productRepository.remove(product);

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({ message: "Failed to delete product" });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["POST", "GET", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
