import { datatype, internet, lorem } from 'faker';
import { CommentGet } from '../types/comment';

export const createMockComment = (): CommentGet => ({
  id: datatype.uuid(),
  userName: internet.userName(),
  advantage: lorem.words(),
  disadvantage: lorem.words(),
  comment: lorem.words(),
  rating: datatype.number(5),
  createAt: datatype.datetime().toDateString(),
  guitarId: datatype.number(),
});

