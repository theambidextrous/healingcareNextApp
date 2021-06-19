import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { getJob } from '../../utils/Requests';

function AboutPage() {
  const router = useRouter();
  
  return (
    <Layout>
      {/* Banner start */}
        <div className="dez-bnr-inr overlay-black-middle" style={{backgroundImage: 'url(/static/assets/template/images/main-slider/slide2.jpg)', height:190, maxHeight:190,}}>
            <div className="container">
                <div className="dez-bnr-inr-entry">
                    <h1 className="text-white">About HealingCareJobs</h1>
                    <div className="breadcrumb-row">
                        <ul className="list-inline">
                            <li><a href={ process.env.appRoot }>Home</a></li>
                            <li>About HealingCareJobs</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="section-full content-inner overlay-white-middle">
          <div className="container">
            <div className="row align-items-center m-b50">
              <div className="col-md-12 col-lg-6 m-b20">
                <h2 className="m-b5">About Us</h2>
                <h3 className="fw4">We specialize in healthcare hiring</h3>
                
                <p className="m-b15">HealingCareJobs Is The Only Website Dedicated Exclusively To Healthcare Jobs.</p>

                <p className="m-b15">HCJ Unites A Million Strong Community Of Compassionate And Driven Professionals From Health Care Companies Across America</p>

                <p className="m-b15"></p>
                <a href="/" className="site-button">View Jobs</a>
              </div>
              <div className="col-md-12 col-lg-6">
                <img src="/static/assets/template/images/about.png" alt />
              </div>
            </div>
          </div>
        </div>

    </Layout>

  );
}
// export function getStaticProps(){}

export default AboutPage;