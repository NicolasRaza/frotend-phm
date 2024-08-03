import InputDataValidationType from "./input-data-validation.interface";

export function setErrorValidation(inputData: InputDataValidationType, errorMessage: string, changeValue: boolean = true) {
  if(changeValue){
    inputData.error = true;
    inputData.errorMessage = errorMessage;
  }
  return false;
}

export function setSuccessValidation(inputData: InputDataValidationType) {
  inputData.error = false;
  inputData.errorMessage = undefined;
  return true;
}
