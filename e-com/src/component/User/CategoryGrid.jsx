
import React from "react";

const CategoryGrid = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
      {categories.map((category) => (
        <div
          key={category._id}
          className="p-4 border rounded shadow hover:shadow-lg transition"
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-32 object-cover rounded"
          />
          <h3 className="mt-2 text-center text-lg font-semibold">
            {category.name}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
