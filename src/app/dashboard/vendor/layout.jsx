import { requireRole } from '@/lib/core/session';
import React from 'react';

const VendorLayout = async ({ children }) => {
    await requireRole('vendor')
    return children;
};

export default VendorLayout;