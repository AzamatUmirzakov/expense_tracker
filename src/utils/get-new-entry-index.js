import compareStrings from "./compare-strings";

const getNewEntryIndex = (items, item) => {
  let left_border = 0;
  let right_border = items.length - 1;

  if (items.length == 1) {
    return compareStrings(items[0].name, item.name) === 1 ? 1 : 0;
  }

  while (left_border < right_border) {
    let middle_index = Math.round((left_border + right_border) / 2)
    let middle = items[middle_index];
    if (right_border - 1 === left_border) {
      if (compareStrings(items[right_border].name, item.name) === 1) {
        return right_border + 1;
      } else if(compareStrings(items[left_border].name, item.name) === 1) {
        return left_border + 1;
      } else {
        return left_border;
      }
    }

    if (compareStrings(items[middle_index - 1].name, item.name) === 1 && compareStrings(items[middle_index + 1].name, item.name) === -1) {
      if (compareStrings(items[middle_index].name, item.name) === 1)
        return middle_index + 1;
      else
        return middle_index
    } else {
      if (compareStrings(middle.name, item.name) === -1) {
        right_border = middle_index;
      } else {
        left_border = middle_index;
      }
    }
  }

  return items.length;
}

export default getNewEntryIndex;
