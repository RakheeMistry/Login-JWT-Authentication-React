import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './Auth.module.css';
function Login(){
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{errors}, reset} = useForm();
    const submitCall = async (data) => {
        console.log(data);
        try{
            const response = await axios.post("http://localhost:5000/api/auth/login",data,{
                withCredentials:true
            });
            if(response.status == 200){
                alert("Login Successfull!");
                navigate('/userDetails');
            }
            reset();
        }
        catch(error){
            console.log(error);
        }
    };

    return(
        <div className={styles.authContainer}>
            <form className={styles.authForm} onSubmit={handleSubmit(submitCall)}>
                <h2 className={styles.authTitle}>Create an Account</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input id="email" type="text" className={styles.input} {...register("email",{
                        required: 'Email is required',
                        pattern:{
                            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address',
                        },
                    })}/>
                    {errors.email && <div className={styles.error}>{errors.email.message}</div>}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input id="password" type="password" className={styles.input} {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}/>
                    {errors.password && (
                        <div className={styles.error}>{errors.password.message}</div>
                    )}
                </div>
                <button type="submit" className={styles.submitButton}>Login</button>
                <p className={styles.toggleText}>Don&apos;t have an account?
                    <Link to="/register" className={styles.toggleLink}>Register</Link>
                </p>
            </form>
        </div>
    )
}
export default Login;