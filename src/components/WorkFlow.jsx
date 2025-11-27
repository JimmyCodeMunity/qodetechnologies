import React from "react";

const Workflow = () => {
  return (
    <div className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Automate your builds, tests, and releases
          </h2>
          <p className="text-lg text-gray-600">
            Build for the app stores, send over-the-air updates, and more
            automatically with Workflows.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="flex justify-center space-x-10 mt-10">
          {/* Left Box (Deploy to production) */}
          <div className="w-80 p-6 bg-white shadow-xl rounded-xl border border-gray-300">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">
                Deploy to production
              </h3>
            </div>

            <div className="text-sm text-gray-500">On every</div>
            <select className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-lime-500 focus:border-lime-500">
              <option>merge</option>
              <option>push</option>
            </select>

            <div className="mt-4 text-sm text-gray-500">on branch</div>
            <input
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              value="main"
            />
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-lime-500"
                checked
              />
              <span className="ml-2 text-sm text-gray-500">Enabled</span>
            </div>
          </div>

          {/* Middle Flow Container */}
          <div className="flex flex-col justify-between items-center space-y-8">
            {/* Get Build */}
            <div className="flex flex-col items-center text-center w-72 p-6 bg-white shadow-xl rounded-xl border border-gray-300">
              <div className="w-3 h-3 bg-green-500 rounded-full mb-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">Get build</h3>
              <p className="text-sm text-gray-500">Duration: 5m 42s</p>
            </div>

            {/* Build iOS */}
            <div className="flex flex-col items-center text-center w-72 p-6 bg-white shadow-xl rounded-xl border border-gray-300">
              <div className="w-3 h-3 bg-green-500 rounded-full mb-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">Build iOS</h3>
              <p className="text-sm text-gray-500">Duration: 5m 42s</p>
            </div>

            {/* Build Android */}
            <div className="flex flex-col items-center text-center w-72 p-6 bg-white shadow-xl rounded-xl border border-gray-300">
              <div className="w-3 h-3 bg-green-500 rounded-full mb-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">
                Build Android
              </h3>
              <p className="text-sm text-gray-500">Duration: 9m 54s</p>
            </div>

            {/* Submit to App Store */}
            <div className="flex flex-col items-center text-center w-72 p-6 bg-white shadow-xl rounded-xl border border-gray-300">
              <div className="w-3 h-3 bg-green-500 rounded-full mb-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">
                Submit to App Store
              </h3>
              <p className="text-sm text-gray-500">Duration: 5m 42s</p>
            </div>

            {/* Submit to Google Play Store */}
            <div className="flex flex-col items-center text-center w-72 p-6 bg-white shadow-xl rounded-xl border border-gray-300">
              <div className="w-3 h-3 bg-green-500 rounded-full mb-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">
                Submit to Google Play Store
              </h3>
              <p className="text-sm text-gray-500">Duration: 9m 54s</p>
            </div>

            {/* Send Over-the-Air Update */}
            <div className="flex flex-col items-center text-center w-72 p-6 bg-white shadow-xl rounded-xl border border-gray-300">
              <div className="w-3 h-3 bg-gray-400 rounded-full mb-3"></div>
              <h3 className="text-lg font-semibold text-gray-500">
                Send over-the-air update
              </h3>
              <p className="text-sm text-gray-500">Skipped</p>
            </div>
          </div>

          {/* Right Box (Submit to stores) */}
          <div className="w-80 p-6 bg-white shadow-xl rounded-xl border border-gray-300">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-700">
                Submit to App Store
              </h3>
            </div>
            <p className="text-sm text-gray-500">Duration: 5m 42s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
