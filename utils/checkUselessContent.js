const puppeteer = require("puppeteer");
const checkUselessContent = (page, feed) => {
  page.evaluate(feed => {
    if (
      feed.textContent.includes("추천 게시물") ||
      feed.textContent.includes("게시물을 공유했습니다") ||
      feed.textContent.includes("링크를 공유했습니다") ||
      feed.textContent.includes("태그되었습니다")
    ) {
      return false;
    } else {
      return true;
    }
  });
};
module.exports = checkUselessContent;
