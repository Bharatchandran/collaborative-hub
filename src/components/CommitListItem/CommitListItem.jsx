
import {Card, CardHeader, CardBody, CardFooter, Divider,  Image, button} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as commitAPI from "../../utilities/commit-api"
import { getUser } from '../../utilities/users-service';
export default function CommitListItem({commit}){
  const [push, setPush] = useState(false)
  async function handlePushButton(){
    const pushCommit = await commitAPI.pushCommit(commit._id, commit.user)
    setPush(true)
  }
  function renderButton(){
    if (commit.push === false && commit.user._id === currUser._id) {
      return <button onClick={handlePushButton}>Push</button>
    } else if (commit.push === false && commit.user._id != currUser._id){
      return <button >In progress</button>
    } else if (commit.push === true && commit.user._id != currUser._id) {
      return <button>Pull</button>
    } else if(commit.push === true && commit.user._id === currUser._id){
      return <button>pushed</button>
    }

  }
  const [currUser, setCurrUser] = useState(getUser());
return(
    <Card className="max-w-[400px] bg-black ">
      <h1 className="text-4xl text-white">12{currUser._id}</h1>
      <br />
      <h1 className="text-4xl text-white">12{commit.user._id}</h1>
<h1 className="text-4xl text-white">test{commit.push?<h1>Success</h1> : <h1>Fail</h1>}</h1>
{/* {commit.push === false && commit.user === currUser._id ?  <button onClick={handlePushButton}>Push</button> : <button>Pull</button>} */}
{renderButton()}
    <CardHeader className="flex gap-3 bg-red-500">
      <Image
        alt="nextui logo"
        height={40}
        radius="sm"
        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
        width={40}
      />
      <div className="flex flex-col">
        {/* <p className="text-md">{commit.user.name}</p> */}
        <p className="text-small text-default-500">{commit.name}</p>
      </div>
    </CardHeader>
      <Link to={`/`}><h1 className="text-white">Project Details</h1></Link>
    <Divider/>
    {/* <Link to={`commit/${commit._id}`}>SubTasks</Link> */}
    <Link to={`commit/${commit._id}`}><h1 className="text-white">sub tasks</h1></Link>
{/* 
    {project._id === selectedProject && active === 1 ? <CardBody>
      <p className="text-white">Make beautiful websites regardless of your design experience.</p>
      <p className="text-white">Make beautiful websites regardless of your design experience.</p>
      <p className="text-white">Make beautiful websites regardless of your design experience.</p>
      <p className="text-white">Make beautiful websites regardless of your design experience.</p>
      <p className="text-white">Make beautiful websites regardless of your design experience.</p>
      <p className="text-white">Make beautiful websites regardless of your design experience.</p>
    </CardBody> : "test"} */}
    
    <Divider/>
    <CardFooter>
     
    </CardFooter>
  
  </Card>
)
}