export interface validatable{
    value: string | number;
   required?: boolean;
   minLength? : number;
   maxLength?: number;
   min? : number;
   max?: number;
}

export function validate(validatableInput:validatable){
   let isValid  = true;

   //Required check
   if (validatableInput.required){
       isValid = isValid && validatableInput.value.toString().trim().length !== 0; // if length is false isvalid becomes false
   }

   // min length check
   if(validatableInput.minLength != null && typeof validatableInput.value === 'string'){
       isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
   }

   // max length check
   if(validatableInput.maxLength != null && typeof validatableInput.value === 'string'){
       isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
   }

   // min check
   if(validatableInput.min != null && typeof validatableInput.value === 'number'){
       isValid = isValid && validatableInput.value >= validatableInput.min;
   }

   // max check
   if(validatableInput.max != null && typeof validatableInput.value === 'number'){
       isValid = isValid && validatableInput.value <= validatableInput.max;
   }

   return isValid;
}