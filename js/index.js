var search;

function handleFetch(searchTerm, callback, pageTokenIn) {
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search',
		method: 'GET',
		data: {
			part: 'snippet',
			q: searchTerm,
			maxResults: 10,
			type: 'video',
			pageToken: pageTokenIn,
			key: 'AIzaSyBIVSDVppcM8V-yrOgb-lRLvV0uhIIxugo'
		},
		dataType: 'json',
		success: responseJSON => callback(responseJSON),
		error: err => $('.results').html(err.message)
	});
}

function displayResults(data) {
	let $results = $('.results');
	$results.html('');
	if ("nextPageToken" in data) {
		$('.next10').val(data.nextPageToken)
	} else {
		$('.next10').val('')
	}
	if ("prevPageToken" in data) {
		$('.previous10').val(data.prevPageToken)
	} else {
		$('.previous10').val('')
	}
	data.items.forEach((video => {
		$results.append(`<li>
				<a href=https://www.youtube.com/watch?v=${video.id.videoId} target="_blank">
					<h2 class="videoTitle">${video.snippet.title}</h2>
					<img src="${video.snippet.thumbnails.high.url}" alt="Thumbnail for video with title ${video.snippet.title}">
				</a>
			</li>`);
	}));
}

function watchForm() {
	$('.youtubeSearchForm').on('submit', (event) => {
		event.preventDefault();

		let keywords = $('#youtubeSearchBox').val();
		search = keywords
		handleFetch(keywords, displayResults, '');
	});

	$(".previous10").on('click', () => {
		event.preventDefault();

		handleFetch(search, displayResults, $(".previous10").val());
	});

	$(".next10").on('click', () => {
		event.preventDefault();

		handleFetch(search, displayResults, $(".next10").val());
	});
}



$(watchForm);
