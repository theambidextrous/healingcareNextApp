import TimeAgo from 'react-timeago';
import { useRouter } from 'next/router';

function JobItem({ job }) {
    const router = useRouter();
    const { link, logo, title, location, remote, created_at, id, show_logo, organization, sticky_day, sticky_week, sticky_month } = job;
    const getForegroundColor = (hexcolor) => {
        hexcolor = hexcolor.replace("#", "");
        var r = parseInt(hexcolor.substr(0,2),16);
        var g = parseInt(hexcolor.substr(2,2),16);
        var b = parseInt(hexcolor.substr(4,2),16);
        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        return (yiq >= 128) ? 'black' : 'white';
    }
    const determineHighlight = (jobItem) => {
        if(jobItem.brand_color)
        {
          return jobItem.selected_color;
        }
        if(jobItem.yellow_it)
        {
          return '#fff9c9';
        }
        return '#ffffff';
    }
    function showDetailsHandler()
    {
        let urlTo = process.env.appRoot + 'job-description/' + id ;
        router.push(urlTo);
    }
    return (
    <li style={{backgroundColor: determineHighlight(job)}}>
        <a onClick={() => showDetailsHandler() } style={{backgroundColor: determineHighlight(job), color:getForegroundColor(determineHighlight(job)), cursor:'pointer'}}>
            <div className="d-flex m-b10">
            <div className="job-post-company">
                { show_logo ? ( <span><img src={ logo } alt="" /></span>):( 
                    <span style={{fontSize:40,fontWeight:"bolder"}}>{organization.charAt(0)}</span>
                )}
            </div>
            <div className="job-post-info">
                <h5 className="jobItem" style={{color:getForegroundColor(determineHighlight(job))}}>{ title }</h5>
                <ul>
                <li style={{color:getForegroundColor(determineHighlight(job))}}><i className="fa fa-map-marker" /> { location }</li>
                <li style={{color:getForegroundColor(determineHighlight(job))}}><i className="fa fa-building-o" /> { organization }</li>
                <li style={{color:getForegroundColor(determineHighlight(job))}}><i className="fa fa-clock-o" /> Published <TimeAgo date={created_at} /></li>
                </ul>
            </div>
            </div>
            <div className="d-flex">
            <div className="job-time mr-auto">
                <span>{ remote === 0 ? "Office-based":"Remote" }</span>
            </div>
            <div className="salary-bx">
                <span></span>
            </div>
            </div>
            { sticky_day || sticky_week || sticky_month ? (
            <span style={{color:getForegroundColor(determineHighlight(job)), borderWidth:0,}} className="post-like fa fa-paperclip" />
            ):(<span></span>)}
        </a>
    </li>
    );
}
export default JobItem;