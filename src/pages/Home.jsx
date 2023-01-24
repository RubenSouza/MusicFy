// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { Sidebar, MusicPlayer } from "../components";

// import {
//   ArtistDetails,
//   TopArtists,
//   Favorites,
//   Discover,
//   Search,
//   SongDetails,
//   TopCharts,
//   Playlist,
// } from "../pages";

// const Home = () => {
//   return (
//     <div className="relative flex">
//       <Sidebar />

//       <div className="flex flex-1 flex-col bg-gradient-to-br bg-[#121212]">
//         <div
//           className=" h-[calc(100vh-72px)] overflow-y-scroll
//       hide-scrollbar flex xl:flex-row flex-col-reverse w-full"
//         >
//           <div className="h-fit w-full pb-40">
//             <Routes>
//               <Route path="/" element={<Discover />} />
//               <Route path="/top-artists" element={<TopArtists />} />
//               <Route path="/top-charts" element={<TopCharts />} />
//               <Route path="/favorites" element={<Favorites />} />
//               <Route path="/artists/:id" element={<ArtistDetails />} />
//               <Route path="/playlist/:id" element={<Playlist />} />
//               <Route path="/songs/:songid" element={<SongDetails />} />
//               <Route path="/search/:searchTerm" element={<Search />} />
//             </Routes>
//           </div>
//         </div>
//       </div>

//       {activeSong?.title && (
//         <div
//           className="absolute h-24 bottom-0 left-0 right-0 flex
//         animate-slideup bg-[#181818] backdrop-blur-lg z-10"
//         >
//           <MusicPlayer />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
