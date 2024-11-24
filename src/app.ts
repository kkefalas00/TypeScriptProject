import { projectInput } from "./Components/ProjectInput";
import { ProjectList } from "./Components/ProjectList";


const prjInput = new projectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');