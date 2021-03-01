'use strict'

let CARS = JSON.parse(DATA)

const cardListEl = document.getElementById('cardList')
const masonryBtnsEl = document.getElementById('masonryBtns')
const sortSelectEl = document.getElementById('sortSelect')
const formSearchEl = document.getElementById('formSearch')
const seeMoreBtnEl = document.getElementById('seeMoreBtn')
const seeAllBtnEl = document.getElementById('seeAllBtn')
const seeAllBtnsEl = document.getElementById('seeAllBtns')
const filterFormEl = document.getElementById('filterForm')

const filterFields = ['make', 'fuel', 'transmission', 'price']

const dateFormatter = new Intl.DateTimeFormat()
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: 'numeric'
})
const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})
const currencyFormatterUAH = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0
})

const rateUSDtoUAH = 28.3459

if (!localStorage.wishlist) {
  localStorage.wishlist = JSON.stringify([])
}
const wishlistLS = JSON.parse(localStorage.wishlist)
// {
//     "id": "89aed5b8c686ebd713a62873e4cd756abab7a106",
//     "make": "BMW",
//     "model": "M3",
//     "year": 2010,
//     "img": "http://dummyimage.com/153x232.jpg/cc0000/ffffff",
//     "color": "Goldenrod",
//     "vin": "1G6DW677550624991",
//     "country": "United States",
//     "rating": 1,
//     "price": 2269,
//     "views": 5,
//     "seller": "Ellery Girardin",
//     "vip": true,
//     "top": false,
//     "timestamp": 1601652988000,
//     "phone": "+1 (229) 999-8553",
//     "fuel": "Benzin",
//     "engine_volume": 1.4,
//     "transmission": "CVT",
//     "odo": 394036,
//     "consume": { "road": 4.8, "city": 12.3, "mixed": 8.4 }
//   },
renderCards(CARS, cardListEl)



filterFormEl.addEventListener('submit', function (event) {
  event.preventDefault()
  const query = []
  filterFields.forEach(field => {
    const checkedValues = []
    this[field].forEach(input => {
      if (input.checked) {
        checkedValues.push(input.value)
      }
    })
    query.push(checkedValues)
  })
  console.log(query);
  CARS = JSON.parse(DATA).filter(car => {
    return query.every((values, i) => {
      return values.length == 0 ? true : values.includes(car[filterFields[i]])
    })
  })
  renderCards(CARS, cardListEl, true)
})


createFilterForm(CARS, filterFormEl, filterFields)

function createFilterForm(cars, formEl, fields) {
  let formHtml = ''
  fields.forEach(field => {
    const values = new Set(cars.map(car => car[field]))
    formHtml += createFilterFieldset(field, values)
  })
  formEl.insertAdjacentHTML('afterBegin', formHtml)
}

function createFilterFieldset(field, values) {
  let inputsHtml = ''
  if (field == 'price') {

  } else {
    values.forEach(value => inputsHtml += createFilterCheckbox(field, value) )
  }
  return `
  <fieldset class="mb-2">
    <legend class="text-success fw-bold text-uppercase fs-3">${field}</legend>
    <div class="filter-fields d-flex flex-column" >
    ${inputsHtml}
    </div>
  </fieldset>`
}

function createFilterCheckbox(field, value) {
  return `<label>
  <input type="checkbox" value="${value}" name="${field}">
  ${value}
  </label>`
}
function createFilterRange(field, value) {
  return `<lable>
  <div><input type="text" value="${value}" name="${field}">cgg</div>
  <input type="text" value="${value}" name="${field}">
  </lable>`
}





cardListEl.addEventListener('click', event => {
  const wishBtnEl = event.target.closest('.star-btn')
  if (wishBtnEl) {
    const carId = wishBtnEl.closest('.card').dataset.id
    console.log('star btn click', carId);
    const savedIdIndex = wishlistLS.indexOf(carId)
    if (!~savedIdIndex) {
      wishlistLS.push(carId)
      wishBtnEl.classList.add('text-warning')
    } else{
      wishlistLS.splice(savedIdIndex, 1)
      wishBtnEl.classList.remove('text-warning')
    }
    localStorage.wishlist = JSON.stringify(wishlistLS)
  }
})

