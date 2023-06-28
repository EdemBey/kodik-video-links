import { App } from '@tinyhttp/app';
import { printParser, printServer, printVideoLinks } from './logger';
import { VideoLinks } from 'kodikwrapper';
import { createErrorAnswer } from './helpers';
import { BadRequestError, NotFoundError } from './errors';
import { parseLink} from './get-dubs'; // Import the parseLinks function
import axios from 'axios';
import cheerio from 'cheerio';

const app = new App();
const PORT = +(process.env.PORT ?? 3000);

app.get('/parse', async (req, res) => {
  const { link, extended } = req.query;
  if (!link) return res.status(400).json(createErrorAnswer(new BadRequestError('"link" not passed')));
  const isExtended = extended === '' || extended === 'true';
  printParser(`parse ${link} ${isExtended ? '(extended)' : ''}`);
  try {
    const result = await VideoLinks.parseLink({
      link: link.toString(),
      extended: isExtended
    });
    res.status(200).json({
      ok: true,
      data: result
    });
  } catch (error) {
    res.status(400).json(createErrorAnswer(error));
  };
});
app.get('/video-links', async (req, res) => {
  const { link, extended } = req.query;
  if (!link) return res.status(400).json(createErrorAnswer(new BadRequestError('"link" not passed')));
  const isExtended = extended === '' || extended === 'true';
  printVideoLinks(`videolinks ${link} ${isExtended ? '(extended)' : ''}`);
  try {
    const result = await VideoLinks.getLinks({
      link: link.toString(),
      extended: isExtended
    });
    res.status(200).json({
      ok: true,
      data: result
    });
  } catch (error) {
    res.status(400).json(createErrorAnswer(error));
  };
});

app.get('/all-dubs', async (req, res) => {
  const  link  = req.query.link?.toString()?.split('?')[0];
  if (!link) return res.status(400).json(createErrorAnswer(new BadRequestError('"link" not passed')));
  try {
    const result = await dubs(link as string)
    res.status(200).json({
      ok: true,
      data: result
    });
  } catch (error) {
    res.status(400).json(createErrorAnswer(error));
  }
});
async function dubs(link:string) {
  const result = link.includes("season")?
  await parseLink(link as string, true):
  await parseLink(link as string); // Use the parseLinks function
  return result
}
// grab kodik link from yummyanime
app.get('/get-yummy', async (req, res) => {
  const  link  = req.query.link?.toString()?.split('?')[0];
  if (!link) return res.status(400).json(createErrorAnswer(new BadRequestError('"link" not passed')));
  try {
    const response = await axios.get(link as string);
    const animeData = response.data;
    const $ = cheerio.load(animeData);
    const kodikLink = $('[data-href*="/season/"]').first().attr('data-href');
    const result = await dubs("http:"+kodikLink?.split('?')[0])
      res.status(200).json({
      ok: true,
      data: result
    });
  } catch (error) {
    res.status(400).json(createErrorAnswer(error));
  }
});

app.use(async (req, res) => {
  res.status(400).json(createErrorAnswer(new NotFoundError('unkonwn API method')));
});

app.listen(PORT, () => {
  printServer(`started at port ${PORT}`);
});
