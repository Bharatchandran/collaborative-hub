
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem"

export default function ProjectList({projects ,reloadProject, setReloadProject}) {

    const projectList = projects.map((project) => <ProjectListItem key={project._id} project={project}   reloadProject={reloadProject} setReloadProject={setReloadProject}  />)

    return (
    <div className="w-10/12 flex flex-col items-center  ">
        {projectList}
    </div>
)
}