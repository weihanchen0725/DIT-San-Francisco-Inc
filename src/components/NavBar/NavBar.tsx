import Link from "next/link";
import Image from "next/image";
import CompanyLogo from '../../assets/images/tcm_logistic_logo.svg'

const NavBar = () => {
    return (
        <>
        <Image src={CompanyLogo} alt="Company Logo" />  
        <Link href='/'>Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/tools">Tools</Link>
        <Link href="/news">News</Link>
        <Link href="/contact">Contact</Link>
        </>
    )
}

export default NavBar;