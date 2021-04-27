import { ErrorView } from "./ErrorView";
import { LoadingView } from "./LoadingView";
import React from "react";
import { fetchJson } from "./http";
import { useLoading } from "./useLoading";

export function ProfilePage() {
  const { loading, error, data } = useLoading(() => fetchJson("/api/profile"));

  if (error) {
    return <ErrorView error={error} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }

  const { username } = data;

  return (
    <div>
      <h1>Your profile:</h1>
      <div>Username: {username}</div>
    </div>
  );
}
