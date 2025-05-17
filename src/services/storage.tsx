export interface IDIoBank {
  login: boolean;
}

const dioBank: IDIoBank = {
  login: false,
};

export const getAllLocalStorage = (): IDIoBank => {
  return JSON.parse(localStorage.getItem("userLogged") || "{}");
};

export const createLocalStorage = (): void => {
  localStorage.setItem("userLogged", JSON.stringify(dioBank));
};

export const changeLocalStorage = (data: IDIoBank): void => {
  localStorage.setItem("userLogged", JSON.stringify(data));
};
