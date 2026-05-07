import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "stano",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "I have been using Qode for a while now and I must say it has been a game changer for me.",
    },
    {
      name: "@jennifer.a",
      image:
        "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      testimonial:
        "Qode's AI solutions revolutionized our data analysis, delivering insights we never imagined possible.",
    },
    {
      name: "@alex.m",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "Their mobile development expertise created seamless apps that users love across platforms.",
    },
    {
      name: "@sarah.k",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "Qode's web development team built our site with cutting-edge tech, boosting conversions instantly.",
    },
    {
      name: "@mike.r",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "Integrating Qode's AI features into our product has driven unprecedented growth and efficiency.",
    },
    {
      name: "@lisa.t",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      testimonial:
        "From web to mobile, Qode's full-stack services have been the perfect partner for our tech needs.",
    },
  ];
  return (
    <div className="w-full bg-black text-white sm:px-16 px-6 py-6">
      <div className="w-full text-center space-y-3 justify-center items-center flex flex-col">
        <p className="text-orange-500 text-center">12k+ Customers</p>
        <p className="text-white text-4xl font-semibold">
          Users love <span className="text-lime-500">Qode</span>
        </p>
      </div>

      {/* testimonials */}
      <div className="w-full sm:py-16 flex flex-row gap-4 flex-wrap space-x-8">
        {testimonials.map((item) => {
          return (
            <div className="rounded-full h-28 w-[30%] px-5 py-2 mb-2 items-center bg-neutral-800 flex flex-row space-x-4">
              <div className="w[25%]">
                <img
                  src={item.image}
                  className="rounded-full object-cover h-12 w-12 border border-lime-500"
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="w-[70%]">
                <p className="text-white">
                  {item.testimonial} -{item.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
