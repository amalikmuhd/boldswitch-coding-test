import React, { useState } from "react";

// Dummy data for use in testing the E-commerce Product filter Application
const productsData = [
  { id: 1, name: "Product 1", category: "Category A", price: 10, rating: 4 },
  { id: 2, name: "Product 2", category: "Category B", price: 20, rating: 3 },
  { id: 3, name: "Product 3", category: "Category A", price: 30, rating: 5 },
  { id: 4, name: "Product 4", category: "Category C", price: 40, rating: 2 },
  { id: 5, name: "Product 5", category: "Category B", price: 50, rating: 4 },
];

const Product = () => {
  const [products, setProducts] = useState(productsData);
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const updateProduct = (productId, updatedProduct) => {
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const resetFilter = () => {
    setCategory("All");
    setMinPrice(0);
    setMaxPrice(100);
    setMinRating(0);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (category === "All" || product.category === category) &&
      product.price >= minPrice &&
      product.price <= maxPrice &&
      product.rating >= minRating
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      id: products.length + 1, // Assign a unique ID to the new product
      name: formData.get("name"),
      category: formData.get("category"),
      price: parseFloat(formData.get("price")),
      rating: parseInt(formData.get("rating")),
    };
    addProduct(newProduct);
    e.target.reset(); // Reset the form fields after adding the product
  };

  return (
    <div>
      <h1>Products</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Product Name:
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Category:
            <select name="category" required>
              <option value="Category A">Category A</option>
              <option value="Category B">Category B</option>
              <option value="Category C">Category C</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Price:
            <input type="number" name="price" min="0" required />
          </label>
        </div>
        <div>
          <label>
            Rating:
            <input type="number" name="rating" min="1" max="5" required />
          </label>
        </div>
        <button type="submit">Add Product</button>
      </form>
      {/* Rest of the code remains the same */}
    </div>
  );
};

export default Product;
