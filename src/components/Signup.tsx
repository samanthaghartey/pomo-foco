import React, { useRef } from "react";

const Signup = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  return (
    <>
      <div className="w-1/3 bg-primary-light p-2 mt-4 rounded-sm text-sm text-myaccent">
        <h2 className="text-center mb-2">Sign Up</h2>
        <form action="">
          <label htmlFor="email">Email</label>
          <input
            className="bg-white"
            type="email"
            name="email"
            id="email"
            ref={emailRef}
          />
          <label htmlFor="password">password</label>
          <input
            className="bg-white"
            type="password"
            name="password"
            id="password"
            ref={passwordRef}
          />
          <label htmlFor="passwordConfirm">password Confirm</label>
          <input
            className="bg-white"
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            ref={passwordConfirmRef}
          />
          <button type="submit" className=" bg-blue-50 rounded-sm m-2 p-2">
            Sign Up
          </button>
        </form>
      </div>
      <div className="w-100 text-center mt-2">
        Already have an account? Login
      </div>
    </>
  );
};

export default Signup;
