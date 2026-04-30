import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResults = async () => {
    try {
      const res = await API.get("/results/my");
      setResults(res.data);
    } catch (err) {
      setError("Failed to load results");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50">
      <Navbar title="My Results 📊" />

      <div className="p-6 max-w-4xl mx-auto">
        {loading && (
          <div className="text-center text-gray-500">Loading results...</div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-center mb-4">
            {error}
          </div>
        )}

        {!loading && results.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No results yet 📭
          </div>
        ) : (
          <div className="space-y-5">
            {results.map((r) => {
              const percentage = r.totalQuestions
                ? (r.score / r.totalQuestions) * 100
                : 0;

              return (
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
                      {r.timeTaken}s
                    </p>
                  </div>

                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                      }}
                    ></div>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
