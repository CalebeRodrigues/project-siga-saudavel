
export const ConvertDate = (string) => {
  const data = new Date(string);

  const day = data.getDate();
  const month = Number(data.getMonth()) + 1;
  const year = data.getFullYear();

  return `${day}/${month}/${year}`;
}
