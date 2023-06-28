import axios from 'axios';
import cheerio from 'cheerio';




export async function parseLink(link: string, season=false, episodes= false ) {
  try {
    const selector = season?'.serial-translations-box':episodes?".serial-series-box": '.movie-panel'
    const response = await axios.get(link.toString());
    const $ = cheerio.load(response.data);

    const moviePanels = $(selector);

    const result = await Promise.all(
      moviePanels.toArray().map(async (element) => {
        const selectElement = $(element).find('select');
        const options = selectElement.children('option');

        const translations = await Promise.all(
          options.toArray().map(async (option) => {
            const translationType = $(option).data('translation-type');
            const mediaId = episodes?$(option).data('id'):$(option).data('media-id');
            const mediaHash = episodes?$(option).data('hash'):$(option).data('media-hash');
            const title = $(option).data('title');
            const baseLink = link as string;
            let urlParts = baseLink.split('/');
            episodes && (urlParts[3] = "seria");
            urlParts[4] = mediaId as string;
            urlParts[5] = mediaHash as string;
            const videoLink = urlParts.join('/');
            const episodesList: any[]  = season?await parseLink(videoLink, false, true):[];
            return season
                ? { title, translationType, episodesList }
                : { title, translationType, videoLink };
          })
        );

        return translations;
      })
    );

    return result;
  } catch (error) {
    throw error;
  }
}
