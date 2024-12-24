"use client";

import Image from "next/image";
import { adLogo } from "../../public";

const AdBanner = () => {
  return (
    <span className={"adBanner"}>
      <div className="adContent">
        <Image
          src={adLogo}
          alt={"Advertise Banner Image"}
          height={16}
          width={16}
        />
        <span>Lorem ipsum dolor</span>
      </div>
      <div className="adContent">
        <Image
          src={adLogo}
          alt={"Advertise Banner Image"}
          height={16}
          width={16}
        />
        <span>Lorem ipsum dolor</span>
      </div>
      <div className="adContent">
        <Image
          src={adLogo}
          alt={"Advertise Banner Image"}
          height={16}
          width={16}
        />
        <span>Lorem ipsum dolor</span>
      </div>
    </span>
  );
};

export default AdBanner;
