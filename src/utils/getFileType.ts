import { FileType } from "../store/files/enums"
const regexExcel = /(xlsx|xls)$/
const regexPdf = /pdf$/
const regexWord = /(rtf|docx|doc)$/
const regexVideo = /(mp4|mov|avi|webm)$/
const regexPhoto = /(png|jpg|jpeg|ico|gif|svg|webp)$/

export const getFileType = (name: string) => {
    if(regexExcel.test(name)) return FileType.Excel
    else if(regexPdf.test(name)) return FileType.Pdf
    else if(regexWord.test(name)) return FileType.Word
    else if(regexVideo.test(name)) return FileType.Video
    else if(regexPhoto.test(name)) return FileType.Photo
    else return FileType.File
}