import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react/cjs/react.production.min";
import "./star-rating.css";

const StarRating = ({ onChange, rating, elementId }) => {
  //const [listFavoritesStar, setListFavoritesStar] = useState(listFavorites);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => onChange(ratingValue, elementId)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>the raiting is {rating}</p>
    </div>
  );
};

export default StarRating;
