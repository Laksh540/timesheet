import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createWeekDetail,
  getTimesheetById,
  getWeekDetailsByTimesheetId,
  updateTimesheet,
  updateWeekDetail,
} from "../api/timesheet";
import { eachDayOfInterval, format } from "date-fns";
import type { Timesheet, WeekDetail } from "../types/timesheet";
import TaskMenu from "../components/TaskMenu/TaskMenu";
import TaskModal from "../components/TaskModal/TaskModal";
import { getProjectName } from "../utils/timesheetHelper";
import { TimesheetStatus } from "../constants";

const TimesheetDetailsPage = () => {
  const [timesheet, setTimesheet] = useState<Timesheet | null>(null);
  const [tasks, setTasks] = useState<WeekDetail[]>([]);
  // const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const [selectedTask, setSelectedTask] = useState<WeekDetail | null>(null);

  const { weekId } = useParams();
  const fetchData = async () => {
    try {
      const [timesheetData, weekDetailsData] = await Promise.all([
        getTimesheetById(weekId ?? ""),
        getWeekDetailsByTimesheetId(weekId ?? ""),
      ]);

      console.log(timesheetData);
      console.log(weekDetailsData);

      const sortedWeekDetails = [...weekDetailsData].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      setTimesheet(timesheetData);
      setTasks(sortedWeekDetails);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!weekId) return;

    fetchData();
  }, [weekId]);

  const groupedTasks = useMemo<Record<string, WeekDetail[]>>(() => {
    if (!timesheet?.weekStart || !timesheet?.weekEnd) {
      return {};
    }

    const allDates = eachDayOfInterval({
      start: new Date(timesheet.weekStart),
      end: new Date(timesheet?.weekEnd),
    });

    const grouped: Record<string, WeekDetail[]> = {};

    allDates.forEach((date) => {
      const formattedDate = format(date, "yyyy-MM-dd");

      grouped[formattedDate] = tasks.filter(
        (task) => task?.date === formattedDate,
      );
    });

    return grouped;
  }, [tasks, timesheet]);

  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0);

  const progress = Math.min((totalHours / 40) * 100, 100).toString();

  const handleAddTask = (date: string) => {
    setModalMode("create");
    setSelectedDate(date);
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: WeekDetail, date: string) => {
    setModalMode("edit");
    setSelectedTask(task);
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (data: WeekDetail) => {
    console.log("data", data);

    setIsModalOpen(false);
    let payload: WeekDetail = {
      // ...data,
      // id: data.id,
      projectId: data?.projectId,
      hours: data?.hours,
      task: data?.task,
      workTypeId: data?.workTypeId,
      timesheetId: weekId,
      date: selectedDate,
    };
    // return;
    try {
      setIsSubmitting(true);
      if (modalMode === "create") {
        await createWeekDetail(payload);

        // fetchData();
      } else if (modalMode === "edit" && selectedTask?.id) {
        payload = {
          ...payload,
          id: data.id,
        };
        await updateWeekDetail(selectedTask.id, payload);
      }

      // fetch latest data after create/edit
      const updatedTasks = await getWeekDetailsByTimesheetId(weekId ?? "");

      const totalHours = updatedTasks.reduce(
        (sum: number, task: WeekDetail) => {
          return sum + Number(task.hours || 0);
        },
        0,
      );

      let status: "COMPLETED" | "INCOMPLETE" | "MISSING";

      if (totalHours === 0) {
        status = TimesheetStatus.MISSING;
      } else if (totalHours >= 40) {
        status = TimesheetStatus.COMPLETED;
      } else {
        status = TimesheetStatus.INCOMPLETE;
      }
      if (!weekId) return;
      await updateTimesheet(weekId, {
        status,
      });

      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("progress", progress);

  return (
    <>
      <div className="min-h-screen bg-[#F8F8FA] p-6">
        <div className="mx-auto max-w-7xl rounded-2xl bg-white p-8 shadow-sm">
          {/* Header */}
          <div className="mb-10 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#1E1E1E]">
                This week&apos;s timesheet
              </h1>

              <p className="mt-2 text-sm text-[#8E8E93]">
                {timesheet?.weekLabel}
              </p>
            </div>

            <div className="w-[180px]">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-[#1E1E1E]">
                  {totalHours}/40 hrs
                </span>

                <span className="text-[#8E8E93]">100%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#ECECF0]">
                <div
                  style={{
                    width: `${progress}%`,
                  }}
                  className={`h-full  rounded-full bg-[#F08A4B]`}
                />
              </div>
            </div>
          </div>

          {/* Task Groups */}
          <div className="space-y-10">
            {Object.entries(groupedTasks).map(([date, tasks]) => (
              <div key={date} className="flex gap-6">
                {/* Date */}
                <div className="w-[80px] shrink-0">
                  <p className="text-lg font-semibold text-[#1E1E1E]">
                    {format(new Date(date), "MMM dd")}
                  </p>
                </div>

                {/* Tasks */}
                <div className="flex-1 space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between rounded-xl border border-[#E6E6EB] bg-white px-5 py-4"
                    >
                      <p className="text-base font-medium text-[#1E1E1E]">
                        {task.task}
                      </p>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-[#8E8E93]">
                          {task.hours} hrs
                        </span>

                        <span className="rounded-md bg-[#EEF3FF] px-3 py-1 text-xs font-medium text-[#3B5CCC]">
                          {getProjectName(task.projectId) ?? ""}
                        </span>

                        <TaskMenu
                          onEdit={() => handleEditTask(task, date)}
                          onDelete={() => console.log(task.id)}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Add Task Button */}
                  <button
                    className="
          flex w-full items-center justify-center gap-2
          rounded-xl border border-dashed border-[#C9CCD6]
          py-4 text-sm font-medium text-[#5C5F6A]
          transition hover:bg-[#F7F8FA]
        "
                    onClick={() => handleAddTask(date)}
                  >
                    <Plus size={16} />

                    <span>Add new task</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        mode={modalMode}
        task={selectedTask}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default TimesheetDetailsPage;
