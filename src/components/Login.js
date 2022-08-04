import React from 'react'
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import * as Yup from 'yup';

const Login = () => {

    let history = useHistory()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Password is required'),
            email: Yup.string().email('Invalid email address').required('email should be entered correctly'),
        }),


        // ---------------------------------------------submitHandler--------------------------------
        onSubmit: async (values) => {
            console.log(values);
            await axios.post(`http://localhost:3000/api/v1/seller/login`, {email: values.email, password: values.password}).then((res) => {
                console.log(res);
                history.push('/allproducts')
            }).catch((e) => {
                console.log(e);
            })
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}



                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}

                <button type="submit">Submit</button>
            </form>


        </div>
    )
}

export default Login