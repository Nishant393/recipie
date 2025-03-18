import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ChefHat, Heart } from 'lucide-react';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [likedItems, setLikedItems] = useState({});

    useEffect(() => {
        const fetchRecipes = async () => {
            if (!query) return;

            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/complexSearch?apiKey=9e3e4e5fb1ef404495506cfc8ae5b32a&query=${encodeURIComponent(query)}&number=12`
                );
                setRecipes(response.data.results);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching search results:', err);
                setError('Failed to load recipes. Please try again.');
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [query]);

    useEffect(() => {
        const data = localStorage.getItem("likes") || "[]";
        const likedArray = JSON.parse(data);
        const likedMap = likedArray.reduce((acc, id) => {
            acc[id] = true;
            return acc;
        }, {});
        setLikedItems(likedMap);
    }, []);

    const toggleLike = (id) => {
        setLikedItems((prev) => {
            const newLikedItems = { ...prev };
            if (newLikedItems[id]) {
                delete newLikedItems[id]; // Unlike
            } else {
                newLikedItems[id] = true; // Like
            }
            localStorage.setItem("likes", JSON.stringify(Object.keys(newLikedItems)));
            return newLikedItems;
        });
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-4">Searching for "{query}"...</h1>
                <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">Search Results for {query}</h1>

            {recipes.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-lg text-gray-600">No recipes found for "{query}". Try a different search term.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recipes.map((food) => (
                        <div
                            key={food.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-green-200 transform transition-transform duration-300 hover:scale-105 cursor-pointer "
                        >
                            <div>
                                <img src={food.image} alt={food.title} />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-xl font-semibold text-green-700">{food.title}</h2>
                                    <button
                                        onClick={() => toggleLike(food.id)}
                                        className="focus:outline-none"
                                        aria-label="Like recipe"
                                    >
                                        <Heart
                                            className={`h-6 w-6 transition-colors duration-300 ${likedItems[food.id] ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                                        />
                                    </button>
                                </div>
                                <div className="container text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: food.summary }}></div>
                                <Link
                                    to={`/r/${food.id}`}
                                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center space-x-2"
                                >
                                    <ChefHat className="h-5 w-5" />
                                    <span>View Recipe</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;