import dayjs from 'dayjs';


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


export { formatDateOnly, formatTimeOnly, formatShortDate, formatFullDate, calculateDuration, formatDateSlashTime, formatDayMonth };
