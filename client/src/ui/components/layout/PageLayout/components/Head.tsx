import React from 'react';
import { Helmet } from 'react-helmet';
import metaConfig from '../../../../../config/metaconfig';

// Assets
// @ts-ignore
import Favicon from '../../../../../assets/meta/favicon.ico';
import Image from '../../../../../assets/meta/metaBanner.png';

// TODO to work properly server side rendering is required!
//  For now all meta properties that can't be configured without ssr are directly written in the 'index.html'
// https://github.com/nfl/react-helmet/issues/213
const Head: React.FC<HeadProps> = (props) => {
  const {
    title: siteTitle,
    description = metaConfig.description,
    keywords = metaConfig.keywords,
    image = Image,
    color = metaConfig.color,
    creator = metaConfig.creator,
    canonical = '',
  } = props;
  const combinedTitle = siteTitle
    ? `${siteTitle} - ${metaConfig.title}`
    : metaConfig.title;

  return (
    <Helmet>
      <meta name="environment" content="production" />

      {/* Page/Site Name */}
      <meta name="site_name" content={siteTitle} />
      <meta name="application-name" content={siteTitle} />

      {/* Title */}
      {combinedTitle && <title>{combinedTitle}</title>}
      {combinedTitle && <meta property="og:title" content={combinedTitle} />}
      {combinedTitle && <meta name="twitter:title" content={combinedTitle} />}

      {/* Keywords */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(',')} />
      )}

      {/* Color */}
      {color && <meta name="theme-color" content={color} />}

      {/* Icon */}
      {Favicon && <link rel="shortcut icon" href={Favicon} />}

      {/* Permalink */}
      <link rel="canonical" href={`${metaConfig.url}${canonical}/`} />
      <meta property="og:url" content={`${metaConfig.url}${canonical}/`} />
      <meta property="forem:domain" content={metaConfig.url} />

      {/* Description */}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}

      {/* Image */}
      {image && <meta property="image" content={image} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta name="twitter:image" content={image} />}
      {image && <meta name="twitter:image:src" content={image} />}
      {image && (
        <meta
          name="twitter:image:alt"
          content={`Image for "${metaConfig.title}"`}
        />
      )}
      {/* Makes Image Large */}
      <meta name="twitter:card" content="summary_large_image" />

      {/* Creator */}
      {creator && <meta name="twitter:creator" content={creator} />}

      <noscript>This site runs best with JavaScript enabled</noscript>
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Helmet>
  );
};

export default Head;

export type HeadProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  color?: string;
  image?: string;
  creator?: string;
  canonical?: string; // https://de.ryte.com/wiki/Canonical_Tag
};
