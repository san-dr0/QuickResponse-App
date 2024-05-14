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
    // console.log(date.toISOString().split('T')[0], nanoseconds, seconds);
    
  return date;
};

export const checkIfSubscriptionHasExpired = (endSubscriptionDate: string, isSubscribed: boolean) => {
  if (!isSubscribed) {
    return true;
  }
  const currentDay = dayjs().format('MMMM DD YYYY HH:mm:s');
  const splittedCurrentDay = currentDay.split(" ");
  // console.log("splittedCurrDate ", splittedCurrentDay);
  
  const splittedEndDay = endSubscriptionDate.split(" ");
  // console.log("splittedEndDate ", splittedEndDay);
  

  if (splittedCurrentDay[0] === splittedEndDay[0]) {
    const splittedCurrentDayDay = parseInt(splittedCurrentDay[1]);
    const splittedCurrentEndDayDay = parseInt(splittedEndDay[1]);

    if (splittedCurrentDayDay >= splittedCurrentEndDayDay) {
      return true;
    }
  }

  return false;
};
