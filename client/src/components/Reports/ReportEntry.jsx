import React, {useEffect} from "react";

const ReportEntry = ({props}) => {
    useEffect(() => {
        console.log(props)
    }, []);
    return (
        <div>
            <p>{props.data}</p>
            {props.img === null ? <img src={props.img}/> : <></>}
            {props.isFixed ? <p>Issue fixed!</p> : <p>Issue has not been fixed</p>}
            <p>{props.location}</p>
            <p>{props.reportedAt}</p>
        </div>
    )
}

export default ReportEntry;