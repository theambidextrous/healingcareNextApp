import React from 'react';
import { subscribeAlert } from '../utils/Requests';
import { gif } from '../components/Gif';
import Link from 'next/link';

function Footer(props) {
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
    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-4 col-md-12 col-sm-12">
                    <div className="widget">
                        <img src="/static/assets/template/images/logo-white.png" width={180} className="m-b15" />
                        <p className="text-capitalize m-b20">HealingCareJobs is the only website dedicated exclusively to healthcare jobs. HCJ unites a million strong community of compassionate and driven professionals from Health care companies across America</p>
                        <div className="subscribe-form m-b20">
                        <form className="dzSubscribe" action="#" method="post">
                            <div className="dzSubscribeMsg" />
                            <div className="input-group">
                            <input onChange={(e) => handleEmailChange(e) } name="dzEmail" required="required" className="form-control" placeholder="Your Email Id" type="email" />
                            <span className="input-group-btn">
                                <button onClick={() => handleSubscribe() } name="submit" value="Submit" type="button" className="site-button radius-xl">Subscribe 
                                {loading && (<img height={15} width={15} style={{position: 'relative', top: 1, right: 1, border: 0}} src={gif} />)}
                                </button>
                            </span> 
                            </div>
                        </form>
                        </div>
                        <ul className="list-inline m-a0">
                        <li><a href="#" className="site-button white facebook circle "><i className="fa fa-facebook" /></a></li>
                        <li><a href="#" className="site-button white google-plus circle "><i className="fa fa-google-plus" /></a></li>
                        <li><a href="#" className="site-button white linkedin circle "><i className="fa fa-linkedin" /></a></li>
                        <li><a href="#" className="site-button white instagram circle "><i className="fa fa-instagram" /></a></li>
                        <li><a href="#" className="site-button white twitter circle "><i className="fa fa-twitter" /></a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-12">
                        <div className="widget border-0">
                            <h5 className="m-b30 text-white">Healthcare Jobs</h5>
                            <ul className="list-2 w10 list-line">
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'healthcare/united-states/healthcare'}>Healthcare Jobs</Link></li>
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'nurse/united-states/healthcare'}>Nurse Jobs</Link></li>
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'dentist/united-states/healthcare'}>Dentist Jobs</Link></li>
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'rn/united-states/healthcare'}>RN Jobs</Link></li>
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'pharmacist/united-states/healthcare'}>Pharmacist Jobs</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-12">
                        <div className="widget border-0">
                            <h5 className="m-b30 text-white">Find Jobs</h5>
                            <ul className="list-2 w10 list-line">
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'pharmacy-technician/united-states/healthcare'}>Pharmacy Technician Jobs</Link></li>
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'nurse-practitioner/united-states/healthcare'}>Nurse Practitioner Jobs</Link></li>
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'physician-assistant/united-states/healthcare'}>Physician Assistant Jobs</Link></li>
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'occupational-therapist/united-states/healthcare'}>Occupational Therapist Jobs</Link></li>
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'dental-assistant/united-states/healthcare'}>Dental Assistant Jobs</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-12">
                        <div className="widget border-0">
                            <h5 className="m-b30 text-white">Search Jobs</h5>
                            <ul className="list-2 w10 list-line">
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'medical-assistant/united-states/healthcare'}>Medical Assistant Jobs</Link></li>
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'physical-therapist/united-states/healthcare'}>Physical Therapist Jobs</Link></li>
                                <li><Link target="_blank" href={ process.env.appRoot + 'find-jobs/' + 'psychologist/united-states/healthcare'}>Psychologist Jobs</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            {/* footer bottom part */}
            <div className="footer-bottom">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center"><span><a target="_blank" href="#">HCJ</a></span></div>
                </div>
                </div>
            </div>
        </footer>

    );
}
export default Footer;