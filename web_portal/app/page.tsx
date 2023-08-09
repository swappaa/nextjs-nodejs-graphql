"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { GET_ACTIVITIES } from "../gql/queries";

export default function Home() {
  const [activities, setActivities] = useState([]);
  const { data, loading, error } = useSuspenseQuery(GET_ACTIVITIES);

  useEffect(() => {
    if (data) {
      setActivities(data.getActivities || []);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="">
      {" "}
      <h1>Activities</h1>
      {activities.map((activity: any) => (
        <div key={activity.activity_id}>
          <p>Activity ID: {activity.activity_id}</p>
          <p>Activity Type ID: {activity.activity_type_id}</p>
          <p>Reference ID: {activity.reference_id}</p>
          <p>Description: {activity.activity_desc}</p>
        </div>
      ))}
    </div>
  );
}
