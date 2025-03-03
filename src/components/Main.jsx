import { useState, useEffect, useRef } from 'react';
import ClaudeRecipe from './ClaudeRecipe';
import IngredientsList from './IngredientsList';
import { getRecipeFromMistral } from "../../ai.js";

export default function Main() {

    const [isLoading, setIsLoading] = useState(false)
    const [ingredients, setIngredients] = useState([]);
    const [recipe, setRecipe] = useState("");
    const recipeSection = useRef(null)

    useEffect(() => {
        if (recipe != "" && recipeSection.current != null){
            recipeSection.current.scrollIntoView({behavior: "smooth"})
        }
    }, [recipe])

    const ingredientListItems = ingredients.map((ingredient, index) => (
        <li>{ingredient}</li>
    ));

    function addNewIngredient(event) {
        event.preventDefault();
        const newIngredient = event.target.ingredient.value;
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
        event.target.reset(); 
    }

    async function getRecipe() {
        setIsLoading(true)
        const recipeIdea = await getRecipeFromMistral(ingredients);
        setRecipe(recipeIdea);
        setIsLoading(false);
    }

    function reset() {
        setIngredients([]);
        setRecipe("");
    }

    function deleteListItem(ingredient) {
        setIngredients(prevIngredients => prevIngredients.filter((prevIngredient) => prevIngredient != ingredient)) 
    }

    return (
        <main>
            <form onSubmit={addNewIngredient} className="add-ingredient-form">
                <input
                    className="main-input"
                    type="text"
                    aria-label="Add ingredient"
                    placeholder="Give 4 ingredients to get a recipe (e.g oregano)"
                    name="ingredient"
                />
                <button className="main-button">Add ingredient</button>
                {recipe && <button className="reset-button" onClick={reset}>Reset</button>}
            </form>
            
            
            {ingredients.length > 0 ? (
                <IngredientsList ref={recipeSection} isLoading={isLoading} deleteListItem={deleteListItem} ingredients={ingredients} showRecipe={getRecipe} />
            ) : null}

            {recipe ? <ClaudeRecipe recipe={recipe} /> : null}
        </main>
    );
}
