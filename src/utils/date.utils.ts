import dayjs from 'dayjs';

export const getCurrentDate = () => {
  return dayjs().format('MMMM DD YYYY');
};

export const getCurrentDateWithTime = () => {
  return dayjs().format('MMMM DD YYYY  HH:mm:s');
};

export const formatDateFromFirebase = (nanoseconds: number, seconds: number) => {
    const date = new Date(seconds * 1000 + seconds * 1000000);
    const formatDate = new Date(date);
    console.log(date.toISOString().split('T')[0], nanoseconds, seconds);
    
  return date;
};
