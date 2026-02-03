# zenless zone zero agent build display

built with react frontend and fastapi backend
uses the enka.py wrapper api for fetching player data
https://github.com/seriaati/enka-py

just enter your uid and it displays your characters and their builds


only did backgrounds and thumbnails for a few characters, feel free to add your own
artwork not by me, credits below:

ellen:
https://www.pixiv.net/en/artworks/120215116
https://www.pixiv.net/en/artworks/121074858

miyabi:
https://www.pixiv.net/en/artworks/125676907
https://x.com/ZZZ_TYPEII/status/1869231114939932846

soldier11:
https://www.pixiv.net/en/artworks/114014018
https://www.miyoushe.com/zzz/article/39580392

yeshunguang:
https://www.pixiv.net/en/artworks/136387326


# setup
in the frontend directory:
npm install
npm run dev
run the project locally

in the backend directory:
uvicorn --reload fastapi_app:app

