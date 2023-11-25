import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { light } from '@clerk/themes';
import Header from './components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Clerk App',
  description: 'Example Clerk App',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: light,
      }}
    >
      <html lang='en'>
        <body className={inter.className}>
          <Header />
          <main className='container'>
            <div className='flex items-start justify-center '>
              <div className='mt-7'>{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
