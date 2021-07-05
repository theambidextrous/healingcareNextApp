
// import Link from 'next/link';
function Header() {
    return (
        <header className="site-header mo-left header fullwidth">
            <div className="sticky-header main-bar-wraper navbar-expand-lg">
                <div className="main-bar clearfix">
                <div className="container clearfix">
                    <div className="logo-header mostion">
                    <a href="/"><img src="/static/assets/template/images/logo.png" className="logo" /></a>
                    </div>
                    <button className="navbar-toggler collapsed navicon justify-content-end" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span />
                    <span />
                    <span />
                    </button>
                    <div className="extra-nav">
                        <div className="extra-cell">
                            <a href="/post-a-job" className="site-button"><i className="fa fa-briefcase" /> Post A Job</a>
                        </div>
                    </div>
                    <div className="dez-quik-search bg-primary">
                        <form action="#"></form>
                    </div>
                    <div className="header-nav navbar-collapse collapse justify-content-start" id="navbarNavDropdown">
                    <ul className="nav navbar-nav">
                        <li className="">
                            <a href="/">Home</a>
                        </li>

                        <li>
                        <a href="/about-us">About HealingCare</a>
                        </li>

                        <li>
                        <a href="mailto:contact@healingcarejobs.com">Support Email</a>
                        </li>

                    </ul>			
                    </div>
                </div>
                </div>
            </div>
        </header>
    );
}
export default Header;