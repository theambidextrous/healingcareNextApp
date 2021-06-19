import JobItem from './JobItem';
import EmptyJobList from './EmptyJobList';
import Link from 'next/link';
import TimeAgo from 'react-timeago';
import configurations from '../utils/Config';

function JobDetails(props) {
    
    // console.log('the jobs', jobs[0]);
    const isValidEmailAddress = (email) => {
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return true;
        }
        return false;
    }
    if (!props.jobdata){
        return (
            <EmptyJobList title={props.title} subtitle={"Best listing for healthcare jobs from top Healthcare Companies across America"} homelink={"#"} showElement={<h4>
                404 Job not found!  <Link href={process.env.appRoot}> Browser all Jobs</Link>
            </h4>}></EmptyJobList>
        );
    }
    const jobData = props.jobdata;
    return (
        <div className="section-full content-inner-1">
            <div className="container">
                <div className="row">
                <div className="col-lg-4">
                    <div className="sticky-top">
                    <div className="row">
                        <div className="col-lg-12 col-md-6">
                        <div className="m-b30">
                            { jobData.show_logo ? ( 
                                <img style={{maxHeight:307,width:'100%'}} src={ jobData.logo } alt={ jobData.title } />
                            ):( 
                                <img style={{maxHeight:307,width:'100%'}} src="/static/assets/template/images/logo-holder.png" alt />
                            )}
                        </div>
                        </div>
                        <div className="col-lg-12 col-md-6">
                        <div className="widget bg-white p-lr20 p-t20  widget_getintuch radius-sm">
                            <h4 className="text-black font-weight-700 p-t10 m-b15">Job Details</h4>
                            <ul>
                            <li><i className="ti-location-pin" /><strong className="font-weight-700 text-black">Address</strong><span className="text-black-light"> 
                            { jobData.organization } <br></br> { jobData.location }</span></li>
                            <li><i className="ti-money" /><strong className="font-weight-700 text-black">Salary</strong> {  jobData.salary ? jobData.salary:"n/a" } </li>
                            <li><i className="ti-shield" /><strong className="font-weight-700 text-black">Work Type</strong>{ jobData.remote === 0 ? "Office-based":"Remote" }</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="job-info-box">
                    <h3 className="m-t0 m-b10 font-weight-700 title-head">
                        <a href="#" className="text-secondry m-r30">{jobData.title}</a>
                    </h3>
                    <ul className="job-info">
                        <li><strong>Organization:</strong> { jobData.organization }</li>
                        <li><strong>Posted:</strong> <TimeAgo date={jobData.created_at}/> </li>
                        <li><i className="ti-location-pin text-black m-r5" /> { jobData.location } </li>
                    </ul>
                    <p className="p-t20">{ jobData.brief }</p>
                    
                    <h5 className="font-weight-600">Job Description</h5>
                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0" />
                    <p className="text-muted w-10 mx-auto mb-5" dangerouslySetInnerHTML={{__html: jobData.description}}></p>

                    <h5 className="font-weight-600">How to Apply</h5>
                    <p className="text-muted w-10 mx-auto mb-5" dangerouslySetInnerHTML={{__html: jobData.howto}}></p>

                    <div className="dez-divider divider-2px bg-gray-dark mb-4 mt-0" />
                    
                    { isValidEmailAddress(jobData.link) ? (
                        <a href={"mailto:" + jobData.link} className="site-button">Apply This Job</a>
                    ):(
                        <a target="_blank" href={jobData.link} className="site-button">Apply This Job</a>
                    )}
                    <br></br>
                    <br></br>
                    </div>

                </div>
                </div>
            </div>
        </div>
    );
}

export default JobDetails;