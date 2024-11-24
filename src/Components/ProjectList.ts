import { Component } from "./BaseComponent";
import { DragTarget } from "../Interfaces/Dragtarget/DragTarget";
import { Project } from "./Project";
import { ProjectStatus } from "../Enums/ProjectStatus";
import { ProjectState } from "./ProjectState";
import { autobind } from "../Decorators/Autobind";
import { ProjectItem } from "./ProjectItem";

const projectState = ProjectState.getInstance();

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProjects: Project []; 

    constructor(private type: 'active' | 'finished' ){
        super('project-list','app', false,`${type}-projects`);
         this.assignedProjects = [];
         this.configure();
         this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent): void {
        //This event is fired when we reach a draggable area with our mouse
        // we have to check if there is allowed draggable here and if the data of this event attached is of this format 'text/plain'
        //so here we allow only data of format text and not for example images etc
        console.log('dragOver '+event);
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
            //only if we call  event.preventDefault(); the event will happen because the default in the javascript and in the browser is to not allow drag & drop events
            event.preventDefault();
             //Adding the class droppable to the list when I drag it
            const lisEl = this.element.querySelector('ul')!;
            lisEl.classList.add('droppable');
        }
    }

    @autobind
    dropHandler(event: DragEvent): void {
        console.log('drop');
        const projId = event.dataTransfer!.getData('text/plain');
        const typeProject : ProjectStatus = this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished;
        projectState.moveProject(projId, typeProject );
    }

    @autobind
    dragLeaveHandler(event: DragEvent): void {
         //remove the class droppable to the list when i finish the dragging
       const lisEl = this.element.querySelector('ul')!;
       lisEl.classList.remove('droppable');
       console.log('dragleave');
       console.log(event);
    }

    configure(): void {

        //Adding dropping handlers to the list
        this.element.addEventListener('dragover',this.dragOverHandler);
        this.element.addEventListener('dragleave',this.dragLeaveHandler);
        this.element.addEventListener('drop',this.dropHandler);

        projectState.addListener((projects: Project[])=>{
            const relevantProjects = projects.filter(prj=>{
                if(this.type === 'active'){
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
         })
    }

    renderContent(){
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for(const prjItem of this.assignedProjects){
            new ProjectItem(this.element.querySelector('ul')!.id,prjItem);
        }
    }
}