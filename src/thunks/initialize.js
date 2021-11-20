import { setInitializationStatus } from "../reducers/root-reducer";
import { createNewDailyHistory } from "../reducers/root-reducer";
import selectHistory from "../selectors/select-history";

const initialize = () => async (dispatch, getState) => {
  dispatch(setInitializationStatus(false));
  const state = getState();
  if (selectHistory(state).date.toDateString() !== new Date().toDateString()) {
    dispatch(createNewDailyHistory());
  }
  dispatch(setInitializationStatus(true));
};

export default initialize;
