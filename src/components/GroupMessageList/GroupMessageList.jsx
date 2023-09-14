import GroupMessageListItem from "../GroupMessageListItem/GroupMessageListItem"

export default function GroupMessageList({messages}){

    const messagesListItem = messages.map(el => <GroupMessageListItem message={el} />)
    console.log(messagesListItem,"[]") 
    return (<div className="w-11/12 bg-gradient-to-b from-indigo-900 to-stone-900  flex flex-col-reverse   rounded-3xl  overflow-auto  ">

        {messagesListItem}
    </div>
    )
}