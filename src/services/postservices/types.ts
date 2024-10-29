

export interface post{
    id?: number;
    title: string;
    content: string;
    authorId?: string;
}
export interface UpdatePostArgs {
    id: string; 
    title: string;
    content: string;
  }