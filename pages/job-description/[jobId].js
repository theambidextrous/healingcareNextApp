import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import JobDetails from '../../components/JobDetails';
import { getJob } from '../../utils/Requests';

function JobDescription( { headingTitle }) {
  const router = useRouter();
  const [jobid, setJobId] = React.useState(null);
  const [jobdata, setJobData] = React.useState({});
  React.useEffect(() => {
    // let job_id = parseInt(router.query.jobId);
    const job_id = window.location.pathname.split('/').slice(-1).pop();
    console.log('job id', job_id)
    setJobId(job_id);
    getJob(job_id)
    .then( (res) => {
        // console.log('jobid', job_id);
        setJobData(res.payload);
    })
    .catch((err) => {
        console.log('err', err);
        setJobData({});
    });
    return () => {

    }
  }, []);
  return (
    <Layout>
      {/* Banner start */}
        {/* <div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage: 'url(/static/assets/template/images/main-slider/slided2.jpg)', height:190, maxHeight:190,}}> */}
        <div className="dez-bnr-inr overlay-black-middle" style={{height:190, maxHeight:190,}}>
            <div className="container">
                <div className="dez-bnr-inr-entry">
                    <h1 className="text-white">{ jobdata.title }</h1>
                    <div className="breadcrumb-row">
                        <ul className="list-inline">
                            <li><a href={ process.env.appRoot }>Home</a></li>
                            <li>{ headingTitle }</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      <JobDetails
        jobdata={jobdata}
        title={"Your Search results"}
        subtitle={"Best listing for healthcare jobs from top Healthcare Companies across America"}
        homelink={"#"}
      ></JobDetails>
    </Layout>

  );
}

export async function getServerSideProps() {
  let headingTitle = 'ob Description'
  return { props: { headingTitle } }
}

export default JobDescription;