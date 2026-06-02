import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <header className="h-16  px-6 flex items-center justify-between bg-white">
        <div className="flex items-center gap-10">
          <h1 className="text-4xl font-bold">ticktock</h1>

          <nav>
            <button className="text-gray-800 font-medium">Timesheets</button>
          </nav>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-gray-700 font-medium">John Doe</span>

          <span className="text-sm">▼</span>
        </div>
      </header>

      <main className="flex-1 bg-[#F8F8F8]">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Outlet />
        </div>
      </main>

      <footer className="pb-6 bg-[#F8F8F8]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white border border-gray-200 rounded-xl h-20 flex items-center justify-center text-sm text-gray-500">
            © 2024 tentwenty. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default AppLayout;
