import React, { useState, useEffect } from "react";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(prevProgress + diff, 100);
        });
      }, 2000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [loading]);

  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Inputs.email.trim() || !Inputs.password.trim()) {
      Swal({
        icon: "warning",
        title: "Please fill out all fields.",
        button: "OK",
      });
      return;
    }
    console.log(Inputs);
    setLoading(true);
    setProgress(0);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/signin",
        Inputs
      );
      console.log("This is response", response.data._id);
      console.log(response.data._id);
      sessionStorage.setItem("id", response.data._id);

      console.log("Role is" + response.data.role);
      if (response.data.role === "buyer") {
        setProgress(100);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else if (response.data.role === "seller") {
        setProgress(100);
        setTimeout(() => {
          navigate("/seller");
        }, 2000);
      }
      sessionStorage.setItem("id", response.data._id);
      const username = response.data.username;
      const usermail = response.data.email;
      localStorage.setItem("username", username);
      localStorage.setItem("usermail", usermail);
      console.log(username);
      console.log(usermail);
      Swal({
        icon: "success",
        title: "Logged In Successfully.",
        button: "OK",
      });
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.message === "User not found.") {
        Swal({
          icon: "error",
          title: "User not found. Please check your email address.",
          button: "Try Again",
        });
      }
    }
  };

  return (
    <div className={styles.form_container}>
      {loading ? (
        <div className={styles.loader_container}>
          <CircularProgressbar
            value={progress}
            text={`${progress.toFixed(0)}%`}
            styles={{
              text: {
                fill: "#ffff",
              },
              trail: {
                stroke: "#ffff",
              },
              path: {
                stroke: "458393",
                strokeLinecap: "round",
              },
            }}
          />
        </div>
      ) : (
        <div className={styles.loader_container} style={{ display: "none" }}>
          <CircularProgressbar value={progress} text={`${progress}%`} />
        </div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.login_heading}>Login</h2>
        <div className={styles.form_control}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={Inputs.email}
            onChange={change}
          />
          <div className={styles.icon}>
            <MdOutlineAlternateEmail />
          </div>
        </div>
        <div className={styles.form_control}>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={Inputs.password}
            onChange={change}
          />
          <div className={styles.icon}>
            <RiLockPasswordFill />
          </div>
        </div>
        <button className={styles.login_btn} type="submit">
          Login
        </button>
        <p className={styles.login_p}>
          Don't have an account?
          <Link to="/signup" className={styles.login_link}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
