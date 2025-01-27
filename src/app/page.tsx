"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [filter, setFilter] = useState<string>("default"); // New state for recommendation filter

  // Fetch video feed from the backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let url = "http://localhost:3000/api/videos/feed";

        // Add query parameters based on the selected filter
        if (filter === "trending") {
          url += "?sort=trending";
        } else if (filter === "cooking") {
          url += "?tag=cooking";
        }

        const response = await axios.get(url);
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [filter]); // Re-fetch videos when the filter changes

  // Handle video file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedVideo(e.target.files[0]);
    }
  };

  // Upload selected video to the backend
  const handleUpload = async () => {
    if (!selectedVideo) {
      alert("Please select a video to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedVideo);

    try {
      const response = await axios.post("http://localhost:3000/api/videos/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Video uploaded successfully!");
      setSelectedVideo(null);
      setVideos((prev) => [...prev, response.data.video]);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Upload a Video</h2>
          <input type="file" accept="video/*" onChange={handleFileChange} className="mb-4" />
          <button
            onClick={handleUpload}
            className="rounded-full border bg-blue-500 text-white px-6 py-2 hover:bg-blue-600"
          >
            Upload
          </button>
        </div>
        <div className="w-full max-w-2xl mt-8">
          <h2 className="text-2xl font-bold mb-4">Video Feed</h2>
          {/* Dropdown to select recommendation filter */}
          <div className="mb-4">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
              Recommendation Filter
            </label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 sm:text-sm"
            >
              <option value="default">Default (Latest Videos)</option>
              <option value="trending">Trending</option>
              <option value="cooking">Cooking</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {videos.map((video) => (
              <div key={video._id} className="border p-4 rounded shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                <video controls className="w-full h-auto mb-2">
                  <source src={video.url} type="video/mp4" />
                </video>
                <p className="text-sm text-gray-600">{video.description}</p>
                <button
                  className="mt-2 text-blue-500 hover:underline"
                  onClick={() => alert("Liked!")}
                >
                  Like ({video.likes})
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Powered by Next.js
        </a>
      </footer>
    </div>
  );
}
