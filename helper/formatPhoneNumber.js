export default function formatPhoneNumber(inputNumber, countryCode = false) {
  const formattedNumber = "";
  if (countryCode) {
    formattedNumber = inputNumber
      ?.toString()
      .replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
  } else{
    formattedNumber = inputNumber
      ?.toString()
      .replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4");
  }
  return formattedNumber
}
