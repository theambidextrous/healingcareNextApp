import React from 'react';
import Layout from '../../../../components/Layout';
import { useRouter } from 'next/router';
import SearchJobList from '../../../../components/SearchJobList';
import DummyJobs from '../../../../components/dummy/DummyJobs';

function FindJobsPage() {
  const router = useRouter();
  // console.log('query params', router.query);
  const [search, setSearch] = React.useState(router.query);
  const [temp, setTemp] = React.useState({title:'',location:'', category:'healthcare'});
  const string_to_slug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    return str;
  }
  const onTitleInput = (e) => {
    setSearch({
      ...search,
      title:e.target.value,
    });
  }
  const reverseSlug = (slug) => {
    if( slug === undefined )
    {
      return;
    }
    return slug.replace('-', ' ');
  }
  const onLocationInput = (e) => {
    setSearch({
      ...search,
      location:e.target.value,
    });
  }
  const onSearchButtonTap = () => {
    if( search.title != null && search.location != null)
    {
      let urlTo = process.env.appRoot + 'find-jobs/' + string_to_slug(search.title) + '/' + string_to_slug(search.location) + '/' + string_to_slug(search.category);
      router.push(urlTo);
      return;
    }
    else
    {
      alert('Type a keyword and location to find jobs');
      return;
    }
  }
  return (
    <Layout>
      {/* Banner start */}
      <div className="dez-bnr-inr dez-bnr-inr-md" style={{backgroundImage: 'url(/static/assets/template/images/main-slider/slide2.jpg)', height:290, maxHeight:290}}>
        <div className="container">
          <div className="dez-bnr-inr-entry align-m ">
            <div className="find-job-bx">
              {/* <h2><span className="text-primary">HealingCareJobs</span> is the only website <br/> dedicated exclusively to healthcare jobs.</h2> */}
              <h6>
                <div className="extra-cell">
                    <a href="/post-a-job" className="site-button"><i className="fa fa-briefcase" /> Post A Job Today</a>
                </div>
              </h6>
              <br/>
              <form className="dezPlaceAni">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="form-group">
                      {/* <label>Job Title, Keywords, or Phrase</label> */}
                      <div className="input-group">
                        <input value={reverseSlug(search.title)} onChange={(e) => onTitleInput(e) } type="text" className="form-control" placeholder={"Job Title, Keywords, or Phrase"} />
                        <div className="input-group-append">
                          <span className="input-group-text"><i className="fa fa-search" /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="form-group">
                      {/* <label>Town, City or State</label> */}
                      <div className="input-group">
                        <input value={reverseSlug(search.location)} onChange={(e) => onLocationInput(e) } type="text" className="form-control" placeholder={"Town, City or State"} />
                        <div className="input-group-append">
                          <span className="input-group-text"><i className="fa fa-map-marker" /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-lg-3 col-md-6">
                    <div className="form-group">
                      <select>
                        <option>Select Category</option>
                        <option>Construction</option>
                        <option>Corodinator</option>
                        <option>Employer</option>
                        <option>Financial Career</option>
                        <option>Information Technology</option>
                        <option>Marketing</option>
                        <option>Quality check</option>
                        <option>Real Estate</option>
                        <option>Sales</option>
                        <option>Supporting</option>
                        <option>Teaching</option> 
                      </select>
                    </div>
                  </div> */}
                  <div className="col-lg-4 col-md-6">
                    <button onClick={() => onSearchButtonTap() } type="button" className="site-button btn-block">Find Job</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SearchJobList
        keyword={reverseSlug(search.title)}
        location={reverseSlug(search.location)}
        title={"Your Search results"}
        subtitle={"Best listing for healthcare jobs from top Healthcare Companies across America"}
        homelink={"#"}
      ></SearchJobList>
    </Layout>

  );
}
// export function getStaticProps(){}

export default FindJobsPage;