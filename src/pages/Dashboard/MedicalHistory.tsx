import { Download } from 'lucide-react';

const MedicalHistory = () => {
    // Mock history data
    const history = [
        { doctor: "Dr. John Doe", medicines: "Paracetamol, Vitamin C", date: "Jan 12, 2024", desc: "Fever and general weakness", file: "prescription_001.pdf" },
        { doctor: "Dr. Sarah Smith", medicines: "Amoxicillin", date: "Dec 20, 2023", desc: "Throat infection", file: "prescription_002.pdf" },
        { doctor: "Dr. Mike Ross", medicines: "Lisinopril", date: "Nov 15, 2023", desc: "Regular checkup", file: "prescription_003.pdf" },
        { doctor: "Dr. Emily Blunt", medicines: "Ibuprofen", date: "Oct 05, 2023", desc: "Back pain", file: "prescription_004.pdf" },
        { doctor: "Dr. James Bond", medicines: "Atorvastatin", date: "Sep 22, 2023", desc: "Cholesterol management", file: "prescription_005.pdf" },
    ];

    const handleDownload = (item: any) => {
        // Create dummy content
        const content = `
MEDICAL PRESCRIPTION
--------------------
Date: ${item.date}
Doctor: ${item.doctor}
Diagnosis: ${item.desc}
Medicines: ${item.medicines}

--------------------
Scott's Medical Supply
`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${item.file.split('.')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div>
            <h2 className="dash-title">Patient Profile</h2>

            <div className="section-header-simple" style={{ padding: '0 0 1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0 }}>Medical History</h3>
            </div>

            <div className="table-responsive" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', background: '#F8FAFC', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <th style={{ padding: '1rem', borderRadius: '8px 0 0 8px' }}>Doctor Name</th>
                            <th style={{ padding: '1rem' }}>Medicine</th>
                            <th style={{ padding: '1rem' }}>Description</th>
                            <th style={{ padding: '1rem', borderRadius: '0 8px 8px 0' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '32px', height: '32px', background: '#E0F2FE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '0.8rem' }}>Dr</div>
                                        <div>
                                            <div>{item.doctor}</div>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.date}</span>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.medicines}</td>
                                <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{item.desc}</td>
                                <td style={{ padding: '1rem' }}>
                                    <button
                                        className="btn btn-outline btn-xs"
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        onClick={() => handleDownload(item)}
                                    >
                                        <Download size={14} /> Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="share-history" />
                <label htmlFor="share-history" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Share my medical history</label>
            </div>
        </div>
    );
};

export default MedicalHistory;
