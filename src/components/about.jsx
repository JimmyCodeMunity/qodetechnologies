import { CodeType } from "./CodeType";

export default function AboutUs() {
  return (
    <div className="sm:py-8 py-6">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
      <section className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-6xl mx-auto max-md:px-4">
        <div className="w-full">
          <CodeType />
        </div>
        <div className="text-sm text-slate-600 max-w-lg">
          <h1 className="text-xl uppercase font-semibold text-lime-500">
            About Qode
          </h1>
          <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-lime-600 to-[#DDD9FF]"></div>
          <p className="mt-8 text-white">
            PrebuiltUI helps you build faster by transforming your design vision
            into fully functional, production-ready UI components.{" "}
          </p>
          <p className="mt-4 text-white">
            Whether you're launching a SaaS app, landing page, or dashboard, our
            collection of Tailwind CSS components is crafted to boost your
            development speed and improve user experience.
          </p>
          <p className="mt-4 text-white">
            From UI design systems to automation-ready layouts, PrebuiltUI
            empowers you to build beautifully and scale effortlessly.
          </p>
          <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-lime-600 to-[#8A7DFF] py-3 px-8 rounded-full text-white">
            <span>Read more</span>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
