/////////////////////////////////// LIST SECTION TEMPLATE //////////////////////////////////////////////


{/* <h1>List of Breweries</h1>
<header class="search-bar">
  <form id="search-breweries-form" autocomplete="off">
    <label for="search-breweries"><h2>Search breweries:</h2></label>
    <input id="search-breweries" name="search-breweries" type="text" />
  </form>
</header>

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
    </article> */}


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
const breweriesListSection = document.querySelector('.breweries-list-section')
const breweriesArticle = document.createElement('article')
const breweriesList = document.createElement('ul')
breweriesList.setAttribute('class', '.breweries-list')

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
    breweriesArticle.innerHTML = ''
    
    for(const brewery of state.breweries){
        const breweriesLiEl = document.createElement('li')
        
        const breweryHeader = document.createElement('h2')
        breweryHeader.textContent = brewery.name

        const breweryType = document.createElement('div')
        breweryType.setAttribute('class', 'type')
        breweryType.textContent = brewery.brewery_type

        const breweryAddress = document.createElement('section')
        breweryAddress.setAttribute('class', '.address')

        const breweryAddressH3 = document.createElement('h3')
        breweryAddressH3.textContent = 'Address:'
        const breweryAddressStreet = document.createElement('p')
        breweryAddressStreet.textContent = brewery.street
        const breweryAddressCity = document.createElement('p')
        breweryAddressCity.textContent = `${brewery.city}, ${brewery.postal_code}`
        breweryAddress.append(breweryAddressH3, breweryAddressStreet, breweryAddressCity)

        const breweryPhone = document.createElement('section')
        breweryPhone.setAttribute('class','.phone')

        const breweryPhoneH3 = document.createElement('h3')
        breweryPhoneH3.textContent= 'Phone:'
        const breweryPhoneNumber = document.createElement('p')
        breweryPhoneNumber.textContent = brewery.phone
        breweryPhone.append(breweryPhoneH3, breweryPhoneNumber)

        const breweryWebsite = document.createAttribute('section')
        breweryWebsite.setAttribute('class','link')
        
        const breweryWebsiteLink = document.createAttribute('a')
        breweryWebsiteLink.textContent = 'Visit Website'
        breweryWebsiteLink.setAttribute('href', `${brewery.website_url}`)
        breweryWebsiteLink.setAttribute('target', 'blank')
        breweryWebsite.append(breweryWebsiteLink)

        breweriesLiEl.append(breweryHeader,breweryType,breweryAddress,breweryPhone,breweryWebsite)
        breweriesList.append(breweriesLiEl)
        breweriesArticle.append(breweriesList)
        breweriesListSection.append(breweriesArticle)
    }

}
// renders the cities of every state
function renderCityList() {

}