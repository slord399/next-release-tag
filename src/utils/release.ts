import moment from 'moment';

export const generateNewTagFromOld = ({
  oldYear,
  oldMonth,
  oldDay,
  oldItr,
  tagPrefix,
}: {
  oldYear: string;
  oldMonth: string;
  oldDay: string;
  oldItr: number;
  tagPrefix: string;
}) => {
  // const curDate = new Date();
  // const curMonth = curDate.getMonth() + 1;
  // const curYear = curDate.getFullYear();
  // const curDay = curDate.getDate();
  
  const curMonth = moment().format('MM');
  const curYear = moment().format('YYYY');
  const curDay =  moment().format('DD');

  let newYear = curYear;
  let newMonth = curMonth;
  let newDay = curDay;

  let newItr = oldItr + 1;

  if (curDay !== oldDay) {
    newItr = 1;
    newDay = curDay;
  }

  if (curMonth !== oldMonth) {
    newItr = 1;
    newMonth = curMonth;
  }
  
  if (curYear !== oldYear) {
    newItr = 1;
    newYear = curYear;
  }
  return `${tagPrefix}${newYear}${newMonth}${newDay}.${newItr}`;
};
