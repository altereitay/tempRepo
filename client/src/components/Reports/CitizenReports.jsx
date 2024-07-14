import React, {useState, useEffect, Fragment} from "react";
import ReportEntry from "./ReportEntry";

const CitizenReports = (props) => {
    const [reports, setReports] = useState({});
    const [isLoading, setLoading] = useState(true);
    const getReports = async () => {
        try {
            const response = await fetch(`/report/reporter/${props.id || '315434621'}`, {method: 'GET'});
            const json = await response.json();

            if (!response.ok) {
                throw new Error("Bad Network");
            } else {
                setReports(json);
                setLoading(false);
                console.log(Array.isArray(json));
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        getReports();
    }, [isLoading]);

    return (
        isLoading ? <div>loading</div> :
            <Fragment>
                <h1>Reports</h1>
                {reports?.map(report => <ReportEntry props={report}/>)}
            </Fragment>
    )
}

export default CitizenReports;
