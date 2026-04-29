import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const fetchResults = async () => {
    try {
      const res = await API.get("/results/my");
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50">
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
        <h2 className="text-2xl font-bold text-gray-800">My Results 📊</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {results.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No results yet 📭
          </div>
        ) : (
          <div className="space-y-5">
            {results.map((r) => (
              <div
                key={r.id}
                className="bg-white border rounded-2xl shadow-sm p-5 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  📘 {r.Exam?.title}
                </h3>

                <div className="mt-3 flex flex-col sm:flex-row sm:justify-between gap-2 text-gray-600">
                  <p>
                    <span className="font-medium">Score:</span>{" "}
                    <span className="text-green-600 font-semibold">
                      {r.score}
                    </span>
                  </p>

                  <p>
                    <span className="font-medium">Time Taken:</span>{" "}
                    {r.timeTaken} sec
                  </p>
                </div>

                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min(r.score * 10, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
