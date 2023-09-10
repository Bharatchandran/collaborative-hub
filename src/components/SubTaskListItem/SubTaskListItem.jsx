import {Card, CardHeader, CardBody, CardFooter, Divider,  Image} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function SubTaskListItem({subTask}) {
    return(
       <h1>{subTask.task}</h1>
    )
}