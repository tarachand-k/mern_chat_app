import React from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = React.useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  const [loading, signup] = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(inputs);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0 text-gray-300">
        <h1 className="text-3xl font-semibold text-center  mb-3">
          Sign Up <span className="text-blue-500">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname" className="label p-2">
              <span className="text-base label-text   text-gray-300">
                Fullname
              </span>
            </label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              value={inputs.fullName}
              onChange={(event) =>
                setInputs({ ...inputs, fullName: event.target.value })
              }
              placeholder="John Doe"
              className="w-full text-gray-300 input input-bordered h-10 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="label p-2">
              <span className="text-base label-text text-gray-300">
                Username
              </span>
            </label>
            <input
              name="username"
              id="username"
              type="text"
              value={inputs.username}
              onChange={(event) =>
                setInputs({ ...inputs, username: event.target.value })
              }
              placeholder="johndoe"
              className="w-full input input-bordered h-10 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="label p-2">
              <span className="text-base label-text text-gray-300">
                Password
              </span>
            </label>
            <input
              name="password"
              id="password"
              type="password"
              value={inputs.password}
              onChange={(event) =>
                setInputs({ ...inputs, password: event.target.value })
              }
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 placeholder:text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="cpassword" className="label p-2">
              <span className="text-base label-text text-gray-300">
                Confirm Password
              </span>
            </label>
            <input
              name="cpassword"
              id="cpassword"
              type="password"
              value={inputs.confirmPassword}
              onChange={(event) =>
                setInputs({ ...inputs, confirmPassword: event.target.value })
              }
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 placeholder:text-gray-500"
            />
          </div>
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
          <div>
            <button
              className="btn btn-block btn-sm  mt-8 bg-blue-600 border-blue-600"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          <Link
            to="/login"
            className="text-sm   hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
