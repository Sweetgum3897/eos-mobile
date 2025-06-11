import { ReactNode, useState } from 'react';

import { TabHeaderBar } from '@/components';

import { StellarGuidence } from './stellar-guidence';

export const HeaderSection = ({ title }: { title: ReactNode }) => {
  const [visibleStellarGuidence, setShowStellarGuidence] = useState(false);
  return (
    <>
      <TabHeaderBar
        title={title}
        onPressButton1={() => setShowStellarGuidence(true)}
      ></TabHeaderBar>
      {visibleStellarGuidence && <StellarGuidence close={() => setShowStellarGuidence(false)} />}
    </>
  );
};
