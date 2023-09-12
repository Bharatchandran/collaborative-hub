import { useState } from "react"
import CommitListItem from "../CommitListItem/CommitListItem"
export default function CommitList({commits, setProjectPush, projectPush}) {
    const [activeState, setActiveState] = useState(-1)
    const [activeCommit, setActiveCommit] = useState("")

    function handleActiveState(commitId,testTasks,currUserId,commitUserId ) {
               if(currUserId === commitUserId ){
                   setActiveState(activeState * -1)
               } else if (testTasks[0] ){
                    if(currUserId != commitUserId ){
                        setActiveState(activeState * -1)
                    }
               }
               setActiveCommit(commitId)
           }

    const commitList = commits.map(commit => <CommitListItem key={commit._id} activeState={activeState} 
        activeCommit={activeCommit} className="max-w-2xl" commit={commit} handleActiveState={handleActiveState} setProjectPush={setProjectPush} projectPush={projectPush} />)
    
return(
    <div className=" w-8/12 ">{commitList}</div>
)
}