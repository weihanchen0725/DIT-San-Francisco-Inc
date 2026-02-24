import GetHeader from "@/services/Global/GetHeader/GetHeader";
import NavBar from "../NavBar/NavBar";
import { notFound } from "next/navigation";

const dataLoader = async() =>{
  const {data} = await GetHeader();
  if(!data) notFound();
  // console.log("Header Data:", data);
  return {header: data?.Header as HeaderProps};
}

const Header = async () => {
  const {header: headerData}: {header: HeaderProps} = await dataLoader();
  // const logoUrl = `http://localhost:1337/uploads/dolphin_logistics_logo_f8975a73d0.png`;
  // console.log("Header Component Data:", headerData);
  // console.log("Logo URL:", logoUrl);
  return (
    <header>
      <img src={headerData.Logo?.image?.url} alt={headerData.Logo?.image?.alternativeText} className="h-16 w-auto" />
      
    </header>
  );
};

export default Header;
