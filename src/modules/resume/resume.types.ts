export interface IResumeCreate {
  title: string;
  url: string; // Đường dẫn file đã upload
}

export interface IResumeUpdate {
  title?: string;
  url?: string;
}
