import JobState from "./jobState";

interface jobDataObject {
    state: JobState,
    created_at: Date,
    updated_at: Date
}

export { jobDataObject }