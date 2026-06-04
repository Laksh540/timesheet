import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";

type TaskMenuProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

const TaskMenu = ({ onEdit, onDelete }: TaskMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-[#8E8E93] transition hover:text-black"
      >
        <MoreHorizontal size={18} />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 top-8 z-20 w-[120px]
            rounded-xl border border-[#E6E6EB]
            bg-white py-2 shadow-lg
          "
        >
          <button
            onClick={() => {
              onEdit?.();
              setIsOpen(false);
            }}
            className="
              w-full px-4 py-2 text-left text-sm
              text-[#1E1E1E]
              transition hover:bg-[#F5F5F7]
            "
          >
            Edit
          </button>

          <button
            onClick={() => {
              onDelete?.();
              setIsOpen(false);
            }}
            className="
              w-full px-4 py-2 text-left text-sm
              text-[#FF3B30]
              transition hover:bg-[#FFF1F0]
            "
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskMenu;
