import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/DotLoader'
import Modal from 'react-modal';
import InputColor from 'react-input-color';
import conf from '../../utils/Config';
import countries from '../../utils/Country';
import us_states from '../../utils/States';
import { addJob } from '../../utils/Requests';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
const stripePromise = loadStripe(conf.stripe_p_key);
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; 
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

function PostAJobPage( props ) {
    const router = useRouter();
    const logoFileInput = React.createRef();
    const stripe = props.stripe;
    const elements = props.elements;
    const [state, setState] = React.useState({
        isOpen: false,
        isLoading: false,
        isFormError: false,
        isCreatedJob: false,
        showModal:false,
        resMessage: 'All fields are required',
        isValidOrganization: true,
        isValidTitle: true,
        isValidPrimaryTag:true,
        isValidTag: true,
        isValidBrief: true,
        isValidCountry: true,
        isValidCity: true,
        isValidLogo:true,
        isValidSalary: true,
        isValidCoEmail:true,
        isValidCoTwitter: true,
        isValidDescription: true,
        isValidHowToApply:true,
        isValidLink: true,
        isValidInvAddress:true,
        isValidState:true,
        organization:'',
        title:'',
        primaryTag:'',
        tag:'',
        brief:'',
        country:'',
        state:'',
        city:'',
        showlogo:true,
        matchJob:true,
        bumpTofront:false,
        showInYellow:false,
        showInBrand:false,
        stickyDay:false,
        stickyWeek:false,
        stickyMonth:false,
        selectedColor:'',
        logo:'',
        salaryRange:'',
        coEmail:'',
        coTwitter:'',
        description:'',
        howToApply:'',
        link:'',
        invAddress:'',
        invAmount:parseInt(conf.job_cost)+parseInt(conf.job_cost_logo),
        remote:false,
    });
    const closeMessageModal = () => {
        setState({...state, showModal:false});
    }
    const handleInvAddressChange = (event) => {
        const v = event.target.value;
        if ( v.length >= 3) {
            setState({...state, invAddress: v, isValidInvAddress: true});
        }
        else {
            setState({...state, invAddress: v, isValidInvAddress: false});
        }
    }
    const handleOrganizationChange = (event) => {
        const v = event.target.value;
        if ( v.length >= 2) {
            setState({...state, organization: v, isValidOrganization: true});
        }
        else {
            setState({...state, organization: v, isValidOrganization: false});
        }
    }
    const handleTitleChange = (event) => {
        const v = event.target.value;
        if ( v.length >= 3) {
            setState({...state, title: v, isValidTitle: true});
        }
        else {
            setState({...state, title: v, isValidTitle: false});
        }
    }
    const handlePrimaryTagChange = (event) => {
        const v = event.target.value;
        if ( v.length >= 2 && v !== 'nn') {
            setState({...state, primaryTag: v, isValidPrimaryTag: true});
        }
        else {
            setState({...state, primaryTag: v, isValidPrimaryTag: false});
        }
    }
    const handleTagChange = (event) => {
        const v = event.target.value;
        if ( v.length >= 10) {
            setState({...state, tag: v, isValidTag: true});
        }
        else {
            setState({...state, tag: v, isValidTag: false});
        }
    }
    const handleBriefChange = (event) => {
        const v = event.target.value;
        if ( v.length >= 3) {
            setState({...state, brief: v, isValidBrief: true});
        }
        else {
            setState({...state, brief: v, isValidBrief: false});
        }
    }
    const handleCountryChange = (event) => {
        const v = event.target.value;
        if ( v.length >= 2 && v !== 'nn')
        {
            setState({...state, country: v, isValidCountry: true});
        }
        else {
            setState({...state, country: v, isValidCountry: false});
        }
    }
    const handleStateChange = (event) => {
        const v = event.target.value;
        setState({...state, state: v, isValidState: true});
    }
    const handleCityChange = (event) => {
        const v = event.target.value;
        if ( v.length >= 2) {
            setState({...state, city: v, isValidCity: true});
        }
        else {
            setState({...state, city: v, isValidCity: false});
        }
    }
    const handleShowLogoChange = (event) => {
        const target = event.target;
        if( target.checked ) {
            setState({...state, showlogo: true, invAmount: state.invAmount+parseInt(conf.job_cost_logo)});
        }
        else {
            if(window.confirm('Are you sure you want hide your company logo? Job Posts without a company logo get 2x less views')) {
                setState({...state, showlogo: false, invAmount: state.invAmount-parseInt(conf.job_cost_logo)});
            }
        }
    }
    const handleMatchJobChange = (event) => {
        const target = event.target;
        if( target.checked ) {
            setState({...state, matchJob: true});
        }
        else {
            setState({...state, matchJob: false});
        }
    }
    const handleBumpTofrontChange = (event) => {
        const target = event.target;
        if( target.checked ) { 
            setState({...state, bumpTofront: true});
        }
        else {
            setState({...state, bumpTofront: false});
        }
    }
    const handleShowInYellowChange = (event) => {
        const target = event.target;
        if(state.showInBrand) {
            let amount = parseInt(state.invAmount - conf.job_cost_bcolor);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_yellow);
                setState({...state, showInYellow: true, invAmount: amount, showInBrand:false});
            }
            else {
                setState({...state, invAmount: amount, showInYellow: false});
            }
        }
        else {
            let amount = parseInt(state.invAmount);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_yellow);
                setState({...state, showInYellow: true, invAmount: amount, showInBrand:false});
            }
            else {
                amount = parseInt(amount - conf.job_cost_yellow);
                setState({...state, invAmount: amount, showInYellow: false});
            } 
        }
    }
    const handleShowInBrandChange = (event) => {
        const target = event.target;
        if(state.showInYellow){
            let amount = parseInt(state.invAmount - conf.job_cost_yellow);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_bcolor);
                setState({...state, showInBrand: true, invAmount: amount, showInYellow:false});
            }
            else {
                setState({...state, invAmount: amount, showInBrand:false});
            }
        }
        else {
            let amount = parseInt(state.invAmount);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_bcolor);
                setState({...state, showInBrand: true, invAmount: amount, showInYellow:false});
            }
            else {
                amount = parseInt(amount - conf.job_cost_bcolor);
                setState({...state, invAmount: amount, showInBrand:false});
            } 
        }
    }
    const handleStickyDayChange = (event) => {
        const target = event.target;
        if(state.stickyWeek){ 
            let amount = parseInt(state.invAmount - conf.job_cost_sticky_week);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_sticky_day);
                setState({...state, stickyDay: true, invAmount: amount, stickyWeek:false, stickyMonth:false});
            }
            else {
                setState({...state, invAmount: amount, stickyDay:false});
            }
        }
        else if ( state.stickyMonth ) {
            let amount = parseInt(state.invAmount - conf.job_cost_sticky_month);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_sticky_day);
                setState({...state, stickyDay: true, invAmount: amount, stickyWeek:false, stickyMonth:false});
            }
            else {
                setState({...state, invAmount: amount, stickyDay:false});
            }
        }
        else {
            let amount = parseInt(state.invAmount);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_sticky_day);
                setState({...state, stickyDay: true, invAmount: amount, stickyWeek:false, stickyMonth:false});
            }
            else {
                amount = parseInt(amount - conf.job_cost_sticky_day);
                setState({...state, invAmount: amount, stickyDay:false});
            } 
        }
    }
    const handleStickyWeekChange = (event) => {
        const target = event.target;
        if(state.stickyDay){
            let amount = parseInt(state.invAmount - conf.job_cost_sticky_day);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_sticky_week);
                setState({...state, stickyWeek: true, invAmount: amount, stickyDay:false, stickyMonth:false});
            }
            else {
                setState({...state, invAmount: amount, stickyWeek:false});
            }
        }
        else if ( state.stickyMonth ) {
            let amount = parseInt(state.invAmount - conf.job_cost_sticky_month);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_sticky_week);
                setState({...state, stickyWeek: true, invAmount: amount, stickyDay:false, stickyMonth:false});
            }
            else {
                setState({...state, invAmount: amount, stickyWeek:false});
            }
        }
        else {
            let amount = parseInt(state.invAmount);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_sticky_week);
                setState({...state, stickyWeek: true, invAmount: amount, stickyDay:false, stickyMonth:false});
            } 
            else { 
                amount = parseInt(amount - conf.job_cost_sticky_week);
                setState({...state, invAmount: amount, stickyWeek:false});
            } 
        }
    }
    const handleStickyMonthChange = (event) => {
        const target = event.target;
        if(state.stickyDay){
            let amount = parseInt(state.invAmount - conf.job_cost_sticky_day);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_sticky_month);
                setState({...state, stickyMonth: true, invAmount: amount, stickyDay:false, stickyWeek:false});
            }
            else {
                setState({...state, invAmount: amount, stickyMonth:false});
            }
        }
        else if ( state.stickyWeek ) {
            let amount = parseInt(state.invAmount - conf.job_cost_sticky_week);
            if( target.checked )
            {
                amount = parseInt(amount + conf.job_cost_sticky_month);
                setState({...state, stickyMonth: true, invAmount: amount, stickyWeek:false, stickyDay:false});
            }
            else {
                setState({...state, invAmount: amount, stickyMonth:false});
            }
        }
        else {
            let amount = parseInt(state.invAmount);
            if( target.checked ) {
                amount = parseInt(amount + conf.job_cost_sticky_month);
                setState({...state, stickyMonth: true, invAmount: amount, stickyDay:false, stickyWeek:false});
            }
            else {
                amount = parseInt(amount - conf.job_cost_sticky_month);
                setState({...state, invAmount: amount, stickyMonth:false});
            } 
        }   
    }
    const handleSelectedColorChange = (color) => {
        console.log(color);
        setState({...state, selectedColor: color.hex});
    }
    const handleSalaryRangeChange = (event) => {
        const v = event.target.value;
        if ( v.length >= 2) {
            setState({...state, salaryRange: v, isValidSalary: true});
        }
        else  {
            setState({...state, salaryRange: v, isValidSalary: false});
        }
    }
    const handleCoEmailChange = (event) => {
        const v = event.target.value;
        if ( isValidEmailAddress(v) ) {
            setState({...state, coEmail: v, isValidCoEmail: true});
        }
        else  {
            setState({...state, coEmail: v, isValidCoEmail: false});
        }
    }
    const handleCoTwitterChange = (event) => {
        const v = event.target.value;
        if ( v.length >= 2) {
            setState({...state, coTwitter: v, isValidCoTwitter: true});
        }
        else {
            setState({...state, coTwitter: v, isValidCoTwitter: false});
        }
    }
    const handleDescriptionChange = (content) => {
        const v = content;
        if ( v.length >= 20) {
            setState({...state, description: v, isValidDescription: true});
            // forceUpdate();
        }
        else {
            setState({...state, description: v, isValidDescription: false});
            // forceUpdate();
        }
    }
    const handleHowtoApplyChange = (content) => {
        const v = content;
        if ( v.length >= 10) {
            setState({...state, howToApply: v, isValidHowToApply: true});
            // forceUpdate();
        }
        else {
            setState({...state, howToApply: v, isValidHowToApply: false});
            // forceUpdate();
        }
    }
    const handleLinkChange = (event) => {
        const v = event.target.value;
        if( isValidHttpUrl(v)  || isValidEmailAddress(v) ) {
            setState({...state, link: v, isValidLink:true});
        }
        else {
            setState({...state, link: v, isValidLink:false});
        }
    }
    const handleRemoteChange = (event) => {
        const v = event.target.value;
        const c = event.target.checked;
        if( c ) {
            setState({...state, remote: v});
        }
    }
    const handleLogoChange = (event) => {
        setState({...state, logo: event.target.files[0] });
    }
    const isValidHttpUrl = (string) => {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;  
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    const isValidEmailAddress = (email) => {
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            return true;
        }
        return false;
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            /** stripe not loaded */
            return;
        }
        setState({...state, logo: logoFileInput.current.files[0] });
        setState({...state, isLoading: true});
        if( 
            state.isValidOrganization && 
            state.isValidTitle &&
            state.isValidPrimaryTag &&
            state.isValidTag &&
            state.isValidBrief &&
            state.isValidCountry &&
            state.isValidCity && 
            state.isValidSalary &&
            state.isValidCoEmail &&
            state.isValidDescription && 
            state.isValidHowToApply &&
            state.isValidLink &&
            state.invAmount !== 0
        )
        {
            let postData = new FormData();
            postData.append('logo',state.logo);
            postData.append('organization',state.organization);
            postData.append('title',state.title);
            postData.append('primary_tag',state.primaryTag);
            postData.append('tags',state.tag);
            postData.append('brief',state.brief);
            postData.append('description',state.description);
            postData.append('location',state.city + ', ' + state.country);
            postData.append('remote',state.remote);
            postData.append('state',state.state);
            postData.append('link',state.link);
            postData.append('source','none-specified');
            postData.append('co_mail',state.coEmail);
            postData.append('co_twitter',state.coTwitter);
            postData.append('howto',state.howToApply);
            postData.append('salary',state.salaryRange);
            postData.append('show_logo',state.showlogo);
            postData.append('bump',state.bumpTofront);
            postData.append('match',state.matchJob);
            postData.append('yellow_it',state.showInYellow);
            postData.append('inv_address', state.invAddress);
            postData.append('brand_color', state.showInBrand);
            postData.append('sticky_day', state.stickyDay);
            postData.append('sticky_week', state.stickyWeek);
            postData.append('sticky_month', state.stickyMonth);
            postData.append('selected_color', state.selectedColor);
            
            /** log state */
            /** create stripe pay method */
            const cardElement = elements.getElement(CardElement);
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });
            if (error) {
                console.log('[error]', error);
                setState({...state, isLoading: false, isFormError: true, isCreatedJob: false, resMessage: 'Card Error. Stripe Could not verify your card information. Please use Visa or Mastercard', showModal:true});
                return;
            } else {
                // console.log('[PaymentMethod]', paymentMethod);
                let payment_method = paymentMethod.id;
                postData.append('payment_method', payment_method);
                postData.append('inv_amount', state.invAmount);
                addJob(postData)
                .then( (res) => {
                    console.log(res);
                    if ( res.status === 200 )
                    {
                        setState({
                            organization:'',
                            title:'',
                            primaryTag:'',
                            tag:'',
                            brief:'',
                            country:'',
                            state:'',
                            city:'',
                            selectedColor:'',
                            salaryRange:'',
                            coEmail:'',
                            coTwitter:'',
                            description:'',
                            howToApply:'',
                            link:'',
                            invAddress:'',
                            isLoading: false,
                            isFormError: false,
                            isCreatedJob: true,
                            resMessage: res.message, 
                            showModal:true
                        });
                    }
                    else
                    {
                        setState({...state, isLoading: false, isFormError: true, isCreatedJob: false, resMessage: res.message, showModal:true});
                    }
                })
                .catch( (error) => {
                    console.log(error);
                    setState({...state, isLoading: false, isFormError: true, isCreatedJob: false, resMessage: JSON.stringify(error), showModal:true });
                });
                // console.log(state);
                event.preventDefault();
                return;
            }
        }
        else 
        {
            setState({...state, isFormError: true, showModal:true, isLoading: false});
            return;
            // setState({...state, });
        }
    }
    const customStyles = {
        content : {
            top: '50%',
            left: '50%',
            height:150,
            width:'40%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            borderRadius:20,
            transform: 'translate(-50%, -50%)',
        },
        overlay: {zIndex: 1000}
    };
    const customStylesB = {
        content : {
            top: '50%',
            left: '50%',
            height:150,
            width:'40%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            borderRadius:20,
            borderWidth:0,
            transform: 'translate(-50%, -50%)',
        },
        overlay: {zIndex: 1000}
    };
    React.useEffect(() => {
        return () => {

        }
    }, []);

    return (
        <Layout>
        {/* Banner start */}
        <div className="dez-bnr-inr dez-bnr-inr-md" style={{backgroundImage: 'url(/static/assets/template/images/main-slider/slide2.jpg)', height:200, maxHeight:200}}>
            <div className="container">
            <div className="dez-bnr-inr-entry align-m ">
                <div className="find-job-bx">
                <h2>Post Your Healthcare Job</h2>
                {/* modals */}
                    <Modal ariaHideApp={false} isOpen={state.showModal} contentLabel="Error message" style={customStyles}>
                        <button onClick={closeMessageModal} className="close-btn"> X </button>
                        { state.isFormError === true && (
                        <p className="error-custom">{state.resMessage}</p>
                        )}
                        { state.isCreatedJob === true && (
                            <p className="succ-custom">{state.resMessage}</p>
                        )}
                    </Modal>
                    <Modal ariaHideApp={false} isOpen={state.isLoading} contentLabel="Loading" style={customStylesB}>
                        <LoadingOverlay active={true} spinner={<BounceLoader />}></LoadingOverlay>
                    </Modal>
                {/* end modals */}
                </div>
            </div>
            </div>
        </div>
        {/* post a job form */}
        <form className="registration-form" onSubmit={(e) => handleSubmit(e)}>
            <div className="section-full bg-white content-inner-2">
                <div className="container">
                    <div className="d-flex job-title-bx section-head">
                    <div className="mr-auto">
                        {/* <h2 className="m-b5">{ "Post Your Healthcare Job" }</h2> */}
                        <h6 className="fw4 m-b0">{ "With healingcarejobs, you can reach thousands of healthcare professionals" }</h6>
                    </div>
                    <div className="align-self-end">
                        {/* <a href={ props.homelink } className="site-button button-sm">latest at top <i className="fa fa-long-arrow-right" /></a> */}
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="post-job-bx">
                                {/* form fields */}
                                <div className="row form-inner">
                                    {/* <div className="col-lg-12">
                                        <p className="text-center section-label">Let's Start</p>
                                    </div> */}
                                    <div className="col-lg-12" title="Let's Start">
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Company Name*
                                            </label>
                                            <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={state.organization} onChange={(e) => handleOrganizationChange(e)} />
                                            <small className="text-muted">Your company's brand/trade name: without Inc., Ltd., B.V., Pte., etc.</small><br></br>
                                            { state.isValidOrganization === false && (
                                                <small className="error-custom">enter valid organization</small>
                                            )}
                                        </div>

                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Job Position*
                                            </label>
                                            <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={state.title} onChange={(e) => handleTitleChange(e)} />
                                            <span className="text-muted">Please specify as single job position like "Lead Oncologist".</span><br></br>
                                            { state.isValidTitle === false && (
                                                <small className="error-custom">enter valid job title</small>
                                            )}
                                        </div>

                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Primary Job Tag*
                                            </label>
                                            <select className="form-control input-ios" id="exampleFormControlInput1" value={state.primaryTag} onChange={(e) => handlePrimaryTagChange(e)}>
                                                <option value="nn">Select Primary Tag</option>
                                                <option value="Medical-Doctor">Medical Doctor</option>
                                                <option value="Nursing">Nursing</option>
                                                <option value="Pharmacy">Pharmacy</option>
                                                <option value="Surgeon">Surgeon</option>
                                                {/* <option value="Hospital Finance">Hospital Finance</option> */}
                                                <option value="Health-Records">Health Records</option>
                                                <option value="Scanning">X-ray & Scanning </option>
                                                <option value="Maternal-Health">Maternal Health</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <span className="text-muted">This primary tag shows first and increases visibility in the main sections.</span>
                                            <br></br>
                                            { state.isValidPrimaryTag === false && (
                                                <small className="error-custom">select valid tag</small>
                                            )}
                                        </div>

                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Extra Tags (comma separated)*
                                            </label>
                                            <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={state.tag} onChange={(e) => handleTagChange(e)} />
                                            <span className="text-muted">Use tags related to the job e.g. Nursing, Medicine, Accounts</span>
                                            <br></br>
                                            { state.isValidTag === false && (
                                                <small className="error-custom">enter valid tags, a comma list</small>
                                            )}
                                        </div>


                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Short Description*
                                            </label>
                                            <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={state.brief} onChange={(e) => handleBriefChange(e)} />
                                            <span className="text-muted">Use this field to add a brief description of your job.</span><br></br>
                                            { state.isValidBrief === false && (
                                                <small className="error-custom">enter valid job description</small>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Country*
                                            </label>
                                            <select className="form-control input-ios" id="exampleFormControlInput1" value={state.country} onChange={(e) => handleCountryChange(e)}>
                                                <option value="nn">Select Country</option>
                                                {countries.data.map((e, key) => {
                                                    return <option key={key} value={e.name}>{e.name}</option>;
                                                })}
                                            </select>
                                            <span className="text-muted">Country where this job is available. This helps your job's visibility to relevant potential employee(s). Select one from the list.</span><br></br>
                                            { state.isValidCountry === false && (
                                                <small className="error-custom">select valid country</small>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                State (Ignore if not in USA)
                                            </label>
                                            <select className="form-control input-ios" id="exampleFormControlInput1" value={state.state} onChange={(e) => handleStateChange(e)}>
                                                <option value="nn">Select State</option>
                                                {us_states.data.map((e, key) => {
                                                    return <option key={key} value={e.name}>{e.name}</option>;
                                                })}
                                            </select>
                                            <span className="text-muted">This applies to US jobs. (Ignore  this field if you are not in USA.</span><br></br>
                                            { state.isValidState === false && (
                                                <small className="error-custom">select a valid state</small>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                City/Town*
                                            </label>
                                            <input placeholder="e.g. New York" type="text" className="form-control input-ios" id="exampleFormControlInput1" value={state.city} onChange={(e) => handleCityChange(e)} />
                                            <span className="text-muted">Narrow your job target location by providing the city in which the hired employee will be stationed. This improves your visibility on <u><b>HealingCareJobs</b></u></span><br></br>
                                            { state.isValidCity === false && (
                                                <small className="error-custom">enter valid city/town</small>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Section --------- badges */}
                                <div className="row form-inner">
                                    {/* <div className="col-lg-12">
                                        <p className="text-center section-label">Design Your Job</p>
                                    </div> */}
                                    <div className="col-lg-12">
                                        <div className="form-group mb-2">
                                            <input name="badge" type="checkbox" checked={state.showlogo} onChange={(e) => handleShowLogoChange(e)} /><span className="badge-label">Show my ⭐️ company logo besides my job post(+${conf.job_cost_logo}) 
                                            <span className="benefit-badge">2x More views</span>
                                            <span className="rec-badge">Highly Recommended</span>
                                            </span>
                                        </div>
                                        <div className="form-group mb-2">
                                            <input name="badge" type="checkbox" checked={state.matchJob} onChange={(e) => handleMatchJobChange(e)} /><span className="badge-label">Get matched with suitable applicants from our <u>Network of 5000+ subscribers</u></span>
                                        </div>
                                        {/* <div className="form-group mb-2">
                                            <input name="badge" type="checkbox" checked={state.bumpTofront} onChange={(e) => handleBumpTofrontChange} />
                                            <span className="badge-label">Auto renew my job post and bump it to the frontpage after 30 days</span>
                                        </div> */}
                                        <div className="form-group mb-2">
                                            <input name="badge" type="checkbox" onChange={(e) => handleShowInYellowChange(e)} checked={state.showInYellow} /><span className="badge-label">
                                                Highlight your post in ⚠️ yellow (+${conf.job_cost_yellow})
                                                <span className="benefit-badge" title="Based on previous job post data compared to a regular job post">2x More views</span>
                                            </span>
                                        </div>
                                        <div className="form-group mb-2">
                                            <input name="badge1" type="checkbox" onChange={(e) => handleShowInBrandChange(e)} checked={state.showInBrand} /><span className="badge-label">
                                                Highlight with your company's 🌈 brand color(+${conf.job_cost_bcolor}) 👉
                                                <InputColor initialValue="#9c1010" onChange={(e) => handleSelectedColorChange(e)} placement="right"/>
                                                <span className="benefit-badge" title="Based on previous job post data compared to a regular job post">3x More views</span>
                                            </span>
                                        </div>
                                        <div className="form-group mb-2">
                                            <input name="badge2" type="checkbox" onChange={(e) => handleStickyDayChange(e)} checked={state.stickyDay} /><span className="badge-label">
                                                Sticky your post so it stays on 📎 top of the frontpage for ⏰ 24 hours (+${conf.job_cost_sticky_day})
                                                <span className="benefit-badge" title="Based on previous job post data compared to a regular job post">2x More views</span>
                                            </span>
                                        </div>
                                        <div className="form-group mb-2">
                                            <input name="badge3" type="checkbox" onChange={(e) => handleStickyWeekChange(e)} checked={state.stickyWeek} /><span className="badge-label">
                                                Sticky your post so it stays on 📎 top of the frontpage for 🗓 1 entire week (+${conf.job_cost_sticky_week})
                                                <span className="benefit-badge" title="Based on previous job post data compared to a regular job post">6x More views</span>
                                            </span>
                                        </div>
                                        <div className="form-group mb-2">
                                            <input name="badge" type="checkbox" onChange={(e) => handleStickyMonthChange(e)} checked={state.stickyMonth} /><span className="badge-label">
                                                Sticky your post so it stays on 📎 top of the frontpage for 🗓 1 entire month (+${conf.job_cost_sticky_month})
                                                <span className="benefit-badge" title="Based on previous job post data compared to a regular job post">9x More views</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/* ----- Section ---- job details */}
                                <div className="row form-inner">
                                    {/* <div className="col-lg-12">
                                        <p className="text-center section-label">Job Details</p>
                                    </div> */}
                                    <div className="col-lg-12">
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Company Logo (png or jpg)*
                                            </label>
                                            <input ref={logoFileInput} type="file" onChange={(e) => handleLogoChange(e)} className="form-control input-ios" id="exampleFormControlInput1" />
                                            { state.isValidLogo === false && (
                                                <small className="error-custom">upload valid image</small>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Annual Salary Range(USD) *
                                            </label>
                                            <input type="text" placeholder="e.g. 55k-120k" className="form-control input-ios" id="exampleFormControlInput1" value={state.salaryRange} onChange={(e) => handleSalaryRangeChange(e)} />
                                            <span className="text-muted">Not required but HIGHLY recommended, because Google does NOT index jobs without salary data.</span><br></br>
                                            { state.isValidSalary === false && (
                                                <small className="error-custom">enter a valid range</small>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Company Email (stays private, for edit link)*
                                            </label>
                                            <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={state.coEmail} onChange={(e) => handleCoEmailChange(e)} />
                                            <span className="text-muted">Make sure this email is accessible by you! We use this to send the edit link. We can not and do not manually resend it!</span><br></br>
                                            { state.isValidCoEmail === false && (
                                                <small className="error-custom">enter a valid email</small>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Company Twitter Handle(optional)
                                            </label>
                                            <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={state.coTwitter} onChange={(e) => handleCoTwitterChange(e)} />
                                            <span className="text-muted">Twitter username without @. Not required, but used to tag your company when we tweet out your job post.</span><br></br>
                                            { state.isValidCoTwitter === false && (
                                                <small className="error-custom">enter a valid email</small>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Job Description*
                                            </label>
                                            <SunEditor onChange={(e) => handleDescriptionChange(e) } name={"description"} />
                                            <br></br>
                                            { state.isValidDescription === false && (
                                                <small className="error-custom">enter valid job description</small>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                How to Apply*
                                            </label>
                                            <SunEditor onChange={(e) => handleHowtoApplyChange(e) } name={"howto"} />
                                            <br></br>
                                            { state.isValidHowToApply === false && (
                                                <small className="error-custom">enter valid process</small>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Applications submission Link or Email*
                                            </label>
                                            <input type="text" className="form-control input-ios" id="exampleFormControlInput1" value={state.link} onChange={(e) => handleLinkChange(e)} />
                                            <br></br>
                                            { state.isValidLink === false && (
                                                <small className="error-custom">enter a valid job link</small>
                                            )}
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Company Credit Card*
                                            </label>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-control input-ios">
                                                        <CardElement
                                                        options={{
                                                            style: {
                                                            base: {
                                                                fontSize: '16px',
                                                                backgroundColor:'#ffffff',
                                                                borderWidth:3,
                                                                borderColor:'#000000',
                                                                color: '#424770',
                                                                '::placeholder': {
                                                                color: '#aab7c4',
                                                                },
                                                            },
                                                            invalid: {
                                                                color: '#9e2146',
                                                            },
                                                            },
                                                        }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <span className="text-muted">
                                                        🔐 Secure payment guaranteed by Stripe over HTTPS
                                                        <br></br>
                                                        💳 Card is only charged when you press "Post your Job"
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Invoice Address *
                                            </label>
                                            <input type="text" placeholder="e.g. your company's full name and full invoice address, including building, street, including country." className="form-control input-ios" id="exampleFormControlInput1" value={state.invAddress} onChange={(e) => handleInvAddressChange(e)} />
                                            <span className="text-muted">
                                                If you specify your company address here, we'll put it on the Stripe receipt + invoice for your bookkeeping. We CANNOT add or edit this later for you. Make sure it's right.
                                            </span>
                                            <br></br>
                                            { state.isValidInvAddress === false && (
                                                <small className="error-custom">enter a valid address</small>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-4">
                                            <label htmlFor="exampleFormControlInput1" className="flabel">
                                                Work Type*
                                            </label>
                                            <fieldset className="form-group">
                                                <div className="form-check">
                                                    <label className="radio-custom-left form-check-label">
                                                        <input onChange={(e) => handleRemoteChange(e)} name="remoteOpt" type="radio" className="form-check-input" value="1"></input> Remote job
                                                    </label>
                                                    <br></br>
                                                    <label className="form-check-label">
                                                        <input onChange={(e) => handleRemoteChange(e)} name="remoteOpt" type="radio" className="form-check-input" value="0" checked={true}></input> Office based job
                                                    </label>
                                                </div>
                                            </fieldset>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <button style={{fontSize:20,padding:20,fontWeight:'900'}} disabled={!stripe} type="submit" className="site-button bg-danger"> Post Your Job - ${state.invAmount} </button>
                                    </div>
                                </div>

                                {/* end form fields */}
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="sticky-top">
                                
                                <div className="candidates-are-sys m-b30">
                                    <div className="candidates-bx">

                                        <div className="testimonial-piic">
                                            <button style={{fontSize:20,padding:20,fontWeight:'900'}} disabled={!stripe} type="submit" className="site-button bg-danger"> Post Your Job - ${state.invAmount} </button>
                                            <hr></hr>
                                            <p>
                                                <b>HealingCareJobs</b> Is The Only Website Dedicated Exclusively To Healthcare Jobs. <b>HCJ</b> Unites A Million Strong Community Of Compassionate And Driven Professionals From Health Care Companies such as:-
                                            </p>
                                            <img src="/static/assets/template/partners/ame.png" width={200} height={70}/>
                                            <img src="/static/assets/template/partners/cigna.png" width={200} height={70}/>
                                            <img src="/static/assets/template/partners/cvs.png" width={200} height={70}/>
                                            <img src="/static/assets/template/partners/cad.png" width={200} height={70}/>
                                            <img src="/static/assets/template/partners/mc.png" width={200} height={70}/>
                                            <img src="/static/assets/template/partners/wal.png" width={200} height={70}/>
                                            <img src="/static/assets/template/partners/jj.jpeg" width={200} height={70}/>
                                            <img src="/static/assets/template/partners/united.jpg" width={200} height={70}/>
                                            <img src="/static/assets/template/partners/ant.jpg" width={200} height={70}/>
                                        </div>
                                        <br></br>
                                        <div className="widget border-0">
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        {/* end post a job form */}
        </Layout>
    );
}
const InjectedSectionForm = () => {
    return (
      <ElementsConsumer>
        {({elements, stripe}) => (
          <PostAJobPage elements={elements} stripe={stripe} />
        )}
      </ElementsConsumer>
    );
  };
  
  const Section = () => {
    return (
        <React.Fragment>
            <Elements stripe={stripePromise}>
                <InjectedSectionForm />
            </Elements>
        </React.Fragment>
    );
  };
export default Section;