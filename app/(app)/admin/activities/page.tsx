import React, { useContext, useState } from "react";
import { Calendar, Globe, Hash, CheckCircle, User } from "lucide-react";
import { timeAgo } from "../../../../lib/date";
import { AppContext } from "../../context";
import { Activity, Redirect } from "../../../../types";
import DashboardHeader from "../../../../components/common/dashboardHeader";
import { useNavigate } from "react-router";

export const ActivityRow = ({ activity, index }: any) => {
  const [expanded, setExpanded] = useState(false);
  const rowClass = expanded
    ? "bg-zinc-300/40 dark:bg-zinc-900/40"
    : "hover:bg-zinc-300/20 dark:hover:bg-zinc-900/20";
  return (
    <tr
      key={index}
      onClick={() => {
        if (activity.type.length > 53) setExpanded(!expanded);
      }}
      className={`transition-all hover:cursor-pointer ease-linear duration-100 ${rowClass}`}
    >
      <td className="text-[15px] transition-all ease-linear duration-100 pl-3 py-4">
        {activity.activityId}
      </td>
      <td className="text-[15px] py-4">{activity.userId}</td>
      <td className="text-[15px] max-w-[450px] break-words transition-all ease-linear duration-100 px-3 py-4">
        {expanded
          ? activity.type
          : activity.type.length > 53
          ? activity.type.slice(0, 53) + "..."
          : activity.type}
      </td>
      <td className="text-[15px] transition-all ease-linear duration-100 px-3 py-4">
        {timeAgo(activity.date)}
      </td>
      <td className="flex-1 flex-row items-center text-end space-x-1 pr-3 py-4">
        {activity.status === "success" ? (
          <span className="bg-green-500/10 text-[15.5px] text-green-100 rounded-full px-3 py-1.5">
            Başarılı
          </span>
        ) : (
          <span className="bg-red-500/10 text-[15.5px] text-red-100 rounded-full px-3 py-1.5">
            Başarısız
          </span>
        )}
      </td>
    </tr>
  );
};

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
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] pl-3 py-2">
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
              <th className="text-left dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] py-2">
                <div className="inline-flex items-center space-x-1.5">
                  <User
                    className="text-blue-500"
                    height={17}
                    width={17}
                    stroke="currentColor"
                  />
                  <span className="mt-px">Kullanıcı ID</span>
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
                  <span className="mt-px">Aktivite</span>
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
                  <span className="mt-px">Zaman</span>
                </div>
              </th>
              <th className="text-end dark:text-zinc-200 text-zinc-800 text-[15.5px] font-[450] pr-3 py-2">
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
              <ActivityRow activity={activity} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
