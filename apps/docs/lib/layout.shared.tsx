import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SeidhrLogo } from '@seidhr/react-muna-logo';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <SeidhrLogo className='w-6 h-6 mr-3' />
          <span>Muna | ᛗᚢᚾᚨ</span>
        </>
      ),
    },
    links: [
      {
        text: 'GitHub',
        url: 'https://github.com/seidhr/muna',
        active: 'none',
      },
    ],
  };
}

