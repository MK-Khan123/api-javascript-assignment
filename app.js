fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c')
    .then(res => res.json())
    .then(data => displayMealItems(data))
    .catch(error => console.log(error));

const displayMealItems = mealItems => {
    const mealItemsDiv = document.getElementById('meal-items');
    const mealItemsArray = mealItems.meals;
    
    for (let i = 0; i < mealItemsArray.length; i++) {
        const recipe = mealItemsArray[i];
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';

        const recipeInfo = `
        <div class = "recipe-picture">    
        <img src="${recipe.strMealThumb}">
        </div>
        <h4 class="recipe-name">${recipe.strMeal}</h4>
        `;
        recipeDiv.innerHTML = recipeInfo;
        mealItemsDiv.appendChild(recipeDiv);
    }
}
