import GetHeader from "@/services/Global/GetHeader/GetHeader";
import { notFound } from "next/navigation";
import GetBaseURL from "@/services/GetBaseURL";

import HeaderClient from "./HeaderClient";

// Define the type for the header data

const dataLoader = async () => {
  const { data } = await GetHeader();
  if (!data) notFound();
  console.log("Header Data:", data);
  return { header: data?.Header as HeaderProps };
};

const Header = async () => {
  // Server component: fetch CMS-backed header data once per request/render.
  const { header: headerData }: { header: HeaderProps } = await dataLoader();
  const logoPath = headerData?.Logo?.image?.url;
  const logoUrl = logoPath
    ? logoPath.startsWith("http")
      ? logoPath
      : GetBaseURL(logoPath)
    : "";

  // Client component handles browser-only concerns (scroll state + animation).
  return <HeaderClient headerData={headerData} logoUrl={logoUrl} />;
};

export default Header;
