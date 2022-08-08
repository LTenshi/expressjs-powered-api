import BookFileFormat from "./bookFileFormat";
import { jobDataObject } from "./jobDataObject";

interface exportJob extends jobDataObject
{
    bookId: string,
    type: BookFileFormat
}

export default exportJob;