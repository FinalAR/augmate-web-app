import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import '../assets/css/profile.css'

const About = () => {
  return (
    <div className="container mt-1">
       <Card className="p-4">
       <CardTitle tag="h5">My Profile</CardTitle>
    <div className="row p-3">
        <div className="col-lg-4 pb-5 my-auto">
            <div className="author-card pb-3">
                {/* <div className="author-card-cover" style="background-image: url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg);"><a className="btn btn-style-1 btn-white btn-sm" href="#" data-toggle="tooltip" title="" data-original-title="You currently have 290 Reward points to spend"><i className="fa fa-award text-md"></i>&nbsp;290 points</a></div> */}
                <div className="author-card-profile">
                    <div className="author-card-avatar"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Daniel Adams" />
                    </div>
                    <div className="author-card-details">
                        <h5 className="author-card-name text-lg">Daniel Adams</h5><span className="author-card-position">Joined February 06, 2017</span>
                    </div>
                </div>
            </div>
        </div>
       
        <div className="col-lg-8 pb-5">
            <form className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label for="account-fn">First Name</label>
                        <input className="form-control mt-1" type="text" id="account-fn" value="Daniel" required="" />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label for="account-ln">Last Name</label>
                        <input className="form-control mt-1 mt-1" type="text" id="account-ln" value="Adams" required="" />
                    </div>
                </div>
                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label for="account-email">E-mail Address</label>
                        <input className="form-control mt-1" type="email" id="account-email" value="daniel.adams@example.com" disabled="" />
                    </div>
                </div>
                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label for="account-phone">Phone Number</label>
                        <input className="form-control mt-1" type="text" id="account-phone" value="+7 (805) 348 95 72" required="" />
                    </div>
                </div>
                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label for="account-pass">New Password</label>
                        <input className="form-control mt-1" type="password" id="account-pass" />
                    </div>
                </div>
                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label for="account-confirm-pass">Confirm Password</label>
                        <input className="form-control mt-1" type="password" id="account-confirm-pass" />
                    </div>
                </div>
                <div className="col-12">
                    {/* <hr className="mt-2 mb-3"> */}
                    <div className="d-flex flex-wrap justify-content-end align-items-center /">
                        {/* <div className="custom-control custom-checkbox d-block">
                            <input className="custom-control-input" type="checkbox" id="subscribe_me" checked="" />
                            <label className="custom-control-label" for="subscribe_me">Subscribe me to Newsletter</label>
                        </div> */}
                        <button className="btn btn-style-1 btn-primary mt-3" type="button" data-toast="" data-toast-position="topRight" data-toast-type="success" data-toast-icon="fe-icon-check-circle" data-toast-title="Success!" data-toast-message="Your profile updated successfuly.">Update Profile</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </Card>
</div>
  );
};

export default About;
