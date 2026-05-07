import React from "react";
import { Link } from "react-router-dom";
import ServiceDialog from "../ui/ServiceDialog";

const Footer = () => {
  return (
    <div>
      <footer className="w-full">
        <div className="mx-auto md:px-16 px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 gap-y-8 md:gap-8 py-10 max-w-7xl mx-auto">
            <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
              <Link to="/" className="flex justify-center lg:justify-start">
                <img src="/images/logo.png" className="w-32" alt="Qode Logo" />
              </Link>
              <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
                Powering digital transformation for startups and enterprises worldwide. Ready to build something extraordinary?
              </p>
              <ServiceDialog
                title="Contact us"
                className="py-2.5 px-5 h-9 block w-fit bg-lime-500 rounded-full shadow-sm text-xs text-white mx-auto transition-all duration-500 hover:bg-lime-600 lg:mx-0"
              />
            </div>

            <div className="lg:mx-auto text-left">
              <h4 className="text-lg text-lime-500 font-medium mb-7">Company</h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                  <Link
                    to="/"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to="/about"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to="/services"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:mx-auto text-left">
              <h4 className="text-lg text-lime-500 font-medium mb-7">Services</h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                  <Link
                    to="/services"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Web Development
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to="/services"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Mobile Development
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to="/services"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    AI & Automation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Cloud & DevOps
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:mx-auto text-left">
              <h4 className="text-lg text-lime-500 font-medium mb-7">Support</h4>
              <ul className="text-sm transition-all duration-500">
                <li className="mb-6">
                  <Link
                    to="/about"
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="mb-6">
                  <span
                    className="text-gray-500 cursor-default"
                  >
                    Terms & Conditions
                  </span>
                </li>
                <li>
                  <span
                    className="text-gray-500 cursor-default"
                  >
                    Privacy Policy
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:mx-auto text-left">
              <h4 className="text-lg text-lime-500 font-medium mb-7">Subscribe</h4>
              <p className="text-sm text-gray-500 leading-6 mb-7">
                Subscribe to get the latest insights on tech and digital transformation.
              </p>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 border border-lime-600 rounded-full py-3 px-6 w-fit lg:mx-0 text-sm text-lime-500 font-semibold transition-all duration-500 hover:bg-lime-500/10"
              >
                Subscribe
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 15 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.25 6L13.25 6M9.5 10.5L13.4697 6.53033C13.7197 6.28033 13.8447 6.15533 13.8447 6C13.8447 5.84467 13.7197 5.71967 13.4697 5.46967L9.5 1.5"
                    stroke="#78E546FF"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="py-7 border-t border-neutral-800">
            <div className="flex items-center justify-center flex-col lg:justify-between lg:flex-row max-w-7xl mx-auto">
              <span className="text-sm text-gray-500">
                © <span className="text-lime-500">Qode</span>{" "}
                {new Date().getFullYear()}, All rights reserved.
              </span>
              <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#33CCFF] hover:bg-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g id="Social Media">
                      <path
                        id="Vector"
                        d="M11.3214 8.93666L16.4919 3.05566H15.2667L10.7772 8.16205L7.1914 3.05566H3.05566L8.47803 10.7774L3.05566 16.9446H4.28097L9.022 11.552L12.8088 16.9446H16.9446L11.3211 8.93666H11.3214ZM9.64322 10.8455L9.09382 10.0765L4.72246 3.95821H6.60445L10.1322 8.8959L10.6816 9.66481L15.2672 16.083H13.3852L9.64322 10.8458V10.8455Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[linear-gradient(45deg,#FEE411_6.9%,#FEDB16_10.98%,#FEC125_17.77%,#FE983D_26.42%,#FE5F5E_36.5%,#FE2181_46.24%,#9000DC_85.57%)] hover:bg-gradient-to-b from-gray-900 to-gray-900"
                >
                  <svg
                    className="w-[1.25rem] h-[1.125rem] text-white"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.63434 7.99747C5.63434 6.69062 6.6941 5.63093 8.00173 5.63093C9.30936 5.63093 10.3697 6.69062 10.3697 7.99747C10.3697 9.30431 9.30936 10.364 8.00173 10.364C6.6941 10.364 5.63434 9.30431 5.63434 7.99747ZM4.35427 7.99747C4.35427 10.0108 5.98723 11.6427 8.00173 11.6427C10.0162 11.6427 11.6492 10.0108 11.6492 7.99747C11.6492 5.98418 10.0162 4.3522 8.00173 4.3522C5.98723 4.3522 4.35427 5.98418 4.35427 7.99747ZM10.9412 4.20766C10.9411 4.37615 10.991 4.54087 11.0846 4.681C11.1783 4.82113 11.3113 4.93037 11.4671 4.99491C11.6228 5.05945 11.7942 5.07639 11.9595 5.04359C12.1249 5.01078 12.2768 4.92971 12.3961 4.81062C12.5153 4.69153 12.5966 4.53977 12.6295 4.37453C12.6625 4.2093 12.6457 4.03801 12.5812 3.88232C12.5168 3.72663 12.4076 3.59354 12.2674 3.49988C12.1273 3.40622 11.9625 3.35619 11.7939 3.35612H11.7936C11.5676 3.35623 11.3509 3.44597 11.1911 3.60563C11.0313 3.76529 10.9414 3.98182 10.9412 4.20766ZM5.132 13.7759C4.43946 13.7444 4.06304 13.6291 3.81289 13.5317C3.48125 13.4027 3.24463 13.249 2.99584 13.0007C2.74705 12.7524 2.59305 12.5161 2.46451 12.1847C2.367 11.9348 2.25164 11.5585 2.22016 10.8664C2.18572 10.1181 2.17885 9.89331 2.17885 7.99752C2.17885 6.10174 2.18629 5.87758 2.22016 5.12866C2.2517 4.43654 2.36791 4.06097 2.46451 3.81035C2.59362 3.47891 2.7474 3.24242 2.99584 2.99379C3.24428 2.74515 3.48068 2.59124 3.81289 2.46278C4.06292 2.36532 4.43946 2.25004 5.132 2.21857C5.88074 2.18416 6.10566 2.17729 8.00173 2.17729C9.89779 2.17729 10.1229 2.18472 10.8723 2.21857C11.5648 2.25009 11.9406 2.36623 12.1914 2.46278C12.5231 2.59124 12.7597 2.74549 13.0085 2.99379C13.2573 3.24208 13.4107 3.47891 13.5398 3.81035C13.6373 4.06023 13.7527 4.43654 13.7841 5.12866C13.8186 5.87758 13.8255 6.10174 13.8255 7.99752C13.8255 9.89331 13.8186 10.1175 13.7841 10.8664C13.7526 11.5585 13.6367 11.9347 13.5398 12.1847C13.4107 12.5161 13.2569 12.7526 13.0085 13.0007C12.76 13.2488 12.5231 13.4027 12.1914 13.5317C11.9414 13.6292 11.5648 13.7444 10.8723 13.7759C10.1768 13.8078 8.00513 13.815 8.00513 13.815C8.00513 13.815 5.83111 13.815 5.13562 13.7759H5.132ZM13.1537 15.538C14.1594 15.5089 14.8559 15.3211 15.4633 15.0814C16.1024 14.8311 16.6622 14.439 17.1021 13.9338C17.5421 13.4285 17.8668 12.8229 18.0525 12.1596C18.2917 11.441 18.4782 10.7182 18.5092 9.70035C18.5445 8.54404 18.5516 8.18804 18.5516 5.99918C18.5516 3.81031 18.5445 3.45431 18.5092 2.298C18.4782 1.27704 18.2917 0.557406 18.0525 -0.161146C17.8668 -0.824453 17.5401 -1.42897 17.1021 -1.93635C16.6622 -2.44159 16.1024 -2.83371 15.4633 -3.084C14.8559 -3.32371 14.1594 -3.5115 13.1537 -3.54253C12.0023 -3.57782 11.6485 -3.58491 8.00173 -3.58491C4.35499 -3.58491 4.00117 -3.57782 2.84976 -3.54253C1.84409 -3.5115 1.14755 -3.32371 0.540176 -3.084C-0.0988766 -2.83371 -0.65869 -2.43946 -1.09867 -1.93635C-1.53659 -1.42897 -1.86134 -0.824453 -2.047 -0.161146C-2.28621 0.557406 -2.47271 1.28016 -2.50375 2.298C-2.53904 3.45646 -2.54613 3.81246 -2.54613 5.99918C-2.54613 8.1859 -2.53904 8.5419 -2.50375 9.69821C-2.47271 10.7192 -2.28621 11.4388 -2.047 12.1573C-1.86134 12.8207 -1.53659 13.4252 -1.09867 13.9326C-0.65869 14.4399 -0.0988766 14.8321 0.542244 15.0824C1.14755 15.3221 1.84409 15.5099 2.85187 15.5409C4.00328 15.5762 4.3571 15.5833 8.00384 15.5833C11.6506 15.5833 12.0023 15.5762 13.1537 15.538ZM8.00173 1.1044C10.2958 1.1044 12.1534 2.98578 12.1534 5.30209C12.1534 7.6184 10.2958 9.49978 8.00173 9.49978C5.70769 9.49978 3.85005 7.6184 3.85005 5.30209C3.85005 2.98578 5.70769 1.1044 8.00173 1.1044ZM13.3849 1.0691C13.3849 1.66539 12.9079 2.14918 12.3195 2.14918C11.731 2.14918 11.2561 1.66753 11.2561 1.0691C11.2561 0.472811 11.731 -0.008826 12.3195 -0.008826C12.9079 -0.008826 13.3849 0.472811 13.3849 1.0691Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#337FFF] hover:bg-gray-900"
                >
                  <svg
                    className="w-[1rem] h-[1rem] text-white"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.04111 7.81204L7.41156 5.46043H5.1296V3.93188C5.1296 3.28886 5.44818 2.66054 6.46692 2.66054H7.51899V0.657999C6.90631 0.560385 6.28723 0.507577 5.66675 0.5C3.78857 0.5 2.56239 1.62804 2.56239 3.66733V5.46043H0.480469V7.81204H2.56239V13.5H5.1296V7.81204H7.04111Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="relative w-8 h-8 rounded-full transition-all duration-500 flex justify-center items-center bg-[#FF0000] hover:bg-gray-900"
                >
                  <svg
                    className="w-[1.25rem] h-[0.875rem] text-white"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.9191 1.10651C14.558 1.27906 15.0602 1.78251 15.2299 2.42069C15.5388 3.57887 15.5388 5.99687 15.5388 5.99687C15.5388 5.99687 15.5388 8.41487 15.2299 9.57306C15.0578 10.2136 14.5556 10.7171 13.9191 10.8872C12.7638 11.1969 8.12875 11.1969 8.12875 11.1969C8.12875 11.1969 3.49603 11.1969 2.33844 10.8872C1.69952 10.7147 1.19735 10.2112 1.0276 9.57306C0.71875 8.41487 0.71875 5.99687 0.71875 5.99687C0.71875 5.99687 0.71875 3.57887 1.0276 2.42069C1.1997 1.78015 1.70188 1.27669 2.33844 1.10651C3.49603 0.796875 8.12875 0.796875 8.12875 0.796875C8.12875 0.796875 12.7638 0.796875 13.9191 1.10651ZM10.4981 5.99687L6.6481 8.22578V3.76796L10.4981 5.99687Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
