This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Introduction
PopReel is a full-stack web application designed to replicate the core functionality of popular short-form video platforms like TikTok. The platform empowers users to create, share, and discover engaging short-form video content while fostering interactions through likes and comments. By leveraging a robust recommendation system, PopReel provides a tailored viewing experience, ensuring users see content relevant to their interests and current trends.

The project challenges you to design and implement a dynamic and scalable solution that addresses real-world scenarios, such as handling large volumes of video uploads, maintaining user engagement, and delivering low-latency video playback.

## Detailed Objectives
1. **Build a Full-Stack Video Sharing Application**
    - Design a web platform where users can:
        - Upload short-form videos along with a title and description.
        - View a curated feed of videos uploaded by others.
    - Implement backend APIs to handle video uploads, video feed retrieval, and user interactions.
2. **Enable User Interactions**
- Develop features for users to:
    - Like videos, incrementing a like counter stored in the database.
    - Leave comments, facilitating discussions around shared content.
    - Save or favorite videos for easy access to their preferred content.
3. **Implement a Smart Recommendation System**
- Provide a personalized feed based on:
    - Trending Content: Highlighting videos with the most likes.
    - Content-Based Filtering: Displaying videos with tags or descriptions relevant to user preferences or recent activity.
    - Real-Time Adaptation: Adjusting recommendations dynamically based on user interactions and recent trends.
## Recommend System
The Recommendation System provides personalized video suggestions to improve user engagement. It offers:

1. Trending Videos:

    - Videos with the most likes are displayed when the user selects the "Trending" filter.

2. Content-Based Recommendations:

    - Videos are filtered based on keywords or tags in their descriptions (e.g., cooking).

3. Implementation:

    - Backend logic fetches videos based on:
        - `sort=trending`: Orders videos by their like count in descending order.
        - `tag=<keyword>`: Matches videos whose description contains the specified keyword.

The frontend dynamically sends queries to the backend API based on the selected filter.
User Experience:

Users can easily switch between filters using a dropdown menu on the Video Feed section.
The feed updates dynamically based on the selected recommendation type.
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure
```sh
src/
├── app/                    # Main application code
│   ├── backend/            # Backend-related code
│   │   ├── middleware/     # Middleware logic (e.g., upload handling)
│   │   │   └── uploadMiddleware.ts
│   │   ├── models/         # Mongoose models for MongoDB
│   │   │   └── videoModel.ts
│   │   ├── routes/         # Express.js routes
│   │   │   └── videoRoute.ts
│   │   ├── app.ts          # Main Express.js application file
│   │   └── connectDB.ts    # MongoDB connection logic
│   ├── pages/              # Next.js pages
│   │   ├── api/            # API routes for the backend
│   │   │   ├── videos/     # Video-related APIs
│   │   │   │   ├── feed.ts # Fetch video feed
│   │   │   │   ├── like.ts # Handle like interactions
│   │   │   │   └── upload.ts # Handle video uploads
│   └── page.tsx            # Frontend home page
├── public/                 # Static assets (uploads, images)
│   └── uploads/            # Uploaded video files
├── styles/                 # Global CSS and Tailwind configuration
│   └── globals.css         # Global styles for the application
├── favicon.ico             # Application favicon
└── README.md               # Project documentation

```

## Installation
### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
### Steps
1. Clone the repository
```sh
git clone https://github.com/your-repo/popreel.git
cd popreel
```

2. Install Dependencies
```sh
npm install
```

3. Set Up MongoDB

    - Ensure MongoDB is running locally or provide a connection string to a cloud database.
    - Update the database connection in src/backend/connectDB.ts.
4. Start the Server
    - Start the Next.js frontend:
    ```sh
        npm run dev
    ```
## User Journey
1. **Video Upload**:

Users upload a video file with a title and description. The video is stored on the server, and its metadata is saved in a database.
2. **Explore Feed**:

Users view a personalized feed of videos tailored to their interests and current trends.
3. Interaction:

    - Users like videos, which influences their trending status.
    - Users leave comments, creating an engaging community experience.

4. Content Recommendation:

    - The system dynamically updates the feed based on user behavior and video metadata.