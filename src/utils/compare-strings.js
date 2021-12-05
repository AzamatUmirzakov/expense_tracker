const compareStrings = (a, b) => {
  let first = a.toLowerCase();
  let second = b.toLowerCase();
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

export default compareStrings;