import React, { useState } from 'react';
import axios from 'axios';

const FoodDetail = ({ food, onUpdate }) => {
    const [type, setType] = useState(food?.type || []);
    const [ingredients, setIngredients] = useState(food?.ingredients || []);
    const [newType, setNewType] = useState('');
    const [newIngredient, setNewIngredient] = useState('');

    // Add new type
    const addType = () => {
        if (newType.trim() !== '') {
            setType([...type, newType.trim()]);
            setNewType('');
        }
    };

    // Add new ingredient
    const addIngredient = () => {
        if (newIngredient.trim() !== '') {
            setIngredients([...ingredients, newIngredient.trim()]);
            setNewIngredient('');
        }
    };

    // Delete a specific type
    const deleteType = (typeToDelete) => {
        setType(type.filter((t) => t !== typeToDelete));
    };

    // Delete a specific ingredient
    const deleteIngredient = (ingredientToDelete) => {
        setIngredients(ingredients.filter((ing) => ing !== ingredientToDelete));
    };

    const saveFoodDetails = async () => {
        try {
            // Update type
            const responseType = await axios.post(
                process.env.NEXT_PUBLIC_SERVER_URL + '/api/food/updateType',
                { id: food.id, type }
            );

            // Update ingredients
            const responseIngredients = await axios.post(
                process.env.NEXT_PUBLIC_SERVER_URL + '/api/food/updateIngredients',
                { id: food.id, ingredients }
            );

            // Call onUpdate with the updated food object
            if (onUpdate) {
                onUpdate({
                    ...food,
                    type: responseType.data.food.type,
                    ingredients: responseIngredients.data.food.ingredients,
                });
            }

            alert('Food details updated successfully!');
        } catch (error) {
            console.error('Error updating food details:', error);
            alert('Failed to update food details.');
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Edit Food Details: {food.name}</h2>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Type</h3>
                <ul className="list-disc pl-5">
                    {type.map((t, index) => (
                        <li key={index} className="mb-1 flex items-center justify-between">
                            {t}
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                onClick={() => deleteType(t)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder="Add new type"
                    className="border px-2 py-1 rounded mr-2"
                />
                <button
                    onClick={addType}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                >
                    Add Type
                </button>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-semibold">Ingredients</h3>
                <ul className="list-disc pl-5">
                    {ingredients.map((ing, index) => (
                        <li key={index} className="mb-1 flex items-center justify-between">
                            {ing}
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                onClick={() => deleteIngredient(ing)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add new ingredient"
                    className="border px-2 py-1 rounded mr-2"
                />
                <button
                    onClick={addIngredient}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                >
                    Add Ingredient
                </button>
            </div>

            <button
                onClick={saveFoodDetails}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
                Save Changes
            </button>
        </div>
    );
};

export default FoodDetail;
