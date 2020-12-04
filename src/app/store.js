import { configureStore } from '@reduxjs/toolkit';
import gp3Reducer from './gp3Slice';

export default configureStore({
  reducer: {
    gp3: gp3Reducer,
  },
});