seeMoreBtnEl.addEventListener('click', event => {
  renderCards(CARS, cardListEl)
})
seeAllBtnEl.addEventListener('click', event => {
  renderCards(CARS, cardListEl, false, true)
})

formSearchEl.addEventListener('submit', function (event) {
  event.preventDefault()
  const query = this.search.value.trim().toLowerCase().split(' ').filter(word => !!word)
  const searchFields = ['make', 'model', 'year', 'engine_volume', 'fuel', 'vin']
  CARS = JSON.parse(DATA).filter(car => {
    return query.every(word => {
      return searchFields.some(field => {
        return `${car[field]}`.trim().toLowerCase().includes(word)
      })
    })
  })
  renderCards(CARS, cardListEl, true)
})


sortSelectEl.addEventListener('change', event => {
  console.log(event.target.value.split());
  // let type = event.target.value.split('-')[1]
  // let key = event.target.value.split('-')[0]
  const [key, type] = event.target.value.split('-')

  if (type == 'ab') {
    CARS.sort((a, b) => {
      if (typeof a[key] != 'string') {
        return a[key] - b[key]
      } else if (typeof a[key] == 'string') {
        return (a[key]).localeCompare(b[key])
      }
    })
  } else if (type == 'ba') {
    CARS.sort((a, b) => {
      if (typeof b[key] != 'string') {
        return b[key] - a[key]
      } else if (typeof b[key] == 'string') {
        return (b[key]).localeCompare(a[key])
      }
    })
  }



  renderCards(CARS, cardListEl, true)
})



masonryBtnsEl.addEventListener('click', event => {
  const btnEl = event.target.closest('.btn')
  if (btnEl) {
    console.log(btnEl.dataset.action);
    if (btnEl.dataset.action == '1') {
      cardListEl.classList.add('row-cols-1')
      cardListEl.classList.remove('row-cols-2')
    } else if (btnEl.dataset.action == '2') {
      cardListEl.classList.add('row-cols-2')
      cardListEl.classList.remove('row-cols-1')
    }

    btnEl.classList.add('btn-success')
    btnEl.classList.remove('btn-secondary')
    const siblings = findSiblings(btnEl)
    siblings.forEach(sibling => {
      sibling.classList.add('btn-secondary')
      sibling.classList.remove('btn-success')
    })
  }
})





function renderCards(data_array, node, clear, full) {
  let count = 10
  if (clear) {
    node.innerHTML = ''
  }
  const elems = node.children.length
  if (full) {
    count = data_array.length - elems
  }
  if (elems + count >= data_array.length) {
    seeAllBtnsEl.classList.add('d-none')
  } else{
    seeAllBtnsEl.classList.contains('d-none') && seeAllBtnsEl.classList.remove('d-none')
  }
  let html = ''
  if (data_array.length > 0) {
    for (let i = 0; i < count; i++) {
      const car = data_array[elems + i]
      if (car) {
        html += createCardHTML(car)
      } else{
        break
      }
    }
  } else {
    html = `<h2 class="text-center text-danger">No cars :((</h2>`
  }
  node.insertAdjacentHTML('beforeend', html)
}


