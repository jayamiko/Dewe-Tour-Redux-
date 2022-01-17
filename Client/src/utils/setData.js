const setData = (name, data) => {
  return localStorage.setItem(name, JSON.stringify(data));
};

export default setData;
