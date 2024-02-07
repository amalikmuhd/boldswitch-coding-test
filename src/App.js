import React, { useState } from "react";
import Navbar from "./NavBarComponent/Navbar"; // Imported the Navbar component
import "./Styles/Styles.css";

// Dummy data for use in testing the E-commercer Product filter Application
const initialProducts = [
  { id: 1, name: "Product 1", category: "Category A", price: 10, rating: 4 },
  { id: 2, name: "Product 2", category: "Category B", price: 20, rating: 3 },
  { id: 3, name: "Product 3", category: "Category A", price: 30, rating: 5 },
  { id: 4, name: "Product 4", category: "Category C", price: 40, rating: 2 },
  { id: 5, name: "Product 5", category: "Category B", price: 50, rating: 4 },
];

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);

  const filteredProducts = products.filter((product) => {
    return (
      (category === "All" || product.category === category) &&
      product.price >= minPrice &&
      product.price <= maxPrice &&
      product.rating >= minRating
    );
  });

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

  //   const handleAddProduct = () => {
  //   const newProduct = {
  //     id: 6,
  //     name: "New Product",
  //     category: "Category D",
  //     price: 60,
  //     rating: 5,
  //   };
  //   addProduct(newProduct);
  // };

  // Assuming you have a button or form to trigger updating a product
  const handleUpdateProduct = () => {
    const productIdToUpdate = 2; // Example product ID to update
    const updatedProductData = {
      name: "Updated Product",
      price: 25,
      rating: 4,
    };
    updateProduct(productIdToUpdate, updatedProductData);
  };

  // Assuming you have a button or form to trigger deleting a product
  const handleDeleteProduct = () => {
    const productIdToDelete = 3; // Example product ID to delete
    deleteProduct(productIdToDelete);
  };

  const resetFilters = () => {
    setCategory("All");
    setMinPrice(0);
    setMaxPrice(100);
    setMinRating(0);
  };
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Products</h1>
      </div>
      <div className="CategoryDiv">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>Filter By Category:</div>
          <div style={{ height: "20px" }}></div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Category A">Category A</option>
            <option value="Category B">Category B</option>
            <option value="Category C">Category C</option>
          </select>
        </div>

        <div>
          <div>
            <p> Price Range:</p>
          </div>
          <div>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            -
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <div>
            <p> Minimum Rating:</p>
          </div>
          <div>
            <input
              type="number"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price} - Rating: {product.rating}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="resetButtonDiv">
          <button onClick={resetFilters}>Reset Filters</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Add Products Form</h1>
        </div>
        <div>
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Delete and Update Products</h1>
        </div>
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price} - Rating: {product.rating}
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
              <button
                onClick={() =>
                  updateProduct(product.id, { price: product.price + 10 })
                }
              >
                Update Price
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
