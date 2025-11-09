const LASTFM_API_KEY = '0eb8fa3c5ab017b1f557288ee41cc350';
const LASTFM_USERNAME = 'rrrrrrrrrrr19';
const TRACK_LIMIT = 3;

async function getRecentTracks() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=${TRACK_LIMIT}`;
    const targetDiv = document.getElementById('lastfm-data');

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`http error: ${response.status}`);
        }
        const data = await response.json();
        
        targetDiv.innerHTML = '';

        if (data.recenttracks && data.recenttracks.track.length > 0) {
            data.recenttracks.track.forEach(track => {
                const trackElement = document.createElement('div');
                trackElement.classList.add('lastfm-track');

                const trackName = track.name;
                const artistName = track.artist['#text'];
                const trackUrl = track.url;
                const imageUrl = track.image[2] ? track.image[2]['#text'] : '';

                const isNowPlaying = track['@attr'] && track['@attr'].nowplaying;
                const status = isNowPlaying ? 'now playing' : ``;
                trackElement.innerHTML = `
                    ${imageUrl ? `<img src="${imageUrl}" alt="art for ${trackName}" class="lastfm-art">` : '<div class="lastfm-art-placeholder"></div>'}
                    <div class="lastfm-info">
                        <p>${status} <a href="${trackUrl}" target="_blank">${trackName}</a></p>
                        <span>by ${artistName}</span>
                    </div>
                `;
                
                targetDiv.appendChild(trackElement);
            });
        } else {
            targetDiv.innerHTML = '<p>couldnt load</p>';
        }

    } catch (error) {
        console.error('lastfm error', error);
        targetDiv.innerHTML = '<p>couldnt load</p>';
    }
}
document.addEventListener('DOMContentLoaded', getRecentTracks);