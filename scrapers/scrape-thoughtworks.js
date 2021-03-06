const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.thoughtworks.com/careers/jobs';

const fetchDevJobsFromTW = async () => {
  try {
    const res = await axios.get(url)
    const html = res.data;
    const $ = cheerio.load(html);
    const scrapedContent = $('tbody tr').toArray();
    const jobsArray = scrapedContent.map(e => {
      const link = $(e).find('a').attr('href').trim()
      const title = $(e).find('a').text().trim()
      const location = $(e).find('').text().trim()
      return { title, link, location }
    })
    return jobsArray.filter(job => job.title.includes('Developer') && (job.location === 'London, England' || job.location === 'Osterley, England'))
  } catch (err) {
    console.error(err)
  }
}


module.exports = {
  fetchDevJobsFromTW,
}

