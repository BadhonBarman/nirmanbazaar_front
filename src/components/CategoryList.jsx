import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CategoryList() {
  const base_domain = import.meta.env.VITE_APP_SOURCE_DOMAIN;
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubCategory, setOpenSubCategory] = useState(null);

  useEffect(() => {
    const categoryData = async () => {
      try {
        const response = await axios.get(`${base_domain}/categories/`);
        setCategory(response.data.categories);
        setSubCategory(response.data.sub_categories);
        setSubSubCategory(response.data.sub_sub_categories);
      } catch (error) {
        console.error(error);
      }
    };

    categoryData();
  }, [base_domain]);

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
    setOpenSubCategory(null);
  };

  const toggleSubCategory = (id) => {
    setOpenSubCategory(openSubCategory === id ? null : id);
  };

  return (
    <div className="w-full p-4">
      <ul className="space-y-2">
        {category.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full flex justify-between items-center bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
            >
              <span>{cat.title}</span>
              <span>{openCategory === cat.id ? '-' : '+'}</span>
            </button>

            {/* Subcategories */}
            {openCategory === cat.id && (
              <ul className="ml-4 mt-2 space-y-1">
                {subCategory
                  .filter((sub) => sub.category.id === cat.id)
                  .map((sub) => (
                    <li key={sub.id}>
                      <button
                        onClick={() => toggleSubCategory(sub.id)}
                        className="w-full flex justify-between items-center bg-gray-50 px-3 py-2 rounded hover:bg-gray-100"
                      >
                        <span>{sub.title}</span>
                        <span>{openSubCategory === sub.id ? '-' : '+'}</span>
                      </button>

                      {/* Sub-subcategories */}
                      {openSubCategory === sub.id && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {subSubCategory
                            .filter((ssub) => ssub.sub_category.id === sub.id)
                            .map((ssub) => (
                              <li key={ssub.id}>
                                <Link
                                  to={`/category/${cat.slug}/${sub.slug}/${ssub.slug}`}
                                  className="block px-4 py-1 hover:bg-gray-200 rounded"
                                >
                                  {ssub.title}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
