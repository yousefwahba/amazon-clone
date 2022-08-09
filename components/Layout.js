import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + '- Amazon' : 'Amazon'}</title>
        <meta name="description" content="Amazon clone " />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex justify-between h-12 items-center px-4 shadow-md">
            <Link href="/">
              <a className="text-lg font-bold">Amazon</a>
            </Link>
            <div className="links">
              <Link href="/card">
                <a className="p-2">Card</a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className=" container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-12 shadow-inner capitalize">
          Copyright &#169; 2022 Amazon
        </footer>
      </div>
    </>
  );
};

export default Layout;
