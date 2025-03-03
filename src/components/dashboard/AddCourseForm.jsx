import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const AddCourseForm = ({
  editingCourseId,
  courseName,
  setCourseName,
  shortDescription,
  setShortDescription,
  image,
  setImage,
  courseIntro,
  setCourseIntro,
  description,
  setDescription,
  trainingDescription,
  setTrainingDescription,
  duration,
  setDuration,
  enrolled,
  setEnrolled,
  projects,
  setProjects,
  modules,
  setModules,
  language,
  setLanguage,
  mode,
  setMode,
  rating,
  setRating,
  quizzes,
  setQuizzes,
  certifications,
  setCertifications,
  eligibility,
  setEligibility,
  achievements,
  setAchivements,
  courseOverview,
  setCourseOverview,
  keyHighlights,
  setKeyHighlights,
  handleAddCourse,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {editingCourseId ? "Edit Course" : "Add New Course"}
        </h2>
        <form onSubmit={handleAddCourse}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <TextField
                label="Course Name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label="Short Description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                type="file"
                InputProps={{
                  inputProps: {
                    accept: "image/*",
                  },
                }}
                onChange={(e) => setImage(e.target.files[0])}
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                label="Course Introduction"
                value={courseIntro}
                onChange={(e) => setCourseIntro(e.target.value)}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                margin="normal"
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                label="Course Long Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                margin="normal"
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                label="Training Description"
                value={trainingDescription}
                onChange={(e) => setTrainingDescription(e.target.value)}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label="Course Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label="Enrolled Students"
                type="number"
                value={enrolled}
                onChange={(e) => setEnrolled(e.target.value)}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label="Projects"
                type="number"
                value={projects}
                onChange={(e) => setProjects(e.target.value)}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label="Modules"
                type="number"
                value={modules}
                onChange={(e) => setModules(e.target.value)}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
            </div>
            <div>
              <TextField
                select
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
                <MenuItem value="Marathi">Marathi</MenuItem>
              </TextField>
            </div>
            <div>
              <TextField
                select
                label="Mode"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              >
                <MenuItem value="Online">Online</MenuItem>
                <MenuItem value="Offline">Offline</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </TextField>
            </div>
            <div>
              <TextField
                label="Rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
            </div>
            <div>
              <TextField
                label="Quizzes"
                type="number"
                value={quizzes}
                onChange={(e) => setQuizzes(e.target.value)}
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                label="Certifications (comma-separated)"
                value={certifications.join(", ")}
                onChange={(e) =>
                  setCertifications(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                required
                margin="normal"
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                label="Eligibility (comma-separated)"
                value={eligibility.join(", ")}
                onChange={(e) =>
                  setEligibility(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                required
                margin="normal"
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                label="Achievements (comma-separated)"
                value={achievements.join(", ")}
                onChange={(e) =>
                  setAchivements(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                required
                margin="normal"
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                label="Course Overview (comma-separated)"
                value={courseOverview.join(", ")}
                onChange={(e) =>
                  setCourseOverview(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                required
                margin="normal"
              />
            </div>
            <div className="md:col-span-2">
              <TextField
                label="Key Highlights (comma-separated)"
                value={keyHighlights.join(", ")}
                onChange={(e) =>
                  setKeyHighlights(
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                required
                margin="normal"
              />
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button
              type="submit"
              variant="contained"
              size="small" // This is the key size prop
              sx={{
                fontSize: "0.875rem", // Match MUI's small button font size
                textTransform: "none",
                // px and py removed to use default small button padding
              }}
            >
              {editingCourseId ? "Update Course" : "Add Course"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;