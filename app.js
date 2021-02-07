//This function initiates the search of meal items after pressing 'Search' button in the input field.
const fetchingMealData = () => {
    const mealItemsDiv = document.getElementById('meal-items');
    const mealIngredientsDiv = document.getElementById('meal-ingredients');
    mealItemsDiv.innerHTML = '';
    mealIngredientsDiv.innerHTML = '';
    const inputText = document.getElementById('input-text').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealItems(data))
        .catch(error => alert("Sorry, the meal you searched for isn't available in our menu")); //An error alert is provided for unusual input
}


//This function displays meal items (if there is any) according to the search result.
const displayMealItems = mealItems => {
    const mealItemsDiv = document.getElementById('meal-items');
    const mealItemsArray = mealItems.meals;

    mealItemsArray.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';

        const recipeInfo = `
        <div onclick = "displayMealItemsDetails(${recipe.idMeal})" class = "recipe-picture">    
        <img src="${recipe.strMealThumb}">
        </div>
        <h4 onclick = "displayMealItemsDetails(${recipe.idMeal})" class = "recipe-name">${recipe.strMeal}</h4>
        `;
        recipeDiv.innerHTML = recipeInfo;
        mealItemsDiv.appendChild(recipeDiv);
    });
}


//This function fetches meal ingredients information whenever any meal item is clicked.
const displayMealItemsDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => renderMealItemsIngredients(data));
}


//This function helps to displays meal items along with its ingredients' information in the browser.
const renderMealItemsIngredients = mealItem => {
    const mealItemArray = mealItem.meals;
    const recipe = mealItemArray[0];
    const mealIngredientsDiv = document.getElementById('meal-ingredients');
    mealIngredientsDiv.innerHTML = `
        <img src = "${recipe.strMealThumb}">
        <h1>${recipe.strMeal}</h1>
        <h4>Ingredients</h4>
        <ul>
            <li>${recipe.strIngredient1}</li>
            <li>${recipe.strIngredient2}</li>
            <li>${recipe.strIngredient3}</li>
            <li>${recipe.strIngredient4}</li>
            <li>${recipe.strIngredient5}</li>
            <li>${recipe.strIngredient6}</li>
            <li>${recipe.strIngredient7}</li>
            <li>${recipe.strIngredient8}</li>
            <li>${recipe.strIngredient9}</li>
            <li>${recipe.strIngredient10}</li>
        </ul>
    `;
}
