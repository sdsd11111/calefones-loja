import TopBar from '@/components/TopBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import VideoSection from '@/components/VideoSection';
import Services from '@/components/Services';
import Catalog from '@/components/Catalog';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnnouncementPopup from '@/components/AnnouncementPopup';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Calefones Loja",
    "image": "https://calefonesloja.com/Logo.jpg",
    "@id": "https://calefonesloja.com",
    "url": "https://calefonesloja.com",
    "telephone": "+593994454838",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Olmedo entre Azuay y Mercadillo",
      "addressLocality": "Loja",
      "addressRegion": "Loja",
      "postalCode": "110101",
      "addressCountry": "EC"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -3.996162,
      "longitude": -79.202355
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/calefonesloja",
      "https://www.instagram.com/calefonesloja"
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FloatingWhatsApp />
      <AnnouncementPopup />
      <TopBar />
      <Header />

      <div id="inicio">
        <Hero />
      </div>

      <AboutUs />

      <VideoSection />

      <Services />

      <Catalog />

      <Testimonials />

      <FAQ />

      <Contact />

      <Footer />
    </main>
  );
}
