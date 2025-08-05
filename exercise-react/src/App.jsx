import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobPage from "./pages/JobPage";
import NotFoundPage from "./pages/NotFoundPage";
import SingleJobPage, { jobLoader } from "./pages/SingleJobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
const App = () => {
  // Function to handle deleting a job
  const jobDeleter = async (id) => {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete job");
    }
    return;
  };
  // Function to handle adding a new job
  const jobAdder = (newJob) => {
    const response = fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    if (!response.ok) {
      throw new Error("Failed to add job");
    } 
    return;
  };
  // Function to handle updating an existing job
  const updateJob = async (updatedJob) => {
    const response = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    if (!response.ok) {
      throw new Error("Failed to update job");
    }
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route
          path="/add-job"
          element={<AddJobPage addJobSubmit={jobAdder} />}
        />
        <Route
          path="/jobs/:id"
          element={<SingleJobPage deleteJob={jobDeleter} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/Edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
