//This function initiates the search of meal items after pressing 'Search' button in the input field.
const fetchingMealData = () => {
    const mealItemsDiv = document.getElementById('meal-items');
    const mealIngredientsDiv = document.getElementById('meal-ingredients');
    const errorMessageDiv = document.getElementById('error-message');
    
    mealItemsDiv.innerHTML = '';
    mealIngredientsDiv.innerHTML = '';
    errorMessageDiv.innerHTML = '';
    
    const inputText = document.getElementById('input-text').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealItems(data))
        .catch(error => displayErrorMessage("Sorry, the meal you searched for isn't available!")); //An error alert is provided for unusual input
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
        `;
    const ul = document.createElement('ul');
    //According to the instructions provided by the support instructor, maximum number of ingredients shown dynamically will be 10 (if the original number (data fetched from API) of ingredients is 10 or more). It will be less than 10, if the number of ingredients originally (data fetched from API) is 10 or less.
    for (let i = 1; i <= 10; i++) {
        const li = document.createElement('li');
        const ingredients = recipe[`strIngredient${i}`];
        if (ingredients === '' || null || undefined) {
            break;
        }
        li.innerText = ingredients;
        ul.appendChild(li);
    }
    mealIngredientsDiv.appendChild(ul);
}


//This function will show an error message if any unusual input or anomalies takes place
const displayErrorMessage = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}
