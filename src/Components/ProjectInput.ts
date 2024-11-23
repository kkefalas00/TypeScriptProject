import { Component } from "./BaseComponent.js";
import { validatable, validate } from "../Interfaces/Validatable/Validatable.js";
import { autobind } from "../Decorators/Autobind.js";
import { ProjectState } from "./ProjectState.js";

const projectState = ProjectState.getInstance();

export class projectInput extends Component<HTMLDivElement, HTMLFormElement>{

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor(){
        //typecast html template element
        super('project-input','app',true,'user-input');
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
       
    }

    configure(){
        this.element.addEventListener('submit',this.submithandler)
    }
    renderContent(): void {
        console.log('Renderer content');
    }

    private gatherUserinput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

    //Construct valitable objects
    const titleValidatable: validatable = {
        value: enteredTitle,
        required : true,
    }

    const descValidatable : validatable = {
        value: enteredDescription,
        required : true,
        minLength : 10,
        maxLength : 20
    }

    const peopleValidatable : validatable = {
        value: +enteredPeople,
        required : true,
        min : 1,
        max : 5
    }

        if(! validate(titleValidatable) || !validate(descValidatable) || !validate(peopleValidatable) ) 
        {
            alert("invalid inputs, please try again!");
            return;
        }else{
            return [enteredTitle, enteredDescription, +enteredPeople];
        }

    }

    private clearinputs(){
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @autobind
    private submithandler(event:Event){
        event.preventDefault();
       const userInput =  this.gatherUserinput();
       //Check whether the userInput is a tuple, tuple is an array so in run Time in JavaScript we can chack it in that way 
       if(Array.isArray(userInput)){
        const [title, desc, people] = userInput; 
        projectState.addProject(title,desc,people);
        console.log(title, desc, people);
       }

        this.clearinputs();
    }
}