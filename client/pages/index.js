import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure axios is imported

function Index() {
    const [foods, setFoods] = useState([]); // Initialize state with an empty array

    const fetchAllFoods = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + 'api/food/getAllFoods');
            setFoods(response.data);
        } catch (error) {
            console.error('Error fetching foods', error);
        }
    };

    useEffect(() => {
        fetchAllFoods(); // Call the function when the component mounts
    }, []); // Empty dependency array ensures this runs only once

    return (
        <div>
            <h1>Hello World</h1>
            <ul>
                {foods.map((food, index) => (
                    <li key={index}>{food.name}</li> // Assuming each food object has a `name` property
                ))}
            </ul>
        </div>
    );
}

export default Index;
