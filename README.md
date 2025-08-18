# Spotify
Of course. Here is a comprehensive README file for your Spotify Clone project.

Spotify Clone 🎵
A responsive and feature-rich clone of the Spotify web player interface, built with pure HTML, CSS, and JavaScript. This project dynamically loads music and playlists directly from your local file structure, offering a lightweight and customizable music experience.

✨ Features
Dynamic Music Loading: Automatically scans and lists songs from the /assets/songs/ directory.

Dynamic Playlists: Automatically discovers and loads playlists from the /assets/playLists/ directory.

Full Playback Controls: Play, pause, next, previous, and repeat functionality.

Interactive Progress Bar: Click and drag to seek through the current track.

Volume Control: Adjust the volume with a slider and a dynamic mute icon.

Responsive Design: Features a distinct, touch-friendly player for mobile devices and a full-featured layout for desktops.

Resizable Sidebar: Click and drag to resize the "Your Library" panel on desktop.

UI Polish: Includes hover effects, custom tooltips, and smooth slider animations.

🚀 Getting Started
This project is designed to run locally without any complex setup. It uses the VS Code Live Server extension to create a local development server, which is necessary for the dynamic fetching of song files to work correctly.

Prerequisites
A modern web browser (e.g., Chrome, Firefox).

Visual Studio Code.

The Live Server extension for VS Code.

Installation
Download the Project: Download the project files as a ZIP and extract them to your desired location.

Open in VS Code: Open the extracted project folder in Visual Studio Code.

Start the Server: In VS Code, right-click on the index.html file and select "Open with Live Server". Your browser will automatically open the project, and you're ready to go!

📁 How It Works: Directory Listing
This Spotify Clone doesn't use a traditional backend or database. Instead, it cleverly uses JavaScript's fetch API to read the structure of your local project directories when run on a live server.

When the page loads, the script fetches the contents of the /assets/songs/ folder and dynamically creates a "Trending Songs" card for each .mp3 file it finds.

Similarly, it scans the /assets/playLists/ folder. Each sub-folder within it is treated as a separate playlist, and a "Popular Artists" card is generated for it.

This approach makes adding new music as simple as adding files to a folder!

🎧 Adding Your Own Music & Playlists
Customizing the music library is straightforward. Just follow the specific folder and naming conventions below.

Adding Single Songs
To add individual tracks that appear under "Trending Songs":

Place the Audio File: Add your .mp3 file to the /assets/songs/ directory.

Filename Format: The audio file must be named in the format: Song Name-ArtistName1_ArtistName2.mp3.

The song name and artist names are separated by a hyphen (-).

Multiple artists are separated by an underscore (_).

Spaces in names are allowed!

Add the Album Art: Place a corresponding image file in the /assets/images/ directory.

The image must be a .jpg file.

Its name must exactly match the song name part of the audio file (e.g., if the song is Heeriye (Official Video)-Arijit Singh.mp3, the image must be Heeriye (Official Video).jpg).

Creating Playlists
To create new playlists that appear under "Popular Artists":

Create a Folder: Inside the /assets/playLists/ directory, create a new folder.

The name of this folder will be the name of your playlist. For example, a folder named Lofi Beats will create a playlist called "Lofi Beats".

Add Songs: Place all the .mp3 files for that playlist inside your newly created folder.

The naming format for songs inside a playlist folder is less strict, but Song Name.mp3 or Song Name-Artist.mp3 is recommended.

Add a Cover Image: This is mandatory for the playlist to display correctly.

Place an image file named cover.jpeg inside the playlist's folder. This image will be used as the cover for the playlist card.

🛠️ Technology Stack
HTML5: For the core structure and content.

CSS3: For styling, responsiveness, flexbox/grid layouts, and animations.

JavaScript (ES6+): For all dynamic functionality, including audio playback, DOM manipulation, and fetching local directory listings.


Warning: This clone is only to practice the skills and should not be used for any Phishsing related activities
