import CommitListItem from "../CommitListItem/CommitListItem"
export default function CommitList({commits}) {
const commitList = commits.map(commit => <CommitListItem commit={commit} />)
return(
    <div>{commitList}</div>
)
}