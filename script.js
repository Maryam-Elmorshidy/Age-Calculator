// console.log("hi");
const inputElements = document.querySelectorAll(".card__input");
const buttonCalc = document.querySelector(".card__button");

const validateDay = (day) => {
  if (day && day > 0 && day <= 31) {
    return true;
  }
};
const validateMonth = (month) => {
  if (month && month > 0 && month <= 12) {
    return true;
  }
};
const validateYear = (year) => {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) {
    return true;
  }
};

const isDateValid = (yearElement, monthElement, dayElement) => {
  let isValid = [false, false, false];
  if (!validateYear(yearElement.value)) {
    yearElement.classList.add("card__input--error");
  } else {
    yearElement.classList.remove("card__input--error");
    isValid[0] = true;
  }
  if (!validateMonth(monthElement.value)) {
    monthElement.classList.add("card__input--error");
  } else {
    monthElement.classList.remove("card__input--error");
    isValid[1] = true;
  }
  if (!validateDay(dayElement.value)) {
    dayElement.classList.add("card__input--error");
  } else {
    dayElement.classList.remove("card__input--error");
    isValid[2] = true;
  }

  return isValid.every((item) => item === true);
};

const calculateAge = (year, month, day) => {
  //   debugger;
  const today = new Date();
  const yourBirthday = new Date(year, month - 1, day);
  let age = today.getFullYear() - yourBirthday.getFullYear();

  const diffMonth = today.getMonth() - yourBirthday.getMonth();
  if (
    diffMonth < 0 ||
    (diffMonth === 0 && today.getDate() < yourBirthday.getDate())
  ) {
    age--;
  }
  return age;
};
// const dayElement = document.querySelector(".card__input[name='day']");
const onClickHandler = () => {
  const dayElement = document.querySelector(".card__input[name='day']");
  const monthElement = document.querySelector(".card__input[name='month']");
  const yearElement = document.querySelector(".card__input[name='year']");
  const resultElement = document.querySelector(".card__resultValue");

  if (!isDateValid(yearElement, monthElement, dayElement)) {
    resultElement.textContent = "--";
    return;
  }

  resultElement.textContent = calculateAge(
    yearElement.value,
    monthElement.value,
    dayElement.value
  );
};

inputElements.forEach((item) => {
  item.addEventListener("keydown", (event) => {
    // console.log(event.key);
    event.key === "Enter" && onClickHandler();
  });
});

buttonCalc.addEventListener("click", onClickHandler);
