import React, { useState, useEffect } from "react";

function Card({ food }) {
  const [foodDetail, setFoodDetail] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${food.idMeal}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFoodDetail(data.meals[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFood();
  }, [food.idMeal]);

  // Fonction pour tronquer le texte
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + " ...";
    }
    return text;
  };

  return (
    <div className="card">
      <div className="card-body">
        {foodDetail && (
          <>
            <h2>{foodDetail.strMeal}</h2>
            <img
              src={foodDetail.strMealThumb}
              alt=""
              width={250}
              height={200}
            />
            <p>Origine: {foodDetail.strArea}</p>
            <p>Catégorie: {foodDetail.strCategory}</p>
            <p>
              Descriptif: {truncateText(foodDetail.strInstructions, 150)}
            </p>{" "}
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
