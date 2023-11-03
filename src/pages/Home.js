import React, { useState, useEffect } from "react";
import Card from "../components/Card";

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [rangeValue, setRangeValue] = useState("6");
  const [sortValue, setSortValue] = useState("");
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + searchValue
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFoods(data.meals);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFoods();
  }, [searchValue]);

  return (
    <>
      <header>
        <h1>Nourriture</h1>
        <input
          type="text"
          placeholder="Taper votre aliment (anglais)"
          alt=""
          onInput={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <input
          type="range"
          min={0}
          max={50}
          defaultValue={6}
          onInput={(e) => setRangeValue(e.target.value)}
        />
        <span> {rangeValue} </span>
        <div>
          <div>
            <button onClick={() => setSortValue("alphabétique")}>
              Tri Alphabétique
            </button>
          </div>
        </div>
      </header>
      <main>
        {foods && foods.length > 0 ? (
          foods
            .sort((a, b) => {
              if (sortValue === "alphabétique") {
                return a.strMeal.localeCompare(b.strMeal);
              }
              return 0;
            })
            .slice(0, rangeValue)
            .map((food, index) => <Card food={food} key={index} />)
        ) : (
          <p>Aucun résultat trouvé</p>
        )}
      </main>
    </>
  );
}

export default Home;
