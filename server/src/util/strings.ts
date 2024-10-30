export const capitalizeFirstLetter = (text : string) => {
  return text.substring(0, 1).toLocaleUpperCase() + text.substring(1).toLocaleLowerCase();
}