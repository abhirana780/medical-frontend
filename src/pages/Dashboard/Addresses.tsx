const Addresses = () => {
    return (
        <div>
            <h2 className="dash-title">Manage Addresses</h2>

            <form>
                <div className="address-grid">
                    <div className="form-group">
                        <label>First Name*</label>
                        <input type="text" placeholder="First Name" />
                    </div>
                    <div className="form-group">
                        <label>Last Name*</label>
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <div className="form-group form-full">
                        <label>Company Name</label>
                        <input type="text" placeholder="Company (optional)" />
                    </div>
                    <div className="form-group form-full">
                        <label>Country / Region*</label>
                        <select><option>United States</option></select>
                    </div>
                    <div className="form-group form-full">
                        <label>Street Address*</label>
                        <input type="text" placeholder="House number and street name" />
                    </div>
                    <div className="form-group form-full">
                        <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" />
                    </div>
                    <div className="form-group">
                        <label>City*</label>
                        <input type="text" placeholder="Town / City" />
                    </div>
                    <div className="form-group">
                        <label>State*</label>
                        <select><option>State</option></select>
                    </div>
                    <div className="form-group">
                        <label>Postal Code*</label>
                        <input type="text" placeholder="Zip Code" />
                    </div>
                    <div className="form-group">
                        <label>Phone*</label>
                        <input type="text" placeholder="Phone" />
                    </div>

                    <div className="form-full" style={{ marginTop: '1rem' }}>
                        <div className="checkbox-group">
                            <input type="checkbox" id="default-addr" />
                            <label htmlFor="default-addr">Set as default address</label>
                        </div>
                    </div>

                    <div className="form-full" style={{ marginTop: '1rem' }}>
                        <button className="btn btn-primary">Save Address</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Addresses;
