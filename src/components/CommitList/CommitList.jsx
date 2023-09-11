import { useState } from "react"
import CommitListItem from "../CommitListItem/CommitListItem"
export default function CommitList({commits}) {
    const [activeState, setActiveState] = useState(-1)
    const [activeCommit, setActiveCommit] = useState("")
    function handleActiveState(commitId) {
               setActiveState(activeState * -1)
               setActiveCommit(commitId)
           }
    const commitList = commits.map(commit => <CommitListItem key={commit._id} activeState={activeState} activeCommit={activeCommit} className="max-w-2xl" commit={commit} handleActiveState={handleActiveState} />)
return(
    <div className=" w-8/12 ">{commitList}</div>
)
}