// State will hold only the list of the breweries displayed on the breweries-list-section. At first,
// the breweries-list section will be blank. After the user gives us a state name, we render the 
// list with 10 breweries of the state the user gave us. When the user adds filters, we apply the
// changes in real time re-rendering the list and displaying breweries based on those filters. 
// So we just update the state and rerender.
const state = {
    breweries:[],
    typesOfBrewery: ['micro', 'regional', 'brewpub'],
    selectedCities: [],
    selectedBreweryType: []
}
const main = document.querySelector('main');
const breweriesArticle = document.createElement('article')
const breweriesList = document.createElement('ul')
breweriesList.setAttribute('class', '.breweries-list')

const stateForm = document.querySelector('#select-state-form')
const stateInput = document.querySelector('#select-state')
stateInput.setAttribute('placeholder', 'enter a state')

const cityForm = document.querySelector('#filter-by-city-form')

const filterByTypeSelect = document.querySelector('#filter-by-type')

// this function captures the breweries based only on the state with url changes
function getBreweries(){
    return fetch(`https://api.openbrewerydb.org/breweries?per_page=50&by_state=${stateInput.value}`)
    .then(resp => resp.json()
    )
}

//Listens to the brewery type selection
function listenToFilterByType(){
  filterByTypeSelect.addEventListener('change', function(){
    state.selectedBreweryType = []
    state.selectedBreweryType.push(filterByTypeSelect.value)
    renderBreweriesList()
    renderCityList()
  })
}

//Returns a list of filtered breweries based on the filters
function getBreweriesToDisplay(){
  let breweriesToDisplay = state.breweries
  if(state.selectedBreweryType.length !== 0){
    breweriesToDisplay = breweriesToDisplay.filter(brewery =>
      state.selectedBreweryType.includes(brewery.brewery_type)
    )
    if(state.selectedCities.length !== 0){
      breweriesToDisplay = breweriesToDisplay.filter(brewery =>
        state.selectedCities.includes(brewery.city)
      )
    }
  }
    breweriesToDisplay = breweriesToDisplay.slice(0,10)
    return breweriesToDisplay

}

//Listens to the city checkbox filter
function listenToFilterByCity(){
  state.selectedCities = []
    for(const city of cityForm){
      if (city.checked) state.selectedCities.push(city.value)
    }
}

//Listens to the input that holds the name of a state
function listenToStateFormSubmition(){
  
  stateForm.addEventListener('submit', event => 
  {
    event.preventDefault()
    getBreweries().then(breweries => state.breweries = breweries)
    render()
  })
}

// renders the breweries-list-section inside the list-section based on state.breweries
function renderBreweriesList() {
  breweriesList.innerHTML = ''
    
    for(const brewery of getBreweriesToDisplay()){
       
        const breweriesLiEl = document.createElement('li')
        
        const breweryHeader = document.createElement('h2')
        breweryHeader.textContent = brewery.name

        const breweryType = document.createElement('div')
        breweryType.setAttribute('class', 'type')
        breweryType.textContent = brewery.brewery_type

        const breweryAddress = document.createElement('section')
        breweryAddress.setAttribute('class', 'address')

        const breweryAddressH3 = document.createElement('h3')
        breweryAddressH3.textContent = 'Address:'
        const breweryAddressStreet = document.createElement('p')
        breweryAddressStreet.textContent = brewery.street
        const breweryAddressCity = document.createElement('p')
        breweryAddressCity.textContent = `${brewery.city}, ${brewery.postal_code}`
        breweryAddress.append(breweryAddressH3, breweryAddressStreet, breweryAddressCity)

        const breweryPhone = document.createElement('section')
        breweryPhone.setAttribute('class','phone')

        const breweryPhoneH3 = document.createElement('h3')
        breweryPhoneH3.textContent= 'Phone:'
        const breweryPhoneNumber = document.createElement('p')
        breweryPhoneNumber.textContent = brewery.phone
        breweryPhone.append(breweryPhoneH3, breweryPhoneNumber)

        const breweryWebsite = document.createElement('section')
        breweryWebsite.setAttribute('class','link')
        
        const breweryWebsiteLink = document.createElement('a')
        breweryWebsiteLink.textContent = 'Visit Website'
        breweryWebsiteLink.setAttribute('href', `${brewery.website_url}`)
        breweryWebsiteLink.setAttribute('target', 'blank')
        breweryWebsite.append(breweryWebsiteLink)

        breweriesLiEl.append(breweryHeader,breweryType,breweryAddress,breweryPhone,breweryWebsite)
        breweriesList.append(breweriesLiEl)
        breweriesArticle.append(breweriesList)
        main.append(breweriesArticle)
    }
}

//returns all the cities of the state
function getCitiesOfSelectedState(){
  let cities = []
  for(const brewery of state.breweries){

    if(!cities.includes(brewery.city)){
      cities.push(brewery.city)
    }
  }
  return cities
}

// renders the cities of every state
function renderCityList() {
  cityForm.innerHTML = ''
  
  for(const city of getCitiesOfSelectedState()){
    const cityCheckboxInput = document.createElement('input')
    cityCheckboxInput.setAttribute('type', 'checkbox')
    cityCheckboxInput.setAttribute('name', city)
    cityCheckboxInput.setAttribute('value', city)
    cityCheckboxInput.setAttribute('class', 'city-checkbox')
    cityCheckboxInput.setAttribute('id', city)

    const cityCheckboxLabel = document.createElement('label')
    cityCheckboxLabel.setAttribute('for', city)
    cityCheckboxLabel.textContent = city

    cityForm.append(cityCheckboxInput,cityCheckboxLabel)

    cityCheckboxInput.addEventListener('change', function(){
      listenToFilterByCity()
      renderBreweriesList()
    })
  }
}

function render(){
  renderBreweriesList()
  renderCityList()
}

listenToFilterByType()
listenToFilterByCity()
listenToStateFormSubmition()