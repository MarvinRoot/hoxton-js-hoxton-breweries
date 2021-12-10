const state = {
    breweries:[],
    typesOfBrewery: ['micro', 'regional', 'brewpub'],
    selectedCities: [],
    selectedBreweryType: [],
    search: ''
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

const searchForm = document.querySelector('#search-breweries-form')

//Captures the breweries based only on the state with url changes
function getBreweries(){
    return fetch(`https://api.openbrewerydb.org/breweries?per_page=50&by_state=${stateInput.value}`)
    .then(resp => resp.json()
    )
}

//Listens to the input that holds the name of a state
function listenToStateFormSubmition(){
  
  stateForm.addEventListener('submit', event => 
  {
    event.preventDefault()
    getBreweries().then(breweries => {
      state.breweries = breweries
      state.search = ''
      searchForm.search.value = state.search
      state.selectedBreweryType = []
      state.selectedCities = []
      render()
    })
  })
}

//Listens to the brewery type selection filter
function listenToFilterByType(){
  filterByTypeSelect.addEventListener('change', function(){
    state.selectedBreweryType = []
    state.selectedBreweryType.push(filterByTypeSelect.value)
    render()
  })
}

//Listens to the city checkbox filter
function listenToFilterByCity(){
  state.selectedCities = []
    for(const city of cityForm){
      if (city.checked) state.selectedCities.push(city.value)
    }
}

//Listens to the search bar above the breweries list
function listenToSearchForm(){
  searchForm.addEventListener('submit', function(event){
    event.preventDefault()
    state.search = searchForm.search.value
    render()
  })
}

//Returns a list of filtered breweries based on the filters
function getBreweriesToDisplay(){
  let breweriesToDisplay = state.breweries
  breweriesToDisplay = breweriesToDisplay.filter(brewery => 
    state.typesOfBrewery.includes(brewery.brewery_type))
    
  if(state.selectedBreweryType.length !== 0){
    breweriesToDisplay = breweriesToDisplay.filter(brewery =>
      state.selectedBreweryType.includes(brewery.brewery_type)
    )
  }

  if(state.selectedCities.length !== 0){
    breweriesToDisplay = breweriesToDisplay.filter(brewery =>
      state.selectedCities.includes(brewery.city)
    )
  }

  breweriesToDisplay = breweriesToDisplay.filter(brewery =>
    brewery.name.toLowerCase().includes(state.search.toLowerCase())
  )
  
  breweriesToDisplay = breweriesToDisplay.slice(0,10)
  return breweriesToDisplay

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
  return cities.sort()
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

    if(state.selectedCities.includes(city)) cityCheckboxInput.checked = true

    const cityCheckboxLabel = document.createElement('label')
    cityCheckboxLabel.setAttribute('for', city)
    cityCheckboxLabel.textContent = city

    cityForm.append(cityCheckboxInput,cityCheckboxLabel)

    cityCheckboxInput.addEventListener('change', function(){
      listenToFilterByCity()
      render()
    })
  }
}

function render(){
  renderBreweriesList()
  renderCityList()
}

listenToStateFormSubmition()
listenToFilterByType()
listenToFilterByCity()
listenToSearchForm()