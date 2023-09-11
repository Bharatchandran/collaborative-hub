import SubTaskListItem from "../SubTaskListItem/SubTaskListItem"
export default function SubTaskList({subTasks}){
    const subTaskList = subTasks.map((subTask) => <SubTaskListItem key={subTask._id} subTask={subTask}/>)
    return(
        <div>{subTaskList}</div>
    )
}