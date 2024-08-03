interface InputDataValidationType {
  id: string;
  text: string;
  error: boolean;
  errorMessage?: string;
  validators: Array<Function>;
}

export default InputDataValidationType;
