import dayjs from 'dayjs';

/**
 * Вспомогательная функция для отрисовки компонентов на странице
 * @param {object} container - место, куда помещаем компонент
 * @param {function} template - функция, которая отрисовывает конкретный кусок разметки
 * @param {string} place - место вставки в разметке
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


const formatDateOnly = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const formatTimeOnly = (date) => {
  return dayjs(date).format('HH:mm');
};

const formatShortDate = (date) => {
  return dayjs(date).format('MMM D');
};

const formatDayMonth = (date) => {
  return dayjs(date).format('DD MMM');
};

const formatFullDate = (date) => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
};

const formatDateSlashTime = (date) => {
  return dayjs(date).format('DD/MM/YY HH:mm');
};

const calculateDuration = (start, end) => {
  const quantityMinutes = dayjs(end).diff(dayjs(start), 'minute');

  let minutes = (quantityMinutes > 60) ? (quantityMinutes % 60) : quantityMinutes;
  let hours = Math.floor(quantityMinutes / 60);

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (hours > 0) {
    if (hours < 10) {
      hours = '0' + hours;
    }
    return `${hours}H ${minutes}M`;
  }
  return `${minutes}M`;
};


export { render, formatDateOnly, formatTimeOnly, formatShortDate, formatFullDate, calculateDuration, formatDateSlashTime, formatDayMonth };
