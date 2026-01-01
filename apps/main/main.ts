// Import the micro-frontend library using a relative path for production
import {
  registerMicroApps,
  start,
  push,
  sharedState,
} from "@ld/micro-frontend";

const apps = [
  {
    name: "frontend-learning",
    entry: "http://localhost:8080", // Preview server entry for Vue app
    container: "#micro-app-container",
    activeRule: "/learning",
    title: "前端学习",
    description: "一个用于学习和记录前端知识的平台。",
    icon: "📚", // Book icon
  },
  {
    name: "framework",
    entry: "http://localhost:3000", // Mock entry
    container: "#micro-app-container",
    activeRule: "/ld-framework",
    title: "LD前端框架",
    description: "适配vue3和react的AOT编译型前端框架。",
    icon: "🛠️", // Hammer and wrench icon
  },
  {
    name: "ui-framework",
    entry: "http://localhost:3001", // Mock entry
    container: "#micro-app-container",
    activeRule: "/ui-framework",
    title: "LD UI",
    description: "基于LD框架的UI框架，支持多技术栈。",
    icon: "🎨", // Artist palette icon
  },
  {
    name: "my-introduction",
    entry: "http://localhost:3002", // Mock entry
    container: "#micro-app-container",
    activeRule: "/about",
    title: "我的介绍",
    description: "关于我，我的技能和项目经验。",
    icon: "👨‍💻", // Man technologist icon
  },
];

const mainContent = document.querySelector("main")!;
const microAppContainer = document.getElementById("micro-app-container")!;
const backButton = document.getElementById("back-to-home")!;

function showHomePage() {
  mainContent.style.display = "flex";
  microAppContainer.style.display = "none";
  microAppContainer.classList.remove("fullscreen");
  backButton.classList.remove("visible");
  // Use the framework's API to navigate
  if (window.location.pathname !== "/") {
    history.pushState(null, "", "/");
  }
}

function showMicroApp() {
  mainContent.style.display = "none";
  microAppContainer.style.display = "block";
  microAppContainer.classList.add("fullscreen");
  backButton.classList.add("visible");
}

// Render application cards
const appCardsContainer = document.getElementById("app-cards")!;
apps.forEach((app) => {
  const card = document.createElement("a");
  card.href = app.activeRule;
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-icon">${app.icon}</div>
    <div class="card-content">
      <h3>${app.title}</h3>
      <p>${app.description}</p>
    </div>
  `;

  card.addEventListener("click", (e) => {
    e.preventDefault();
    // Use the framework's push API to trigger navigation and loading
    push(app.activeRule);
  });
  appCardsContainer.appendChild(card);
});

// Event listeners for navigation
backButton.addEventListener("click", (e) => {
  e.preventDefault();
  // Use the framework's API to navigate
  push("/");
});

window.addEventListener("popstate", () => {
  const isMicroAppRoute = apps.some((app) =>
    window.location.pathname.startsWith(app.activeRule)
  );
  if (isMicroAppRoute) {
    showMicroApp();
  } else {
    showHomePage();
  }
});

// Initial view check
const isMicroAppRoute = apps.some((app) =>
  window.location.pathname.startsWith(app.activeRule)
);
if (isMicroAppRoute) {
  showMicroApp();
} else {
  showHomePage();
}

/**
 * Register and start the micro-frontend framework
 */
registerMicroApps(apps);
start();

// Communication examples
sharedState.setState("theme", { color: "dark" });
sharedState.on("micro-app-loaded", (data: any) => {
  console.log(`Event from micro-app received:`, data);
});
