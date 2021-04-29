// /**
//  * Вспомогательная функция для отрисовки компонентов на странице
//  * @param {object} container - место, куда помещаем компонент
//  * @param {function} template - функция, которая отрисовывает конкретный кусок разметки
//  * @param {string} place - место вставки в разметке
//  */
// export const render = (container, template, place) => {
//   container.insertAdjacentHTML(place, template);
// };


export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};


export const createDomElement = (template) => {
  const newElement = document.createElement('div');   // 1.  создаём пустой div-блок
  newElement.innerHTML = template;                    // 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент

  return newElement.firstElementChild;                // 3. возвращаем этот DOM-элемент
};
