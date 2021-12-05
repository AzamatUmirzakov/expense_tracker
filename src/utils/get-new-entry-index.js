const getNewEntryIndex = (items, item) => {
  let left_border = 0;
  let right_border = items.length - 1;

  const compare_strings = (a, b) => {
    let first = a.name.toLowerCase();
    let second = b.name.toLowerCase();
    for (let i = 0; i < first.length; i++) {
      if (first.charCodeAt(i) > second.charCodeAt(i)) {
        return -1;
      } else if (second.charCodeAt(i) > first.charCodeAt(i)) {
        return 1;
      } else {
        continue;
      }
    }
    return first.length > second.length ? -1 : 1;
  }

  if (items.length === 0) {
    return 0;
  } else if (items.length === 1) {
    if (compare_strings(items[0], item) == -1) {
      return 0;
    } else {
      return 1;
    }
  }

  while (left_border < right_border) {
    let middle_index = Math.round((left_border + right_border) / 2)
    let middle = items[middle_index];
    if (right_border - 1 === left_border) {
      if (compare_strings(items[right_border], item) === 1) {
        return right_border + 1
      } else {
        return left_border;
      }
    }
    if (compare_strings(items[middle_index - 1], item) === 1 && compare_strings(items[middle_index + 1], item) === -1) {
      return middle_index + 1;
    } else {
      if (compare_strings(middle, item) === -1) {
        right_border = middle_index;
      } else {
        left_border = middle_index;
      }
    }
  }
  return items.length;
}
export default getNewEntryIndex;
