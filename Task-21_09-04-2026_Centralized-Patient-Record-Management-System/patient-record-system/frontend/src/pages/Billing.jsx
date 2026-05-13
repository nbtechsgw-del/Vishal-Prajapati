import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import toast from "react-hot-toast";

function Billing() {
  const token = localStorage.getItem("token");

  const [patients, setPatients] = useState([]);

  const [bills, setBills] = useState([]);

  const [revenue, setRevenue] = useState(0);

  const [statusFilter, setStatusFilter] = useState("");

  const [formData, setFormData] = useState({
    patientId: "",
    treatment: "",
    amount: "",
    paymentMethod: "",
  });

  // FETCH DATA
  const fetchData = async () => {
    try {
      // PATIENTS
      const patientRes = await api.get("/patients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPatients(patientRes.data);

      // BILLS
      const billRes = await api.get(`/billing?status=${statusFilter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBills(billRes.data);

      // REVENUE
      const revenueRes = await api.get("/billing/revenue/total", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRevenue(revenueRes.data.revenue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // CREATE BILL
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/billing", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Invoice generated");

      fetchData();

      setFormData({
        patientId: "",
        treatment: "",
        amount: "",
        paymentMethod: "",
      });
    } catch (error) {
      toast.error("Failed to generate invoice", error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, paymentStatus) => {
    try {
      await api.put(
        `/billing/${id}`,
        { paymentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Payment updated");

      fetchData();
    } catch (error) {
      toast.error("Update failed", error);
    }
  };

  // DELETE BILL
  const deleteBill = async (id) => {
    if (!window.confirm("Delete invoice?")) {
      return;
    }

    try {
      await api.delete(`/billing/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Invoice deleted");

      fetchData();
    } catch (error) {
      toast.error("Delete failed", error);
    }
  };

  // STATUS BADGE
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <DashboardLayout>
      {/* DASHBOARD CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500">Total Revenue</h3>

          <p className="text-3xl font-bold mt-2">₹{revenue}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500">Total Invoices</h3>

          <p className="text-3xl font-bold mt-2">{bills.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-gray-500">Paid Bills</h3>

          <p className="text-3xl font-bold mt-2">
            {bills.filter((bill) => bill.paymentStatus === "Paid").length}
          </p>
        </div>
      </div>

      {/* BILL FORM */}

      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6">Generate Invoice</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* PATIENT */}

          <select
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          >
            <option value="">Select Patient</option>

            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="treatment"
            placeholder="Treatment"
            value={formData.treatment}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          >
            <option value="">Payment Method</option>

            <option>Cash</option>

            <option>Card</option>

            <option>UPI</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 md:col-span-2"
          >
            Generate Invoice
          </button>
        </form>
      </div>

      {/* FILTER */}

      <div className="flex justify-end mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="">All Payments</option>

          <option value="Paid">Paid</option>

          <option value="Pending">Pending</option>

          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* BILL TABLE */}

      <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6">Billing Records</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Bill ID</th>

              <th className="p-3 text-left">Patient</th>

              <th className="p-3 text-left">Treatment</th>

              <th className="p-3 text-left">Amount</th>

              <th className="p-3 text-left">Method</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{bill.billId}</td>

                <td className="p-3">{bill.Patient?.name}</td>

                <td className="p-3">{bill.treatment}</td>

                <td className="p-3">₹{bill.amount}</td>

                <td className="p-3">{bill.paymentMethod}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      bill.paymentStatus,
                    )}`}
                  >
                    {bill.paymentStatus}
                  </span>
                </td>

                <td className="p-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => updateStatus(bill.id, "Paid")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Mark Paid
                  </button>

                  <button
                    onClick={() => updateStatus(bill.id, "Cancelled")}
                    className="bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Print
                  </button>

                  <button
                    onClick={() => deleteBill(bill.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Billing;
