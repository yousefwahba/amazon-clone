import Head from 'next/head';
import Link from 'next/link';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Store } from '../utils/Store';

const Layout = ({ title, children }) => {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

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
              <Link href="/cart">
                <a className="p-2">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
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
