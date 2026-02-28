import "./styles.css";
import Navbar, { NavProps } from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Cta from "../../components/cta/Cta";
const Registration = () => {
  return (
    <>
      <NavProps home="Home" gallery="Gallery" pricing="" register="Register" />
      <div className="registration-container">
        <div className="tag" id="fees">
          ENROLMENT
        </div>
        <h1 className="header">Registration</h1>
        <p className="subheader">
          Getting started is easy. Follow the steps below to enroll your child
          in our aftercare.
        </p>

        <div className="cards-container">
          <div className="card">
            <h1 className="step-number">1</h1>
            <h1>Download the Form</h1>
            <p>
              Click the button below to download our registration form in PDF
              format.
            </p>
          </div>
          <div className="card">
            <h1 className="step-number">2</h1>
            <h1>Fill it Out</h1>
            <p>
              Complete all sections inlcuding child information, emergency
              contacts, and medical details.
            </p>
          </div>
          <div className="card">
            <h1 className="step-number">3</h1>
            <h1>Create Your Parent Account</h1>
            <p>
              Once you have completed the form, return to our website and create
              your parent account.
            </p>
          </div>

          <div className="card">
            <h1 className="step-number">4</h1>
            <h1>Upload the Completed Form</h1>
            <p>
              During account creation, you will be required to upload your
              completed registration form (PDF format).
            </p>
          </div>
          <div className="card">
            <h1 className="step-number">5</h1>
            <h1>Application Review & Approval</h1>
            <p>
              Our administration team will carefully review your application.
              Once approved, you will receive confirmation email and sms.
            </p>
          </div>
        </div>

        <div className="form-container">
          <img src="/file.png" alt="" className="pdf-file" />
          <h1>Registration Form</h1>
          <p>
            PDF format, approx. 2 pages. Please Print and complete all fields
          </p>
          <a href="#" download>
            <button>
              <img src="/download.png" alt="" />
              Download Registration Form
            </button>
          </a>
          <p>Questions? Call us at 060 777 1984 or email motupams@gmail.com</p>
        </div>
      </div>

      {/* <Cta /> */}
      <Footer />
    </>
  );
};

export default Registration;
