const searchMultiple = (array, query) => {
  const result = [];
  for (let item of array) {
    if (item.name.includes(query)) {
      result.push(item);
    }
  }
  return result;
}

export default searchMultiple;