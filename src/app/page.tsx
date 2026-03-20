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
    "image": "https://www.calefonesloja.com/Logo.jpg",
    "description": "Expertos en asesoramiento, reparación, mantenimiento y venta de calefones en Loja. Repuestos originales y servicio técnico garantizado.",
    "@id": "https://www.calefonesloja.com",
    "url": "https://www.calefonesloja.com",
    "telephone": "+593981410309",
    "priceRange": "$$",
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Calefones",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reparación de Calefones a Domicilio en Loja"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mantenimiento Preventivo de Calefones"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Venta e Instalación de Calefones"
          }
        }
      ]
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
