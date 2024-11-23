import { projectInput } from "./Components/ProjectInput.js";
import { ProjectList } from "./Components/ProjectList.js";


const prjInput = new projectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');