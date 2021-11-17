import {getCoefficients} from "../api/api";
import {changeCurrency, setCurrency} from "../reducers/root-reducer";

const setNewCurrency = (previous, next) => async dispatch => {
  const coefficients = await getCoefficients(previous, next);
  dispatch(changeCurrency({
    next,
    previous,
    coefficients,
  }));
  dispatch(setCurrency(next));
}
export default setNewCurrency;