import { AspectRatio, Card, Skeleton, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import FoodCard from '../component/FoodCard';

const Like = () => {

      const [foods, setFoods] = useState([]);
      const [likedItems, setLikedItems] = useState({});
      const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const data = localStorage.getItem("likes") || "[]";
    const likedArray = JSON.parse(data);
    setFoods(likedArray)
    const likedMap = likedArray.reduce((acc, id) => {
        acc[id] = true;
        return acc;
    }, {});
    console.log(likedArray)
    setLikedItems(likedMap);
}, []);


  return (
    <div className='p-4 w-full'>
      <div className='my-6' >
        <h1 className='text-3xl font-extrabold' >Your Favorite Recipes</h1>
      </div>
      <div className=' flex max-w-6xl mx-auto justify-center'>
        {
          foods.length==0 ? (
            <div className='w-full ' >
              <div className='flex flex-col border p-4 gap-4' >

                <h1 className='text-center text-3xl font-semibold' >No favorites yet</h1>
                <p className='text-center text-slate-500' >Start adding recipes to your favorites to see them here.</p>
                <Link
                    to={`/`}
                    className="bg-green-500 align-middle hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex w-48 items-center m-auto space-x-2"
                >
                    <span className='text-center' >Search for recipes</span>
                </Link>
                    </div>
                </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' >
            {foods.map((e)=>(

                <FoodCard id={e} key={e} />
            ))}
          </div>
        )

        }
      </div>
    </div>
  )
}

export default Like