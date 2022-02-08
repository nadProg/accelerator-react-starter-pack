import { combineReducers } from '@reduxjs/toolkit';
import { reviewsReducer } from './reviews/reviews-reducer';
import { filterReducer } from './filter/filter-reducer';
import { guitarsReducer } from './guitars/guitars-reducer';
import { paginationReducer } from './pagination/pagination-reducer';
import { sortReducer } from './sort/sort-reducer';
import { cartReducer } from './cart/cart-reducer';
import { couponReducer } from './coupon/coupon-reducer';

export const rootReducer = combineReducers({
  guitars: guitarsReducer,
  sort: sortReducer,
  filter: filterReducer,
  pagination: paginationReducer,
  reviews: reviewsReducer,
  cart: cartReducer,
  coupon: couponReducer,
});
