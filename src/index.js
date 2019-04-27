function initZooms() {
	const zoom = $('.zoom');
	const image = zoom.find('img');
	zoom.html('<div>' + zoom.html() + '</div>');
	const zoomContent = $(zoom.children().get(0));
	let destination = { x: 0, y: 0 };
	let currentPosition = destination;
	let animation = null;

	const move = (newDest) => {
		if (newDest)
			destination = newDest;

		if ( Math.abs(currentPosition.x - destination.x) < 1 && Math.abs(currentPosition.y - destination.y) < 1)
			return;


		currentPosition = { x: (currentPosition.x * 6 + destination.x) / 7, y: (currentPosition.y * 6 + destination.y) / 7 };
		zoomContent.attr('style', `transform: translate(${currentPosition.x}px, ${currentPosition.y}px)`);
	};

	setInterval(move, 1000 / 30);

	zoom.on('mousemove', (e) => {
		const { x, y } = { x: e.offsetX - zoom.width() / 2, y: e.offsetY - zoom.height() / 2};
		move({ x: -x / 20, y: -y / 20 });
	});

	zoom.on('mouseleave', () => {
		zoomContent.attr('style', null);
		move({ x: 0, y: 0 });
	});
}

function initBio() {
	const $about = $('.about');
	const $more = $about.find('.show-more');
	const $less = $about.find('.show-less');
	const $collapse = $about.find('.collapse');

	$more.on('click', () => {
		$more.addClass('d-none');
		$less.removeClass('d-none');
		$collapse.collapse('show');
	});

	$less.on('click', () => {
		$less.addClass('d-none');
		$more.removeClass('d-none');
		$collapse.collapse('hide');
	});
}

$(function() {
	initZooms();
	initBio();
});