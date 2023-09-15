import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as commitAPI from "../../utilities/commit-api"
import CommitList from "../../components/CommitList/CommitList"
import Commit from "../Commit/Commit"
export default function ProjectDetail() {
   
    return(<div>
        <Commit />
    </div>)
}   