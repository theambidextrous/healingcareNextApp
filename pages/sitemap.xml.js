import React from "react";
import fs from "fs";

const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://healingcarejobs.com",
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return ![
        "_app.js",
        "_document.js",
        "sitemap.xml.js",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
    <loc>https://healingcarejobs.com/</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>1.00</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/post-a-job</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/about-us</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/healthcare/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/nurse/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/dentist/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/rn/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/pharmacist/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/pharmacy-technician/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/nurse-practitioner/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/physician-assistant/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/occupational-therapist/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/dental-assistant/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/medical-assistant/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/physical-therapist/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    <url>
    <loc>https://healingcarejobs.com/find-jobs/psychologist/united-states/healthcare</loc>
    <lastmod>2021-06-21T07:30:12+00:00</lastmod>
    <priority>0.80</priority>
    </url>
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;