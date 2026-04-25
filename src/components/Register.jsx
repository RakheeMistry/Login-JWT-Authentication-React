import { useForm } from 'react-hook-form';
import axios from "axios";
import styles from './Auth.module.css';
import { Link } from 'react-router-dom';
function Register(){
    const { register, handleSubmit, formState:{errors}, reset} = useForm();
    const submitCall = async (data) => {
        console.log(data);
        try{
            const response = await axios.post("http://localhost:5000/api/auth/register",data);
            if(response.status == 201){
                alert("Registration Successfull!");
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
                    <label htmlFor="name" className={styles.label}>Full Name</label>
                    <input id="name" type="text" className={styles.input} {...register("name",{
                        required: "Name is required",
                        minLength:{
                            value: 3,
                            message:"Name must be at least 3 characters"
                        }
                    })}/>
                    {errors.name && <div>{errors.name.message}</div>}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input id="email" type="text" className={styles.input} {...register("email",{
                        required: 'Email is required',
                        pattern:{
                            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email address',
                        },
                    })}/>
                    {errors.email && <div>{errors.email.message}</div>}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="mobile" className={styles.label}>Mobile</label>
                    <input id="mobile" type="text" className={styles.input} {...register("mobile",{
                        required: 'Mobile number is required',
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message:"Mobile number must be 10 digits",
                        },
                    })}/>
                    {errors.mobile && (
                        <div className={styles.error}>{errors.mobile.message}</div>
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input id="password" type="text" className={styles.input} {...register("password", {
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
                <button type="submit" className={styles.submitButton}>Register</button>
                <p className={styles.toggleText}>Already have an account?
                    <Link to="/login" className={styles.toggleLink}>Login</Link>
                </p>
            </form>
        </div>
    )
}
export default Register;