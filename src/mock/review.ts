import { datatype, internet, lorem } from 'faker';
import { ReviewGet } from '../types/review';

export const createMockReview = (): ReviewGet => ({
  id: datatype.uuid(),
  userName: internet.userName(),
  advantage: lorem.words(),
  disadvantage: lorem.words(),
  comment: lorem.words(),
  rating: datatype.number(5),
  createAt: datatype.datetime().toDateString(),
  guitarId: datatype.number(),
});

