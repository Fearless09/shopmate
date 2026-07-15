import { cn } from "@/lib/utils";
import { ComponentProps, FC } from "react";

interface EmptyStateProps {
  icon: FC<ComponentProps<"svg">>;
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
  classNmae?: string;
}

export const EmptyState = ({
  actionText,
  description,
  icon,
  onAction,
  title,
  classNmae,
}: EmptyStateProps) => {
  const Icon = icon;
  return (
    <section
      className={cn(
        "mt-4 flex flex-col items-center justify-center space-y-4 rounded-3xl border border-dashed border-neutral-200 px-4 py-20 text-center dark:border-neutral-800",
        classNmae,
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-neutral-50 text-neutral-400 dark:bg-neutral-900">
        <Icon className="size-8.5" />
      </span>

      <div className="space-y-1">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
          {title}
        </h3>
        <p className="max-w-sm text-sm text-balance text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      </div>

      <button
        onClick={onAction}
        className="transition-300 mt-2 cursor-pointer rounded-xl bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
      >
        {actionText}
      </button>
    </section>
  );
};
