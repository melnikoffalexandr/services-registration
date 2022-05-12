import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

dayjs.locale('ru');

export default dayjs;
