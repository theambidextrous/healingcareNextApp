function EmptyJobList(props){

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
                    { props.showElement }
                </div>
                <div className="col-lg-3">
                    <div className="sticky-top">
                    <div className="candidates-are-sys m-b30">
                        <div className="candidates-bx">
                        <div className="testimonial-piic"><img src="/static/assets/template/images/logo.png" alt width={200} height={70} /></div>
                        <br></br>
                        <div className="testimonial-text">
                            <p>HealingCareJobs is the only website dedicated exclusively to healthcare jobs. HCJ unites a million strong community of compassionate and driven professionals from Health care companies across America</p>
                        </div>
                        <div className="testimonial-detail"> <strong className="testimonial-name">HealingCareJobs </strong><span className="testimonial-position">Healthcare Jobs, RN Jobs</span> </div>
                        </div>
                    </div>
                    <div className="quote-bx">
                        <div className="quote-info">
                        <h4>Stay updated with latest Healthcare jobs notifications!</h4>
                        <p>Get daily or weekly job updates!</p>
                        <a href="#" className="site-button">Subscribe</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default EmptyJobList;