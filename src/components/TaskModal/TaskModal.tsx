import { X, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { PROJECT_OPTIONS, WORK_TYPE_OPTIONS } from "../../constants";
import type { WeekDetail } from "../../types/timesheet";

// type Task = {
//   id?: string;
//   task: string;
//   hours: number;
//   projectName?: string;
//   workType?: string;
// };

type TaskModalProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  task?: WeekDetail | null;
  onClose: () => void;
  onSubmit: (data: WeekDetail) => void;
  isSubmitting: boolean;
};

const TaskModal = ({
  isOpen,
  mode,
  task,
  onClose,
  onSubmit,
  isSubmitting,
}: TaskModalProps) => {
  const [projectName, setProjectName] = useState("");
  const [workType, setWorkType] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [hours, setHours] = useState(0);
  const [errors, setErrors] = useState({
    projectName: "",
    workType: "",
    taskDescription: "",
    hours: "",
  });

  useEffect(() => {
    if (mode === "edit" && task) {
      setProjectName(task.projectId || "");
      setWorkType(task.workTypeId || "");
      setTaskDescription(task.task || "");
      setHours(task.hours);
    } else {
      setProjectName("");
      setWorkType("");
      setTaskDescription("");
      setHours(0);
    }
  }, [mode, task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    // e.preventDefault();
    const newErrors = {
      projectName: "",
      workType: "",
      taskDescription: "",
      hours: "",
    };

    let hasError = false;

    if (!projectName.trim()) {
      newErrors.projectName = "Project is required";

      hasError = true;
    }

    if (!workType.trim()) {
      newErrors.workType = "Work type is required";

      hasError = true;
    }

    if (!taskDescription.trim()) {
      newErrors.taskDescription = "Task description is required";

      hasError = true;
    }

    if (hours <= 0) {
      newErrors.hours = "Hours should be greater than 0";

      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;
    // return
    onSubmit({
      id: task?.id,
      projectId: projectName,
      workTypeId: workType,
      task: taskDescription,
      hours,
    });
  };

  return (
    <div
      className="
    fixed inset-0 z-50 flex items-center justify-center
    bg-black/40 p-4
  "
    >
      <div
        className="
      flex h-[90vh] w-full max-w-2xl
      flex-col overflow-hidden rounded-2xl
      bg-white shadow-xl
    "
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            className="
            flex items-center justify-between
            border-b border-[#E6E6EB]
            px-8 py-6
          "
          >
            <h2 className="text-lg font-semibold text-[#1E1E1E]">
              {mode === "create" ? "Add New Entry" : "Edit Entry"}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="text-[#8E8E93] hover:text-black"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div
            className="
    flex-1 overflow-y-auto
    px-8 py-8
  "
          >
            <div className="space-y-8">
              {/* Project */}
              <div>
                <label
                  className="
      mb-3 block text-lg font-medium
      text-[#1E1E1E]
    "
                >
                  Select Project *
                </label>

                <select
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="
      h-9 w-full max-w-[460px]
      rounded-xl border border-[#D8DCE5]
      px-5 text-lg text-[#1E1E1E]
      outline-none
    "
                >
                  <option value="">Project Name</option>

                  {PROJECT_OPTIONS.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.label}
                    </option>
                  ))}
                </select>
                {errors.projectName && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.projectName}
                  </p>
                )}
              </div>

              {/* Work Type */}
              <div>
                <label
                  className="
      mb-3 block text-lg font-medium
      text-[#1E1E1E]
    "
                >
                  Type of Work *
                </label>

                <select
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="
      h-9 w-full max-w-[460px]
      rounded-xl border border-[#D8DCE5]
      px-5 text-lg text-[#1E1E1E]
      outline-none
    "
                >
                  <option value="">Select work type</option>

                  {WORK_TYPE_OPTIONS.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.workType && (
                  <p className="mt-2 text-sm text-red-500">{errors.workType}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  className="
                mb-3 block text-lg font-medium
                text-[#1E1E1E]
              "
                >
                  Task description *
                </label>

                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Write text here ..."
                  className="
                h-[160px] w-full rounded-xl
                border border-[#D8DCE5]
                px-5 py-4 text-lg
                outline-none
                placeholder:text-[#9CA3AF]
              "
                />

                <p className="mt-3 text-sm text-[#6B7280]">
                  A note for extra info
                </p>
                {errors.taskDescription && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.taskDescription}
                  </p>
                )}
              </div>

              {/* Hours */}
              <div>
                <label
                  className="
                mb-3 block text-lg font-medium
                text-[#1E1E1E]
              "
                >
                  Hours *
                </label>

                <div
                  className="
                flex h-9 w-fit overflow-hidden
                rounded-xl border border-[#D8DCE5]
              "
                >
                  <button
                    onClick={() => setHours((prev) => Math.max(0, prev - 1))}
                    type="button"
                    className="
                  flex w-[56px] items-center
                  justify-center border-r
                  border-[#D8DCE5]
                "
                  >
                    <Minus size={18} />
                  </button>

                  <div
                    className="
                  flex w-[70px] items-center
                  justify-center text-lg
                  text-[#6B7280]
                "
                  >
                    {hours}
                  </div>

                  <button
                    type="button"
                    onClick={() => setHours((prev) => prev + 1)}
                    className="
                  flex w-[56px] items-center
                  justify-center border-l
                  border-[#D8DCE5]
                "
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {errors.hours && (
                  <p className="mt-2 text-sm text-red-500">{errors.hours}</p>
                )}
              </div>
            </div>
          </div>
          {/* Footer */}
          <div
            className="
            flex gap-5 border-t border-[#E6E6EB]
            px-8 py-6
          "
          >
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="
    flex-1 rounded-xl bg-[#2563EB]
    py-1.5 text-lg font-medium text-white
    transition hover:bg-[#1D4ED8]
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
            >
              {isSubmitting
                ? "Saving..."
                : mode === "create"
                  ? "Add entry"
                  : "Save changes"}
            </button>

            <button
              onClick={onClose}
              disabled={isSubmitting}
              type="button"
              className="
              flex-1 rounded-xl border
              border-[#D8DCE5]
              py-1.5 text-lg font-medium
              text-[#1E1E1E]
            "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
