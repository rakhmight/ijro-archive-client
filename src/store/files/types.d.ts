declare interface Files {
    files: Array<File>
}

declare interface File {
    id: string,
    name: string,
    size: number,
    createdAt: Date,
    status: import('./enums').FileStatus
}