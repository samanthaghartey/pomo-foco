import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TaskListContext } from "@/contexts/context";
import { useContext, useEffect } from "react";
import { TaskType } from "@/types/types";
import { getData, openDatabase } from "@/database/db";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/* export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map((name) => 2),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => 2),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
}; */

const Graph = () => {
  // Helper function to get the start of the current week (Monday)
  const getStartOfWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    startOfWeek.setDate(diff);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  };

  // Get activities from the current week
  const getActivitiesForCurrentWeek = async (): Promise<TaskType[]> => {
    const db = await openDatabase();
    const tasks = await getData(db);

    const startOfWeek = getStartOfWeek(new Date());

    // Filter tasks by date range (current week)
    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate >= startOfWeek; // Compare against the start of the week
    });
  };

  const { getTasksForDate } = useContext(TaskListContext)!;

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map((name) => 2),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => 2),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  useEffect(() => {
    getTasksForDate("2025-01-03").then((res) => console.log(res));
  }, []);

  return (
    <div className="min-h-screen  bg-mybackground lg:px-96  w-full mx-auto py-7 flex items-center flex-col ">
      <Bar data={data} />;
    </div>
  );
};

export default Graph;
