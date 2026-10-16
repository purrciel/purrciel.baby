/**
 * Фоновая музыка: берём первый по алфавиту аудиофайл из src/assets/audio/.
 * Просто положи туда трек — код подхватит его сам.
 */
export function getTrack(): string | null {
	const tracks = import.meta.glob('../assets/audio/*.{mp3,mp4,m4a,aac,ogg,oga,opus,wav,flac}', {
		eager: true,
		query: '?url',
		import: 'default',
	}) as Record<string, string>;

	const first = Object.keys(tracks).sort()[0];
	return first ? tracks[first] : null;
}
