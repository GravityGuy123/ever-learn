// "use client";
// import React, { useState } from "react";
// import styles from "./DashboardLayout.module.css";

// const navLinks = [
//   { label: "Dashboard", icon: "🏠" },
//   { label: "Inbox", icon: "📥" },
//   { label: "Lesson", icon: "📚" },
//   { label: "Task", icon: "✅" },
//   { label: "Group", icon: "👥" },
// ];

// const friends = [
//   { name: "Bagas Maphie", avatar: "/public/man1.jpg", status: "Online" },
//   { name: "Sir Dandy", avatar: "/public/man2.jpg", status: "Offline" },
//   { name: "Jhon Tosan", avatar: "/public/woman1.jpg", status: "Friend" },
// ];

// const Sidebar: React.FC = () => {
//   const [open, setOpen] = useState(true);

//   return (
//     <>
//       {/* Toggler button for mobile/tablet */}
//       <button
//         className={styles["sidebar-toggler"]}
//         onClick={() => setOpen((prev) => !prev)}
//         aria-label={open ? "Hide sidebar" : "Show sidebar"}
//       >
//         {/* Hamburger icon */}
//         <span className={styles["sidebar-toggler-icon"]}></span>
//       </button>
//       <aside
//         className={
//           open
//             ? styles["dashboard-sidebar"]
//             : `${styles["dashboard-sidebar"]} ${styles["dashboard-sidebar-closed"]}`
//         }
//       >
//         <div className={styles["sidebar-logo"]}>Courseu</div>
//         <nav className={styles["sidebar-nav"]}>
//           <ul className={styles["sidebar-nav-list"]}>
//             {navLinks.map((link, idx) => (
//               <li
//                 key={link.label}
//                 className={
//                   idx === 0
//                     ? `${styles["sidebar-nav-item"]} ${styles["sidebar-nav-item-active"]}`
//                     : styles["sidebar-nav-item"]
//                 }
//               >
//                 <span className={styles["sidebar-nav-icon"]}>{link.icon}</span>
//                 <span className={styles["sidebar-nav-label"]}>{link.label}</span>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <div className={styles["sidebar-friends-section"]}>
//           <div className={styles["sidebar-friends-title"]}>Friends</div>
//           <ul className={styles["sidebar-friends-list"]}>
//             {friends.map(friend => (
//               <li key={friend.name} className={styles["sidebar-friend-item"]}>
//                 <img src={friend.avatar} alt={friend.name} className={styles["sidebar-friend-avatar"]} />
//                 <span className={styles["sidebar-friend-name"]}>{friend.name}</span>
//                 <span className={styles["sidebar-friend-status"]}>{friend.status}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className={styles["sidebar-bottom-section"]}>
//           <div className={styles["sidebar-setting"]}>
//             <span className={styles["sidebar-setting-icon"]}>⚙️</span>
//             <span className={styles["sidebar-setting-label"]}>Setting</span>
//           </div>
//           <div className={styles["sidebar-logout"]}>
//             <span className={styles["sidebar-logout-icon"]}>🚪</span>
//             <span className={styles["sidebar-logout-label"]}>Logout</span>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default Sidebar;
