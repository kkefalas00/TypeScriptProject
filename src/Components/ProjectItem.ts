import { Component } from "./BaseComponent";
import { Project } from "./Project";
import { Draggable } from "../Interfaces/Draggable/Draggable";
import { autobind } from "../Decorators/Autobind";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project : Project ;
    private hostId : string; 

    get persons(){
        if(this.project.people === 1) return '1 person';
        return `${this.project.people} persons` ;  
    } 


    constructor(hostId: string, project: Project){
        super('single-project', hostId, false, project.id);
        this.project = project;
        this.hostId = hostId;
        this.configure();
        this.renderContent();
    }

    @autobind
    dragstarthandler(event: DragEvent): void {
        console.log("drag start event"+event);
        //To dataTransfer property we attach data we want to drag from one area to another
        event.dataTransfer!.setData('text/plain',this.project.id);
        //this tells to the browser about our intention, that we move an object from a point A to a point B
        event.dataTransfer!.effectAllowed = 'move';
    }

    @autobind
    dragEndHandler(event: DragEvent): void {
        console.log(event);
        console.log(event.currentTarget);
        console.log(event.button);

    }

    configure(): void {
       this.element.addEventListener('dragstart',this.dragstarthandler);
       this.element.addEventListener('dragend',this.dragEndHandler)

    }
    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}