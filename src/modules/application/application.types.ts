export interface IApplicationCreate {
  userId: string;
  jobId: string;
  status?: string; // optional, default: "pending"
}

export interface IApplicationUpdate {
  status?: string; // "pending" | "accepted" | "rejected"
}
