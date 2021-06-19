import React from 'react';
import JobItem from './JobItem';
import EmptyJobList from './EmptyJobList';
import configurations from '../utils/Config';
import { useSearchPaginateJobs } from '../utils/useRequest';
import { subscribeAlert } from '../utils/Requests';
import { gif } from '../components/Gif';
import Link from 'next/link';

function SearchJobList(props) {
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSubscribe = () => {
        setLoading(true);
        let postData = {
            'email': email,
            'period': 1,
        };
        subscribeAlert(postData)
        .then( (res) => {
            if ( res.status === 200 )
            {
                setLoading(false);
                alert(res.message);
                return;
            }
            else
            {
                setLoading(false);
                alert(res.message);
                return;
            }
        })
        .catch( (error) => {
            setLoading(false);
            console.log(error);
            return;
        });
    }
    const {
        jobs,
        error,
        isLoadingMore,
        size,
        setSize,
        isReachingEnd,
    } = useSearchPaginateJobs("search/jobs/" + props.keyword + '/loc/' + props.location);
    // console.log('the jobs', jobs[0]);
    if( jobs[0] !== undefined )
    {
        let itemObject = jobs[0];
        if(itemObject.message )
        {
            return (
                <EmptyJobList title={props.title} subtitle={"Best listing for healthcare jobs from top Healthcare Companies across America"} homelink={"#"} showElement={<h1>Error. Unable to service your request!</h1>}></EmptyJobList>
            )
        }
    }
    if (!jobs){
        return (
            <EmptyJobList title={props.title} subtitle={"Best listing for healthcare jobs from top Healthcare Companies across America"} homelink={"#"} showElement={<h1>Something went wrong!</h1>}></EmptyJobList>
        );
    }
    if (error && error != undefined){
        return (
            <EmptyJobList title={props.title} subtitle={"Best listing for healthcare jobs from top Healthcare Companies across America"} homelink={"#"} showElement={<h1>Something went wrong. Error</h1>}></EmptyJobList>
        );
    }
    if (!jobs){
        return (
            <EmptyJobList title={props.title} subtitle={"Best listing for healthcare jobs from top Healthcare Companies across America"} homelink={"#"} showElement={<h1>Loading...</h1>}></EmptyJobList>
        );
    }

    return (
        <div className="section-full bg-white content-inner-2">
            <div className="container">
                <div className="d-flex job-title-bx section-head">
                <div className="mr-auto">
                    <h2 className="m-b5">{ props.title }</h2>
                    <h6 className="fw4 m-b0">{ props.subtitle }</h6>
                </div>
                <div className="align-self-end">
                    <a href={ props.homelink } className="site-button button-sm">latest at top <i className="fa fa-long-arrow-right" /></a>
                </div>
                </div>
                <div className="row">
                <div className="col-lg-9">
                    <ul className="post-job-bx">
                        {jobs.map(job => (
                            <JobItem
                                key={job.id}
                                job={job}
                            ></JobItem>
                        ))}
                        <li key={100000345}>
                            <button
                                className={"site-button"}
                                disabled={isLoadingMore || isReachingEnd}
                                onClick={() => setSize(size + 1)}
                            >
                                {isLoadingMore
                                ? "Loading..."
                                : isReachingEnd
                                ? "No more jobs"
                                : "Load more jobs"}
                            </button>
                        </li>
                    </ul>
                    {/* <div className="m-t30">
                        <div className="d-flex">
                            <a className="site-button button-sm mr-auto" href="#">
                                <i className="ti-arrow-left" /> Prev</a>
                            <a className="site-button button-sm" href="#">Next <i className="ti-arrow-right" /></a>
                        </div>
                    </div> */}
                </div>
                <div className="col-lg-3">
                    <div className="sticky-top">
                        <div className="quote-bx">
                            <div className="quote-info">
                            <h4>Stay updated with latest Healthcare jobs notifications!</h4>
                            <p>Get daily or weekly job updates!</p>
                            <input onChange={(e) => handleEmailChange(e) } name="dzEmail" required="required" className="form-control" placeholder="Your Email Id" type="email" /><br></br>
                            <button onClick={() => handleSubscribe() } className="site-button">Subscribe {loading && (<img height={15} width={15} style={{position: 'relative', top: 1, right: 1, border: 0}} src={gif} />)}</button>
                            </div>
                        </div>
                        <div className="candidates-are-sys m-b30">
                            <div className="candidates-bx">
                                <div className="testimonial-piic"><img src="/static/assets/template/images/logo.png" alt width={200} height={70} /></div>
                                <br></br>
                                <div className="widget border-0">
                                    {/* <h5 className="m-b30 text-white">Healthcare Jobs</h5> */}
                                    <ul className="list-2 w10 list-line">
                                        <li style={{listStyle:'none'}}><a href="#">Healthcare Jobs</a></li>
                                        <li style={{listStyle:'none'}}><a href="#">Nurse Jobs</a></li>
                                        <li style={{listStyle:'none'}}><a href="#">Dentist Jobs</a></li>
                                        <li style={{listStyle:'none'}}><a href="#">RN Jobs</a></li>
                                        <li style={{listStyle:'none'}}><a href="#">Pharmacist Jobs</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default SearchJobList;