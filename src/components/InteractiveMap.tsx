import React from 'react';

const IFRAME_SRC =
  'https://maps.google.com/maps?q=Vinohradsk%C3%A1+114,+130+00+Praha+2+-+Vinohrady&t=&z=16&ie=UTF8&iwloc=&output=embed';

export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Vinohradsk%C3%A1+114,+130+00+Praha+2';

export const InteractiveMap: React.FC = () => (
  <div className="rounded-2xl overflow-hidden bg-[#F5F2EC] h-[320px] sm:h-[420px]">
    <iframe
      src={IFRAME_SRC}
      width="100%"
      height="100%"
      style={{ border: 0, filter: 'grayscale(0.6)' }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Atelier Luma — Vinohradská 114, Praha 2"
      className="w-full h-full"
    />
  </div>
);
