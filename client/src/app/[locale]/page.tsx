import Home from "@/components/Home/Home";

const HomePage = async () => {
  
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Home /> 
      </div>
    </div>
  );
};

export default HomePage;
