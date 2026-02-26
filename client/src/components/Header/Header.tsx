import GetHeader from "@/services/Global/GetHeader/GetHeader";
import { notFound } from "next/navigation";
import GetBaseURL from "@/services/GetBaseURL";

import headerClass from "./Header.module.scss";
import NavBar from "../NavBar/NavBar";
import Link from "next/link";
import CTABar from "../CTABar/CTABar";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

// Define the type for the header data

const dataLoader = async () => {
  const { data } = await GetHeader();
  if (!data) notFound();
  console.log("Header Data:", data);
  return { header: data?.Header as HeaderProps };
};

const Header = async () => {
  const { header: headerData }: { header: HeaderProps } = await dataLoader();
  const logoPath = headerData?.Logo?.image?.url;
  const logoUrl = logoPath
    ? logoPath.startsWith("http")
      ? logoPath
      : GetBaseURL(logoPath)
    : "";

  return (
    <header className={headerClass.header}>
      <div className={headerClass.header_content}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={headerData.Logo?.image?.alternativeText ?? "Logo"}
            className="h-16 w-auto"
          />
        ) : null}
        <span>({headerData?.Name})</span>
      </div>
      <NavBar NavigationList={headerData?.Navigations ?? []} />
      <CTABar ctaLinks={headerData?.CTA ?? []} />
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
