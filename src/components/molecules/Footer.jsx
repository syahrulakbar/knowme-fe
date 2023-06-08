const Footer = () => {
  return (
    <footer className="footer transition duration-150 ease-in-out">
      <div id="arrow" className="flex w-[100%] justify-center items-center">
        <div className="border-t w-[80%] border-slate-700 my-5"></div>
      </div>
      <div className="container mx-auto flex justify-center mb-3">
        <p className={`text-black dark:text-white`}>
          Made with <span className="animate-pulse text-red-500">❤️</span> by{" "}
          <a aria-label="link to my instagram" href="https://www.instagram.com/sepatukuhitamkotor/" className="text-sky-900 dark:text-sky-400 font-medium">
            Mochamad Syahrul Akbar
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
