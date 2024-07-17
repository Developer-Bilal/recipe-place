const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = "";

const API_ID = "5012c30a";
const API_Key = "863b70bdf9a86378f83b7fa5952cf78c";

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${API_ID}&app_key=${API_Key}&to=20`;

    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(response)
}

function generateHTML(results){
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML += 
            `
                <div class="item">
                    <img src="${result.recipe.image}" alt="">
                    <div class="flex-container">
                        <h1 class="title">${result.recipe.label}</h1>
                        <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
                    </div>
                    <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data">Diet Label: ${result.recipe.dietLabels}</p>
                    <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
                </div>
            `
    })
    searchResultDiv.innerHTML = generatedHTML;
}