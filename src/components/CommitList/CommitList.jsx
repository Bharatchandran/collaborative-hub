import CommitListItem from "../CommitListItem/CommitListItem"
export default function CommitList({commits}) {
    const commitList = commits.map(commit => <CommitListItem className="max-w-2xl" commit={commit} />)
return(
    <div className=" w-8/12 ">{commitList}</div>
)
}