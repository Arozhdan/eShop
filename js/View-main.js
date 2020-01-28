;
(function () {
  "use strict"
  const api = {}

  window.View = api
  api.getFlatCard = getFlatCard
  api.getShowcase = function getShowcase(flats) {
    const rootElement = document.createElement('div')
    rootElement.classList.add("cards-wrapper")
    const containerElement = document.createElement('div')
    containerElement.classList.add("container", "p-0")
    rootElement.append(containerElement)
    const rowElement = document.createElement("row")
    rowElement.classList.add("row")
    containerElement.append(rowElement)
    rowElement.append(...flats.map(getFlatCard))
    return rootElement
  }
  api.getTable = function getTable(flats) {
    const divElement= document.createElement('div')
    divElement.innerHTML=tableTemplate
    divElement.querySelector('[data-items]').append(...flats.map(getTableItem))
    return divElement.firstElementChild
  }
  function getTableItem(flat) {
    const divElement= document.createElement('div')
    divElement.innerHTML=tableItemTemplate
    .replace(/%ID%/g, flat.id)
    .replace(/%LABEL%/, flat.label)
    .replace(/%PRICE%/, flat.price)
    .replace(/%SQUARE%/, flat.square)
    .replace(/%NOMENCLATURE%/, flat.nomenclature)
    .replace(/%FLOOR%/, flat.floor)
    .replace(/%ROOMS%/, flat.rooms)
    .replace(/%PRICE_PER_SQUARE%/g, parseInt(flat.price/flat.square))


    .replace(/%PANEL_LIKE_ACTIVE%/g, flat.favorite ? "panel__favourite-btn--active" : "")
    return divElement.firstElementChild
    
  }

  function getFlatCard(flat) {
    const divElement = document.createElement('div')
    divElement.innerHTML = cardTemplate
      .replace(/%ID%/g, flat.id)
      .replace(/%LABEL%/g, flat.label)
      .replace(/%ROOMS%/g, flat.rooms)
      .replace(/%PRICE%/g, flat.price)
      .replace(/%SQUARE%/g, flat.square)
      .replace(/%PRICE_PER_SQUARE%/g, parseInt(flat.price/flat.square))
      .replace(/%NOMENCLATURE%/g, flat.nomenclature)
      .replace(/%FLOOR%/g, flat.floor)
      .replace(/%COMON_FLOOR%/g, flat.commonFloor)
      
      .replace(/%CARD_LIKE_ACTIVE%/g, flat.favorite ? "card__like--active" : "")

    return divElement.firstElementChild
  }
  const cardTemplate = `
<div class="col-md-4">
    <div class="card">
        <div class="card__header">
            <a class="card__title" href="#">%LABEL%</a>
            <div class="card__like %CARD_LIKE_ACTIVE%" data-card-id="%ID%">
                <i class="fas fa-heart"></i>
            </div>
        </div>
        <div class="card__img">
            <img src="img/flat-plan.png" alt="План квартиры">
        </div>
        <div class="card__desc">
            <div class="card__price">
                <div class="card__price-total">%PRICE% ₽</div>
                <div class="card__price-per-meter">%PRICE_PER_SQUARE% ₽/м2</div>
            </div>

            <!-- card__params params -->
            <div class="card__params params">
                <div class="params__item">
                    <div class="params__definition">Комнат</div>
                    <div class="params__value">%ROOMS%</div>
                </div>
                <div class="params__item">
                    <div class="params__definition">Площадь</div>
                    <div class="params__value">%SQUARE%</div>
                </div>
            </div>
            <!-- //card__params params -->

        </div>
        <div class="card__footer">
            <div class="card__art">%NOMENCLATURE%</div>
            <div class="card__floor">Этаж %FLOOR% из %COMON_FLOOR%</div>
        </div>
    </div>
</div>`
  const tableTemplate = `
  <div class="panels-wrapper">
    <div class="container p-0">
        <div class="panels-filter">
            <div class="panels-filter__element" style="width: 120px;">
                <div class="panels-filter__name">Артикул</div>
            </div>
            <div class="panels-filter__element" style="width: 160px;">
                <div class="panels-filter__name">ЖК</div>

            </div>
            <div class="panels-filter__element" style="width: 70px;">
                <div class="panels-filter__name">Корпус</div>

            </div>
            <div class="panels-filter__element" style="width: 70px;">
                <div class="panels-filter__name">Этаж</div>

            </div>
            <div class="panels-filter__element" style="width: 70px;">
                <div class="panels-filter__name">Комнат</div>
            </div>
            <div class="panels-filter__element" style="width: 80px;">
                <div class="panels-filter__name">Площадь</div>

            </div>
            <div class="panels-filter__element" style="width: 100px;">
                <div class="panels-filter__name">м2</div>

            </div>
            <div class="panels-filter__element" style="width: 100px;">
                <div class="panels-filter__name">Стоимость</div>
            </div>
            <div class="panels-filter__element" style="width: 120px;">
                <div class="panels-filter__name">Продавец</div>
            </div>
            <div class="panels-filter__element" style="width: 100px;">
                <div class="panels-filter__name">Избранное</div>
            </div>
          </div>

          <div data-items></div>
      </div>
  </div>`
  const tableItemTemplate = `
  <div class="panel">
      <div class="panel__artikul">%NOMENCLATURE%</div>
      <div class="panel__name">
          <a href="#">%LABEL%</a>
      </div>
      <div class="panel__block">15</div>
      <div class="panel__floor">%FLOOR%</div>
      <div class="panel__rooms">%ROOMS%</div>
      <div class="panel__sq">%SQUARE% м2</div>
      <div class="panel__price-per-m">%PRICE_PER_SQUARE% ₽</div>
      <div class="panel__price">%PRICE% ₽</div>
      <div class="panel__seller">Застройщик</div>
      <div class="panel__favourite">
          <button class="panel__favourite-btn %PANEL_LIKE_ACTIVE%" data-panel-id="%ID%">
              <i class="fas fa-heart"></i>
          </button>
      </div>
  </div>`
})();