import {setInitializationStatus, switchHistory} from "../reducers/root-reducer";
import { createNewDailyHistory } from "../reducers/root-reducer";
import selectDaily from "../selectors/select-daily";

const initialize = () => async (dispatch, getState) => {
  dispatch(setInitializationStatus(false));
  const state = getState();
  const currentDate = new Date().toDateString();
  if (!selectDaily(state)[currentDate]) {
    dispatch(createNewDailyHistory(currentDate));
  }
  dispatch(switchHistory(currentDate))
  dispatch(setInitializationStatus(true));
};

export default initialize;
