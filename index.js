/////////////////////////////////// LIST SECTION TEMPLATE //////////////////////////////////////////////


{/* <h1>List of Breweries</h1>
<header class="search-bar">
  <form id="search-breweries-form" autocomplete="off">
    <label for="search-breweries"><h2>Search breweries:</h2></label>
    <input id="search-breweries" name="search-breweries" type="text" />
  </form>
</header>

<section class="breweries-list-section">
    <article>
    <ul class="breweries-list">
        <li>
        <h2>Snow Belt Brew</h2>
        <div class="type">micro</div>
        <section class="address">
            <h3>Address:</h3>
            <p>9511 Kile Rd</p>
            <p><strong>Chardon, 44024</strong></p>
        </section>
        <section class="phone">
            <h3>Phone:</h3>
            <p>N/A</p>
        </section>
        <section class="link">
            <a href="null" target="_blank">Visit Website</a>
        </section>
        </li>
        // More list elements
    </ul>
    </article>
</section> */}


/////////////////////////////// FILTER SECTION TEMPLATE /////////////////////////////////////////


{/* <aside class="filters-section">
  <h2>Filter By:</h2>
  <form id="filter-by-type-form" autocompete="off">
    <label for="filter-by-type"><h3>Type of Brewery</h3></label>
    <select name="filter-by-type" id="filter-by-type">
      <option value="">Select a type...</option>
      <option value="micro">Micro</option>
      <option value="regional">Regional</option>
      <option value="brewpub">Brewpub</option>
    </select>
  </form>
  
  <div class="filter-by-city-heading">
    <h3>Cities</h3>
    <button class="clear-all-btn">clear all</button>
  </div>
  <form id="filter-by-city-form">
    <input type="checkbox" name="chardon" value="chardon" /><label for="chardon"
      >Chardon</label
    ><input type="checkbox" name="cincinnati" value="cincinnati" /><label
      for="cincinnati"
      >Cincinnati</label
    >
    // More checkboxes
  </form>
</aside> */}


//////////////////////////////// MAIN SECTION TEMPLATE ////////////////////////////////////////////


{/* <main>
  <aside class="filters-section">
    // Check filter-section.html
  </aside>
  // Check list-section.html
</main> */}

// State will hold only the list of the breweries displayed on the breweries-list-section. At first,
// the breweries-list section will be blank. After the user gives us a state name, we render the 
// list with 10 breweries of the state the user gave us. When the user adds filters, we apply the
// changes in real time re-rendering the list and displaying breweries based on those filters. 
// So we just update the state and rerender.
const state = {
    breweries:[]
}

const stateForm = document.getElementById('select-state-form')
const stateInput = document.getElementById('select-state')
stateInput.setAttribute('placeholder', 'enter a state')
stateForm.addEventListener('submit', event => event.preventDefault())

// this function captures the breweries based only on the state with url changes
function getBreweries(){
    return fetch(`https://api.openbrewerydb.org/breweries?per_page=10?by_state=${stateInput.value}`)
    .then(resp => resp.json()
    )
}
// If the user uses different filters we will have two options:
//      1.Create different getBreweries() functions changing the urls for each type of filter
//      2.Create different functions using getBreweries() functions and using filter() function for each type of filter

getBreweries().then(breweries => state.breweries = breweries)

// renders the breweries-list-section inside the list-section based on state.breweries
function renderBreweriesList() {

}
// renders the cities of every state
function renderCityList() {

}