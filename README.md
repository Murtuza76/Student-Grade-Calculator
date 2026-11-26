# Student Grade Calculator

A simple browser-based tool that calculates a student's overall percentage, letter grade, GPA, and pass/fail status from weighted assessment scores.

## Features

- A form with four assessment components: Assignments, Quizzes, Midterm, and Final Exam.
- Input fields for marks obtained, total marks, and weightage (%) for each component.
- Validation to ensure marks are non-negative, obtained marks don't exceed total marks, and weightages add up to 100%.
- Automatic calculation of overall percentage, letter grade (A to F), GPA, and pass/fail status.
- A breakdown showing each component's contribution to the final percentage.
- A reset option to clear the form and start over.

## What's not included

- Saving or storing results for later retrieval.
- User accounts, login, or support for multiple students/courses at once.
- Customizable grading scales beyond the fixed scale used here.
- Server-side processing — everything runs locally in the browser.

## Tools and Technologies

- **HTML** — structures the page content and the marks-entry table.
- **CSS** — styles the layout, table, form inputs, buttons, and result cards.
- **JavaScript** — handles form validation, grade calculation, and updating the results on the page.
- **Visual Studio Code** — used to write and organize the project files.
- **Web Browser** (e.g., Google Chrome) — used to run and test the application.

## How It Works

**Marks entry table** — each row is one assessment component with three editable fields: marks obtained, total marks, and weightage (%).

**Validation** — on submit, the app checks that all fields are filled in, marks aren't negative, obtained marks don't exceed the total, and the four weightages add up to exactly 100%. Any failed check shows an error message instead of a result.

**Grade calculation** — each component's percentage is multiplied by its weightage to get its contribution to the final grade, and these contributions are summed for the overall percentage.

**Letter grade & GPA** — the overall percentage is matched against a grading scale (A down to F) to determine the letter grade and GPA.

**Pass/Fail** — 50% or above is a Pass; below 50% is a Fail.

**Result breakdown** — shows each component's percentage, weightage, and exact contribution, so the student can see how the grade was built.

**Reset** — clears all inputs and hides the results.

## Project Structure

```
.
├── index.html   # Page structure: header, marks-entry table, error box, result section, footer
├── style.css    # Visual styling: colors, layout, table, buttons, result cards
└── script.js    # Logic: form validation, grade calculation, updating results on the page
```

## Getting Started

1. Download or clone this repository.
2. Make sure `index.html`, `style.css`, and `script.js` are all in the same folder.
3. Open `index.html` in a web browser.
4. Enter marks obtained, total marks, and weightage for each component, then click **Calculate Grade**.

## Authors

Muhammad Murtaza (0553) —  Muhammad Khizar (0574) —  Muhammad Mubeen (0545)
