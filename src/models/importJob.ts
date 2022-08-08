import BookFileFormat from "./bookFileFormat"
import { jobDataObject } from "./jobDataObject";

interface importJob extends jobDataObject
{
    bookId: string,
    type: BookFileFormat,
    url: string
}

export default importJob;