export const replaceYoutubeLink = (
  link: string | undefined
): string | undefined =>
  link?.includes('watch?v=') ? link.replace('watch?v=', 'embed/') : link;
