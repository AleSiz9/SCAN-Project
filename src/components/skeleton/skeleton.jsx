import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const FormSkeleton = () => (
  <div className="form-skeleton" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
    <Skeleton height={50} style={{ marginBottom: '16px' }} />
    <Skeleton height={50} style={{ marginBottom: '16px' }} />
    <Skeleton height={50} />
  </div>
);

export const SearchSkeleton = () => (
  <div className="search-skeleton" style={{ padding: '20px' }}>
    <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', flexWrap: 'wrap' }}>
      <Skeleton height={40} width={120} />
      <Skeleton height={40} width={120} />
      <Skeleton height={40} width={120} />
    </div>
    <div style={{ display: 'grid', gap: '16px' }}>
      <Skeleton height={120} />
      <Skeleton height={120} />
      <Skeleton height={120} />
    </div>
  </div>
);

export const LayoutSkeleton = () => (
  <div className="layout-skeleton">
    <Skeleton height={70} style={{ marginBottom: '20px' }} />
    <div style={{ padding: '20px' }}>
      <Skeleton height={300} />
    </div>
  </div>
);
