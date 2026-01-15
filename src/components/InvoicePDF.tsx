
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Register fonts if needed (optional)
// Font.register({ family: 'Roboto', src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf' });

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    companyInfo: {
        flexDirection: 'column',
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2563EB',
        marginBottom: 5,
    },
    invoiceTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    invoiceInfo: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 5,
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#f8fafc',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingVertical: 8,
    },
    col1: { width: '40%', paddingLeft: 5 },
    col2: { width: '20%', textAlign: 'right' },
    col3: { width: '20%', textAlign: 'right' },
    col4: { width: '20%', textAlign: 'right', paddingRight: 5 },
    totalRow: {
        flexDirection: 'row',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#000',
    },
    label: {
        width: '80%',
        textAlign: 'right',
        paddingRight: 10,
        fontWeight: 'bold',
    },
    value: {
        width: '20%',
        textAlign: 'right',
        paddingRight: 5,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        color: '#64748B',
        fontSize: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
});

const InvoicePDF = ({ order }: { order: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.companyInfo}>
                    <Text style={styles.logo}>Scott's Medical Supply</Text>
                    <Text>123 Medical Drive</Text>
                    <Text>St. George's, Grenada</Text>
                    <Text>Phone: 473-440-7030</Text>
                    <Text>Email: support@scottsmedical.com</Text>
                </View>
                <View style={styles.invoiceInfo}>
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                    <Text>Invoice #: {(order._id || '').substring(0, 8).toUpperCase()}</Text>
                    <Text>Date: {new Date(order.createdAt || Date.now()).toLocaleDateString()}</Text>
                    <Text>Status: {order.isPaid || order.isDelivered ? 'PAID' : 'PENDING'}</Text>
                </View>
            </View>

            {/* Bill To */}
            <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>Bill To:</Text>
                <Text>{order.user?.name || order.shippingAddress?.name || 'Guest'}</Text>
                <Text>{order.shippingAddress?.address || ''}</Text>
                <Text>{order.shippingAddress?.city || ''}, {order.shippingAddress?.postalCode || ''}</Text>
                <Text>{order.shippingAddress?.country || ''}</Text>
            </View>

            {/* Items Table Header */}
            <View style={styles.headerRow}>
                <Text style={styles.col1}>Item</Text>
                <Text style={styles.col2}>Price</Text>
                <Text style={styles.col3}>Qty</Text>
                <Text style={styles.col4}>Total</Text>
            </View>

            {/* Items */}
            {(order.orderItems || []).map((item: any, idx: number) => (
                <View key={idx} style={styles.row}>
                    <Text style={styles.col1}>{item.name}</Text>
                    <Text style={styles.col2}>${(item.price || 0).toFixed(2)}</Text>
                    <Text style={styles.col3}>{item.qty}</Text>
                    <Text style={styles.col4}>${((item.price || 0) * (item.qty || 1)).toFixed(2)}</Text>
                </View>
            ))}

            {/* Totals */}
            <View style={styles.totalRow}>
                <Text style={styles.label}>Subtotal:</Text>
                <Text style={styles.value}>${(order.itemsPrice || 0).toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={styles.label}>Tax:</Text>
                <Text style={styles.value}>${(order.taxPrice || 0).toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={styles.label}>Shipping:</Text>
                <Text style={styles.value}>${(order.shippingPrice || 0).toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 5, borderTopWidth: 2, borderColor: '#eee', paddingTop: 5 }}>
                <Text style={[styles.label, { fontSize: 14 }]}>Total:</Text>
                <Text style={[styles.value, { fontSize: 14, color: '#2563EB' }]}>${(order.totalPrice || 0).toFixed(2)}</Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text>Thank you for your business. For any questions, please contact us at support@scottsmedical.com.</Text>
                <Text style={{ marginTop: 5 }}>All payments should be made to Scott's Medical Supply within 15 days.</Text>
            </View>
        </Page>
    </Document>
);

export default InvoicePDF;
