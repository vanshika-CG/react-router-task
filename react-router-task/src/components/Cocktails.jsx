import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cocktails.css";

function Cocktails() {
  const [cocktails, setCocktails] = useState([]);
  const [filteredCocktails, setFilteredCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail"
        );
        setCocktails(response.data.drinks || []);
        setFilteredCocktails(response.data.drinks || []);
      } catch (err) {
        setError("Error fetching cocktail data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
        );
        setCategories(response.data.drinks || []);
      } catch (err) {
        console.error("Error fetching categories.");
      }
    };

    fetchCocktails();
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);
    const results = cocktails.filter((cocktail) =>
      cocktail.strDrink.toLowerCase().includes(searchQuery)
    );
    setFilteredCocktails(results);
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
        );
        setCocktails(response.data.drinks || []);
        setFilteredCocktails(response.data.drinks || []);
      } catch (err) {
        setError("Error fetching cocktails by category.");
      } finally {
        setLoading(false);
      }
    } else {
      setFilteredCocktails(cocktails);
    }
  };

  const handleCardClick = (cocktailId) => {
    window.location.href = `https://www.thecocktaildb.com/drink/${cocktailId}`;
  };

  return (
    <div className="cocktails-container">
      <h2>Cocktails</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search cocktails..."
          value={query}
          onChange={handleSearch}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-filter"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.strCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
      </div>

      {/* Display Cocktails */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredCocktails.length > 0 ? (
        <div className="cocktails-grid">
          {filteredCocktails.map((cocktail) => (
            <div
              className="cocktail-card"
              key={cocktail.idDrink}
              onClick={() => handleCardClick(cocktail.idDrink)}
            >
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="cocktail-image"
              />
              <h3>{cocktail.strDrink}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-results">No cocktails found.</p>
      )}
    </div>
  );
}

export default Cocktails;
