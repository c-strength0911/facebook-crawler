const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
dotenv.config();
const xlsx = require("xlsx");
const wb = xlsx.readFile("result.xlsx", { cellDates: true });
const ws = wb.Sheets["Sheet1"];
let result = [];

const crawler = async () => {
  try {
    // await db.sequelize.sync();
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--window-size=1920,1080", "--disable-notifications"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://facebook.com");
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    await page.type("#email", email);
    await page.type("#pass", password);
    await page.waitForSelector("button[name=login]");
    await page.click("button[name=login]");
    await page.waitForSelector("a[href='https://www.facebook.com/?sk=h_chr']");
    await page.click("a[href='https://www.facebook.com/?sk=h_chr']");
    console.log("success");

    await page.waitForSelector("[data-pagelet^=FeedUnit]");
    console.log("waitForSelector");

    while (result.length < 10) {
      await page.waitForSelector("[data-pagelet^=FeedUnit]");
      const newPage = await page.evaluate(() => {
        const firstFeed = document.querySelector("[data-pagelet^=Feed]");
        console.log("Feed selector");
        if (
          firstFeed.textContent.includes("추천 게시물") ||
          firstFeed.textContent.includes("게시물을 공유했습니다") ||
          firstFeed.textContent.includes("링크를 공유했습니다") ||
          firstFeed.textContent.includes("태그되었습니다")
        )
          return "Useless Content";
        const name =
          firstFeed.querySelector(".nc684nl6 a strong") &&
          firstFeed.querySelector(".nc684nl6 a strong").textContent;
        const content =
          firstFeed.querySelector(
            ".d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.lr9zc1uh.a8c37x1j.keod5gw0.nxhoafnm.aigsh9s9.d3f4x2em.fe6kdd0r.mau55g9w.c8b282yb.iv3no6db.jq4qci2q.a3bd9o3v.b1v8xokw.oo9gr5id"
          ) &&
          firstFeed.querySelector(
            ".d2edcug0.hpfvmrgz.qv66sw1b.c1et5uql.lr9zc1uh.a8c37x1j.keod5gw0.nxhoafnm.aigsh9s9.d3f4x2em.fe6kdd0r.mau55g9w.c8b282yb.iv3no6db.jq4qci2q.a3bd9o3v.b1v8xokw.oo9gr5id"
          ).textContent;
        const img =
          firstFeed.querySelector(".pmk7jnqg.kr520xx4 img") &&
          firstFeed.querySelector(".pmk7jnqg.kr520xx4 img").src;
        return { name, content, img };
      });

      console.log(newPage);
      result.push(newPage);
      await page.evaluate(() => {
        const target = document.querySelector("[data-pagelet^=Feed]");
        target.parentNode.removeChild(target);
      });

      await console.log("삭제");
    }
    await result.forEach(r => {
      xlsx.utils.sheet_add_aoa(ws, [[r.name, r.content, r.img]], {
        origin: -1,
      });
    });
    xlsx.writeFile(wb, "result.xlsx");
    await page.close();
    await browser.close();
    console.log("=============================");
    console.log("크롤링 끝");
    console.log("=============================");
  } catch (err) {
    console.error(err);
  }
};

crawler();
