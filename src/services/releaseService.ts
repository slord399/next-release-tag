import moment from 'moment';
import { generateNewTagFromOld } from '../utils/release';

const getNewReleaseTag = (
  tagPrefix: string,
  oldReleaseTag: string | null | undefined
) => {
  if (oldReleaseTag && oldReleaseTag.startsWith(tagPrefix)) {
    // const [oldYear, oldMonth, oldDay, oldItr] = oldReleaseTag
    //   .substring(tagPrefix.length)
    //   .split('.')
    //   .map((x) => x);

    const date = oldReleaseTag.substring(tagPrefix.length).substring(0, 8);

    const dateMoment = moment.utc(date, 'YYYY.MM.DD');

    const oldYear = dateMoment.format('YYYY');
    const oldMonth = dateMoment.format('MM');
    const oldDay = dateMoment.format('DD');

    const oldItr = Number(
      oldReleaseTag
        .substring(tagPrefix.length + 8)
        .replace(/\./g, '')
        .replace(/\\/g, '')
    );

    return generateNewTagFromOld({
      oldYear,
      oldMonth,
      oldDay,
      oldItr,
      tagPrefix,
    });
  }
  // Handle no releases yet or prefix not matching last release
  return generateNewTagFromOld({
    oldYear: '-1',
    oldMonth: '-1',
    oldDay: '-1',
    oldItr: -1,
    tagPrefix,
  });
};

export default getNewReleaseTag;
