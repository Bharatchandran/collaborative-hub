import SubTaskListItem from "../SubTaskListItem/SubTaskListItem"
export default function SubTaskList({subTasks}){
    const subTaskList = subTasks.map((subTask) => <SubTaskListItem subTask={subTask}/>)
    return(
        <div>{subTaskList}</div>
    )
}