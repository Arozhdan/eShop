;
(function () {
  "use strict"

  const api = {
    dispatch(){

    }
  }

  const datum = {
    flats: [{
        id: 1,
        label: "ЖК Генеральский",
        price: 4200000,
        rooms: 1,
        square: 56,
        floor: 1,
        commonFloor: 12,
        nomenclature: "ГЕН-112.4.2-51",
        favorite: false
      },
      {
        id: 2,
        label: "ЖК Киевский",
        price: 2100000,
        rooms: 2,
        square: 48,
        floor: 2,
        commonFloor: 12,
        nomenclature: "ГЕН-112.4.2-52",
        favorite: true
      },
      {
        id: 3,
        label: "ЖК Генеральский",
        price: 3000000,
        rooms: 3,
        square: 12,
        floor: 2,
        commonFloor: 12,
        nomenclature: "ГЕН-112.4.2-53",
        favorite: true
      },
      {
        id: 4,
        label: "ЖК Киевский",
        price: 1000000,
        rooms: 4,
        square: 13,
        floor: 4,
        commonFloor: 12,
        nomenclature: "ГЕН-112.4.2-54",
        favorite: false
      },
      {
        id: 5,
        label: "ЖК Киевский",
        price: 2500000,
        rooms: 6,
        square: 25,
        floor: 4,
        commonFloor: 12,
        nomenclature: "ГЕН-112.4.2-55",
        favorite: false
      },
      {
        id: 6,
        label: "ЖК Родной",
        price: 12000000,
        rooms: 2,
        square: 90,
        floor: 6,
        commonFloor: 12,
        nomenclature: "ГЕН-112.4.2-56",
        favorite: false
      },
      {
        id: 7,
        label: "ЖК Родной",
        price: 4500000,
        rooms: 2,
        square: 46,
        floor: 4,
        commonFloor: 12,
        nomenclature: "ГЕН-112.4.2-57",
        favorite: false
      },
      {
        id: 8,
        label: "ЖК Киевский",
        price: 5000000,
        rooms: 4,
        square: 47,
        floor: 4,
        commonFloor: 12,
        nomenclature: "ГЕН-112.4.2-58",
        favorite: true
      },
      {
        id: 9,
        label: "ЖК Родной",
        price: 1200000,
        rooms: 1,
        square: 89,
        floor: 6,
        commonFloor: 12,
        nomenclature: "ГЕН-112.4.2-59",
        favorite: false
      }
    ]
  }
  const getCopy = x => JSON.parse(JSON.stringify(x))

  api.getFlats = function getFlats() {
    return getCopy(datum.flats)
  }

  api.getLabels= function getLabels(){
    return datum.flats.map(x=> x.label)
    .filter( (v,i,l)=> l.lastIndexOf(v)===i)
  }

  api.toggleFavorite= function toggleFavorite(flatId){
    for( const flat of datum.flats){
      if(flat.id===flatId){
        flat.favorite = !flat.favorite
        api.dispatch()
        return
      }
    }
  } 
  window.Model = api
})();