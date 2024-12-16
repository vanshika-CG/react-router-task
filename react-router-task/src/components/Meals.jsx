import React, { useEffect, useState } from "react";
import "./Meals.css"; // Link to the CSS file

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }
        const data = await response.json();
        setMeals(data.meals || []);
        setFilteredMeals(data.meals || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Handle search bar changes
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(query)
    );
    setFilteredMeals(filtered);
  };

  const handleCardClick = (mealId) => {
    window.location.href = `https://www.themealdb.com/meal/${mealId}`; // Redirect to meal details
  };

  return (
    <div>
      <h1>Meals</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search meals..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="meals-container">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div
              className="meal-card"
              key={meal.idMeal}
              onClick={() => handleCardClick(meal.idMeal)}
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <h2>{meal.strMeal}</h2>
              <p>Category: {meal.strCategory}</p>
              <p>Area: {meal.strArea}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No meals found.</p>
        )}
      </div>
    </div>
  );
};

export default Meals;
