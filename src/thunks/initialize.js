import { setInitializationStatus } from "../reducers/root-reducer";
import { createNewDailyHistory } from "../reducers/root-reducer";

const initialize = () => async (dispatch, getState) => {
  dispatch(setInitializationStatus(false));
  const state = getState();
  if (state.today.date.toDateString() !== new Date().toDateString()) {
    dispatch(createNewDailyHistory());
  }
  dispatch(setInitializationStatus(true));
};

export default initialize;
