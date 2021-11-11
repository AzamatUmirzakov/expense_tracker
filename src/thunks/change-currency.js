import {getCoefficients} from "../api/api";
import {changeDailyHistoryCurrency, setCurrency} from "../reducers/root-reducer";

const changeCurrency = (previous, next) => async dispatch => {
  const coefficients = await getCoefficients(previous, next);
  dispatch(changeDailyHistoryCurrency({
    next,
    previous,
    coefficients,
  }));
  dispatch(setCurrency(next));
}
export default changeCurrency;