
const Returns = () => {
    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 className="text-center mb-12">Returns & Refunds Policy</h1>

                <div style={{ background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: 'var(--shadow)' }}>
                    <p className="text-muted mb-8" style={{ fontSize: '1.1rem', textAlign: 'center' }}>
                        We want you to be completely satisfied with your purchase. If you're not happy, we're here to help.
                    </p>

                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
                        <h3 className="mb-4">30-Day Return Policy</h3>
                        <p className="text-muted">
                            You have 30 calendar days to return an item from the date you received it. To be eligible for a return,
                            your item must be unused and in the same condition that you received it. Your item must be in the original packaging.
                            Your item needs to have the receipt or proof of purchase.
                        </p>
                    </div>

                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
                        <h3 className="mb-4">Refunds</h3>
                        <p className="text-muted">
                            Once we receive your item, we will inspect it and notify you that we have received your returned item.
                            We will immediately notify you on the status of your refund after inspecting the item.
                            If your return is approved, we will initiate a refund to your credit card (or original method of payment).
                            You will receive the credit within a certain amount of days, depending on your card issuer's policies.
                        </p>
                    </div>

                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
                        <h3 className="mb-4">Shipping Returns</h3>
                        <p className="text-muted">
                            You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.
                            If you receive a refund, the cost of return shipping will be deducted from your refund.
                        </p>
                    </div>

                    <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '1rem' }}>
                        <h3 className="mb-4">Non-Returnable Items</h3>
                        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                            <li className="mb-2">Perishable goods (such as food or flowers)</li>
                            <li className="mb-2">Personal care items (such as beauty products or opened hygiene products)</li>
                            <li className="mb-2">Custom products (such as special orders or personalized items)</li>
                            <li className="mb-2">Hazardous materials, flammable liquids, or gases</li>
                        </ul>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-muted mb-4">Have questions about your return?</p>
                        <a href="/contact" className="btn btn-primary">Contact Support</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Returns;
