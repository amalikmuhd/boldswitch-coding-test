import React, { useState } from "react";

// Dummy data
const products = [
  { id: 1, name: "Product 1", category: "Category A", price: 10, rating: 4 },
  { id: 2, name: "Product 2", category: "Category B", price: 20, rating: 3 },
  { id: 3, name: "Product 3", category: "Category A", price: 30, rating: 5 },
  { id: 4, name: "Product 4", category: "Category C", price: 40, rating: 2 },
  { id: 5, name: "Product 5", category: "Category B", price: 50, rating: 4 },
];

const Product = () => {
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  const handleMinRatingChange = (e) => {
    setMinRating(Number(e.target.value));
  };

  const filteredProducts = products.filter((product) => {
    return (
      (category === "All" || product.category === category) &&
      product.price >= minPrice &&
      product.price <= maxPrice &&
      product.rating >= minRating
    );
  });

  return (
    <div>
      <h1>Products</h1>
      <div>
        <label>
          Category:
          <select value={category} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Category A">Category A</option>
            <option value="Category B">Category B</option>
            <option value="Category C">Category C</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Price Range:
          <input
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          -
          <input
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </label>
      </div>
      <div>
        <label>
          Minimum Rating:
          <input
            type="number"
            value={minRating}
            onChange={handleMinRatingChange}
          />
        </label>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} - Rating: {product.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
