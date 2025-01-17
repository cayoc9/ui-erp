import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data generator functions
const generateMockCourses = () => [
    { id: 1, name: 'Patient Safety Training' },
    { id: 2, name: 'Medical Records Management' },
    { id: 3, name: 'Healthcare Quality Standards' },
    { id: 4, name: 'Clinical Documentation' },
    { id: 5, name: 'Healthcare Compliance' }
];

const generateMockStudents = () => [
    { id: 101, name: 'Dr. Silva' },
    { id: 102, name: 'Enf. Santos' },
    { id: 103, name: 'Dr. Oliveira' },
    { id: 104, name: 'Téc. Costa' },
    { id: 105, name: 'Enf. Lima' }
];

const generateMockCompletions = (dateRange) => {
    const { startDate, endDate } = dateRange;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const courses = generateMockCourses();
    const students = generateMockStudents();

    return Array.from({ length: 50 }, () => {
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const randomCourse = courses[Math.floor(Math.random() * courses.length)];
        const randomStudent = students[Math.floor(Math.random() * students.length)];

        return {
            courseId: randomCourse.id,
            courseName: randomCourse.name,
            studentId: randomStudent.id,
            studentName: randomStudent.name,
            completionDate: randomDate.toISOString(),
            grade: Math.floor(Math.random() * 40 + 60), // 60-100
            timeSpent: Math.floor(Math.random() * 120 + 30) // 30-150 minutes
        };
    });
};

// Async thunk to simulate API call
export const fetchMoodleData = createAsyncThunk(
    'mockedData/fetchMoodleData',
    async (dateRange) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return generateMockCompletions(dateRange);
    }
);

const mockedDataSlice = createSlice({
    name: 'mockedData',
    initialState: {
        moodleData: [],
        courses: [],
        students: [],
        status: 'idle',
        error: null
    },
    reducers: {
        clearMoodleData: (state) => {
            state.moodleData = [];
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoodleData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMoodleData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.moodleData = action.payload;
                state.courses = generateMockCourses();
                state.students = generateMockStudents();
            })
            .addCase(fetchMoodleData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { clearMoodleData } = mockedDataSlice.actions;
export default mockedDataSlice.reducer;