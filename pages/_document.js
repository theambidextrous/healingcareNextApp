import Document, { Head, Main, NextScript } from 'next/document';

export default class HTDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        let props = { ...initialProps };

        return props;
    }

    render() {
        return (
            <html lang="en">
                <Head>
                    <meta charset="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="keywords" content />
                    <meta name="author" content />
                    <meta name="robots" content />
                    <meta name="description" content="HealingCareJobs - the only website dedicated exclusively to healthcare jobs. HCJ unites a million strong community of compassionate and driven professionals from Health care companies across America" />
                    <meta property="og:title" content="HealingCareJobs - the only website dedicated exclusively to healthcare jobs. HCJ unites a million strong community of compassionate and driven professionals from Health care companies across America" />
                    <meta property="og:description" content="HealingCareJobs - the only website dedicated exclusively to healthcare jobs. HCJ unites a million strong community of compassionate and driven professionals from Health care companies across America" />
                    <meta property="og:image" content="HealingCareJobs - the only website dedicated exclusively to healthcare jobs. HCJ unites a million strong community of compassionate and driven professionals from Health care companies across America" />
                    <meta name="format-detection" content="telephone=no" />
                    <link rel="icon" href="/static/assets/template/images/favicon.ico" type="image/x-icon" />
                    <link rel="shortcut icon" type="image/x-icon" href="/static/assets/template/images/favicon.png" />
                    <title>HealingCareJobs - The only website dedicated exclusively to healthcare jobs across states in the United States</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/template/css/plugins.css" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/template/css/style.css" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/template/css/templete.css" />
                    <link className="skin" rel="stylesheet" type="text/css" href="/static/assets/template/css/skin/skin-1.css" />
                    {/* <link rel="stylesheet" href="/static/assets/template/plugins/datepicker/css/bootstrap-datetimepicker.min.css" /> */}
                    {/* <link rel="stylesheet" type="text/css" href="/static/assets/template/plugins/revolution/revolution/css/layers.css" /> */}
                    {/* <link rel="stylesheet" type="text/css" href="/static/assets/template/plugins/revolution/revolution/css/settings.css" /> */}
                    {/* <link rel="stylesheet" type="text/css" href="/static/assets/template/plugins/revolution/revolution/css/navigation.css" /> */}
                </Head>
                <body id="bg">
                    <Main />
                    <NextScript />
                    <div id="loading-area"></div>
                    <div className="page-wraper">
                        <button className="scroltop fa fa-arrow-up" />
                    </div>
                    <script src="/static/assets/template/js/jquery.min.js"></script>
                    <script src="/static/assets/template/plugins/wow/wow.js"></script>
                    {/* <script src="/static/assets/template/plugins/bootstrap/js/popper.min.js"></script> */}
                    <script src="/static/assets/template/plugins/bootstrap/js/bootstrap.min.js"></script>
                    <script src="/static/assets/template/plugins/bootstrap-select/bootstrap-select.min.js"></script>
                    <script src="/static/assets/template/plugins/bootstrap-touchspin/jquery.bootstrap-touchspin.js"></script>
                    {/* <script src="/static/assets/template/plugins/magnific-popup/magnific-popup.js"></script> */}
                    {/* <script src="/static/assets/template/plugins/counter/waypoints-min.js"></script> */}
                    {/* <script src="/static/assets/template/plugins/counter/counterup.min.js"></script> */}
                    {/* <script src="/static/assets/template/plugins/imagesloaded/imagesloaded.js"></script> */}
                    {/* <script src="/static/assets/template/plugins/masonry/masonry-3.1.4.js"></script> */}
                    {/* <script src="/static/assets/template/plugins/masonry/masonry.filter.js"></script> */}
                    {/* <script src="/static/assets/template/plugins/owl-carousel/owl.carousel.js"></script> */}
                    {/* <script src="/static/assets/template/plugins/rangeslider/rangeslider.js" ></script> */}
                    <script src="/static/assets/template/js/custom.js"></script>
                    {/* <script src="/static/assets/template/js/dz.carousel.js"></script> */}
                    {/* <script src="/static/assets/template/js/dz.ajax.js"></script> */}
                    {/* <script src="/static/assets/template/plugins/paroller/skrollr.min.js"></script> */}
                </body>
            </html>
        )
    }
}