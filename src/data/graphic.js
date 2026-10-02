// Graphic Design projects. Images live in public/img/work/<slug>/.
// Captions are only set where the content is confirmed.

export const graphicProjects = [
	{
		slug: 'underground-event',
		title: 'Underground Event',
		subtitle: 'Nonsense — identity & collateral',
		year: '2022',
		scope: 'Branding',
		cover: '02.jpg',
		blurb:
			'Visual identity for an underground event series: a pixel logotype, access tiers ' +
			'coded by colour, and the printed collateral that carries them — wristbands, ' +
			'lanyards and badges.',
		images: [
			{ file: '02.jpg', caption: 'Pixel iconography' },
			{ file: '03.jpg', caption: 'Access wristbands — staff, VIP, guest' },
			{ file: '04.jpg', caption: 'VIP wristband' },
			{ file: '05.jpg', caption: '' },
			{ file: '06.jpg', caption: 'DJ lanyard' },
			{ file: '07.jpg', caption: 'Crew lanyard' },
			{ file: 'ticket.jpg', caption: 'Event ticket \u2014 Fideles, 15.07.22' },
		],
		video: { file: 'nonsense-edit', caption: 'Event video' },
	},

	{
		slug: 'goosebumps-garden',
		bg: '#d2d2d2',
		ink: '#141414',
		title: 'Goosebumps Garden',
		subtitle: 'Menus & table collateral',
		year: '2026',
		scope: 'Branding · Print',
		cover: 'thumbnail.jpg',
		blurb:
			'Print collateral for a music and food venue — a table placemat that introduces ' +
			'the place in its own voice, and the menus that sit on it. Acid yellow and black ' +
			'on grey, with scrawled marks standing in for sound.',
		images: [
			{ file: 'placemat-es.jpg', caption: 'Table placemat — Spanish' },
			{ file: 'placemat-en.jpg', caption: 'Table placemat — English' },
			// Shown on a plain field rather than flat on the page, so the A4
			// sheets read as objects.
			{ file: 'menu-drinks.jpg', caption: 'Drinks menu', mockup: true },
			{ file: 'menu-food-thu-fri.jpg', caption: 'Food menu', mockup: true },

			{ section: 'Event posters', note: 'Line-up flyers for the garden' },
			{
				mockup: true,
				slides: [
					{ file: 'poster-carrau.jpg', caption: 'Raphael Carrau \u2014 9 year anniversary, 25 July' },
					{ file: 'poster-skancke.jpg', caption: 'Alexander Skancke \u2014 11 July' },
					{ file: 'poster-suciu.jpg', caption: 'Suciu \u2014 27 June' },
				],
			},
		],
	},

	{
		slug: 'crumb-cult',
		title: 'Crumb Cult',
		subtitle: 'Cookie brand — identity',
		year: '2025',
		scope: 'Branding',
		cover: 'logo.png',
		coverContain: true,
		logo: { file: 'logo.png', caption: 'Logotype' },
		// Built from the dieline: 150 × 150 × 50 mm, white card, 1.2 mm.
		box: { caption: 'Cookie box \u2014 150 \u00d7 150 \u00d7 50 mm' },
		coverBg: '#8ba9f2',
		blurb:
			'Identity for a cookie shop: a hand-drawn wordmark, a roundel that works as a ' +
			'shop sign, and a set of highlight covers for the feed.',
		// master: SIDEWORK/highgradexseawold/SHORT VIDS/crumbcultvideo.mp4
		video: { file: 'crumb-cult-reel', portrait: true, caption: 'Short reel \u2014 trial edit' },
		images: [
			{ file: 'logo-variations.png', caption: 'Logo variations', size: 'tall' },
			{ file: 'stickers.png', caption: 'Sticker set' },
			{ file: 'menu.jpg', caption: 'Menu', mockup: true },
			{ file: 'sticker-cookie.png', caption: 'Instagram highlight cover', size: 'small' },
			{ file: 'sticker-feedback.png', caption: 'Instagram highlight cover', size: 'small' },
		],
	},

	{
		slug: 'posters',
		title: 'Posters',
		subtitle: 'Event flyers & campaign',
		year: '2022\u20132026',
		scope: 'Poster design',
		cover: 'tribe-bevview.jpg',
		posterWall: true,
		// master: SIDEWORK/cc/tribec/FINALS/longreel.mp4
		video: { file: 'tribe-animated', portrait: true, caption: 'Tribe \u2014 animated poster, Instagram reel' },
		images: [
			// The Tribe run sits on its own, as one slide at a time.
			{
				section: 'Tribe',
				note: 'Event flyers \u2014 an ongoing series',
			},
			{
				mockup: true,
				slides: [
					{ file: 'tribe-bevview.jpg', caption: 'Tribe @ Bevview \u2014 14 August' },
					{ file: 'tint-lobby.jpg', caption: 'Tribe, Tint Lobby' },
					{ file: 'tribe-supervibe.jpg', caption: 'Tribe \u00d7 Supervibe, Marrakesh' },
					{ file: 'tribe-housecall.jpg', caption: 'Tribe \u00d7 House Call, Dubai' },
					{ file: 'tribe-reunion.jpg', caption: 'Tribe @ Reunion' },
				],
			},
			{ section: 'Goosebumps Garden', note: 'Line-up flyers for the garden' },
			{
				mockup: true,
				slides: [
					{ file: 'gg-carrau.jpg', caption: 'Raphael Carrau \u2014 9 year anniversary, 25 July' },
					{ file: 'gg-skancke.jpg', caption: 'Alexander Skancke \u2014 11 July' },
					{ file: 'gg-suciu.jpg', caption: 'Suciu \u2014 27 June' },
				],
			},

			{ section: 'Al\u2011Doulab', note: 'Mental health fundraiser \u2014 personal project' },
			{
				mockup: true,
				slides: [
					{ file: 'aldoulab-01.jpg', caption: 'Al\u2011Doulab \u2014 campaign poster' },
					{ file: 'aldoulab-02.jpg', caption: 'Al\u2011Doulab \u2014 campaign poster' },
				],
			},
		],
	},

	{
		slug: 'al-doulab',
		bg: '#ffffff',
		ink: '#141414',
		title: 'Al\u2011Doulab',
		subtitle: 'Mental health campaign \u2014 identity',
		year: '2023',
		scope: 'Branding',
		cover: 'van.jpg',
		blurb:
			'Identity for a non\u2011profit mental health campaign for middle\u2011school students in ' +
			'Lebanon, funded by IDRAAC. An art van travels between schools, so the system had to ' +
			'work at the scale of a vehicle, a roll\u2011up banner and a sticker alike.',
		images: [
			{ file: 'van.jpg', caption: 'Art van' },
			{ file: 'banner.jpg', caption: 'Roll\u2011up banner' },
			{ file: 'banner-site.jpg', caption: 'Banner in situ' },
			{ file: 'banner-alt.jpg', caption: '' },
			{ file: 'instagram.jpg', caption: 'Campaign account' },
			{ file: 'stickers.jpg', caption: 'Logo stickers' },
			{ file: 'uniform-01.jpg', caption: 'Team uniform \u2014 children\u2019s artwork on the back' },
			{ file: 'uniform-02.jpg', caption: 'Team uniform' },
			{ file: 'uniform-03.jpg', caption: 'Team uniform' },
			{ file: 'poster-01.jpg', caption: 'Workshop schedule \u2014 November, South Lebanon' },
			{ file: 'poster-02.jpg', caption: 'Workshop schedule \u2014 October, Beirut' },
			{ file: 'poster-03.jpg', caption: 'Campaign poster \u2014 \u201cfree yourself through play\u201d' },
			{ file: 'poster-04.jpg', caption: 'Workshop schedule \u2014 January, Bekaa' },
		],
	},

{
		slug: 'mario-typeface',
		bg: '#ffffff',
		ink: '#141414',
		title: 'Mario World',
		subtitle: 'Personal typeface project',
		year: '2024',
		scope: 'Type design',
		cover: 'specimen.jpg',
		blurb:
			'A display alphabet built entirely from the furniture of a platform game \u2014 pipes, ' +
			'brick, coins, question blocks and stars standing in for stems and counters. ' +
			'A\u2013Z drawn from a fixed kit of parts.',
		images: [
			{ file: 'specimen.jpg', caption: 'Specimen \u2014 A to Z' },
			{ file: 'numbers.jpg', caption: 'Numerals \u2014 built on the same grid' },
			{ file: 'keychain.jpg', caption: 'Keychains' },
			{ file: 'controller.jpg', caption: 'Controller' },
		],
	},

	{
		slug: 'visual-art',
		title: 'Visual Art',
		subtitle: 'Poster design',
		year: '2024\u20132025',
		scope: 'Poster design \u00b7 Illustrator',
		cover: 'psych.jpg',
		blurb:
			'Posters made for their own sake rather than for an event \u2014 vector work built in ' +
			'Illustrator, chasing optical pressure and colour that will not sit still.',
		posterWall: true,
		images: [
			{ file: 'psych.jpg', caption: 'Psych' },
			{ file: 'glitch.jpg', caption: 'Untitled' },
			// Framed mockups on a white plate. The frame is cropped away in CSS
			// rather than cut from the file, so nothing is lost and the crop
			// stays adjustable.
			{ file: 'art-01.jpg', caption: 'Art poster', frameless: true },
			{ file: 'art-02.jpg', caption: 'Art poster', frameless: true },
			{ file: 'art-03.jpg', caption: 'Art poster', frameless: true },
			{ file: 'art-04.jpg', caption: 'Art poster', frameless: true },
			{ file: 'art-05.jpg', caption: 'Art poster', frameless: true },
			{ file: 'art-06.jpg', caption: 'Art poster', frameless: true },
			{ file: 'art-07.jpg', caption: 'Art poster', frameless: true },
			{ file: 'art-08.jpg', caption: 'Art poster', frameless: true },
		],
	},

	{
		slug: 'editorial',
		title: 'Editorial',
		subtitle: 'Catalogue series & book covers',
		year: '2023',
		scope: 'Editorial \u00b7 Publication',
		cover: 'growing-01.jpg',
		blurb:
			'Two bodies of publication work: a catalogue series built around the idea of growth, ' +
			'and cover designs submitted to the Penguin Books competition.',
		images: [
			{ section: 'Growth', note: 'Catalogue series' },
			{ file: 'growing-01.jpg', caption: 'Growing \u2014 catalogue cover' },
			{ file: 'growing-02.jpg', caption: 'Growing \u2014 halftone variant' },
			{ file: 'growing-03.jpg', caption: 'Growing \u2014 spread' },
			{ file: 'catalogue.jpg', caption: 'Catalogue' },

			{ section: 'Book Cover Design', note: 'Penguin Books cover competition \u2014 submitted' },
			{ file: 'penguin-01.jpg', caption: 'The Uninhabitable Earth \u2014 David Wallace-Wells' },
			{ file: 'penguin-02.jpg', caption: 'The Uninhabitable Earth \u2014 alternate cover' },

			{ section: 'Copywriting', note: 'Out of home' },
			{ file: 'billboard.jpg', caption: '\u201cNo me importa\u201d \u2014 billboard' },
		],
	},

	{
		slug: 'cbd-my-skin',
		bg: '#ffffff',
		ink: '#14213d',
		title: 'CBD My Skin',
		subtitle: 'E\u2011commerce web design',
		year: '2022',
		scope: 'Web design',
		cover: 'home.jpg',
		blurb:
			'Storefront design for a CBD skincare shop \u2014 a soft green and sky palette, a high\u2011 ' +
			'contrast display serif, and a product grid built to carry a catalogue of eight pages.',
		// Long pages: shown inside a laptop that scrolls them on a loop.
		laptop: [
			{ file: 'home.jpg', caption: 'Home', scroll: true },
			{ file: 'shop.jpg', caption: 'Shop' },
		],
		images: [],
	},

	{
		slug: 'music-culture',
		title: 'Music Culture',
		subtitle: 'Records, artists & release design',
		scope: 'Artist branding \u00b7 Packaging',
		bg: '#ffffff',
		ink: '#141414',
		cover: 'cd.png',
		blurb:
			'Design made for records and the people who make them \u2014 identities, sleeves, ' +
			'packaging and the pieces that carry a release from the case to the feed.',
		// One section per artist. New releases are added as further sections,
		// each carrying its own covers, video and images.
		images: [
			{ section: 'Hypnotik', note: 'Music label \u2014 business cards' },
			{
				compact: true,
				slides: [
					{ file: 'hypnotik-01.jpg', caption: 'Hypnotik \u2014 business card' },
					{ file: 'hypnotik-02.jpg', caption: 'Hypnotik \u2014 business card' },
					{ file: 'hypnotik-03.jpg', caption: 'Hypnotik \u2014 business card' },
					{ file: 'hypnotik-04.jpg', caption: 'Hypnotik \u2014 business card' },
					{ file: 'hypnotik-05.jpg', caption: 'Hypnotik \u2014 business card' },
					{ file: 'hypnotik-06.jpg', caption: 'Hypnotik \u2014 business card' },
					{ file: 'hypnotik-07.jpg', caption: 'Hypnotik \u2014 business card' },
				],
			},

			{ section: 'Sara Selina', note: 'Mujer Estrella \u2014 artist identity' },
			{ video: 'sara-vinyl', portrait: true, caption: 'Vinyl \u2014 single' },
			{ file: 'album-cover.jpg', caption: 'Album cover' },
			{ file: 'cd.png', caption: 'CD packaging \u2014 Mujer Estrella: Cap\u00edtulo Final' },
			{
				grid: ['track-01.jpg', 'track-02.jpg', 'track-03.jpg', 'track-04.jpg', 'track-05.jpg', 'track-06.jpg'],
				cols: 6,
				tight: true,
				caption: 'Track covers',
			},
			{ file: 'stamps.jpg', caption: 'Stamps' },
			{ file: 'stickers.png', caption: 'Sticker set' },

			{ section: 'Itef', note: 'Discography social series' },
			{
				feed: {
					handle: 'itef',
					posts: [
						'itef-01.jpg',
						'itef-02.jpg',
						'itef-03.jpg',
						'itef-04.jpg',
						'itef-05.jpg',
						'itef-06.jpg',
						'itef-07.jpg',
						'itef-08.jpg',
						'itef-09.jpg',
					],
				},
			},
		],
	},

	{
		slug: 'homer',
		title: 'Homer',
		subtitle: 'Personal typeface',
		year: '',
		scope: 'Type design',
		bg: '#d4d4d4',
		ink: '#1a1a1a',
		cover: 'logotype.jpg',
		blurb:
			'A display face drawn by hand from the shapes of a cartoon \u2014 the o carries an eye, ' +
			'the ascenders take a head and two hairs. Latin and Arabic, in filled and outlined ' +
			'styles. A personal project.',
		phone: { file: 'specimen-long.jpg', caption: 'Specimen' },
		images: [
			{ file: 'logotype.jpg', caption: 'Logotype' },
			{ file: 'mockup.jpg', caption: 'Specimen \u2014 in situ' },
		],
	},

	{
		slug: 'dunkin-donuts',
		title: 'Dunkin Donuts',
		subtitle: 'Brand identity \u2014 rebrand',
		scope: 'Branding \u00b7 Packaging',
		// the disclaimer sits on black now, so it takes the brand red straight
		noteInk: '#ff2b2b',
		cover: 'logo.png',
		coverContain: true,
		blurb:
			'A rebrand that drops the rounded, friendly Dunkin of the last decade for something ' +
			'louder \u2014 a wordmark cut from geometry, a hot palette of yellow, pink and red, and ' +
			'packaging that talks back to whoever is holding it.',
		disclaimer:
			'Personal project. Not commissioned by, affiliated with or endorsed by Dunkin\u2019 ' +
			'Brands. All existing Dunkin\u2019 trademarks belong to their owner; this is a ' +
			'speculative student proposal shown as portfolio work.',
		images: [
			{ section: 'New logo', note: 'The wordmark' },
			{ file: 'logo.png', caption: 'Dunkin Donuts \u2014 wordmark', size: 'small' },

			{
				section: 'How it is built',
				note: 'Two halves of a donut',
				body:
					'The D is a ring split down the middle and pulled apart \u2014 one half pink, ' +
					'one half red \u2014 so the letter is the product. Very simple, minimal, ' +
					'shape-like: every other letter is cut from the same circles and straight ' +
					'edges, which is what lets the mark hold together at any size and read from ' +
					'across a room.',
			},
			{ file: 'construction.png', caption: 'The D, opened out' },

			{ section: 'Coffee cups', note: 'One sleeve per line of copy' },
			{ file: 'cup-brew.jpg', caption: '\u201cWarning: highly addictive brew inside\u201d' },
			{ file: 'cup-espresso.jpg', caption: '\u201cAlways espresso yourself boldly!\u201d' },
			{ file: 'cup-worry.jpg', caption: '\u201cDonut worry! Take a sip of coffee\u201d' },
			{ file: 'cup-open.jpg', caption: 'Cup and lid' },

			{ section: 'Single donut pack', note: 'Two pattern variants' },
			{ file: 'pack-wave.jpg', caption: '\u201cGo nuts for donuts!\u201d \u2014 wave' },
			{ file: 'pack-diamond.jpg', caption: '\u201cGo nuts for donuts!\u201d \u2014 diamond' },

			{ section: 'Twelve pack', note: 'Box' },
			{ file: 'box-12.jpg', caption: '\u201cOutrageously delicious goods inside\u201d' },

			{ section: 'Menu', note: 'In store' },
			{ file: 'menu.jpg', caption: 'Menu board' },
		],
	}
];

export const getProject = (slug) => graphicProjects.find((p) => p.slug === slug);
