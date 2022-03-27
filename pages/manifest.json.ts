import { NextApiResponse } from "next";
import { Component } from "react";

const getManifest = (): string => `{
  "short_name": "YOUR_NAME_HERE",
  "name": "Open letter YOUR_NAME_HERE",
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
`;

class Sitemap extends Component {
  static getInitialProps({ res }: { res: NextApiResponse }): void {
    res.setHeader("Content-Type", "application/manifest+json");
    res.write(getManifest());
    res.end();
  }
}

export default Sitemap;
