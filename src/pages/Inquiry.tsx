
const Inquiry = () => {
    return (
        <div className="section" style={{ background: 'white', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="container" style={{ maxWidth: '600px', width: '100%' }}>
                <div style={{ border: '1px solid var(--border)', padding: '2rem', borderRadius: '1rem' }}>
                    <h2 className="text-center mb-8">Patient Inquiry Form</h2>
                    <p className="text-center text-muted mb-8" style={{ fontSize: '0.9rem' }}>Please enter patient information below</p>

                    <form>
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name*</label>
                                <input type="text" placeholder="First Name" />
                            </div>
                            <div className="form-group">
                                <label>Last Name*</label>
                                <input type="text" placeholder="Last Name" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Email*</label>
                                <input type="email" placeholder="Your email address" />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select style={{ flex: 1 }}><option>Day</option></select>
                                    <select style={{ flex: 1 }}><option>Month</option></select>
                                    <select style={{ flex: 1 }}><option>Year</option></select>
                                </div>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Gender</label>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <label className="radio-option"><input type="radio" name="gender" /> Male</label>
                                <label className="radio-option"><input type="radio" name="gender" /> Female</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Address*</label>
                            <input type="text" placeholder="Address" />
                        </div>

                        <div className="form-group">
                            <label>Phone Number*</label>
                            <input type="text" placeholder="Phone" />
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Inquiry;
