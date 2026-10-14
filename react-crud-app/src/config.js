// ============================================================
// ONLY FILE TO EDIT when the exam asks for a different system
// (Library, Employee, Product, Book, Todo, Hospital, ...).
// App.jsx reads everything from here.
// ============================================================

const config = {
  title: "Student Management System", // page heading
  itemName: "Student",                // used in buttons / messages

  // type: "text" | "number" | "email" | "date" | "select"
  // For "select" add: options: ["A", "B"]
  fields: [
    { name: "name",   label: "Name",   type: "text",   required: true },
    { name: "email",  label: "Email",  type: "email",  required: true },
    { name: "course", label: "Course", type: "select", options: ["CSE", "ECE", "IT", "AI&DS", "MECH"] },
    { name: "year",   label: "Year",   type: "number" },
  ],

  // Starting rows (id is added automatically)
  seed: [
    { name: "Arun Kumar", email: "arun@college.edu", course: "CSE", year: 3 },
    { name: "Priya S",    email: "priya@college.edu", course: "IT",  year: 2 },
  ],
};

export default config;

/* ---- Example: Library system (copy over `fields` and `seed`) ----
title: "Library Management", itemName: "Book",
fields: [
  { name: "title",  label: "Title",  type: "text", required: true },
  { name: "author", label: "Author", type: "text" },
  { name: "copies", label: "Copies", type: "number" },
],
*/
