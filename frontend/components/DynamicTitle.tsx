'use client';

import { useEffect } from 'react';
import { api } from '@/lib/api';
import { useApi } from '@/hooks/use-api';

export default function DynamicTitle() {
  const { data: schoolInfo } = useApi(() => api.getSchoolInfo(), []);

  useEffect(() => {
    if (schoolInfo?.name) {
      document.title = `${schoolInfo.name} - Excellence in Education`;
    }
  }, [schoolInfo]);

  return null;
}
