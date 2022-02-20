const searchMultiple = (array, query) => {
  const result = [];
  for (let item of array) {
    if (item.name.toLowerCase().includes(query.toLowerCase())) {
      result.push(item);
    }
  }
  return result;
}

export default searchMultiple;