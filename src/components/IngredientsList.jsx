import { useState } from "react"

export default function IngredientsList(props) {
    

    const ingredientListItems = props.ingredients.map((ingredient, index) => {
        return <div key={`${ingredient} ${index}`} className="list-item">
            <li>{ingredient}</li>
            {props.showButton ? <button onClick={() => props.deleteListItem(ingredient)} className="delete-list-item">&#x2715;</button> : null}
            </div>
    })

    return (
    <section className="main-section">
            <h2 className="ingredients-on-hand">Ingredients on hand: </h2>
            <ul className="ingredients-list">
                {ingredientListItems}
            </ul> 

             {props.ingredients.length > 3 ? <div className="get-recipe-container">
                <div ref={props.ref} className="get-recipe-left-section">
                    <p className="ready-for-recipe">Ready for a recipe?</p>
                    <p className="generate-recipe">Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={props.showRecipe} className="get-recipe-button">{props.isLoading ? "Loading..." : "Get a recipe"}</button>
            </div> : null}
            </section>
    )
}