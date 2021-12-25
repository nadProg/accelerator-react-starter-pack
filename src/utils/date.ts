import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const formatCommentDate = (date: string) => dayjs(date).format('D MMMM');
