const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
  }).format(number);
};

export default rupiah;
