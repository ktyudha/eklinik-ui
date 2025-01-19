import { FunctionComponent } from "react";

const HeroLokasiSection: FunctionComponent = () => {
  return (
    <div className="mt-3">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.1049110986764!2d112.64256957588357!3d-7.563539674698328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7dfc2774a6e4d%3A0xa2f875d1662bab4c!2sBidan%20Susenowati%20SST!5e0!3m2!1sen!2sid!4v1737297236075!5m2!1sen!2sid"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full rounded-lg"
      ></iframe>
      <p className="text-sm mt-3">
        Jl. Nasional 24, Buluresik, Manduro MG, Kec. Ngoro, Kabupaten Mojokerto,
        Jawa Timur 61385
      </p>
    </div>
  );
};

export default HeroLokasiSection;
