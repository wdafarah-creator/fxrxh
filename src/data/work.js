import { graphicProjects } from './graphic.js';
// Art Direction & Content.
//
// `src` is the master file each clip is encoded from (see
// scripts/encode-video.sh). Encoded output lands in public/video/work/.
//
// `label` is the provenance badge shown in the corner of each clip.
// Portrait clips are derived from w/h and shown contained on black so the
// vertical composition survives; landscape clips fill the screen.

export const LABELS = {
	ai: 'AI-generated',
	shot: 'Shot on Sony A7 III',
	motion: 'Motion design',
	aiMotion: 'AI-generated \u00b7 Motion design',
};

const WORK = '/Users/farah/Work/video-editing';
const DESKTOP = '/Users/farah/Desktop/Farah';

export const artDirection = [
	{ slug: 'beach-event', title: 'Beach Event', label: LABELS.shot, w: 3840, h: 2160, dur: '0:24',
	  src: `${DESKTOP}/portfolio website/LAASOVIDEO.mov` },
	{ slug: 'high-grade-club', title: 'High Grade Club', label: 'High Grade Club · Shot on Sony A7 III', w: 3840, h: 2160, dur: '0:25',
	  src: `${DESKTOP}/HIGHGRADESITE/option1.mp4` },
	{ slug: 'inkdentidad', title: 'Inkdentidad', label: 'Inkdentidad collaboration · Shot on Sony A7 III', w: 3840, h: 2160, dur: '0:13',
	  src: `${DESKTOP}/SIDEWORK/tattooartist work.mp4` },
	{ slug: 'fjaka', title: 'Fjaka', label: 'Fjaka event · Shot on Sony A7 III', w: 3840, h: 2160, dur: '0:14',
	  src: `${DESKTOP}/SIDEWORK/FJAKAXNOVI/video/final-edits/finale.mp4` },
	{ slug: 'seawolf', title: 'Seawolf × High Grade Club', label: 'Seawolf × High Grade Club collaboration · Shot on Sony A7 III', w: 3840, h: 2160, dur: '0:20',
	  src: `${DESKTOP}/SIDEWORK/highgradexseawold/SHORT VIDS/finalseawolfedit.mp4` },
	{ slug: 'london', title: 'London Through My Lens', label: 'Shot on Sony A7 III', w: 2160, h: 3840, dur: '0:17',
	  src: `${DESKTOP}/LNDN/LNDNN/LNDNN.mov` },
	{ slug: 'ibiza', title: 'Ibiza', label: 'Personal project · Shot on Sony A7 III', w: 3840, h: 2160, dur: '0:25',
	  src: `${DESKTOP}/LNDN/ibiza-1.mov` },
	{ slug: 'noviciado', title: 'Noviciado Coffeeshop', label: LABELS.shot, w: 2160, h: 3840, dur: '0:07',
	  src: `${DESKTOP}/noviciado/finalreels/1106(2).mov` },

	{ slug: 'poster-animation-tribe', title: 'Tribe', label: LABELS.motion, w: 1210, h: 1712, dur: '0:12',
	  src: `${WORK}/poster animation - tribe.mp4` },
	{ slug: 'visual-design-goosebumps', title: 'Goosebumps Anniversary', label: LABELS.motion, w: 2152, h: 3852, dur: '0:05',
	  src: `${WORK}/visual design - goosebumps.mp4` },
	{ slug: 'organix-lotions-motion-design', title: 'Organix Lab', label: LABELS.aiMotion, w: 784, h: 1168, dur: '0:05',
	  src: `${WORK}/organix lotions - motion design.mp4` },
	{ slug: 'visual-illusion-kaleidoscope', title: 'Kaleidoscopic Line Series', label: LABELS.motion, w: 1920, h: 1080, dur: '0:14',
	  src: `${WORK}/visual illusion kaleidoscope.mp4` },

	{ slug: 'apocalypse', title: 'What\u2019s Left of Apocalypse', label: LABELS.ai, w: 1176, h: 1756, dur: '0:05',
	  src: `${DESKTOP}/SIDEWORK/AI/Whats Left of Apocalypse.mp4` },
	{ slug: 'ai-art', title: 'Fragments', label: LABELS.ai, w: 1660, h: 1244, dur: '0:05', src: `${WORK}/ai art .mp4` },
	{ slug: 'ai-art-3', title: 'Floating Bath', label: LABELS.ai, w: 1920, h: 1080, dur: '0:06', src: `${WORK}/ai art 3.mp4` },
	{ slug: 'ai-art-5', title: 'Uncomfortable Kisses', label: LABELS.ai, w: 1920, h: 1080, dur: '0:06', src: `${WORK}/ai art 5.mp4` },
	{ slug: 'ai-art-6', title: 'Fashion Shoot Gone Wrong', label: LABELS.ai, w: 1764, h: 1176, dur: '0:08', src: `${WORK}/ai art 6.mp4` },
	{ slug: 'ai-art-7', title: 'Prêt-à-Destroy Runway', label: LABELS.ai, w: 1764, h: 1176, dur: '0:05', src: `${WORK}/ai art 7.mp4` },
	{ slug: 'ai-art-8', title: 'Prêt-à-Destroy 2 Runway', label: LABELS.ai, w: 1764, h: 1176, dur: '0:05', src: `${WORK}/ai art 8.mp4` },
	{ slug: 'ai-art-10', title: 'Intoxicated Runway', label: LABELS.ai, w: 1660, h: 1244, dur: '0:06', src: `${WORK}/ai art 10 .mp4` },
	{ slug: 'ai-art-11', title: 'Reflective Runway', label: LABELS.ai, w: 1660, h: 1244, dur: '0:06', src: `${WORK}/ai art 11.mp4` },
	{ slug: 'ai-art-12', title: 'Open Your Mouth', label: LABELS.ai, w: 1920, h: 1080, dur: '0:10', src: `${WORK}/ai art 12.mp4` },
].map((item) => ({ ...item, portrait: item.h > item.w }));

export const sections = [
	{
		slug: 'graphic-design',
		title: 'Graphic Design',
		blurb: 'Branding, illustration and poster design.',
		// derived, never hand-counted
		count: graphicProjects.length,
		unit: 'projects',
	},
	{
		slug: 'art-direction-content',
		title: 'Art Direction & Content',
		blurb: 'Videography, motion and AI-generated work.',
		count: artDirection.length,
		unit: 'pieces',
	},
];
