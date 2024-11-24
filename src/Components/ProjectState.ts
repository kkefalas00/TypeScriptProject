import { ProjectStatus } from "../Enums/ProjectStatus";
import { Project } from "./Project";
import { State } from "./State";

export class ProjectState extends State<Project>{
    private projects : Project [] = [];
    private static projectState : ProjectState;
   

    private constructor(){
       super();
    }

    //Secure that we only have one instance of ethe class so we use the singleton design pattern
    static getInstance(){
        if(this.projectState){
            return this.projectState;
        }else{
            this.projectState = new ProjectState();
            return this.projectState;
        }
    }

   

    addProject(title: string, description: string, numOfPeople: number){
        const newProject = new Project(
            Math.random().toString(), 
            title, 
            description, 
            numOfPeople, 
            ProjectStatus.Active
        )

        this.projects.push(newProject);
        this.UpdateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus){
        const project = this.projects.find(pr=>pr.id === projectId);
        if(project && project.status !== newStatus){
            project.status = newStatus;
            this.UpdateListeners();
        }
    }

    private UpdateListeners(){
        for(const listenerFn of this.listeners){
            listenerFn(this.projects.slice());
        }
    }

}