function createCardHTML(card_data) {
  let starIcons = ''
  for (let i = 0; i < 5; i++) {
    if (card_data.rating > i) {
      starIcons += '<i class="fas fa-star"></i>'
    } else {
      starIcons += '<i class="far fa-star"></i>'
    }
  }
  let vinCheck = card_data.vin_check ? '<i class="fas fa-check text-success fs-4 px-2"></i>' : '<i class="fas fa-times text-danger fs-4 px-2"></i>'
  let top = card_data.top ? '<div class="bg-success p-2 position-absolute text-white">Top</div>' : ''

  return `<div class="col card mb-3" data-id="${card_data.id}">
    <div class="row g-0">
      <div class="col-4 card-img-wrap position-relative">
        ${top}
        <img class="card-img" width="1" height="1" loading="lazy" src="${card_data.img}" alt="${card_data.make} ${card_data.model}" />
        <h6 class="star-icons text-warning my-4 d-flex justify-content-center fs-4">${starIcons}</h6>
      </div>
      <div class="col-8 card-body-wrap">
        <div class="card-body position-relative">
          <h5 class="card-title fs-3 fw-bold">${card_data.make} ${card_data.model} ${card_data.engine_volume} ${card_data.transmission} (${card_data.year})</h5>
          <div class="price d-flex align-items-center">
          <h6 class="card-price fs-3 fw-bold text-success me-4">${currencyFormatter.format(card_data.price)}</h6>
          <span class="fs-5 text-secondary">${currencyFormatterUAH.format(card_data.price*rateUSDtoUAH)}</span>
          </div>
          
          <ul class="col-8 parameters px-2">
          <li class="span-parameters py-2"><i class="fas fa-tachometer-alt text-warning"></i> ${card_data.odo} km</li>
          <li class="span-parameters py-2"><i class="fas fa-map-marker-alt text-warning"></i> ${card_data.country}</li>
          <li class="span-parameters py-2"><i class="fas fa-gas-pump text-warning"></i> ${card_data.fuel}, ${card_data.engine_volume}</li>
          <li class="span-parameters py-2"><i class="fas fa-cogs text-warning"></i> ${card_data.transmission}</li>
          </ul>
          <p class="fs-6 fw-bold">Fuel Consumption (l/1000km)</p>
          <ul class="content-article w-75"> 
          <li><i class="fas fa-city text-warning"></i> ${card_data.consume?.city}</li>
          <li><i class="fas fa-road text-warning"></i> ${card_data.consume?.road}</li>
          <li><i class="fas fa-sync text-warning"></i> ${card_data.consume?.mixed}</li>
          </ul>
          ${card_data.vin ? `<p class="card-vin "><span class="vin-span fw-bold text-primary fs-5">VIN:</span> ${card_data.vin}${vinCheck}</p>` : '<div class="bg-warning d-flex justify-content-center fs-5  p-1 my-4">This car hasnt a VIN number!!!!!</div>'}
          <p>Color: ${card_data.color}</p>
          <div class="cart d-flex align-items-center">
          <a class="btn btn-info cart-btn  text-light"><i class="fas fa-shopping-cart"></i> Cart</a>
          <a href="tel:${card_data.phone}" class="btn btn-primary call-btn mx-4"><i class="fas fa-phone-alt"></i> Call</a>
          <p><i class="far fa-user"></i> ${card_data.seller}</p>
          </div>
          <button class="star-btn position-absolute top-0 end-0 btn btn-secondary m-3 ${wishlistLS.includes(card_data.id) ? 'text-warning' : ''}"><i class="fas fa-star"></i></button>
        </div>
      </div>
      <div class="col-12 card-footer text-muted">
        <small class="text-muted"><i class="far fa-clock mx-2"></i>${dateFormatter.format(card_data.timestamp)} ${timeFormatter.format(card_data.timestamp) }</small>
        <small class="text-muted"><i class="far fa-eye mx-2"></i>${card_data.views}</small>
      </div>
    </div>
  </div>`
}




// Utils functions

function findSiblings(element) {
  const parent = element.parentElement
  const children = [...parent.children]
  const siblings = children.filter(child => child != element)
  return siblings

  // return [...element.parentElement.children].filter(child => child != element)
}










//  let a = [5,6,9,1,2,10,4,7,13,8,11]
// let newA = a.filter(num => num>5)
// console.log(newA);
// a.sort((a,b) => {
//   return a - b
// })
// console.log(a);


// let a = [5,6,9,1,2,10,4,7,13,8,11]

// let sum = a.reduce((acu, curr) => acu += curr, 0)

// console.log(sum);