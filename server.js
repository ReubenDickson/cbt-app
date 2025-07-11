import app from "./app.js";


// TODO: Mount API routes here (students, courses, questions, etc)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});