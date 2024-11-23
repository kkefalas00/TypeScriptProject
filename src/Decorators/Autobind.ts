export function autobind(
    target:any, 
    methodName:string, 
    descriptor: PropertyDescriptor){

    const originalMethod = descriptor.value;
    
    const adjDescriptor: PropertyDescriptor = {
        configurable: true, // so we can always  change it
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }// it will be executed when we access the function
    };

    return adjDescriptor;
}