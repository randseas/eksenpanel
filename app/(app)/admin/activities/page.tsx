import React, { useContext } from "react";
import { Calendar, Globe, Hash, CheckCircle, User } from "lucide-react";
import { timeAgo } from "../../../../lib/date";
import { AppContext } from "../../context";
import { Activity, Redirect } from "../../../../types";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import { useNavigate } from "react-router";

export default function Activities() {
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  return (
    <div className="flex space-y-4 flex-col min-h-[90vh] md:min-h-[100vh] items-start px-5 py-[18px] justify-start w-full h-full">
      <DashboardHeader page="Aktivite Logları" />
      <div className="flex neon-box-2 overflow-y-auto overflow-x-auto flex-col bg-light/20 dark:bg-[#292929] border dark:border-zinc-700 border-light-border rounded-2xl w-full h-full">
        <table className="min-w-full w-full">
          <thead className="border-b dark:border-zinc-700 border-light-border/80 rounded-t-2xl w-full">
            <tr>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Hash
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Aktivite ID</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-3 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Globe
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Aktivite Tipi</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <Calendar
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Tarih</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <User
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Kullanıcı</span>
                </div>
              </th>
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] px-2 py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <CheckCircle
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Durum</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-zinc-700 divide-light-border/80">
            {state.activities.map((activity: Activity, index: number) => (
              <tr
                key={index}
                className="transition-all hover:bg-zinc-300/20 dark:hover:bg-zinc-900/20 ease-linear duration-100"
              >
                <td className="text-[15px]  transition-all ease-linear duration-100 px-3 py-4">
                  {activity.activityId}
                </td>
                <td className="text-[15px]  transition-all ease-linear duration-100 px-3 py-4">
                  {activity.type}
                </td>
                <td className="text-[15px]  transition-all ease-linear duration-100 px-3 py-4">
                  {timeAgo(activity.date)}
                </td>
                <td className="text-[15px] px-2 py-4">{activity.userId}</td>
                <td className="flex-1 flex-row items-center space-x-1 px-2 py-4">
                  {activity.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
