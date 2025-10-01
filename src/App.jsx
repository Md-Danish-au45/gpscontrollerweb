// import { useEffect } from "react";
// import { createBrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/index.jsx";

// const AppWrapper = () => {
//   useEffect(() => {
//     // --- Right Click Disable ---
//     document.addEventListener("contextmenu", (e) => e.preventDefault());

//     // --- Shortcuts Disable ---
//     document.addEventListener("keydown", (e) => {
//       if (
//         e.key === "F12" || // F12
//         (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) || // Ctrl+Shift+I/J/C
//         (e.ctrlKey && e.key.toUpperCase() === "U") // Ctrl+U
//       ) {
//         e.preventDefault();
//       }
//     });

//     // --- Detect DevTools Open ---
//     const checkDevTools = () => {
//       const threshold = 160;
//       const widthDiff = window.outerWidth - window.innerWidth > threshold;
//       const heightDiff = window.outerHeight - window.innerHeight > threshold;

//       if (widthDiff || heightDiff) {
//         document.body.innerHTML =
//           "<h1 style='color:red;text-align:center;margin-top:20%'>⚠️ DevTools Detected. Access Denied.</h1>";
//       }
//     };

//     const interval = setInterval(checkDevTools, 500);

//     return () => clearInterval(interval);
//   }, []);

//   return <AppRoutes />;
// };

// const App = createBrowserRouter([
//   {
//     path: "*",
//     Component: AppWrapper,
//   },
// ]);

// export default App;
import { useEffect } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/index.jsx";

const AppWrapper = () => {
  useEffect(() => {
    // ✅ Removed all restrictions (right-click, shortcuts, devtools checks)
    // Nothing added here
  }, []);

  return <AppRoutes />;
};

const App = createBrowserRouter([
  {
    path: "*",
    Component: AppWrapper,
  },
]);

export default App;
