import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return (
    <div className="flex items-start justify-start h-full p-4 text-gray-500">
      <DashboardSkeleton />
    </div>
  );
}
