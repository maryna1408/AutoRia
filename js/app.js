let CARS = JSON.parse(DATA)
const cardListEl = document.getElementById('cardList')

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


function renderCards(data_array, node) {
    let html = ''

    //    for (let i = 0; i < data_array.length; i++) {
    //        const element = data_array[i];
    //        html += createCardHTML(element)
    //    }
    data_array.forEach(el => html += createCardHTML(el));

    node.innerHTML = html
}


function createCardHTML(card_data) {
    return `<div class="col card mb-3">
    <div class="row g-0">
      <div class="col-4">
        <img class="card-img" width="1" height="1" loading="lazy" src="${card_data.img}" alt="${card_data.make} ${card_data.model}" />
      </div>
      <div class="col-8">
        <div class="card-body">
          <h5 class="card-title">${card_data.make} ${card_data.model} ${card_data.engine_volume} ${card_data.transmission} (${card_data.year})</h5>
          <h6 class="card-price">${card_data.price}$</h6>
          <p class="card-vin">${card_data.vin}</p>
        </div>
      </div>
      <div class="col-12 card-footer text-muted">
        <small class="text-muted"><i class="far fa-clock mx-2"></i>${card_data.timestamp}</small>
        <small class="text-muted"><i class="far fa-eye mx-2"></i>${card_data.views}</small>
      </div>
    </div>
  </div>`
}

function sum(a, b) {
    return a + b
}

let result = 0

result = sum(10, 5)