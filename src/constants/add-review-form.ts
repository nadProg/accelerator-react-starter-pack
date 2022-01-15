import { CommentPost } from '../types/comment';

export type AddReviewFormField = keyof CommentPost;

export const INITIAL_FORM_FIELDS: CommentPost = {
  guitarId: 0,
  userName: '',
  rating: 0,
  advantage: '',
  disadvantage: '',
  comment: '',
} as const;

export const INITIAL_FORM_ERRORS: {
  [key in keyof CommentPost]?: boolean
} = {
  userName: true,
  rating: true,
} as const;

export const RATING_OPTIONS = [
  {
    value: 5,
    label: 'Отлично',
  },
  {
    value: 4,
    label: 'Хорошо',
  },
  {
    value: 3,
    label: 'Нормально',
  },
  {
    value: 2,
    label: 'Плохо',
  },
  {
    value: 1,
    label: 'Ужасно',
  },
];
