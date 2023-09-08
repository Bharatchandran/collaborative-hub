
import {Card, CardHeader, CardBody, CardFooter, Divider,  Image} from "@nextui-org/react";
import { Link } from "react-router-dom";
export default function CommitListItem({commit}){
return(
    <Card className="max-w-[400px] bg-black ">
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