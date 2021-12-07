import compareStrings from "./compare-strings";

const searchMultiple = (array, query) => {
  if (query === '') return [];
  let left_border = 0;
  let right_border = array.length - 1;
  while (left_border < right_border) {
    let middle = Math.round((left_border + right_border) / 2);
    if (array[middle].name.toLowerCase().includes(query.toLowerCase())) {
      let result = [];
      result.push(array[middle]);
      // to the left
      let left_counter = middle - 1;
      while (left_counter >= 0) {
        if (array[left_counter].name.toLowerCase().includes(query.toLowerCase())) {
          result.push(array[left_counter]);
          left_counter--;
        } else {
          break;
        }
      }
      // to the right;
      let right_counter = middle + 1;
      while (right_counter < array.length) {
        if (array[right_counter].name.toLowerCase().includes(query.toLowerCase())) {
          result.push(array[right_counter]);
          right_counter++;
        } else {
          break;
        }
      }
      return result;
    } else {
      if (compareStrings(array[middle].name, query) === -1) {
        right_border = middle;
      } else {
        left_border = middle;
      }
    }
  }
  return [];
}

export default searchMultiple;