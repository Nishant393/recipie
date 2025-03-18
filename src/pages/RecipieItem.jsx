import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import Tabs from '@mui/joy/Tabs'
import TabList from '@mui/joy/TabList'
import Tab from '@mui/joy/Tab'
import { TabPanel } from '@mui/joy'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const RecipeItem = () => {
  const [foods, setFoods] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  const fetchRecipes = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=9e3e4e5fb1ef404495506cfc8ae5b32a`
      )
      setFoods(response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching recipes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
          <p className="text-lg font-medium text-gray-700">Loading recipe...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col p-3 md:p-5">
      <div className="flex w-full flex-col md:h-4/5 md:flex-row">
        {/* Image Section */}
        <div className="w-full p-2 md:w-1/2 md:p-3">
          <div className="w-full rounded-sm">
            {foods.image && (
              <img
                className="h-auto w-full rounded-xl object-cover md:max-h-96"
                src={foods.image}
                alt={foods.title || "Recipe image"}
              />
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {
              foods.vegetarian && (
                <div className="rounded-xl border-2 border-slate-300 px-2 py-1 text-sm text-slate-900"> vegetarian</div>
              )
            }
            {
              foods.vegan && (
                <div className="rounded-xl border-2 border-slate-300 px-2 py-1 text-sm text-slate-900"> vegan</div>
              )
            }
            {
              foods.glutenFree && (
                <div className="rounded-xl border-2 border-slate-300 px-2 py-1 text-sm text-slate-900"> gluten Free</div>
              )
            }
            {
              foods.dairyFree && (
                <div className="rounded-xl border-2 border-slate-300 px-2 py-1 text-sm text-slate-900"> dairy Free</div>
              )
            }
            {
              foods.veryHealthy && (
                <div className="rounded-xl border-2 border-slate-300 px-2 py-1 text-sm text-slate-900"> very Healthy</div>
              )
            }
            {
              foods.cheap && (
                <div className="rounded-xl border-2 border-slate-300 px-2 py-1 text-sm text-slate-900">  cheap</div>
              )
            }
          </div>
        </div>

        <div className="w-full p-2 md:w-1/2 md:p-5">
          <h2 className="text-xl font-semibold md:text-2xl">{foods.title}</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {foods.readyInMinutes && (
              <div className="rounded-xl border-2 border-slate-300 px-2 py-1 text-sm text-slate-900">
                {foods.readyInMinutes} minutes
              </div>
            )}
            {foods.servings && (
              <div className="rounded-xl border-2 border-slate-300 px-2 py-1 text-sm text-slate-900">
                {foods.servings} servings
              </div>
            )}
          </div>

          <button className="mt-4 flex items-center gap-2 rounded-xl border-2 border-slate-300 px-3 py-2 text-slate-900 transition-colors hover:bg-slate-100">
            <Heart size={18} /> Save to Favorites
          </button>

          {foods.summary && (
            <div className="mt-4 text-slate-700">
              <p
                className="line-clamp-6 md:line-clamp-none"
                dangerouslySetInnerHTML={{ __html: foods.summary }}
              ></p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-6 w-full p-2 md:p-3">
        <Tabs className="w-full" aria-label="Recipe details" defaultValue={0}>
          <TabList className="w-full">
            <Tab className="w-1/2">Ingredients</Tab>
            <Tab className="w-1/2">Instructions</Tab>
          </TabList>

          <div className="mt-3 border-2 p-4">
            <TabPanel value={0}>
              <div>
                <h1 className="text-xl font-semibold">Ingredients</h1>
                <ul className="mt-4 list-disc pl-5">
                  {foods.extendedIngredients?.length > 0 ? (
                    foods.extendedIngredients.map((ingredient) => (
                      <li key={ingredient.id} className="mb-2">
                        {ingredient.amount} {ingredient.unit} {ingredient.name}
                      </li>
                    ))
                  ) : (
                    <li>No ingredients available</li>
                  )}
                </ul>
              </div>
            </TabPanel>
            <TabPanel value={1}>
              <h1 className="text-xl font-semibold">Instructions</h1>
              {foods.instructions ? (
                <div
                  className="mt-4 prose"
                  dangerouslySetInnerHTML={{ __html: foods.instructions }}
                ></div>
              ) : (
                <p className="mt-4">No instructions available</p>
              )}
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default RecipeItem