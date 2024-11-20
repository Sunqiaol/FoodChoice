import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodDetail from '../components/foodDetail';

function Index() {
    const [foods, setFoods] = useState([]); // Initialize state with an empty array
    const [selectedFood, setSelectedFood] = useState(null); // State to track the selected food for popup

    const fetchAllFoods = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/api/food/getAllFoods');
            setFoods(response.data);
        } catch (error) {
            console.error('Error fetching foods', error);
        }
    };

    useEffect(() => {
        fetchAllFoods(); // Call the function when the component mounts
    }, []); // Empty dependency array ensures this runs only once

    const closePopup = () => {
        setSelectedFood(null); // Close the popup
    };

    // Update a specific food item in the `foods` state
    const updateFoodInList = (updatedFood) => {
        setFoods((prevFoods) =>
            prevFoods.map((food) => (food.id === updatedFood.id ? updatedFood : food))
        );
    };

    return (
        <div>
            <div className="nav-bar flex bg-blue-500 h-12 items-center justify-between px-5">
                <button className="bg-white rounded-2xl px-4 py-1 text-blue-500">
                    Home
                </button>
                <div className="search">
                    <input placeholder="菜单" className="rounded-2xl px-4 py-1" />
                    <button></button>
                </div>
            </div>

            <ul>
                {foods.map((food, index) => (
                    <li key={index} className="py-2">
                        {food.name}{' '}
                        <button
                            className="bg-blue-500 text-white px-4 py-1 rounded"
                            onClick={() => setSelectedFood(food)} // Open the popup with the selected food
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>

            {/* Popup */}
            {selectedFood && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div
                        className="popup-content"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
                    >
                        {/* Pass the `updateFoodInList` function to FoodDetail */}
                        <FoodDetail food={selectedFood} onUpdate={updateFoodInList} />
                        <button
                            className="close-popup bg-red-500 text-white px-4 py-2 rounded mt-4"
                            onClick={closePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Index;
