import React from 'react';

export const Dashboard = (props) => {

    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-5">
                        <div>
                            <span className="block text-500 font-medium mb-3">Active Students</span>
                            <div className="text-900 font-medium text-xl">68</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '3rem', height: '3rem' }}>
                            <img className='stu' src='assets/layout/images/student.png' alt="logo" />

                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-5   ">
                        <div>
                            <span className="block text-500 font-medium mb-3">Unactive Students</span>
                            <div className="text-900 font-medium text-xl">15</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '3rem', height: '3rem' }}>
                            <img className='stu' src='assets/layout/images/vv.png' alt="logo" />

                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Present Student</span>
                            <div className="text-900 font-medium text-xl">65</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '3rem', height: '3rem' }}>

                            <img className='stu' src='assets/layout/images/attendance.png' alt="logo" />

                        </div>
                    </div>
                    <span className="text-green-500 font-medium">This Timezone</span>
                    <span className="text-500"></span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">On Leave Students</span>
                            <div className="text-900 font-medium text-xl">10</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '3rem', height: '3rem' }}>
                            {/* <i className="pi pi-comment text-purple-500 text-xl"/> */}
                            <img className='stu' src='assets/layout/images/exit.png' alt="logo" />

                        </div>
                    </div>
                    <span className="text-green-500 font-medium">Today </span>
                    {/* <span className="text-500">responded</span> */}
                </div>
            </div>
            {/* <div className="margin ">
                <h2>Login Page</h2>
                <div className="card ">
                    <h3>Login</h3>
                    <div className="field grid">
                        <label htmlFor="email" className="col-fixed w-9rem">E-mail</label>
                        <InputText id="email" value={username} onChange={(e) => setUsername(e.target.value)} required className="mr-2" />
                    </div>
                    <div className="field grid">
                        <label htmlFor="Password" className="col-fixed w-9rem">Password</label>
                        <InputText id="Password" value={email} onChange={(e) => setEmail(e.target.value)} required className=" mr-2" />
                    </div>
                    <div className='btn1'>
                        <Button label="Login" type="password" className="mr-2 mb-2" />

                    </div>
                </div>
            </div>
            <div className="col-12 lg:col-4 ">
                <h2>Signup Page</h2>

                <div className="card">
                    <h3>Sign up</h3>
                    <div className="field grid">
                        <label htmlFor="username1" className="col-fixed w-9rem">Username</label>
                        <div className="col">
                            <InputText id="username1" value={username} onChange={(e) => setUsername(e.target.value)} required className="mr-2" />

                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="email" className="col-fixed w-9rem">Email</label>
                        <div className="col">
                            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mr-2" />

                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="password" className="col-fixed w-9rem">Password</label>
                        <div className="col">
                            <InputText id="password" value={password} onChange={(e) => setpassword(e.target.value)} required className="mr-2" />

                        </div>
                    </div>
                    <div className="field grid">
                        <label htmlFor="cpassword" className="col-fixed w-9rem">ConfirmPassword</label>
                        <div className="col">
                            <InputText id="cpassword" value={cpassword} onChange={(e) => cpassword(e.target.value)} required className=" mr-2" />

                        </div>
                    </div>
                    <div className="box">
                        <Button label="Signup"></Button>
                    </div>
                </div>
            </div>
 */}

        </div>
    );
}
