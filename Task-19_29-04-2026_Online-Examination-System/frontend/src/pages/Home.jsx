import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-indigo-50 via-white to-blue-50">
      <Navbar title="Online Exam System 🎓" isPublic={true} />

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Smart & Secure{" "}
            <span className="text-blue-600">Online Examination</span> Platform
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Conduct exams online with real-time monitoring, automatic scoring,
            and instant results. Built for schools, colleges, and competitive
            exams.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-gray-800">📚 Create Exams</h3>
              <p className="text-sm text-gray-600 mt-1">
                Easily create and manage exams with MCQs.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-gray-800">⏱ Timed Tests</h3>
              <p className="text-sm text-gray-600 mt-1">
                Automatic timer with secure exam environment.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border">
              <h3 className="font-semibold text-gray-800">
                📊 Instant Results
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Get results and performance analytics instantly.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-gray-500 text-sm">
              Trusted by students and educators for seamless online assessments.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
