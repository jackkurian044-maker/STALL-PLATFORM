import './globals.css';
import type { Metadata } from 'next';
export const metadata:Metadata={title:'STall',description:'Discover every local business around you'};
export default function RootLayout({children}:{children:React.ReactNode}){
return <html lang='en'><body>{children}</body></html>;
}