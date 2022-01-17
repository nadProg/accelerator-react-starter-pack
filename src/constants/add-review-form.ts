import { ReviewPost } from '../types/review';


export const INITIAL_FORM_FIELDS: ReviewPost = {
  guitarId: 0,
  userName: '',
  rating: 0,
  advantage: '',
  disadvantage: '',
  comment: '',
} as const;

export type NewReviewFormFields = keyof Omit<ReviewPost, 'guitarId'>;

export const INITIAL_FORM_ERRORS: {
  [key in NewReviewFormFields]: boolean
} = {
  userName: true,
  rating: true,
  advantage: true,
  disadvantage: true,
  comment: true,
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
