;
(function () {
  "use strict"
  const FLAT_IN_PAGE = 3


  const filters = {
    label: '',
    rooms: [],
    square: {
      min: null,
      max: null
    },
    price: {
      min: null,
      max: null
    }
  }
  let viewMode = "showcase" //showcase, table
  let sorter = 'priceAsc' // priceASC, priceDESC, squareASC, squareDESC



  const getParams = location.search
    .slice(1)
    .split('&')
    .map(x => x.split('='))
    .reduce((p, [key, value]) => ({
      ...p,
      [key]: value
    }), {})

  const currentPage = parseInt(getParams.page || 1)
  const commonPagesNumber = Math.ceil(Model.getFlats().length / FLAT_IN_PAGE)
  const dataPagesElement = document.querySelector('[data-pages]')
  for (let i = 1; i <= commonPagesNumber; i++) {
    const aElement = document.createElement('a')
    aElement.href = "?page=" + i
    aElement.classList.add('pagination__page')
    aElement.textContent = i
    if (i === currentPage) {
      aElement.classList.add('pagination__page--active')
    }
    dataPagesElement.insertBefore(aElement, dataPagesElement.lastElementChild)
  }


  const api = {}
  api.start = function start() {
    api.update()
    const filterLabelElement = document.querySelector('[data-filter-label]')
    filterLabelElement.append(
      ...Model.getLabels().map(label => {
        const optionElement = document.createElement('option')
        optionElement.setAttribute('value', label)
        optionElement.textContent = label
        return optionElement
      })
    )
    filterLabelElement.addEventListener('change', function (event) {
      document.querySelector('.filter__buttons').style.display = "block";
      filters.label = this.value
      api.update()
    })

    document.querySelector('[data-range-min]').addEventListener('change', function () {
      document.querySelector('.filter__buttons').style.display="block"
      localStorage.setItem('minSqr', this.value);
      api.update()
    })
    document.querySelector('[data-range-max]').addEventListener('change', function () {
      document.querySelector('.filter__buttons').style.display="block"
      localStorage.setItem('maxSqr', this.value);
      api.update()
    })


    document.querySelector('[data-price-min]').addEventListener('change', function () {
      document.querySelector('.filter__buttons').style.display="block"
      localStorage.setItem('minPrice', this.value);
      api.update()
    })
    document.querySelector('[data-price-max]').addEventListener('change', function () {
      document.querySelector('.filter__buttons').style.display="block"
      localStorage.setItem('maxPrice', this.value);
      api.update()
    })
    document.querySelectorAll('[data-filter-rooms]')
      .forEach(element => {
        const roomsNumber = parseInt(element.getAttribute('data-filter-rooms'))
        const labelElement = element.nextElementSibling
        element.addEventListener('click', function () {
          document.querySelector('.filter__buttons').style.display = "block";
          toogleItem(filters.rooms, roomsNumber)
          labelElement.classList.remove('rooms__btn--active')
          if (filters.rooms.includes(roomsNumber)) {
            labelElement.classList.add('rooms__btn--active')
          }
          api.update()
        })
      })
    document.querySelector('[data-sorter]')
      .addEventListener('change', function () {
        sorter = this.value
        api.update()
      })
    document.querySelector('[data-reset-filter]').addEventListener('click', function () {
      filters.rooms = []
      filters.label = ''
      filters.square.max = null
      filters.square.min = null
      filters.price.max = null
      filters.price.min = null
      localStorage.removeItem('maxSqr')
      localStorage.removeItem('minSqr')
      document.querySelector('[data-range-min]').value=null
      document.querySelector('[data-range-max]').value=null
      localStorage.removeItem('maxPrice')
      localStorage.removeItem('minPrice')
      document.querySelector('[data-price-min]').value=null
      document.querySelector('[data-price-max]').value=null

      document.querySelectorAll('[data-filter-rooms]')
        .forEach(element => {
          const labelElement = element.nextElementSibling
          labelElement.classList.remove('rooms__btn--active')
        })
      document.querySelector('.filter__buttons').style.display = "none";
      api.update()
    })
    document.querySelectorAll('[data-view-mode]').forEach(element => {
      element.addEventListener('click', function (event) {
        event.preventDefault()
        if (viewMode !== this.getAttribute('data-view-mode')) {
          viewMode = this.getAttribute('data-view-mode')
          document.querySelector('.view-options__type-item--active').classList.remove('view-options__type-item--active')
          element.classList.add('view-options__type-item--active')
          api.update()
        }
      })
    })

    Model.dispatch = function () {
      api.update()
    }
  }
  api.update = function update() {
    if (localStorage.minSqr) {
      document.querySelector('[data-range-min]').value = localStorage.minSqr
      filters.square.min = localStorage.minSqr
    }
    if (localStorage.maxSqr) {
    document.querySelector('[data-range-max]').value = localStorage.maxSqr
    filters.square.max = localStorage.maxSqr
    }
    if (localStorage.minPrice) {
      document.querySelector('[data-price-min]').value = localStorage.minPrice
      filters.price.min = localStorage.minPrice
    }
    if (localStorage.maxPrice) {
    document.querySelector('[data-price-max]').value = localStorage.maxPrice
    filters.price.max = localStorage.maxPrice
    }
    let flats = Model.getFlats()
    if (filters.label) {
      flats = flats.filter(x => x.label === filters.label)
    }

    if (filters.rooms.length) {
      flats = flats.filter(x => filters.rooms.includes(x.rooms))
    }

    if (filters.square.min !== null) {
      flats = flats.filter(x => x.square >= filters.square.min)
    }
    if (filters.square.max !== null) {
      flats = flats.filter(x => x.square <= filters.square.max)
    }

    if (filters.price.min !== null) {
      flats = flats.filter(x => x.price >= filters.price.min)
    }
    if (filters.price.max !== null) {
      flats = flats.filter(x => x.price <= filters.price.max)
    }


    if (sorter === 'priceAsc') {
      flats = flats.sort((a, b) => a.price - b.price)
    } else if (sorter === 'priceDesc') {
      flats = flats.sort((a, b) => b.price - a.price)
    }

    if (sorter === 'squareAsc') {
      flats = flats.sort((a, b) => a.square - b.square)
    } else if (sorter === 'squareDesc') {
      flats = flats.sort((a, b) => b.square - a.square)
    }


    const showcaseMountPoint = document.querySelector('[data-showcase]')
    const tableMountPoint = document.querySelector('[data-table]')


    showcaseMountPoint.innerHTML = ``
    tableMountPoint.innerHTML = ``


    flats = flats.slice((currentPage - 1) * FLAT_IN_PAGE, (currentPage - 1) * FLAT_IN_PAGE + FLAT_IN_PAGE)
    if (viewMode === 'showcase') {
      const showcaseElement = View.getShowcase(flats)
      showcaseMountPoint.append(showcaseElement)

      showcaseElement.querySelectorAll('.card__like')
        .forEach(element => {
          element.addEventListener('click', function () {
            Model.toggleFavorite(parseInt(element.getAttribute('data-card-id')))
          })
        });
    } else if (viewMode === 'table') {
      const tableElement = View.getTable(flats)
      tableMountPoint.append(tableElement)
      tableElement.querySelectorAll('.panel__favourite-btn')
        .forEach(element => {
          element.addEventListener('click', function () {
            Model.toggleFavorite(parseInt(element.getAttribute('data-panel-id')))
            console.log(parseInt(element.getAttribute('data-panel-id')))
          })
        })
    }
  }

  window.Controller = api


  function toogleItem(array, item) {
    if (array.includes(item)) {
      array.splice(array.indexOf(item), 1)
    } else array.push(item)
  }
})();