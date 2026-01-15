
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const ProductCardSkeleton = () => {
    return (
        <div style={{
            background: 'white',
            borderRadius: '1rem',
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ height: '220px', width: '100%' }}>
                <Skeleton height="100%" width="100%" />
            </div>
            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                    <Skeleton width={80} height={20} />
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                    <Skeleton count={2} />
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Skeleton width={60} height={24} />
                    <Skeleton width={40} height={40} circle />
                </div>
            </div>
        </div>
    );
};

export const TableRowSkeleton = () => (
    <tr>
        <td colSpan={5} style={{ padding: '1rem' }}>
            <Skeleton height={40} />
        </td>
    </tr>
);
