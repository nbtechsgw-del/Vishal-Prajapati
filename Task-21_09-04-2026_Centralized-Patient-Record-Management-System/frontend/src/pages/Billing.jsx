import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import toast from "react-hot-toast";

import {
  IndianRupee,
  FileText,
  Wallet,
  CreditCard,
  Receipt,
  Trash2,
  Printer,
  CircleDollarSign,
  CheckCircle2,
} from "lucide-react";

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

  // STATUS COLORS
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
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Billing Management</h1>

        <p className="text-gray-500 mt-2">
          Manage invoices, payments and hospital revenue
        </p>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* REVENUE */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-6 hover:scale-[1.02] transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-medium">Total Revenue</p>

              <h2 className="text-4xl font-bold text-gray-800 mt-3">
                ₹{revenue}
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <IndianRupee size={30} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* INVOICES */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-6 hover:scale-[1.02] transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-medium">Total Invoices</p>

              <h2 className="text-4xl font-bold text-gray-800 mt-3">
                {bills.length}
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <Receipt size={30} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* PAID */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-6 hover:scale-[1.02] transition duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-medium">Paid Bills</p>

              <h2 className="text-4xl font-bold text-gray-800 mt-3">
                {bills.filter((bill) => bill.paymentStatus === "Paid").length}
              </h2>
            </div>

            <div className="bg-cyan-100 p-4 rounded-2xl">
              <CheckCircle2 size={30} className="text-cyan-600" />
            </div>
          </div>
        </div>
      </div>

      {/* BILL FORM */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 mb-8">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-linear-to-r from-cyan-500 to-blue-600 p-3 rounded-2xl text-white shadow-lg">
            <FileText size={24} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Generate Invoice
            </h2>

            <p className="text-gray-500 mt-1">Create a new billing invoice</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* PATIENT */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Select Patient
            </label>

            <select
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 transition"
              required
            >
              <option value="">Select Patient</option>

              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          {/* TREATMENT */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Treatment
            </label>

            <input
              type="text"
              name="treatment"
              placeholder="Enter treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="w-full mt-2 bg-gray-50 border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-cyan-500 transition"
              required
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Amount
            </label>

            <div className="relative mt-2">
              <CircleDollarSign
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition"
                required
              />
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Payment Method
            </label>

            <div className="relative mt-2">
              <Wallet
                size={18}
                className="absolute left-4 top-4 text-gray-400"
              />

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-500 transition"
              >
                <option value="">Payment Method</option>

                <option>Cash</option>

                <option>Card</option>

                <option>UPI</option>
              </select>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="md:col-span-2 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition duration-300"
          >
            Generate Invoice
          </button>
        </form>
      </div>

      {/* FILTER */}
      <div className="flex justify-end mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-white border border-gray-200 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">All Payments</option>

          <option value="Paid">Paid</option>

          <option value="Pending">Pending</option>

          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* BILL TABLE */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl rounded-3xl p-8 overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Billing Records
            </h2>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                <th className="p-4 text-center rounded-l-2xl">Bill ID</th>

                <th className="p-4 text-center">Patient</th>

                <th className="p-4 text-center">Treatment</th>

                <th className="p-4 text-center">Amount</th>

                <th className="p-4 text-center">Method</th>

                <th className="p-4 text-center">Status</th>

                <th className="p-4 text-center rounded-r-2xl">Actions</th>
              </tr>
            </thead>

            <tbody>
              {bills.map((bill) => (
                <tr
                  key={bill.id}
                  className="border-b border-gray-100 hover:bg-cyan-50 transition"
                >
                  <td className="p-4 font-semibold text-cyan-600 text-[13px]">
                    {bill.billId}
                  </td>

                  <td className="p-4 font-medium text-gray-800 text-[13px]">
                    {bill.Patient?.name}
                  </td>

                  <td className="p-4 text-gray-700 text-[13px]">
                    {bill.treatment}
                  </td>

                  <td className="p-4 font-semibold text-green-600 text-[13px]">
                    ₹{bill.amount}
                  </td>

                  <td className="p-4 text-gray-600 text-[13px]">
                    {bill.paymentMethod}
                  </td>

                  <td className="p-4 text-[13px]">
                    <span
                      className={`px-4 py-2 rounded-full text-[13px] font-semibold ${getStatusColor(
                        bill.paymentStatus,
                      )}`}
                    >
                      {bill.paymentStatus}
                    </span>
                  </td>

                  <td className="p-4 flex gap-3 flex-wrap">
                    <button
                      onClick={() => updateStatus(bill.id, "Paid")}
                      className="text-[13px] flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition shadow"
                    >
                      <CreditCard size={16} />
                      Paid
                    </button>

                    <button
                      onClick={() => updateStatus(bill.id, "Cancelled")}
                      className="text-[13px] bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition shadow"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="text-[13px] flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition shadow"
                    >
                      <Printer size={16} />
                      Print
                    </button>

                    <button
                      onClick={() => deleteBill(bill.id)}
                      className="text-[13px] flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition shadow"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Billing;
