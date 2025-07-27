import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useJobs } from "@/hooks/useJobs";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAuth } from "@/hooks/useAuth";
import type { AuthResponse } from "@/types";
import { api } from "@/lib/axios";

export default function Landing() {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [showAuthModal, setShowAuthModal] = useState<
    "login" | "register" | null
  >(null);

  const { data: jobs = [], isLoading, isError } = useJobs();

  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await api.post<AuthResponse>("/auth/login", {
        email,
        password,
      });
      login(res.data);
      setShowAuthModal(null);
      window.location.href = "/dashboard/list-job-vacancy";
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    imageUrl: string
  ) => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        image_url: imageUrl,
      });
      setShowAuthModal("login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType =
      jobType === "" || job.job_type.toLowerCase() === jobType.toLowerCase();
    const min = Number(minSalary) || 0;
    const max = Number(maxSalary) || Infinity;
    const matchesSalary = job.salary_min >= min && job.salary_max <= max;
    return matchesSearch && matchesType && matchesSalary;
  });

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="bg-gray-100 px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-lg">JobFinder</div>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 font-semibold">
            Beranda
          </Link>
        </nav>
        <Button onClick={() => setShowAuthModal("login")}>Login</Button>
      </header>

      {/* Hero */}
      <section className="bg-gray-50 py-10 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Temukan Lowongan Impianmu</h1>
        <div className="max-w-md mx-auto flex gap-2">
          <Input
            placeholder="Cari nama pekerjaan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button className="bg-rose-400 hover:bg-rose-500">Search</Button>
        </div>
      </section>

      {/* Job List */}
      <section className="flex-1 px-6 py-8 bg-white">
        <div className="mb-6 flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Tipe Pekerjaan
            </label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
            >
              <option value="">Semua</option>
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Gaji Minimum
            </label>
            <Input
              type="number"
              placeholder="e.g. 5000000"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Gaji Maksimum
            </label>
            <Input
              type="number"
              placeholder="e.g. 20000000"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
            />
          </div>
        </div>

        {isLoading && <p>Loading...</p>}
        {isError && <p>Terjadi kesalahan saat memuat data.</p>}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredJobs.map((job) => (
            <Card key={job._id}>
              <CardContent className="p-4">
                <img
                  src={job.company_image_url}
                  alt={job.company_name}
                  className="h-10 mb-4 object-contain"
                />
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.company_name}</p>
                <p className="text-sm">{job.company_city}</p>
                <p className="text-sm font-medium text-green-600">
                  {job.salary_min.toLocaleString("id-ID")} -{" "}
                  {job.salary_max.toLocaleString("id-ID")}
                </p>
                <Link
                  to={`/job-vacancy/${job._id}`}
                  className="text-blue-500 text-sm underline mt-2 inline-block"
                >
                  Lihat Detail
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-center py-4 mt-auto text-sm text-gray-600">
        © {new Date().getFullYear()} JobFinder. All rights reserved.
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-[90%] max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {showAuthModal === "login" ? "Login" : "Register"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                if (showAuthModal === "login") {
                  handleLogin(email, password);
                } else {
                  const name = formData.get("name") as string;
                  const imageUrl = formData.get("imageUrl") as string;
                  handleRegister(name, email, password, imageUrl);
                }
              }}
              className="space-y-3"
            >
              {showAuthModal === "register" && (
                <>
                  <Input name="name" placeholder="Name" required />
                  <Input name="imageUrl" placeholder="Image URL" required />
                </>
              )}
              <Input name="email" placeholder="Email" type="email" required />
              <Input
                name="password"
                placeholder="Password"
                type="password"
                required
                minLength={8}
              />
              <Button type="submit" className="w-full">
                {showAuthModal === "login" ? "Login" : "Register"}
              </Button>
            </form>
            <p className="text-sm mt-4 text-center">
              {showAuthModal === "login" ? (
                <>
                  Belum punya akun?{" "}
                  <button
                    onClick={() => setShowAuthModal("register")}
                    className="text-blue-500 underline"
                  >
                    Daftar di sini
                  </button>
                </>
              ) : (
                <>
                  Sudah punya akun?{" "}
                  <button
                    onClick={() => setShowAuthModal("login")}
                    className="text-blue-500 underline"
                  >
                    Login di sini
                  </button>
                </>
              )}
            </p>
            <button
              onClick={() => setShowAuthModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
