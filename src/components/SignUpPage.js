import React from 'react';
import './SignUpPage.css';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    return (
        <>
        <div className="Signup-Page">
            <div className="logo-box">
                <h2>Sign in to Movitix</h2>
                <Link to="/">
                <button>
                    <img src="./google.png" alt="logo" className="google"/>
                    Sign in with Google
                </button>
                </Link>
                <Link to="/">
                <button>
                    <img src="./apple.png" alt="logo" className="google"/>
                    Sign in with Apple
                </button>
                </Link>
    
                <hr></hr>
                <span>or</span>
    
                <form>
                    <input type="text" placeholder="Phone email or username" />
                    <Link to="/"><button>Next</button></Link>
                </form>
            </div>
        </div>
        </>
      );
};

export default SignUpPage;