import React from 'react';
import MapComponent from '../components/MapComponent';
import AuthComponent from '../components/AuthComponent';
import CartComponent from '../components/CartComponent';
import AdminComponent from '../components/AdminComponent';
import PricingComponent from '../components/PricingComponent';
import FeaturesComponent from '../components/FeaturesComponent';
import FooterComponent from '../components/FooterComponent';

const HomePage = () => {
  return (
    <div className="bg-[#2563EB] min-h-screen flex flex-col justify-center items-center">
      <header>
        {/* Header content */}
      </header>
      <main>
        {has_map && (
          <section className="w-full max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:py-12">
            <MapComponent />
          </section>
        )}
        {has_auth && (
          <section className="w-full max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:py-12">
            <AuthComponent />
          </section>
        )}
        {has_cart && (
          <section className="w-full max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:py-12">
            <CartComponent />
          </section>
        )}
        {has_admin && (
          <section className="w-full max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:py-12">
            <AdminComponent />
          </section>
        )}
        {has_pricing && (
          <section className="w-full max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:py-12">
            <PricingComponent />
          </section>
        )}
        {has_features && (
          <section className="w-full max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:py-12">
            <FeaturesComponent />
          </section>
        )}
      </main>
      <FooterComponent />
    </div>
  );
};

export default HomePage;