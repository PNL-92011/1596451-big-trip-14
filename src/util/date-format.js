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

const getDuration = (from, to) => {
  const durationMinutes = dayjs(to).diff(dayjs(from), 'minute');

  return durationMinutes;
};

const calculateDuration = (durationMinutes) => {
  if (durationMinutes < 60) {
    const minutes = durationMinutes < 10 ? `0${durationMinutes}` : durationMinutes;
    return `${minutes}M`;
  }

  else if (durationMinutes < 1440) {
    const durationHours = Math.floor(durationMinutes / 60);
    const minutesRest = durationMinutes % 60;

    const hours = durationHours < 10 ? `0${durationHours}` : durationHours;
    const minutes = minutesRest < 10 ? `0${minutesRest}` : minutesRest;

    return `${hours}H ${minutes}M`;
  }

  const durationDays = Math.floor(durationMinutes / (60 * 24));
  const hoursRest = Math.floor((durationMinutes % (24 * 60)) / 60);
  const minutesRest = (durationMinutes % (24 * 60)) % 60;

  const days = durationDays < 10 ? `0${durationDays}` : durationDays;
  const hours = hoursRest < 10 ? `0${hoursRest}` : hoursRest;
  const minutes = minutesRest < 10 ? `0${minutesRest}` : minutesRest;

  return `${days}D ${hours}H ${minutes}M`;
};


export { formatDateOnly, formatTimeOnly, formatShortDate, formatFullDate, getDuration, calculateDuration, formatDateSlashTime, formatDayMonth };
